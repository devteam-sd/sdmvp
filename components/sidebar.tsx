// components/Sidebar.tsx
"use client";
import React, { useState } from "react";
import { Computer, ShieldAlert, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Function to toggle the sidebar's state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`flex flex-col bg-primary p-4 text-primary-foreground transition-all duration-700 h-screen ${
        isCollapsed ? "w-20" : "w-64"
      }`}
      style={{ borderTopRightRadius: "0.75rem" }} // Adding rounded top right corner
    >
      {/* Header with Logo and Toggle Button */}
      <div
        className={`mb-8 flex ${
          isCollapsed ? "flex-col items-center" : "items-center justify-between"
        }`}
      >
        {/* Logo and App Name */}
        <div className="flex items-center justify-center w-full">
          {/* App Logo */}
          <div className="flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0">
            <Link href="/">
              <Image
                src="/icon.png" // Replace with your image source
                alt="Logo"
                width={50}
                height={50}
                className="invert"
              />
            </Link>
          </div>
          {/* App Name */}
          {!isCollapsed && (
            <span className="ml-2 text-lg font-bold text-primary-foreground">
              SD MVP
            </span>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`p-2 mt-2 text-gray-400 hover:text-primary-foreground transition-transform duration-300 ${
            isCollapsed ? "" : "ml-auto"
          }`}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-1 flex-col gap-4">
        {/* Section Header: ANALYTICS */}
        {!isCollapsed && (
          <div className="p-2 text-xs font-semibold text-gray-500">
            ENDPOINT DETECTION AND RESPONSE
          </div>
        )}
        <a
          href="/endpoints"
          className={`flex items-center gap-3 p-2 text-gray-400 hover:bg-gray-800 hover:text-primary-foreground rounded-md ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <Computer className="h-5 w-5" />
          {!isCollapsed && <span className="font-medium">Endpoints</span>}
        </a>

        <a
          href="/threats"
          className={`flex items-center gap-3 p-2 text-gray-400 hover:bg-gray-800 hover:text-primary-foreground rounded-md ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <ShieldAlert className="h-5 w-5" />
          {!isCollapsed && <span className="font-medium">Threats</span>}
        </a>
        {/* Add more links here as needed */}
      </nav>
    </aside>
  );
};

export default SideBar;
