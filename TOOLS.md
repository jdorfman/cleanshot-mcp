# CleanShot MCP Tools Reference

All tools are prefixed with `cleanshot_` and correspond to CleanShot's URL scheme commands.

## Basic Screenshot Tools

| Tool Name | Description | Human Tested? |
|-----------|-------------|---------------|
| `cleanshot_capture_area` | Open area capture mode | ✅ |
| `cleanshot_capture_fullscreen` | Take fullscreen screenshot | ✅ |
| `cleanshot_capture_window` | Capture window mode | ✅ |
| `cleanshot_capture_previous_area` | Repeat last screenshot | ✅ |

## Advanced Capture Tools

| Tool Name | Description | Human Tested? |
|-----------|-------------|---------------|
| `cleanshot_all_in_one` | Launch All-In-One mode | ✅ |
| `cleanshot_scrolling_capture` | Scrolling capture mode | ✅ |
| `cleanshot_self_timer` | Self-timer capture | ✅ |
| `cleanshot_record_screen` | Screen recording mode | ✅ |

## Text & Annotation Tools

| Tool Name | Description | Human Tested? |
|-----------|-------------|---------------|
| `cleanshot_capture_text` | OCR text extraction | ✅ |
| `cleanshot_open_annotate` | Open annotation tool | ✅ |
| `cleanshot_open_from_clipboard` | Annotate clipboard image | ✅ |

## Utility Tools

| Tool Name | Description | Human Tested? |
|-----------|-------------|---------------|
| `cleanshot_pin` | Pin screenshots (⚠️ must include full path, supports only `png` or `jpg`) | ✅ |
| `cleanshot_toggle_desktop_icons` | Toggle desktop icons | ✅ |
| `cleanshot_hide_desktop_icons` | Hide desktop icons | ✅ |
| `cleanshot_show_desktop_icons` | Show desktop icons | ✅ |

## Management Tools

| Tool Name | Description | Human Tested? |
|-----------|-------------|---------------|
| `cleanshot_add_quick_access_overlay` | Add to quick access | ✅ |
| `cleanshot_open_history` | Open capture history | ✅ |
| `cleanshot_restore_recently_closed` | Restore recent file | ✅ |
| `cleanshot_open_settings` | Open settings | ✅ |

## Usage Examples

```javascript
// Take a fullscreen screenshot and copy to clipboard
await callTool("cleanshot_capture_fullscreen", { action: "copy" });

// Capture a specific area and annotate it
await callTool("cleanshot_capture_area", { 
  x: 100, 
  y: 100, 
  width: 500, 
  height: 300, 
  action: "annotate" 
});

// Extract text from a specific screen area
await callTool("cleanshot_capture_text", { 
  x: 0, 
  y: 0, 
  width: 800, 
  height: 600,
  linebreaks: false 
});

// Open a file for annotation
await callTool("cleanshot_open_annotate", { 
  filepath: "/Users/username/Desktop/screenshot.png" 
});
```
