// This file is loaded by the script in page.tsx
console.log("Initializing client app...")

// Create a function to safely check if localStorage is available
function isLocalStorageAvailable() {
  try {
    const test = "test"
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

// Create a function to safely get from localStorage
function safeGetFromLocalStorage(key, defaultValue) {
  if (!isLocalStorageAvailable()) return defaultValue
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (e) {
    console.error("Error getting from localStorage:", e)
    return defaultValue
  }
}

// Create a function to safely set to localStorage
function safeSetToLocalStorage(key, value) {
  if (!isLocalStorageAvailable()) return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error("Error setting to localStorage:", e)
  }
}

// Initialize the app
function initApp() {
  // Get the app root element
  const appRoot = document.getElementById("app-root")
  if (!appRoot) {
    console.error("App root element not found")
    return
  }

  // Clear the app root
  appRoot.innerHTML = ""

  // Create the app container
  const appContainer = document.createElement("div")
  appContainer.className = "min-h-screen bg-[#0f1117] text-white"
  appRoot.appendChild(appContainer)

  // Create the header
  const header = document.createElement("header")
  header.className = "border-b border-[#1c1f26]/50 py-4 px-6 sticky top-0 z-10 backdrop-blur-lg bg-[#0f1117]/80"
  header.innerHTML = `
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-4 group">
        <div class="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/10">
          <img src="/images/logo.png" alt="RowdyRaedon Logo" width="36" height="36" class="object-cover" />
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-semibold tracking-tight">CopyCoder</span>
          <span class="text-[10px] text-blue-400/80">by RowdyRaedon</span>
        </div>
      </div>
      <div class="flex items-center gap-6">
        <button id="theme-toggle" class="p-2 rounded-full hover:bg-white/5 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="M4.93 4.93l1.41 1.41"></path>
            <path d="M17.66 17.66l1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="M6.34 17.66l-1.41 1.41"></path>
            <path d="M19.07 4.93l-1.41 1.41"></path>
          </svg>
        </button>
        <button id="login-button" class="bg-blue-600 hover:bg-blue-500 rounded-full px-5 py-2 text-sm font-medium">
          Login
        </button>
      </div>
    </div>
  `
  appContainer.appendChild(header)

  // Create the main content
  const main = document.createElement("main")
  main.className = "max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8"
  main.innerHTML = `
    <div class="text-center">
      <h1 class="text-3xl font-bold text-white mb-6">Welcome to CopyCoder</h1>
      <p class="text-gray-300 max-w-2xl mx-auto">
        CopyCoder is an AI-powered tool that generates detailed UI implementation specifications from your design mockups.
        Upload your designs and get comprehensive code specifications instantly.
      </p>
      <div class="mt-8">
        <button id="start-button" class="bg-gradient-to-r from-blue-600/90 to-blue-500/90 hover:from-blue-500 hover:to-blue-400 text-white py-3 px-8 rounded-xl text-lg font-medium transition-all duration-300 shadow-lg">
          Get Started
        </button>
      </div>
    </div>
  `
  appContainer.appendChild(main)

  // Create the footer
  const footer = document.createElement("footer")
  footer.className = "mt-12 py-8 border-t border-[#1c1f26]/50"
  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-3">
          <div class="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-white/10">
            <img src="/images/logo.png" alt="RowdyRaedon Logo" width="28" height="28" class="object-cover" />
          </div>
          <p class="text-sm text-gray-500">© ${new Date().getFullYear()} CopyCoder by RowdyRaedon</p>
        </div>
        <div class="flex gap-8">
          <a href="#" class="text-sm text-gray-500 hover:text-gray-300 transition-colors">Terms</a>
          <a href="#" class="text-sm text-gray-500 hover:text-gray-300 transition-colors">Privacy</a>
          <a href="https://rowdyshop.net" target="_blank" rel="noopener noreferrer" class="text-sm text-blue-400/80 hover:text-blue-400 transition-colors">RowdyShop.net</a>
        </div>
      </div>
    </div>
  `
  appContainer.appendChild(footer)

  // Add event listeners
  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
      document.documentElement.style.colorScheme = "light"
      safeSetToLocalStorage("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      document.documentElement.style.colorScheme = "dark"
      safeSetToLocalStorage("theme", "dark")
    }
  })

  document.getElementById("login-button")?.addEventListener("click", () => {
    alert("Login functionality will be implemented in the full version.")
  })

  document.getElementById("start-button")?.addEventListener("click", () => {
    alert("Full functionality will be available in the complete version.")
  })

  // Apply theme from localStorage
  const savedTheme = safeGetFromLocalStorage("theme", "dark")
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark")
    document.documentElement.style.colorScheme = "dark"
  } else {
    document.documentElement.classList.remove("dark")
    document.documentElement.style.colorScheme = "light"
  }

  // Check URL parameters
  const urlParams = new URLSearchParams(window.location.search)
  const error = urlParams.get("error")
  const login = urlParams.get("login")

  if (error) {
    showToast("Authentication Error", decodeURIComponent(error), "error")
  }

  if (login === "success") {
    showToast("Login Successful", "You have been logged in successfully.", "success")
  }

  // Clear URL parameters after reading them
  if (error || login) {
    window.history.replaceState({}, document.title, window.location.pathname)
  }
}

// Simple toast function
function showToast(title, message, type = "info") {
  const toast = document.createElement("div")
  toast.className = `fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center ${
    type === "error"
      ? "bg-red-900/90 text-white"
      : type === "success"
        ? "bg-green-900/90 text-white"
        : "bg-blue-900/90 text-white"
  }`

  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
      ${
        type === "error"
          ? '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'
          : type === "success"
            ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
            : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'
      }
    </svg>
    <div>
      <div class="font-medium">${title}</div>
      <div class="text-sm">${message}</div>
    </div>
  `

  document.body.appendChild(toast)

  // Remove toast after 5 seconds
  setTimeout(() => {
    toast.style.opacity = "0"
    toast.style.transition = "opacity 0.5s ease-out"
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 500)
  }, 5000)
}

// Initialize the app when the DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp)
} else {
  initApp()
}
