"use client"
import { LogOut, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { authService, type User as UserType } from "@/lib/auth-service"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserProfileProps {
  user: UserType
  onLogout: () => void
}

export function UserProfile({ user, onLogout }: UserProfileProps) {
  const handleLogout = () => {
    authService.logout()
    onLogout()
  }

  // Get first part of email for display
  const displayName = user.email.split("@")[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
          <div className="h-8 w-8 rounded-full bg-blue-600/30 flex items-center justify-center">
            <User className="h-4 w-4 text-blue-400" />
          </div>
          <span className="hidden sm:inline">{displayName}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-[#1c1f26] border-[#2a2f3a]/70">
        <DropdownMenuLabel className="text-gray-400">My Account</DropdownMenuLabel>
        <DropdownMenuItem className="text-gray-300 focus:bg-blue-600/20 focus:text-white cursor-default">
          {user.email}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[#2a2f3a]/50" />
        <DropdownMenuItem className="text-gray-300 focus:bg-blue-600/20 focus:text-white cursor-pointer">
          Profile Settings
        </DropdownMenuItem>
        {user.role === "admin" && (
          <DropdownMenuItem className="text-gray-300 focus:bg-blue-600/20 focus:text-white cursor-pointer">
            Admin Dashboard
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator className="bg-[#2a2f3a]/50" />
        <DropdownMenuItem
          className="text-red-400 focus:bg-red-600/20 focus:text-red-300 cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
