"use client"

import { QuickTools } from "@/components/quick-tools"
import { motion } from "framer-motion"

export function QuickToolsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="bg-[#1c1f26]/50 rounded-xl p-6 border border-[#2a2f3a]/50">
        <h2 className="text-xl font-bold mb-4">Quick Access Tools</h2>
        <p className="text-gray-400 mb-6">
          Access these external tools to enhance your development workflow. Click on any tool to open it in a new tab.
        </p>

        <QuickTools />

        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
          <h3 className="text-sm font-medium text-blue-400 mb-2">Pro Tip</h3>
          <p className="text-sm text-gray-300">
            Use these tools in combination with CopyCoder to streamline your development process. Generate UI code with
            v0.dev, build backend functionality with Bolt, and deploy your projects with Vercel.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
