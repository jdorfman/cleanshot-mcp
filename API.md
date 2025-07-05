# CleanShot MCP API Reference

## Coordinate System

- Point (0,0) is located at the **lower left** corner of the screen
- X increases going right, Y increases going up

## Common Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `x`, `y` | number | Coordinates for capture area |
| `width`, `height` | number | Dimensions of capture area |
| `display` | number | Display number (1 = main display, 2 = secondary, etc.) |
| `action` | string | Post-capture action (`copy`, `save`, `annotate`, `upload`, `pin`) |
| `filepath` | string | Path to image/video files (PNG, JPEG, MP4) |

## Tool-Specific Parameters

### cleanshot_capture_area
```typescript
{
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  display?: number;
  action?: "copy" | "save" | "annotate" | "upload" | "pin";
}
```

### cleanshot_capture_fullscreen
```typescript
{
  action?: "copy" | "save" | "annotate" | "upload" | "pin";
}
```

### cleanshot_capture_text
```typescript
{
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  display?: number;
  linebreaks?: boolean;
  filepath?: string; // For extracting text from files
}
```

### cleanshot_record_screen
```typescript
{
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  display?: number;
}
```

### cleanshot_scrolling_capture
```typescript
{
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  display?: number;
  autoscroll?: boolean;
  start?: boolean;
}
```

### cleanshot_open_annotate
```typescript
{
  filepath: string; // Required: Path to PNG/JPEG file
}
```

### cleanshot_pin
```typescript
{
  filepath: string; // Required: Path to PNG/JPEG file
}
```

### cleanshot_open_settings
```typescript
{
  tab?: "general" | "wallpaper" | "shortcuts" | "quickaccess" | "recording" | "screenshots" | "annotate" | "cloud" | "advanced" | "about";
}
```

## Error Handling

All tools return:
- `isError: false` on success with relevant success message
- `isError: true` on failure with error details

## URL Scheme Integration

This MCP server uses CleanShot's URL scheme API. Each tool call translates to a `cleanshot://` URL that is opened using macOS's `open` command.

Example:
```
cleanshot_capture_area({ x: 100, y: 100, width: 500, height: 300, action: "copy" })
↓
cleanshot://capture-area?x=100&y=100&width=500&height=300&action=copy
```
