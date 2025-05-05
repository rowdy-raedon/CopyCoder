"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Moon, Sun, Laptop } from "lucide-react"

interface SettingsSectionProps {
  isDarkMode: boolean
  toggleTheme: () => void
}

export function SettingsSection({ isDarkMode, toggleTheme }: SettingsSectionProps) {
  const [autoSave, setAutoSave] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [telemetry, setTelemetry] = useState(false)
  const [apiKey, setApiKey] = useState("••••••••••••••••••••••••••••••")
  const [language, setLanguage] = useState("english")
  const [maxTokens, setMaxTokens] = useState([2048])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="bg-[#1c1f26]/50 rounded-xl border border-[#2a2f3a]/50 overflow-hidden">
        <Tabs defaultValue="general" className="w-full">
          <div className="border-b border-[#2a2f3a]/50 px-6 py-3">
            <TabsList className="bg-[#0f1117]/50 grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="general" className="space-y-6 mt-0">
              <div>
                <h3 className="text-lg font-medium mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto-save prompts</Label>
                      <p className="text-sm text-gray-400">Automatically save generated prompts</p>
                    </div>
                    <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Notifications</Label>
                      <p className="text-sm text-gray-400">Receive notifications for completed tasks</p>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-base">Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-[180px] bg-[#0f1117]/70 border-[#2a2f3a]/50">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1c1f26] border-[#2a2f3a]/50">
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                          <SelectItem value="japanese">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6 mt-0">
              <div>
                <h3 className="text-lg font-medium mb-4">Appearance</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-base">Theme</Label>
                    <div className="flex gap-4">
                      <Button
                        variant={isDarkMode ? "default" : "outline"}
                        className={`flex-1 gap-2 ${isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                        onClick={!isDarkMode ? toggleTheme : undefined}
                      >
                        <Moon className="h-4 w-4" />
                        Dark
                      </Button>
                      <Button
                        variant={!isDarkMode ? "default" : "outline"}
                        className={`flex-1 gap-2 ${!isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                        onClick={isDarkMode ? toggleTheme : undefined}
                      >
                        <Sun className="h-4 w-4" />
                        Light
                      </Button>
                      <Button variant="outline" className="flex-1 gap-2">
                        <Laptop className="h-4 w-4" />
                        System
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-base">Accent Color</Label>
                      <div className="flex gap-2">
                        <Button size="icon" className="h-6 w-6 rounded-full bg-blue-500 hover:bg-blue-600">
                          <span className="sr-only">Blue</span>
                        </Button>
                        <Button size="icon" className="h-6 w-6 rounded-full bg-purple-500 hover:bg-purple-600">
                          <span className="sr-only">Purple</span>
                        </Button>
                        <Button size="icon" className="h-6 w-6 rounded-full bg-green-500 hover:bg-green-600">
                          <span className="sr-only">Green</span>
                        </Button>
                        <Button size="icon" className="h-6 w-6 rounded-full bg-orange-500 hover:bg-orange-600">
                          <span className="sr-only">Orange</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="api" className="space-y-6 mt-0">
              <div>
                <h3 className="text-lg font-medium mb-4">API Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base">API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="bg-[#0f1117]/70 border-[#2a2f3a]/50"
                      />
                      <Button variant="outline">Reveal</Button>
                    </div>
                    <p className="text-xs text-gray-400">Your API key is stored locally and never shared</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-base">Max Tokens</Label>
                      <span className="text-sm text-gray-400">{maxTokens[0]}</span>
                    </div>
                    <Slider
                      value={maxTokens}
                      min={256}
                      max={4096}
                      step={256}
                      onValueChange={setMaxTokens}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>256</span>
                      <span>4096</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6 mt-0">
              <div>
                <h3 className="text-lg font-medium mb-4">Privacy & Security</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Usage Telemetry</Label>
                      <p className="text-sm text-gray-400">Send anonymous usage data to help improve the app</p>
                    </div>
                    <Switch checked={telemetry} onCheckedChange={setTelemetry} />
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      Clear all data and reset
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  )
}
