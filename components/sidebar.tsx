"use client"
import Link from "next/link"
import Image from "next/image"
import {
  Home,
  Settings,
  Code,
  ImageIcon,
  FileText,
  ChevronLeft,
  ChevronRight,
  Github,
  Moon,
  Sun,
  PlusCircle,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarProps {
  isDarkMode: boolean
  toggleTheme: () => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  onAddPictures: () => void
  onProjectInfo: () => void
  activeSection: string
  setActiveSection: (section: string) => void
}

export function Sidebar({
  isDarkMode,
  toggleTheme,
  collapsed,
  setCollapsed,
  onAddPictures,
  onProjectInfo,
  activeSection,
  setActiveSection,
}: SidebarProps) {
  const navItems = [
    {
      name: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      action: () => setActiveSection("dashboard"),
      id: "dashboard",
    },
    {
      name: "Generator",
      icon: <Code className="h-5 w-5" />,
      action: () => setActiveSection("generator"),
      id: "generator",
    },
    { name: "Add Pictures", icon: <PlusCircle className="h-5 w-5" />, action: onAddPictures, id: "add-pictures" },
    { name: "Project Info", icon: <Info className="h-5 w-5" />, action: onProjectInfo, id: "project-info" },
    { name: "Images", icon: <ImageIcon className="h-5 w-5" />, action: () => setActiveSection("images"), id: "images" },
    {
      name: "Prompts",
      icon: <FileText className="h-5 w-5" />,
      action: () => setActiveSection("prompts"),
      id: "prompts",
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      action: () => setActiveSection("settings"),
      id: "settings",
    },
  ]

  return (
    <motion.div
      className={cn(
        "h-screen fixed left-0 top-0 z-30 flex flex-col border-r border-[#1c1f26]/50 bg-[#0f1117]/95 backdrop-blur-sm transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[240px]",
      )}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo section */}
      <div className="flex items-center p-4 h-[72px] border-b border-[#1c1f26]/50">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
            <Image src="/images/logo.png" alt="RowdyRaedon Logo" width={36} height={36} className="object-cover" />
          </div>
          {!collapsed && (
            <div className="flex flex-col transition-all duration-200">
              <span className="text-lg font-semibold tracking-tight">CopyCoder</span>
              <span className="text-[10px] text-blue-400/80">by RowdyRaedon</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6">
        <TooltipProvider delayDuration={0}>
          <nav className="flex flex-col gap-2 px-2">
            {navItems.map((item) => (
              <Tooltip key={item.name} delayDuration={collapsed ? 0 : 999999}>
                <TooltipTrigger asChild>
                  <button
                    onClick={item.action}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 group w-full text-left",
                      activeSection === item.id
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-gray-400 hover:bg-[#1c1f26]/50 hover:text-gray-100",
                    )}
                  >
                    <div className={cn("flex-shrink-0 transition-all", activeSection === item.id && "text-blue-400")}>
                      {item.icon}
                    </div>
                    {!collapsed && <span className="truncate">{item.name}</span>}
                  </button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="bg-[#1c1f26] border-[#2a2f3a]/50 text-white">
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </nav>
        </TooltipProvider>
      </div>

      {/* Footer actions */}
      <div
        className={cn("border-t border-[#1c1f26]/50 p-4", collapsed ? "flex flex-col items-center gap-4" : "space-y-4")}
      >
        <TooltipProvider delayDuration={0}>
          {/* Theme toggle */}
          <Tooltip delayDuration={collapsed ? 0 : 999999}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className={cn(
                  "w-full justify-start gap-3 text-gray-400 hover:bg-[#1c1f26]/50 hover:text-gray-100",
                  collapsed && "justify-center px-0",
                )}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                {!collapsed && <span>Toggle theme</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" className="bg-[#1c1f26] border-[#2a2f3a]/50 text-white">
                Toggle theme
              </TooltipContent>
            )}
          </Tooltip>

          {/* GitHub link */}
          <Tooltip delayDuration={collapsed ? 0 : 999999}>
            <TooltipTrigger asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex h-9 items-center rounded-md px-3 text-gray-400 hover:bg-[#1c1f26]/50 hover:text-gray-100 transition-all",
                  collapsed && "justify-center px-0",
                )}
              >
                <Github className="h-5 w-5" />
                {!collapsed && <span className="ml-3">GitHub</span>}
              </a>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" className="bg-[#1c1f26] border-[#2a2f3a]/50 text-white">
                GitHub
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        {/* Collapse button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full justify-start gap-3 text-gray-400 hover:bg-[#1c1f26]/50 hover:text-gray-100",
            collapsed && "justify-center px-0",
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </motion.div>
  )
}
