// This file is loaded by the script in index.js
console.log("Initializing client app...")

// Global state for loaders
const loaderState = {
  isLoading: false,
  progressValue: 0,
  progressInterval: null,
  currentMessage: "Loading...",
  currentSubMessage: "Please wait while we prepare your experience",
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

  // Add progress bar
  const progressBar = document.createElement("div")
  progressBar.className = "progress-bar"
  progressBar.setAttribute("role", "progressbar")
  progressBar.setAttribute("aria-valuenow", "0")
  progressBar.setAttribute("aria-valuemin", "0")
  progressBar.setAttribute("aria-valuemax", "100")
  document.body.appendChild(progressBar)

  // Create the header
  const header = document.createElement("header")
  header.className = "border-b border-[#1c1f26]/50 py-4 px-6 sticky top-0 z-10 backdrop-blur-lg bg-[#0f1117]/80"
  header.innerHTML = `
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-4 group">
        <div class="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/10">
          <div class="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold">C</div>
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
            <div class="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold">C</div>
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

  // Create the loader container
  createLoaderElements()

  // Add event listeners with optimized performance
  addOptimizedEventListeners()

  // Simulate initial loading completion
  simulateInitialLoading()
}

// Create loader elements
function createLoaderElements() {
  // Create full-screen loader
  const loaderContainer = document.createElement("div")
  loaderContainer.className = "loader-container"
  loaderContainer.setAttribute("role", "alert")
  loaderContainer.setAttribute("aria-live", "polite")
  loaderContainer.innerHTML = `
    <div class="loader">
      <div class="loader-circle"></div>
      <div class="loader-circle"></div>
      <div class="loader-circle"></div>
    </div>
    <div class="loader-text" id="loader-text">Loading...</div>
    <div class="loader-subtext" id="loader-subtext">Please wait while we prepare your experience</div>
  `
  document.body.appendChild(loaderContainer)
}

// Show the loader with custom messages
function showLoader(message = "Loading...", subMessage = "Please wait while we prepare your experience") {
  const loaderContainer = document.querySelector(".loader-container")
  const loaderText = document.getElementById("loader-text")
  const loaderSubtext = document.getElementById("loader-subtext")

  if (loaderContainer && loaderText && loaderSubtext) {
    loaderState.isLoading = true
    loaderState.currentMessage = message
    loaderState.currentSubMessage = subMessage

    loaderText.textContent = message
    loaderSubtext.textContent = subMessage
    loaderContainer.classList.add("active")

    // Start progress bar animation
    startProgressBar()
  }
}

// Hide the loader
function hideLoader() {
  const loaderContainer = document.querySelector(".loader-container")

  if (loaderContainer) {
    loaderState.isLoading = false
    loaderContainer.classList.remove("active")

    // Complete progress bar
    completeProgressBar()
  }
}

// Start progress bar animation
function startProgressBar() {
  const progressBar = document.querySelector(".progress-bar")
  if (!progressBar) return

  // Reset progress
  loaderState.progressValue = 0
  progressBar.style.width = "0%"
  progressBar.setAttribute("aria-valuenow", "0")

  // Clear any existing interval
  if (loaderState.progressInterval) {
    clearInterval(loaderState.progressInterval)
  }

  // Start new interval
  loaderState.progressInterval = setInterval(() => {
    // Increment progress, but slow down as it approaches 90%
    const increment = loaderState.progressValue < 50 ? 5 : loaderState.progressValue < 80 ? 2 : 0.5

    loaderState.progressValue = Math.min(loaderState.progressValue + increment, 90)
    progressBar.style.width = `${loaderState.progressValue}%`
    progressBar.setAttribute("aria-valuenow", loaderState.progressValue.toString())

    // Stop at 90% (will be completed when hideLoader is called)
    if (loaderState.progressValue >= 90) {
      clearInterval(loaderState.progressInterval)
      loaderState.progressInterval = null
    }
  }, 100)
}

// Complete progress bar animation
function completeProgressBar() {
  const progressBar = document.querySelector(".progress-bar")
  if (!progressBar) return

  // Clear any existing interval
  if (loaderState.progressInterval) {
    clearInterval(loaderState.progressInterval)
    loaderState.progressInterval = null
  }

  // Complete to 100%
  progressBar.style.width = "100%"
  progressBar.setAttribute("aria-valuenow", "100")

  // Reset after animation completes
  setTimeout(() => {
    progressBar.style.transition = "none"
    progressBar.style.width = "0%"
    progressBar.setAttribute("aria-valuenow", "0")

    // Re-enable transition after reset
    setTimeout(() => {
      progressBar.style.transition = "width 0.2s ease"
    }, 50)
  }, 500)
}

// Simulate initial loading
function simulateInitialLoading() {
  // Show progress bar for initial load
  const progressBar = document.querySelector(".progress-bar")
  if (progressBar) {
    progressBar.style.width = "100%"
    progressBar.setAttribute("aria-valuenow", "100")

    setTimeout(() => {
      progressBar.style.transition = "none"
      progressBar.style.width = "0%"
      progressBar.setAttribute("aria-valuenow", "0")

      setTimeout(() => {
        progressBar.style.transition = "width 0.2s ease"
      }, 50)
    }, 500)
  }
}

// Simulate loading process
function simulateLoadingProcess(
  duration = 2000,
  message = "Processing...",
  subMessage = "This may take a few moments",
) {
  return new Promise((resolve) => {
    showLoader(message, subMessage)

    setTimeout(() => {
      hideLoader()
      resolve()
    }, duration)
  })
}

// Add button loading state
function setButtonLoading(button, isLoading, text = "Get Started") {
  if (!button) return

  if (isLoading) {
    button.disabled = true
    button.innerHTML = `<span class="button-loader"></span> Loading...`
    button.classList.add("active")
  } else {
    button.disabled = false
    button.innerHTML = text
    button.classList.remove("active")
  }
}

// Separate function for event listeners to improve organization
function addOptimizedEventListeners() {
  // Theme toggle with visual feedback first
  const themeToggle = document.getElementById("theme-toggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      // Provide immediate visual feedback
      themeToggle.classList.add("active")

      // Use requestAnimationFrame to defer non-visual work
      requestAnimationFrame(() => {
        const isDarkMode = document.documentElement.classList.contains("dark")
        if (isDarkMode) {
          document.documentElement.classList.remove("dark")
          document.documentElement.style.colorScheme = "light"
        } else {
          document.documentElement.classList.add("dark")
          document.documentElement.style.colorScheme = "dark"
        }

        // Remove active state after theme change
        themeToggle.classList.remove("active")
      })
    })
  }

  // Login button with optimized handler
  const loginButton = document.getElementById("login-button")
  if (loginButton) {
    loginButton.addEventListener("click", async () => {
      // Show loading state
      setButtonLoading(loginButton, true, "Login")

      try {
        // Simulate login process with loader
        await simulateLoadingProcess(1500, "Preparing Login", "Setting up secure connection...")

        // Show message after visual update
        setTimeout(() => {
          alert("Login functionality will be implemented in the full version.")
        }, 10)
      } finally {
        // Reset button state
        setButtonLoading(loginButton, false, "Login")
      }
    })
  }

  // Start button with optimized handler
  const startButton = document.getElementById("start-button")
  if (startButton) {
    startButton.addEventListener("click", async () => {
      // Show loading state
      setButtonLoading(startButton, true)

      try {
        // Simulate multi-step loading process
        await simulateLoadingProcess(1000, "Initializing", "Setting up your workspace...")
        await simulateLoadingProcess(1500, "Loading Resources", "Preparing design tools and templates...")
        await simulateLoadingProcess(800, "Almost Ready", "Finalizing your experience...")

        // Show message after visual update
        setTimeout(() => {
          alert("Full functionality will be available in the complete version.")
        }, 10)
      } finally {
        // Reset button state
        setButtonLoading(startButton, false)
      }
    })
  }
}

// Add some basic styles for active state
const style = document.createElement("style")
style.textContent = `
  button.active {
    opacity: 0.8;
    transform: scale(0.98);
  }
`
document.head.appendChild(style)

// Initialize the app when the DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp)
} else {
  initApp()
}
