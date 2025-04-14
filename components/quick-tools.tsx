"use client"

import { ExternalLink, Zap, FlaskRound, Bot, Rocket, Palette } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"

// Quick tools data
const quickTools = [
  {
    id: "1",
    name: "Bolt",
    description: "Build full-stack web apps",
    icon: <Zap className="h-3.5 w-3.5 text-black" />,
    iconBg: "bg-yellow-500",
    cardBg: "bg-black",
    url: "https://bolt.new/",
  },
  {
    id: "2",
    name: "v0.dev",
    description: "Design and build UI visually",
    icon: <FlaskRound className="h-3.5 w-3.5 text-purple-900" />,
    iconBg: "bg-purple-400",
    cardBg: "bg-purple-900/90",
    url: "https://v0.dev/",
  },
  {
    id: "3",
    name: "Cursor",
    description: "AI-powered code editor",
    icon: <Bot className="h-3.5 w-3.5 text-blue-900" />,
    iconBg: "bg-blue-400",
    cardBg: "bg-blue-900/90",
    url: "https://www.cursor.com/",
  },
  {
    id: "4",
    name: "Vercel",
    description: "Deploy your projects",
    icon: <Rocket className="h-3.5 w-3.5 text-green-900" />,
    iconBg: "bg-green-400",
    cardBg: "bg-green-900/90",
    url: "https://vercel.com",
  },
  {
    id: "5",
    name: "Framer",
    description: "Design and build websites",
    icon: <Palette className="h-3.5 w-3.5 text-orange-900" />,
    iconBg: "bg-orange-400",
    cardBg: "bg-orange-900/90",
    url: "https://framer.com",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
}

export function QuickTools() {
  return (
    <div className="bg-gradient-to-b from-[#1c1f26]/80 to-[#1c1f26] rounded-2xl border border-[#2a2f3a]/50 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-200">Quick Access Tools</h3>
        <span className="text-xs text-gray-500">External resources</span>
      </div>

      <TooltipProvider>
        <motion.div className="flex flex-wrap gap-2" variants={container} initial="hidden" animate="show">
          {quickTools.map((tool) => (
            <Tooltip key={tool.id}>
              <TooltipTrigger asChild>
                <motion.a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${tool.cardBg} flex items-center gap-2 py-1.5 px-3 rounded-full border border-white/5 hover:scale-105 transition-all duration-200`}
                  variants={item}
                >
                  <div className={`${tool.iconBg} rounded-full p-1.5 flex items-center justify-center`}>
                    {tool.icon}
                  </div>
                  <span className="text-xs font-medium">{tool.name}</span>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </motion.a>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">{tool.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </motion.div>
      </TooltipProvider>
    </div>
  )
}
