"use client";

import React from "react";
// import { Dock, DockIcon } from "@/components/spectrumui/dock";
import { Dock, DockIcon } from "@/app/registry/spectrumui/dock";
import {
  Home,
  User,
  Code2,
  FolderGit2,
  BookOpen,
  MessageSquare,
  Settings,
} from "lucide-react";

export default function DockGlassDemo() {
  const links = [
    { icon: <Home className="h-full w-full" />, label: "Home" },
    { icon: <User className="h-full w-full" />, label: "Profile" },
    { icon: <Code2 className="h-full w-full" />, label: "Projects" },
    { icon: <FolderGit2 className="h-full w-full" />, label: "Repositories" },
    { icon: <BookOpen className="h-full w-full" />, label: "Blog" },
    { icon: <MessageSquare className="h-full w-full" />, label: "Contact" },
    { icon: <Settings className="h-full w-full" />, label: "Settings" },
  ];

  return (
    <div className="flex w-full items-center justify-center py-8">
      <Dock variant="glass">
        {links.map((link, idx) => (
          <DockIcon key={idx} label={link.label}>
            {link.icon}
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}
