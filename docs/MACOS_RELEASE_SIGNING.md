# macOS Release Signing (Optional Notarization)

Taleno's GitHub Release workflow builds separate Intel and Apple Silicon macOS packages. The two macOS jobs use a `Developer ID Application` certificate to sign the packages. The signing secrets are scoped to macOS jobs only; Windows and Linux jobs do not use them.

If App Store Connect API credentials are also configured, the workflow notarizes the macOS packages automatically. Developer ID signing fixes invalid or ad-hoc signatures, while notarization is required for a normal first-launch experience on current macOS releases. Gatekeeper may still block a signed but unnotarized download.

## 1. Create a Developer ID certificate

GitHub Releases distribute the app outside the Mac App Store, so create a `Developer ID Application` certificate rather than a `Mac App Distribution` certificate.

1. Open [Apple Developer Account](https://developer.apple.com/account/) and go to **Certificates, Identifiers & Profiles → Certificates**.
2. Click `+`, choose **Developer ID → Developer ID Application**, and continue.
3. Upload the existing `CertificateSigningRequest.certSigningRequest`, continue, and download the generated `.cer` file.
4. Double-click the `.cer` file to install it in Keychain Access.
5. Open **Keychain Access → My Certificates** and find an entry similar to:

   `Developer ID Application: Your Name (TEAMID)`

   Expand the entry and confirm that the matching private key is listed below it.

6. Select both the certificate and its private key, right-click, choose **Export 2 Items**, select `Personal Information Exchange (.p12)`, and set an export password.

The CSR is not the signing credential and can remain on the Mac. The `.p12` file contains the private key; never commit it to Git or upload it to chat. If the certificate has no private key beneath it, the CSR was created on another Mac or under another user account. Export the `.p12` from the original keychain, or create a new CSR and certificate.

To inspect the exact signing identity on the Mac:

```bash
security find-identity -v -p codesigning
```

The workflow infers the signing identity from the imported certificate, so no separate identity secret is required.

## 2. Encode the signing certificate

Convert the exported `.p12` file to a single-line Base64 string and copy it to the clipboard:

```bash
openssl base64 -A -in "$HOME/Downloads/Taleno-DeveloperID.p12" | pbcopy
```

## 3. Configure GitHub Secrets

Open the repository's **Settings → Secrets and variables → Actions → New repository secret** and confirm that these two repository secrets exist:

| Secret | Value |
| --- | --- |
| `MAC_SIGNING_CERT_BASE64` | The Base64 content of the `.p12` file |
| `MAC_SIGNING_CERT_PASSWORD` | The password used when exporting the `.p12` file |

These two secrets are sufficient for macOS code signing. They are only passed to the macOS matrix jobs in `.github/workflows/release.yml`. The workflow verifies the resulting `.app` and DMG and rejects ad-hoc signatures before the draft release is published.

Do not put the `.p12`, private key, certificate password, or Base64 content in the repository.

## 4. Optional: configure notarization

To enable automatic notarization, create an App Store Connect API key in [App Store Connect](https://appstoreconnect.apple.com/) under **Users and Access → Integrations → App Store Connect API → Team Keys**. Download the `.p8` file and record its Key ID and Issuer ID. The private key is available for download only once.

Encode the `.p8` file as a single-line Base64 string:

```bash
openssl base64 -A -in "$HOME/Downloads/AuthKey_ABC123DEFG.p8" | pbcopy
```

Add these three optional repository secrets:

| Secret | Value |
| --- | --- |
| `APPLE_API_KEY` | The App Store Connect API Key ID |
| `APPLE_API_ISSUER` | The App Store Connect API Issuer ID |
| `APPLE_API_KEY_CONTENT` | The Base64 content of the `.p8` file |

If all three optional secrets are present, the workflow decodes the key into the temporary GitHub Actions runner and passes it to Tauri for notarization. If none are present, the workflow performs signing only. A partially configured set fails early with a clear error.

## 5. Trigger a release

After configuring the signing secrets, push a version tag:

```bash
git tag v0.1.6
git push origin v0.1.6
```

You can also open **Actions → Release → Run workflow** and enter the tag manually.

The two macOS jobs verify the signing secrets before building. The final Release should contain separate signed DMG files for Intel and Apple Silicon.

## Troubleshooting

- **`No identity found`**: Confirm that the `.p12` contains both the `Developer ID Application` certificate and its matching private key.
- **The private key is missing**: A `.cer` file does not contain the private key. Export the `.p12` from the keychain where the CSR was created.
- **Notarization fails**: Confirm that `APPLE_API_KEY_CONTENT` contains the complete Base64-encoded `.p8` file and that the Key ID and Issuer ID have no extra spaces.
- **The workflow publishes only signed packages**: This is expected when the three optional notarization secrets are not configured. Add all three optional secrets to enable notarization.
