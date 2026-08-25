<div align="center">

[ [English](README.md) ] · [ [简体中文](README.zh-CN.md) ] · [ [繁體中文](README.zh-TW.md) ] · [ [日本語](README.ja.md) ] · [ **한국어** ] · [ [Deutsch](README.de.md) ] · [ [Français](README.fr.md) ] · [ [Español](README.es.md) ] · [ [Русский](README.ru.md) ]

# ✨ Lexora

**Typora 스타일의 로컬 우선, 초고속 Markdown 리더 및 인플레이스 WYSIWYG 편집기.**

[![Release](https://img.shields.io/badge/release-latest-4361ee.svg?style=for-the-badge)](https://github.com/BerryUIKI/Lexora/releases/latest)
[![License: AGPL-3.0](https://img.shields.io/badge/license-AGPL--3.0-10b981.svg?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-6366f1.svg?style=for-the-badge)](https://github.com/BerryUIKI/Lexora/releases)
[![Tauri 2](https://img.shields.io/badge/Tauri-2.0-FFC131?style=for-the-badge&logo=tauri&logoColor=white)](https://tauri.app)
[![Rust](https://img.shields.io/badge/Rust-1.85+-DEA584?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![SolidJS](https://img.shields.io/badge/SolidJS-1.9+-2C4F7C?style=for-the-badge&logo=solid&logoColor=white)](https://www.solidjs.com/)

<p align="center">
  <b>🚀 로컬 우선</b> • <b>⚡ 초고속 실행 (&lt;400ms)</b> • <b>📝 화면 분할 없는 실시간 렌더링</b> • <b>🌐 9개 언어 지원</b> • <b>📦 초경량 (~3.6 MB)</b>
</p>

[**📥 최신 버전 다운로드**](#-원클릭-다운로드) • [**🌟 주요 기능**](#-주요-기능) • [**⌨️ 단축키 안내**](#-주요-단축키) • [**📖 개발 문서**](docs/DEVELOPMENT.md)

</div>

---

## 📥 원클릭 다운로드

GitHub 사용 경험이 없어도 괜찮습니다! 사용 중인 운영체제를 클릭하여 최신 설치 파일을 바로 다운로드하세요:

### 🪟 Windows (10 / 11)

| 패키지 유형 | 아키텍처 | 크기 | 다운로드 링크 | 설명 |
|---|---|---|---|---|
| **⭐ 표준 설치 프로그램 (권장)** | `x64` (64비트) | **~3.6 MB** | [⬇️ **최신 Windows 설치 프로그램 (`.exe`) 다운로드**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_x64-setup.exe) | 자동 설치 마법사, `.md` 및 `.txt` 파일 더블클릭 연결 지원 |
| **🏢 기업용 MSI** | `x64` (64비트) | **~5.2 MB** | [⬇️ **최신 Windows MSI (`.msi`) 다운로드**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_x64_en-US.msi) | Windows Installer 표준 패키지, 기업 IT 배포에 적합 |

---

### 🍎 macOS (macOS 11+)

| 패키지 유형 | 아키텍처 | 크기 | 다운로드 링크 | 설명 |
|---|---|---|---|---|
| **⭐ Apple Silicon (권장)** | `M1 / M2 / M3 / M4` | **~5.0 MB** | [⬇️ **최신 Apple Silicon DMG 다운로드**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Apple-Silicon.dmg) | Apple M 시리즈 칩에 최적화된 네이티브 DMG |
| **Intel Mac** | `x64` (Intel) | **~5.3 MB** | [⬇️ **최신 Intel Mac DMG 다운로드**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_x64.dmg) | Intel 프로세서 Mac용 네이티브 DMG |

---

### 🐧 Linux (Ubuntu / Debian / Fedora / Arch)

| 패키지 유형 | 아키텍처 | 크기 | 다운로드 링크 | 설명 |
|---|---|---|---|---|
| **⭐ AppImage (범용)** | `x86_64` (64비트) | **~65 MB** | [⬇️ **최신 AppImage 다운로드**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_amd64.AppImage) | 무설치 포터블, 모든 주요 Linux 배포판에서 바로 실행 가능 |
| **Debian / Ubuntu 패키지** | `amd64` (64비트) | **~5.1 MB** | [⬇️ **최신 Debian/Ubuntu 패키지 (`.deb`) 다운로드**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_amd64.deb) | Debian, Ubuntu, Linux Mint 등 지원 |
| **RedHat / Fedora 패키지** | `x86_64` (64비트) | **~5.0 MB** | [⬇️ **최신 Fedora/RHEL 패키지 (`.rpm`) 다운로드**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora-x86_64.rpm) | Fedora, RHEL, openSUSE 등 지원 |

> 💡 *이전 릴리스 및 소스코드는 [**GitHub Releases 페이지**](https://github.com/BerryUIKI/Lexora/releases/latest)를 참조하세요.*

---

## 🌟 주요 기능

* 🌐 **9개 언어 다국어 인터페이스**: 한국어, 영어, 중국어(간체/번체), 일본어, 독일어, 프랑스어, 스페인어, 러시아어 완벽 지원.
* 🪟 **플랫폼 맞춤 윈도우 크롬**: Windows/Linux에서는 사용자 정의 제어를, macOS에서는 기본 트래픽 라이트 제어를 사용합니다.
* 🏷️ **Windows `.md` 파일 연결**: 더블클릭으로 바로 열기 지원.
* 🔄 **3가지 디스플레이 모드**: 읽기 모드(뷰어), 쓰기 모드(WYSIWYG), 코드 모드(소스 코드).
* 💾 **충돌 방지 원자적 저장**: Rust 원자적 쓰기로 데이터 손실 완벽 방지.
* 🌈 **코드 신택스 하이라이팅**: `syntect` 기반 고속 코드 블록 강조 및 복사 버튼.
* 📊 **Mermaid 다이어그램 & 수식**: 순서도, 시퀀스 다이어그램 및 LaTeX 수식 지원.

---

## 📄 라이선스

이 프로젝트는 **GNU Affero General Public License v3.0 (AGPL-3.0)**에 따라 라이선스가 부여됩니다.
