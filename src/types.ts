export interface CaptureAreaOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  display?: number;
  action?: 'copy' | 'save' | 'annotate' | 'upload' | 'pin';
}

export interface AllInOneOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  display?: number;
}

export interface RecordScreenOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  display?: number;
}

export interface ScrollingCaptureOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  display?: number;
  start?: boolean;
  autoscroll?: boolean;
}

export interface CaptureTextOptions {
  filepath?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  display?: number;
  linebreaks?: boolean;
}

export interface PostCaptureAction {
  action?: 'copy' | 'save' | 'annotate' | 'upload' | 'pin';
}

export interface FilePathOptions {
  filepath?: string;
}

export interface SettingsOptions {
  tab?: 'general' | 'wallpaper' | 'shortcuts' | 'quickaccess' | 'recording' | 'screenshots' | 'annotate' | 'cloud' | 'advanced' | 'about';
}
