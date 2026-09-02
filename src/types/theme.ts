export interface ThemeManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  type: "dark" | "light" | "dual";
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  entryFile: string;
  tags?: string[];
}

export interface RemoteTheme {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  repository?: string;
  type: "dark" | "light" | "dual";
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  entryFile: string;
  rawBaseUrl: string;
  minTalenoVersion?: string;
  tags?: string[];
}
