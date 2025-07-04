#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { exec } from "child_process";
import { promisify } from "util";
import type {
  CaptureAreaOptions,
  AllInOneOptions,
  RecordScreenOptions,
  ScrollingCaptureOptions,
  CaptureTextOptions,
  PostCaptureAction,
  FilePathOptions,
  SettingsOptions,
} from "./types.js";

const execAsync = promisify(exec);

const server = new Server(
  {
    name: "cleanshot-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

function buildUrl(command: string, params: Record<string, any> = {}): string {
  const url = new URL(`cleanshot://${command}`);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value.toString());
    }
  });
  
  return url.toString();
}

async function openUrl(url: string): Promise<void> {
  try {
    await execAsync(`open "${url}"`);
  } catch (error) {
    throw new Error(`Failed to open CleanShot URL: ${error}`);
  }
}

const captureAreaSchema = z.object({
  x: z.number().optional(),
  y: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  display: z.number().optional(),
  action: z.enum(['copy', 'save', 'annotate', 'upload', 'pin']).optional(),
});

const allInOneSchema = z.object({
  x: z.number().optional(),
  y: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  display: z.number().optional(),
});

const recordScreenSchema = z.object({
  x: z.number().optional(),
  y: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  display: z.number().optional(),
});

const scrollingCaptureSchema = z.object({
  x: z.number().optional(),
  y: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  display: z.number().optional(),
  start: z.boolean().optional(),
  autoscroll: z.boolean().optional(),
});

const captureTextSchema = z.object({
  filepath: z.string().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  display: z.number().optional(),
  linebreaks: z.boolean().optional(),
});

const postCaptureActionSchema = z.object({
  action: z.enum(['copy', 'save', 'annotate', 'upload', 'pin']).optional(),
});

const filePathSchema = z.object({
  filepath: z.string().optional(),
});

const settingsSchema = z.object({
  tab: z.enum(['general', 'wallpaper', 'shortcuts', 'quickaccess', 'recording', 'screenshots', 'annotate', 'cloud', 'advanced', 'about']).optional(),
});

const requiredFilePathSchema = z.object({
  filepath: z.string(),
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "cleanshot_all_in_one",
        description: "Launch CleanShot's All-In-One mode with optional position and size parameters",
        inputSchema: {
          type: "object",
          properties: {
            x: { type: "number", description: "X coordinate (0,0 is lower left)" },
            y: { type: "number", description: "Y coordinate (0,0 is lower left)" },
            width: { type: "number", description: "Width of the capture area" },
            height: { type: "number", description: "Height of the capture area" },
            display: { type: "number", description: "Display number (1 is main display)" },
          },
        },
      },
      {
        name: "cleanshot_capture_area",
        description: "Open CleanShot's Capture Area mode with optional parameters",
        inputSchema: {
          type: "object",
          properties: {
            x: { type: "number", description: "X coordinate (0,0 is lower left)" },
            y: { type: "number", description: "Y coordinate (0,0 is lower left)" },
            width: { type: "number", description: "Width of the capture area" },
            height: { type: "number", description: "Height of the capture area" },
            display: { type: "number", description: "Display number (1 is main display)" },
            action: { type: "string", enum: ["copy", "save", "annotate", "upload", "pin"], description: "Action to perform after capture" },
          },
        },
      },
      {
        name: "cleanshot_capture_previous_area",
        description: "Repeat the last taken screenshot",
        inputSchema: {
          type: "object",
          properties: {
            action: { type: "string", enum: ["copy", "save", "annotate", "upload", "pin"], description: "Action to perform after capture" },
          },
        },
      },
      {
        name: "cleanshot_capture_fullscreen",
        description: "Take a fullscreen screenshot",
        inputSchema: {
          type: "object",
          properties: {
            action: { type: "string", enum: ["copy", "save", "annotate", "upload", "pin"], description: "Action to perform after capture" },
          },
        },
      },
      {
        name: "cleanshot_capture_window",
        description: "Open CleanShot's Capture Window mode",
        inputSchema: {
          type: "object",
          properties: {
            action: { type: "string", enum: ["copy", "save", "annotate", "upload", "pin"], description: "Action to perform after capture" },
          },
        },
      },
      {
        name: "cleanshot_self_timer",
        description: "Open CleanShot's Capture Area mode with self-timer",
        inputSchema: {
          type: "object",
          properties: {
            action: { type: "string", enum: ["copy", "save", "annotate", "upload", "pin"], description: "Action to perform after capture" },
          },
        },
      },
      {
        name: "cleanshot_scrolling_capture",
        description: "Open CleanShot's Scrolling Capture mode",
        inputSchema: {
          type: "object",
          properties: {
            x: { type: "number", description: "X coordinate (0,0 is lower left)" },
            y: { type: "number", description: "Y coordinate (0,0 is lower left)" },
            width: { type: "number", description: "Width of the capture area" },
            height: { type: "number", description: "Height of the capture area" },
            display: { type: "number", description: "Display number (1 is main display)" },
            start: { type: "boolean", description: "Automatically start capture" },
            autoscroll: { type: "boolean", description: "Enable auto-scroll mode" },
          },
        },
      },
      {
        name: "cleanshot_pin",
        description: "Open a file as a pinned screenshot",
        inputSchema: {
          type: "object",
          properties: {
            filepath: { type: "string", description: "Path to the PNG/JPEG file to pin" },
          },
        },
      },
      {
        name: "cleanshot_record_screen",
        description: "Open CleanShot's Record Screen mode",
        inputSchema: {
          type: "object",
          properties: {
            x: { type: "number", description: "X coordinate (0,0 is lower left)" },
            y: { type: "number", description: "Y coordinate (0,0 is lower left)" },
            width: { type: "number", description: "Width of the recording area" },
            height: { type: "number", description: "Height of the recording area" },
            display: { type: "number", description: "Display number (1 is main display)" },
          },
        },
      },
      {
        name: "cleanshot_capture_text",
        description: "Open CleanShot's Text Recognition (OCR) tool or extract text from a file",
        inputSchema: {
          type: "object",
          properties: {
            filepath: { type: "string", description: "Path to the image file to extract text from" },
            x: { type: "number", description: "X coordinate (0,0 is lower left)" },
            y: { type: "number", description: "Y coordinate (0,0 is lower left)" },
            width: { type: "number", description: "Width of the capture area" },
            height: { type: "number", description: "Height of the capture area" },
            display: { type: "number", description: "Display number (1 is main display)" },
            linebreaks: { type: "boolean", description: "Keep (true) or remove (false) line breaks from copied text" },
          },
        },
      },
      {
        name: "cleanshot_open_annotate",
        description: "Open a file in CleanShot's Annotate tool",
        inputSchema: {
          type: "object",
          properties: {
            filepath: { type: "string", description: "Path to the PNG/JPEG file to annotate" },
          },
        },
      },
      {
        name: "cleanshot_open_from_clipboard",
        description: "Open the image from clipboard in CleanShot's Annotate tool",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "cleanshot_toggle_desktop_icons",
        description: "Toggle desktop icons visibility",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "cleanshot_hide_desktop_icons",
        description: "Hide desktop icons",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "cleanshot_show_desktop_icons",
        description: "Show desktop icons",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "cleanshot_add_quick_access_overlay",
        description: "Add a file to CleanShot's Quick Access Overlay",
        inputSchema: {
          type: "object",
          properties: {
            filepath: { type: "string", description: "Path to the image or video file (PNG/JPEG/MP4)" },
          },
          required: ["filepath"],
        },
      },
      {
        name: "cleanshot_open_history",
        description: "Open CleanShot's capture history",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "cleanshot_restore_recently_closed",
        description: "Restore the most recently closed file from history",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "cleanshot_open_settings",
        description: "Open CleanShot settings with optional tab",
        inputSchema: {
          type: "object",
          properties: {
            tab: { 
              type: "string", 
              enum: ["general", "wallpaper", "shortcuts", "quickaccess", "recording", "screenshots", "annotate", "cloud", "advanced", "about"],
              description: "Specific settings tab to open" 
            },
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "cleanshot_all_in_one": {
        const params = allInOneSchema.parse(args);
        const url = buildUrl("all-in-one", params);
        await openUrl(url);
        return { content: [{ type: "text", text: `Opened CleanShot All-In-One mode: ${url}` }] };
      }

      case "cleanshot_capture_area": {
        const params = captureAreaSchema.parse(args);
        const url = buildUrl("capture-area", params);
        await openUrl(url);
        return { content: [{ type: "text", text: `Opened CleanShot Capture Area: ${url}` }] };
      }

      case "cleanshot_capture_previous_area": {
        const params = postCaptureActionSchema.parse(args);
        const url = buildUrl("capture-previous-area", params);
        await openUrl(url);
        return { content: [{ type: "text", text: `Repeated last screenshot: ${url}` }] };
      }

      case "cleanshot_capture_fullscreen": {
        const params = postCaptureActionSchema.parse(args);
        const url = buildUrl("capture-fullscreen", params);
        await openUrl(url);
        return { content: [{ type: "text", text: `Took fullscreen screenshot: ${url}` }] };
      }

      case "cleanshot_capture_window": {
        const params = postCaptureActionSchema.parse(args);
        const url = buildUrl("capture-window", params);
        await openUrl(url);
        return { content: [{ type: "text", text: `Opened CleanShot Capture Window: ${url}` }] };
      }

      case "cleanshot_self_timer": {
        const params = postCaptureActionSchema.parse(args);
        const url = buildUrl("self-timer", params);
        await openUrl(url);
        return { content: [{ type: "text", text: `Opened CleanShot Self-Timer: ${url}` }] };
      }

      case "cleanshot_scrolling_capture": {
        const params = scrollingCaptureSchema.parse(args);
        const url = buildUrl("scrolling-capture", params);
        await openUrl(url);
        return { content: [{ type: "text", text: `Opened CleanShot Scrolling Capture: ${url}` }] };
      }

      case "cleanshot_pin": {
        const params = filePathSchema.parse(args);
        const url = buildUrl("pin", params);
        await openUrl(url);
        return { content: [{ type: "text", text: `Pinned screenshot: ${url}` }] };
      }

      case "cleanshot_record_screen": {
        const params = recordScreenSchema.parse(args);
        const url = buildUrl("record-screen", params);
        await openUrl(url);
        return { content: [{ type: "text", text: `Opened CleanShot Record Screen: ${url}` }] };
      }

      case "cleanshot_capture_text": {
        const params = captureTextSchema.parse(args);
        const url = buildUrl("capture-text", params);
        await openUrl(url);
        return { content: [{ type: "text", text: `Opened CleanShot Text Recognition: ${url}` }] };
      }

      case "cleanshot_open_annotate": {
        const params = filePathSchema.parse(args);
        const url = buildUrl("open-annotate", params);
        await openUrl(url);
        return { content: [{ type: "text", text: `Opened CleanShot Annotate: ${url}` }] };
      }

      case "cleanshot_open_from_clipboard": {
        const url = buildUrl("open-from-clipboard");
        await openUrl(url);
        return { content: [{ type: "text", text: `Opened CleanShot Annotate from clipboard: ${url}` }] };
      }

      case "cleanshot_toggle_desktop_icons": {
        const url = buildUrl("toggle-desktop-icons");
        await openUrl(url);
        return { content: [{ type: "text", text: `Toggled desktop icons: ${url}` }] };
      }

      case "cleanshot_hide_desktop_icons": {
        const url = buildUrl("hide-desktop-icons");
        await openUrl(url);
        return { content: [{ type: "text", text: `Hidden desktop icons: ${url}` }] };
      }

      case "cleanshot_show_desktop_icons": {
        const url = buildUrl("show-desktop-icons");
        await openUrl(url);
        return { content: [{ type: "text", text: `Shown desktop icons: ${url}` }] };
      }

      case "cleanshot_add_quick_access_overlay": {
        const params = requiredFilePathSchema.parse(args);
        const url = buildUrl("add-quick-access-overlay", params);
        await openUrl(url);
        return { content: [{ type: "text", text: `Added Quick Access Overlay: ${url}` }] };
      }

      case "cleanshot_open_history": {
        const url = buildUrl("open-history");
        await openUrl(url);
        return { content: [{ type: "text", text: `Opened CleanShot history: ${url}` }] };
      }

      case "cleanshot_restore_recently_closed": {
        const url = buildUrl("restore-recently-closed");
        await openUrl(url);
        return { content: [{ type: "text", text: `Restored recently closed file: ${url}` }] };
      }

      case "cleanshot_open_settings": {
        const params = settingsSchema.parse(args);
        const url = buildUrl("open-settings", params);
        await openUrl(url);
        return { content: [{ type: "text", text: `Opened CleanShot settings: ${url}` }] };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("CleanShot MCP server running on stdio");
}

main().catch(console.error);
