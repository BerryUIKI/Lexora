import { describe, it, expect, beforeEach } from "vitest";
import {
  SUPPORTED_LOCALES,
  t,
  setLocale,
  currentLocale,
  detectSystemLocale,
} from "./index";
import { en } from "./locales/en";
import { zhCN } from "./locales/zh-CN";
import { zhTW } from "./locales/zh-TW";
import { ja } from "./locales/ja";
import { ko } from "./locales/ko";
import { de } from "./locales/de";
import { fr } from "./locales/fr";
import { es } from "./locales/es";
import { ru } from "./locales/ru";

describe("i18n Internationalization Engine", () => {
  beforeEach(() => {
    setLocale("en-US");
  });

  it("should support at least 9 distinct languages", () => {
    expect(SUPPORTED_LOCALES.length).toBeGreaterThanOrEqual(9);
    const codes = SUPPORTED_LOCALES.map((l) => l.code);
    expect(codes).toContain("en-US");
    expect(codes).toContain("zh-CN");
    expect(codes).toContain("zh-TW");
    expect(codes).toContain("ja-JP");
    expect(codes).toContain("ko-KR");
    expect(codes).toContain("de-DE");
    expect(codes).toContain("fr-FR");
    expect(codes).toContain("es-ES");
    expect(codes).toContain("ru-RU");
  });

  it("should have complete dictionary coverage for all languages", () => {
    const dicts = [en, zhCN, zhTW, ja, ko, de, fr, es, ru];
    dicts.forEach((d) => {
      expect(d.app.name).toBe("Lexora");
      expect(d.menu.file).toBeTruthy();
      expect(d.menu.edit).toBeTruthy();
      expect(d.menu.view).toBeTruthy();
      expect(d.menu.window).toBeTruthy();
      expect(d.menu.help).toBeTruthy();
      expect(d.menu.language).toBeTruthy();
      expect(d.file.newDocument).toBeTruthy();
      expect(d.file.openFile).toBeTruthy();
      expect(d.file.save).toBeTruthy();
      expect(d.edit.bold).toBeTruthy();
      expect(d.sidebar.outline).toBeTruthy();
      expect(d.sidebar.files).toBeTruthy();
      expect(d.statusBar.wordsCount).toBeTruthy();
      expect(d.update.checking).toBeTruthy();
    });
  });

  it("should translate keys properly in English", () => {
    setLocale("en-US");
    expect(t("menu.file")).toBe("File");
    expect(t("menu.edit")).toBe("Edit");
    expect(t("file.newDocument")).toBe("New Document");
  });

  it("should translate keys properly in Simplified Chinese", () => {
    setLocale("zh-CN");
    expect(t("menu.file")).toBe("文件");
    expect(t("menu.edit")).toBe("编辑");
    expect(t("file.newDocument")).toBe("新建文档");
  });

  it("should translate keys properly in Traditional Chinese", () => {
    setLocale("zh-TW");
    expect(t("menu.file")).toBe("檔案");
    expect(t("menu.edit")).toBe("編輯");
    expect(t("file.newDocument")).toBe("新增文件");
  });

  it("should translate keys properly in Japanese", () => {
    setLocale("ja-JP");
    expect(t("menu.file")).toBe("ファイル");
    expect(t("file.newDocument")).toBe("新規ドキュメント");
  });

  it("should translate keys properly in Korean", () => {
    setLocale("ko-KR");
    expect(t("menu.file")).toBe("파일");
    expect(t("file.newDocument")).toBe("새 문서");
  });

  it("should translate keys properly in German", () => {
    setLocale("de-DE");
    expect(t("menu.file")).toBe("Datei");
    expect(t("file.newDocument")).toBe("Neues Dokument");
  });

  it("should translate keys properly in French", () => {
    setLocale("fr-FR");
    expect(t("menu.file")).toBe("Fichier");
    expect(t("file.newDocument")).toBe("Nouveau document");
  });

  it("should translate keys properly in Spanish", () => {
    setLocale("es-ES");
    expect(t("menu.file")).toBe("Archivo");
    expect(t("file.newDocument")).toBe("Nuevo documento");
  });

  it("should translate keys properly in Russian", () => {
    setLocale("ru-RU");
    expect(t("menu.file")).toBe("Файл");
    expect(t("file.newDocument")).toBe("Новый документ");
  });

  it("should interpolate dynamic parameters correctly", () => {
    setLocale("en-US");
    expect(t("statusBar.lineCol", { line: 42, col: 17 })).toBe("Ln 42, Col 17");

    setLocale("zh-CN");
    expect(t("statusBar.lineCol", { line: 42, col: 17 })).toBe("第 42 行，第 17 列");
  });

  it("should fallback gracefully if system locale is unknown", () => {
    expect(detectSystemLocale()).toBeDefined();
  });
});
