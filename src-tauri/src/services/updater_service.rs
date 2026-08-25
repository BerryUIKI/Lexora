use reqwest::StatusCode;
use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Error, Debug, PartialEq, Eq)]
pub enum UpdateError {
    #[error("Invalid repository format: '{0}'. Expected 'owner/repo'.")]
    InvalidRepo(String),

    #[error("Network connection failed: {0}")]
    NetworkError(String),

    #[error("GitHub API rate limit exceeded (HTTP {0}). Please try again later.")]
    RateLimited(u16),

    #[error("GitHub API request failed with HTTP {status}: {message}")]
    ApiError { status: u16, message: String },

    #[error("No valid public release found for repository '{0}'.")]
    NoReleaseFound(String),

    #[error("Failed to parse release response JSON: {0}")]
    JsonError(String),
}

/// Release download asset metadata
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct ReleaseAsset {
    pub name: String,
    pub size: u64,
    pub browser_download_url: String,
}

/// Structured GitHub Release representation
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct GithubRelease {
    pub tag_name: String,
    pub name: Option<String>,
    pub body: Option<String>,
    pub published_at: Option<String>,
    pub html_url: String,
    #[serde(default)]
    pub draft: bool,
    #[serde(default)]
    pub prerelease: bool,
    #[serde(default)]
    pub assets: Vec<ReleaseAsset>,
}

/// Validates that a repo identifier is in 'owner/repo' format.
pub fn validate_repo(repo: &str) -> Result<(&str, &str), UpdateError> {
    let parts: Vec<&str> = repo.trim().split('/').collect();
    if parts.len() != 2 || parts[0].is_empty() || parts[1].is_empty() {
        return Err(UpdateError::InvalidRepo(repo.to_string()));
    }
    Ok((parts[0], parts[1]))
}

/// Fetch the latest stable release from GitHub API.
///
/// Features:
/// - Repository format validation
/// - Standardized `User-Agent: Lexora-App/{version}`
/// - 10-second timeout
/// - Specific rate-limit handling (HTTP 403 / 429)
/// - Fallback to `/releases?per_page=5` ONLY on HTTP 404
/// - Excludes draft and prerelease entries in fallback branch
pub async fn fetch_latest_release(repo: &str) -> Result<GithubRelease, UpdateError> {
    validate_repo(repo)?;

    let app_version = env!("CARGO_PKG_VERSION");
    let user_agent = format!("Lexora-App/{}", app_version);

    let client = reqwest::Client::builder()
        .user_agent(user_agent)
        .timeout(std::time::Duration::from_secs(10))
        .build()
        .map_err(|e| UpdateError::NetworkError(e.to_string()))?;

    let latest_url = format!("https://api.github.com/repos/{}/releases/latest", repo);

    let response = client
        .get(&latest_url)
        .header("Accept", "application/vnd.github.v3+json")
        .send()
        .await
        .map_err(|e| UpdateError::NetworkError(e.to_string()))?;

    let status = response.status();

    if status.is_success() {
        let release: GithubRelease = response
            .json()
            .await
            .map_err(|e| UpdateError::JsonError(e.to_string()))?;
        return Ok(release);
    }

    // Explicit rate-limit detection
    if status == StatusCode::FORBIDDEN || status == StatusCode::TOO_MANY_REQUESTS {
        return Err(UpdateError::RateLimited(status.as_u16()));
    }

    // ONLY trigger fallback on 404 Not Found (e.g. repo has releases, but no official latest flag set)
    if status == StatusCode::NOT_FOUND {
        // Use pagination per_page=5 to minimize payload bandwidth
        let fallback_url = format!("https://api.github.com/repos/{}/releases?per_page=5", repo);

        let fallback_resp = client
            .get(&fallback_url)
            .header("Accept", "application/vnd.github.v3+json")
            .send()
            .await
            .map_err(|e| {
                UpdateError::NetworkError(format!(
                    "Fallback request to /releases failed: {}",
                    e
                ))
            })?;

        let fb_status = fallback_resp.status();
        if !fb_status.is_success() {
            if fb_status == StatusCode::FORBIDDEN || fb_status == StatusCode::TOO_MANY_REQUESTS {
                return Err(UpdateError::RateLimited(fb_status.as_u16()));
            }
            return Err(UpdateError::ApiError {
                status: fb_status.as_u16(),
                message: format!(
                    "Fallback to /releases endpoint returned status {}",
                    fb_status
                ),
            });
        }

        let releases: Vec<GithubRelease> = fallback_resp
            .json()
            .await
            .map_err(|e| UpdateError::JsonError(e.to_string()))?;

        // Filter for latest non-draft, non-prerelease release
        if let Some(stable_release) = releases
            .into_iter()
            .find(|r| !r.draft && !r.prerelease)
        {
            return Ok(stable_release);
        }

        return Err(UpdateError::NoReleaseFound(repo.to_string()));
    }

    // Other HTTP error statuses (e.g. 500, 502, 503)
    Err(UpdateError::ApiError {
        status: status.as_u16(),
        message: format!("GitHub API returned unexpected status {}", status),
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_repo_validation() {
        assert!(validate_repo("BerryUIKI/Lexora").is_ok());
        assert_eq!(
            validate_repo("BerryUIKI/Lexora").unwrap(),
            ("BerryUIKI", "Lexora")
        );

        assert!(validate_repo("invalid-format").is_err());
        assert!(validate_repo("/Lexora").is_err());
        assert!(validate_repo("BerryUIKI/").is_err());
        assert!(validate_repo("a/b/c").is_err());
        assert!(validate_repo("").is_err());
    }
}
