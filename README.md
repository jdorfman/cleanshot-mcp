# CleanShot MCP Server (Unofficial)

A Model Context Protocol (MCP) server that provides integration with CleanShot's URL scheme API. This server allows you to trigger [CleanShot](https://cleanshot.com/) actions programmatically through MCP-compatible applications. [Created with Amp](https://ampcode.com/threads/T-6a3d9fd7-62e8-4e14-b6e8-f1b8ad9c4348).

## Features

This MCP server provides access to all CleanShot URL scheme commands. Not all commands have been thoroughly tested, so please use at your own discretion.

### Screenshots

| Feature | Description | Human Tested? |
|---------|-------------|---------|
| **All-In-One Mode** | Launch CleanShot's unified capture interface | ✅ |
| **Capture Area** | Take area screenshots with optional coordinates | ✅ |
| **Capture Previous Area** | Repeat the last screenshot | ✅ |
| **Capture Fullscreen** | Take fullscreen screenshots | ✅ |
| **Capture Window** | Capture specific windows | ✅ |
| **Self-Timer** | Take screenshots with a timer | ✅ |
| **Scrolling Capture** | Capture scrolling content | ✅ |
| **Pin Screenshot** | Pin screenshots as overlays (must include full path, supports only `png` or `jpg`) | ⚠️ |

### Screen Recording

- **Record Screen**: Start screen recording with optional area selection

### Text Recognition (OCR)

- **Capture Text**: Extract text from screen areas or image files

### Annotation

- **Open Annotate**: Open files in CleanShot's annotation tool
- **Open from Clipboard**: Annotate clipboard images

### Desktop Management

- **Toggle Desktop Icons**: Show/hide desktop icons
- **Hide Desktop Icons**: Hide desktop icons
- **Show Desktop Icons**: Show desktop icons

### Quick Access & History

- **Add Quick Access Overlay**: Add files to quick access
- **Open History**: Access capture history
- **Restore Recently Closed**: Restore recently closed files

### Settings

- **Open Settings**: Open CleanShot settings with optional tab selection

## Requirements

- macOS
- CleanShot X installed and running
- Node.js 18+
- CleanShot Pro license (for URL scheme API access)

## Installation

1. Clone this repository:

```bash
git clone https://github.com/jdorfman/cleanshot-mcp.git
cd cleanshot-mcp
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Usage

### Running the Server

Start the MCP server:

```bash
npm start
```

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

### Available Tools

All tools are prefixed with `cleanshot_` and correspond to CleanShot's URL scheme commands:

#### Basic Screenshot Tools

- `cleanshot_capture_area` - Open area capture mode
- `cleanshot_capture_fullscreen` - Take fullscreen screenshot
- `cleanshot_capture_window` - Capture window mode
- `cleanshot_capture_previous_area` - Repeat last screenshot

#### Advanced Capture Tools

- `cleanshot_all_in_one` - Launch All-In-One mode
- `cleanshot_scrolling_capture` - Scrolling capture mode
- `cleanshot_self_timer` - Self-timer capture
- `cleanshot_record_screen` - Screen recording mode

#### Text & Annotation Tools

- `cleanshot_capture_text` - OCR text extraction
- `cleanshot_open_annotate` - Open annotation tool
- `cleanshot_open_from_clipboard` - Annotate clipboard image

#### Utility Tools

- `cleanshot_pin` - Pin screenshots
- `cleanshot_toggle_desktop_icons` - Toggle desktop icons
- `cleanshot_hide_desktop_icons` - Hide desktop icons
- `cleanshot_show_desktop_icons` - Show desktop icons

#### Management Tools

- `cleanshot_add_quick_access_overlay` - Add to quick access
- `cleanshot_open_history` - Open capture history
- `cleanshot_restore_recently_closed` - Restore recent file
- `cleanshot_open_settings` - Open settings

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

## License

MIT

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
