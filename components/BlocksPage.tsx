"use client";

import * as React from "react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Clipboard,
  File,
  Folder,
  FolderOpen,
  icons,
} from "lucide-react";
import { codeToHtml } from "shiki";
import { cn } from "@/lib/utils";
import { Button } from "@/components/UI/Button";
import { Card } from "@/components/UI/Card";
import { ScrollArea } from "@/components/UI/ScrollArea";
import { Monitor, Tablet, Smartphone, Printer, Move } from "lucide-react";

interface FileNode {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: string;
  language?: string;
}

interface BlocksPageProps {
  title?: string;
  previewComponent: React.ReactNode;
  files: FileNode[];
  defaultFile?: string;
  theme?: "dark" | "light";
  shikiTheme?: string;
}

type DeviceType = "desktop" | "tablet" | "mobile" | "print" | "resizable";

export function BlocksPage({
  title = "Component Preview",
  previewComponent,
  files,
  defaultFile,
  theme = "dark",
  shikiTheme = "github-dark",
}: BlocksPageProps) {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">(
    "preview"
  );
  const [selectedFile, setSelectedFile] = React.useState<string>(
    defaultFile || files.find((f) => f.type === "file")?.path || ""
  );
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(
    new Set(["app", "components"])
  );
  const [highlightedCode, setHighlightedCode] = React.useState<string>("");
  const [selectedDevice, setSelectedDevice] =
    React.useState<DeviceType>("desktop");
  const [customWidth, setCustomWidth] = React.useState(1200);
  const [customHeight, setCustomHeight] = React.useState(800);
  const [isResizing, setIsResizing] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const findFileByPath = (nodes: FileNode[], path: string): FileNode | null => {
    for (const node of nodes) {
      if (node.path === path) return node;
      if (node.children) {
        const found = findFileByPath(node.children, path);
        if (found) return found;
      }
    }
    return null;
  };

  const getFileExtension = (filename: string): string => {
    return filename.split(".").pop() || "";
  };

  const getLanguageFromExtension = (ext: string): string => {
    const langMap: Record<string, string> = {
      tsx: "tsx",
      ts: "typescript",
      jsx: "jsx",
      js: "javascript",
      css: "css",
      scss: "scss",
      json: "json",
      md: "markdown",
      mdx: "mdx",
      html: "html",
      xml: "xml",
      yml: "yaml",
      yaml: "yaml",
    };
    return langMap[ext] || "text";
  };

  const getDeviceStyles = (device: DeviceType) => {
    switch (device) {
      case "desktop":
        return "w-full h-[600px]";
      case "tablet":
        return "w-[768px] h-[1024px] mx-auto border rounded-lg shadow-lg";
      case "mobile":
        return "w-[375px] h-[667px] mx-auto border rounded-lg shadow-lg";
      case "print":
        return "w-[8.5in] h-[11in] mx-auto border rounded-lg shadow-lg bg-white";
      case "resizable":
        return `mx-auto border rounded-lg shadow-lg`;
      default:
        return "w-full h-[600px]";
    }
  };

  const getDeviceIcon = (device: DeviceType) => {
    switch (device) {
      case "desktop":
        return Monitor;
      case "tablet":
        return Tablet;
      case "mobile":
        return Smartphone;
      case "print":
        return Printer;
      case "resizable":
        return Move;
      default:
        return Monitor;
    }
  };

  // Handle mouse resize for resizable mode
  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedDevice !== "resizable") return;

    setIsResizing(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = customWidth;
    const startHeight = customHeight;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      setCustomWidth(Math.max(200, startWidth + deltaX));
      setCustomHeight(Math.max(200, startHeight + deltaY));
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  React.useEffect(() => {
    const highlightCode = async () => {
      const file = findFileByPath(files, selectedFile);
      if (!file || !file.content) {
        setHighlightedCode("");
        return;
      }

      try {
        const ext = getFileExtension(file.name);
        const language = file.language || getLanguageFromExtension(ext);

        const html = await codeToHtml(file.content, {
          lang: language,
          theme: shikiTheme,
          transformers: [
            {
              pre(node) {
                node.properties.style =
                  "background: transparent; padding: 0; margin: 0;";
              },
            },
          ],
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlightedCode(`<pre><code>${file.content}</code></pre>`);
      }
    };

    if (activeTab === "code" && selectedFile) {
      highlightCode();
    }
  }, [selectedFile, activeTab, files, shikiTheme]);

  const renderFileTree = (nodes: FileNode[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.path}>
        <div
          className={cn(
            "flex items-center gap-1 px-2 py-2 text-sm cursor-pointer hover:bg-muted/50 rounded-sm",
            selectedFile === node.path && "bg-muted",
            level > 0 && "ml-4"
          )}
          style={{ paddingLeft: `${8 + level * 16}px` }}
          onClick={() => {
            if (node.type === "folder") {
              toggleFolder(node.path);
            } else {
              setSelectedFile(node.path);
            }
          }}
        >
          {node.type === "folder" ? (
            <>
              {expandedFolders.has(node.path) ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              {expandedFolders.has(node.path) ? (
                <FolderOpen className="h-4 w-4 text-blue-500" />
              ) : (
                <Folder className="h-4 w-4 text-blue-500" />
              )}
            </>
          ) : (
            <>
              <div className="w-4" />
              <File className="h-4 w-4 text-muted-foreground" />
            </>
          )}
          <span className="truncate">{node.name}</span>
        </div>
        {node.type === "folder" &&
          expandedFolders.has(node.path) &&
          node.children &&
          renderFileTree(node.children, level + 1)}
      </div>
    ));
  };

  const selectedFileNode = findFileByPath(files, selectedFile);

  return (
    <div className={cn("w-full h-full", theme === "dark" ? "dark" : "")}>
      <Card className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Button
                variant={activeTab === "preview" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("preview")}
              >
                Preview
              </Button>
              <Button
                variant={activeTab === "code" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("code")}
              >
                Code
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">{title}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex min-h-0">
          {activeTab === "preview" ? (
            <div className="flex-1 overflow-hidden bg-muted/20">
              <div className="p-6 min-h-full flex items-center justify-center">
                <div
                  className={cn(
                    "transition-all duration-300 ease-in-out relative",
                    getDeviceStyles(selectedDevice),
                    selectedDevice === "resizable" &&
                      "resize-both overflow-auto min-w-[200px] min-h-[200px]"
                  )}
                  style={
                    selectedDevice === "resizable"
                      ? {
                          width: `${customWidth}px`,
                          height: `${customHeight}px`,
                        }
                      : undefined
                  }
                >
                  <div className="w-full h-full overflow-hidden bg-background rounded-lg relative">
                    {/* Preview container with device-specific classes */}
                    <div className="absolute inset-0 overflow-auto">
                      <div
                        className={cn(
                          "w-full h-full relative",
                          selectedDevice === "mobile" && "device-mobile",
                          selectedDevice === "tablet" && "device-tablet",
                          selectedDevice === "resizable" && "device-resizable"
                        )}
                        style={{
                          transform: "translateZ(0)",
                          isolation: "isolate",
                        }}
                      >
                        {previewComponent}
                      </div>
                    </div>

                    {/* Resize handle for resizable mode */}
                    {selectedDevice === "resizable" && (
                      <div
                        className={cn(
                          "absolute bottom-0 right-0 w-4 h-4 cursor-se-resize",
                          "bg-muted border-l border-t border-border",
                          "hover:bg-muted-foreground/20 transition-colors",
                          isResizing && "bg-muted-foreground/30"
                        )}
                        onMouseDown={handleMouseDown}
                        style={{
                          background: `linear-gradient(-45deg, transparent 30%, currentColor 30%, currentColor 40%, transparent 40%, transparent 60%, currentColor 60%, currentColor 70%, transparent 70%)`,
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* File Sidebar */}
              <div className="w-80 border-r bg-muted/20">
                <div className="p-3 border-b">
                  <h3 className="text-sm font-medium">Files</h3>
                </div>
                <ScrollArea className="h-full">
                  <div className="p-2">{renderFileTree(files)}</div>
                </ScrollArea>
              </div>

              {/* Code Editor */}
              <div className="flex-1 flex flex-col max-h-[700px] overflow-auto">
                {selectedFileNode && (
                  <div className="flex justify-between items-center gap-2 px-4 py-2 border-b bg-muted/20">
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {selectedFileNode.path}
                      </span>
                    </div>

                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => {
                        if (selectedFileNode?.content) {
                          navigator.clipboard.writeText(
                            selectedFileNode.content
                          );
                          setCopied(true);
                          setTimeout(() => setCopied(false), 1000); // 1 second delay
                        }
                      }}
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Clipboard className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                )}
                <ScrollArea className="flex-1">
                  <div className="p-4">
                    {highlightedCode ? (
                      <div
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                      />
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Select a file to view its contents
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
