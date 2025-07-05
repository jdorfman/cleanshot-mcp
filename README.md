# CleanShot MCP Server (Unofficial)

**Control CleanShot X from any MCP-compatible AI assistant with simple commands like "take a screenshot" or "capture this area".**

_Built with the [Model Context Protocol (MCP)](https://modelcontextprotocol.io) - a standard for connecting AI assistants to external tools. Works with [Amp](https://ampcode.com), Claude Desktop, and other MCP-compatible applications._

![Demo GIF Placeholder](https://via.placeholder.com/600x300/0066CC/FFFFFF?text=Demo+GIF+Coming+Soon)

## Requirements

- macOS
- [CleanShot X](https://cleanshot.com/) installed and running
  - ⚙️ Settings > Advanced > API > ☑️ Allow applications to control CleanShot X
- Node.js 18+

## Quick Start

### 1. Install the MCP Server

```bash
# Option 1: Use without installing (recommended)
npx cleanshot-mcp

# Option 2: Install globally
npm install -g cleanshot-mcp
```

### 2. Configure Your MCP Client

Add this to your MCP client configuration:

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

### 3. Start Using It

Simply tell your AI assistant:

- "Take a fullscreen screenshot and copy it"
- "Capture this area: x: 100, y: 100, width: 500, height: 300"
- "Open CleanShot settings"

## Examples

**Natural Language Commands:**

| Command | What It Does |
|---------|-------------|
| "Take a fullscreen screenshot and copy it" | Captures entire screen and copies to clipboard |
| "Capture this area: x: 100, y: 100, width: 500, height: 300" | Captures specific screen region |
| "Open CleanShot settings" | Opens CleanShot preferences |
| "Extract text from this area" | Uses OCR to extract text from screen region |

## Available Tools

This MCP server provides **17 CleanShot tools** including:

- **Screenshots**: Area capture, fullscreen, window capture, self-timer
- **Recording**: Screen recording with custom areas
- **Text Extraction**: OCR from any screen region
- **Annotation**: Open annotation tools for images
- **Management**: History, settings, desktop icon control

[🔧 View Complete Tool List](TOOLS.md) | [📕 API Reference](API.md)

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

- **Issues with this MCP server**: [Open a GitHub issue](https://github.com/jdorfman/cleanshot-mcp/issues)
- **MCP protocol questions**: [MCP Documentation](https://modelcontextprotocol.io)

> [!IMPORTANT]
> Please **DO NOT** contact CleanShot support for problems with this MCP server. This is an unofficial integration created by fans of their product.

---

**[⭐ Star this repo](https://github.com/jdorfman/cleanshot-mcp)** if you find it useful!

_Created with [Amp](https://ampcode.com/threads/T-6a3d9fd7-62e8-4e14-b6e8-f1b8ad9c4348) - an AI coding assistant._
