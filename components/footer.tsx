"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      className="mt-12 py-8 border-t border-[#1c1f26]/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-white/10">
              <Image src="/images/logo.png" alt="RowdyRaedon Logo" width={28} height={28} className="object-cover" />
            </div>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} CopyCoder by RowdyRaedon</p>
          </div>
          <div className="flex gap-8">
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              Privacy
            </Link>
            <a
              href="https://rowdyshop.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400/80 hover:text-blue-400 transition-colors"
            >
              RowdyShop.net
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
