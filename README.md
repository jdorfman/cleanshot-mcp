# CleanShot MCP Server (Unofficial)

A Model Context Protocol (MCP) server that provides integration with CleanShot's URL scheme API. This server allows you to trigger [CleanShot](https://cleanshot.com/) actions programmatically through MCP-compatible applications. [Created with Amp](https://ampcode.com/threads/T-6a3d9fd7-62e8-4e14-b6e8-f1b8ad9c4348).

## Table of Contents

- [Getting Started](#getting-started)
- [Examples](#examples)
- [Available Tools](#available-tools)
- [Development](#development)
- [Requirements](#requirements)

## Getting Started

### MCP Client Configuration

Add this server to your MCP client configuration. For example, in [Amp](https://ampcode.com):

```json
{
  "amp.mcpServers": {
    "cleanshot": {
      "command": "npx",
      "args": ["cleanshot-mcp"],
      "env": {}
    }
  }
}
```

## Examples

**Prompt:**
> Capture fullscreen and copy

**Response:**

```text
cleanshot • cleanshot_capture_fullscreen
({ "action": "copy" })

Took fullscreen screenshot: cleanshot://capture-fullscreen?action=copy
```

---

**Prompt:**
> Capture the following area: x: 100, y: 100, width: 500, height: 300 and upload

**Response:**

```text
cleanshot • cleanshot_capture_area
({ "x": 100, "y": 100, "width": 500, "height": 300, "action": "upload" })

Opened CleanShot Capture Area: cleanshot://capture-area?x=100&y=100&width=500&height=300&action=upload
```

## Available Tools

All tools are prefixed with `cleanshot_` and correspond to CleanShot's URL scheme commands:

### Basic Screenshot Tools

| Tool Name | Description | Human Tested? |
|-----------|-------------|---------------|
| `cleanshot_capture_area` | Open area capture mode | ✅ |
| `cleanshot_capture_fullscreen` | Take fullscreen screenshot | ✅ |
| `cleanshot_capture_window` | Capture window mode | ✅ |
| `cleanshot_capture_previous_area` | Repeat last screenshot | ✅ |

### Advanced Capture Tools

| Tool Name | Description | Human Tested? |
|-----------|-------------|---------------|
| `cleanshot_all_in_one` | Launch All-In-One mode | ✅ |
| `cleanshot_scrolling_capture` | Scrolling capture mode | ✅ |
| `cleanshot_self_timer` | Self-timer capture | ✅ |
| `cleanshot_record_screen` | Screen recording mode | ✅ |

### Text & Annotation Tools

| Tool Name | Description | Human Tested? |
|-----------|-------------|---------------|
| `cleanshot_capture_text` | OCR text extraction | ✅ |
| `cleanshot_open_annotate` | Open annotation tool | ✅ |
| `cleanshot_open_from_clipboard` | Annotate clipboard image | ✅ |

### Utility Tools

| Tool Name | Description | Human Tested? |
|-----------|-------------|---------------|
| `cleanshot_pin` | Pin screenshots (⚠️ must include full path, supports only `png` or `jpg`) | ✅ |
| `cleanshot_toggle_desktop_icons` | Toggle desktop icons | ✅ |
| `cleanshot_hide_desktop_icons` | Hide desktop icons | ✅ |
| `cleanshot_show_desktop_icons` | Show desktop icons | ✅ |

### Management Tools

| Tool Name | Description | Human Tested? |
|-----------|-------------|---------------|
| `cleanshot_add_quick_access_overlay` | Add to quick access | ✅ |
| `cleanshot_open_history` | Open capture history | ✅ |
| `cleanshot_restore_recently_closed` | Restore recent file | ✅ |
| `cleanshot_open_settings` | Open settings | ✅ |

## API Parameters

### Coordinate System

- Point (0,0) is located at the **lower left** corner of the screen
- X increases going right, Y increases going up

### Common Parameters

- `x`, `y`: Coordinates for capture area
- `width`, `height`: Dimensions of capture area
- `display`: Display number (1 = main display, 2 = secondary, etc.)
- `action`: Post-capture action (`copy`, `save`, `annotate`, `upload`, `pin`)
- `filepath`: Path to image/video files (PNG, JPEG, MP4)

## Development

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Testing

Make sure CleanShot is installed and running, then test individual commands:

```bash
# Test basic functionality
node dist/index.js
```

### Example Usage

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
## Requirements

- macOS
- CleanShot X installed and running
- Node.js 18+
- CleanShot Pro license (for URL scheme API access)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For issues related to:

- **This MCP server**: Open an issue on GitHub
- **MCP protocol**: See [MCP documentation](https://modelcontextprotocol.io)

> [!IMPORTANT]
> Please **DO NOT** contact CleanShot support for problems with this MCP server. They are not connected to this project. We're just big fans :heart:
