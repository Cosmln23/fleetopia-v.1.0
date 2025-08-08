<html lang="en"><head><meta charset="UTF-8">
<title>Settings – Fleetopia</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
.glass-border {
border: 1px solid rgba(255, 255, 255, 0.08);
backdrop-filter: blur(20px);
background: rgba(255, 255, 255, 0.02);
}
.glass-card {
border: 1px solid rgba(255, 255, 255, 0.06);
backdrop-filter: blur(16px);
background: rgba(255, 255, 255, 0.03);
}
.glass-input {
border: 1px solid rgba(255, 255, 255, 0.08);
backdrop-filter: blur(12px);
background: rgba(255, 255, 255, 0.04);
}
.glass-input:focus {
border-color: rgba(0, 0, 0, 0.4);
background: rgba(255, 255, 255, 0.06);
}
.custom-toggle {
position: relative;
display: inline-block;
width: 40px;
height: 20px;
}
.custom-toggle input {
opacity: 0;
width: 0;
height: 0;
}
.toggle-bg {
position: absolute;
cursor: pointer;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(107, 114, 128, 0.5);
transition: 0.3s;
border-radius: 20px;
}
.toggle-dot {
position: absolute;
content: "";
height: 16px;
width: 16px;
left: 2px;
bottom: 2px;
background-color: white;
transition: 0.3s;
border-radius: 50%;
}
.custom-toggle input:checked + .toggle-bg {
background: rgba(239, 68, 68, 0.8);
}
.custom-toggle input:checked + .toggle-bg .toggle-dot {
transform: translateX(20px);
}
.modal {
display: none;
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.8);
backdrop-filter: blur(8px);
z-index: 1000;
}
.modal.active {
display: flex;
align-items: center;
justify-content: center;
}
.tab-active {
color: white !important;
border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
.settings-nav-active {
background: rgba(239, 68, 68, 0.1);
border-color: rgba(239, 68, 68, 0.3);
color: white;
}
.pro-badge {
background: linear-gradient(45deg, #ef4444, #dc2626);
}
.trial-badge {
background: linear-gradient(45deg, #f59e0b, #d97706);
}
</style>
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;family=IBM+Plex+Serif:wght@300;400;500;600;700&amp;family=IBM+Plex+Mono:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"><link id="all-fonts-link-font-geist" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&amp;display=swap"><link id="all-fonts-link-font-roboto" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&amp;display=swap"><link id="all-fonts-link-font-montserrat" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&amp;display=swap"><link id="all-fonts-link-font-poppins" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&amp;display=swap"><link id="all-fonts-link-font-playfair" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;900&amp;display=swap"><link id="all-fonts-link-font-instrument-serif" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400;500;600;700&amp;display=swap"><link id="all-fonts-link-font-merriweather" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&amp;display=swap"><link id="all-fonts-link-font-bricolage" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700&amp;display=swap"><link id="all-fonts-link-font-jakarta" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap"><link id="all-fonts-link-font-manrope" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&amp;display=swap"><link id="all-fonts-link-font-space-grotesk" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&amp;display=swap"><link id="all-fonts-link-font-work-sans" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800&amp;display=swap"><link id="all-fonts-link-font-pt-serif" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&amp;display=swap"><link id="all-fonts-link-font-geist-mono" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600;700&amp;display=swap"><link id="all-fonts-link-font-space-mono" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&amp;display=swap"><link id="all-fonts-link-font-quicksand" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&amp;display=swap"><link id="all-fonts-link-font-nunito" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&amp;display=swap"><style id="all-fonts-style-font-geist">.font-geist { font-family: 'Geist', sans-serif !important; }</style><style id="all-fonts-style-font-roboto">.font-roboto { font-family: 'Roboto', sans-serif !important; }</style><style id="all-fonts-style-font-montserrat">.font-montserrat { font-family: 'Montserrat', sans-serif !important; }</style><style id="all-fonts-style-font-poppins">.font-poppins { font-family: 'Poppins', sans-serif !important; }</style><style id="all-fonts-style-font-playfair">.font-playfair { font-family: 'Playfair Display', serif !important; }</style><style id="all-fonts-style-font-instrument-serif">.font-instrument-serif { font-family: 'Instrument Serif', serif !important; }</style><style id="all-fonts-style-font-merriweather">.font-merriweather { font-family: 'Merriweather', serif !important; }</style><style id="all-fonts-style-font-bricolage">.font-bricolage { font-family: 'Bricolage Grotesque', sans-serif !important; }</style><style id="all-fonts-style-font-jakarta">.font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif !important; }</style><style id="all-fonts-style-font-manrope">.font-manrope { font-family: 'Manrope', sans-serif !important; }</style><style id="all-fonts-style-font-space-grotesk">.font-space-grotesk { font-family: 'Space Grotesk', sans-serif !important; }</style><style id="all-fonts-style-font-work-sans">.font-work-sans { font-family: 'Work Sans', sans-serif !important; }</style><style id="all-fonts-style-font-pt-serif">.font-pt-serif { font-family: 'PT Serif', serif !important; }</style><style id="all-fonts-style-font-geist-mono">.font-geist-mono { font-family: 'Geist Mono', monospace !important; }</style><style id="all-fonts-style-font-space-mono">.font-space-mono { font-family: 'Space Mono', monospace !important; }</style><style id="all-fonts-style-font-quicksand">.font-quicksand { font-family: 'Quicksand', sans-serif !important; }</style><style id="all-fonts-style-font-nunito">.font-nunito { font-family: 'Nunito', sans-serif !important; }</style></head>

<body class="antialiased text-gray-100 bg-black pb-20">
  <!-- Top Navbar -->
  <header class="fixed w-full z-50 glass-border">
    <div class="max-w-6xl flex mr-auto ml-auto pt-4 pr-6 pb-4 pl-6 items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="font-medium text-white">Fleetopia</span>
      </div>
      <nav class="flex items-center gap-8 text-sm text-gray-400">
        <a href="#messages" class="hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="message-circle" class="lucide lucide-message-circle w-4 h-4" style="stroke-width: 1.5px;"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path></svg>
        </a>
        <a href="#notifications" class="hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="bell" class="lucide lucide-bell w-4 h-4" style="stroke-width: 1.5px;"><path d="M10.268 21a2 2 0 0 0 3.464 0"></path><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path></svg>
        </a>
        <a href="#profile" class="hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="user" class="lucide lucide-user w-4 h-4" style="stroke-width: 1.5px;"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </a>
      </nav>
    </div>
  </header>

  <!-- Bottom Navigation -->
  <nav class="fixed bottom-0 w-full z-50 glass-border">
    <div class="max-w-6xl flex mr-auto ml-auto pt-4 pr-6 pb-4 pl-6 items-center justify-center">
      <div class="flex gap-12 text-sm text-gray-400 items-center">
        <a href="#home" class="hover:text-white transition-colors flex flex-col items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="home" class="lucide lucide-home w-4 h-4" style="stroke-width: 1.5px;"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
          <span class="">Home</span>
        </a>
        <a href="#piata" class="hover:text-white transition-colors flex flex-col items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="shopping-bag" class="lucide lucide-shopping-bag w-4 h-4" style="stroke-width: 1.5px;"><path d="M16 10a4 4 0 0 1-8 0"></path><path d="M3.103 6.034h17.794"></path><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"></path></svg>
          <span class="">Marketplace</span>
        </a>
        <a href="#dispecer" class="hover:text-white transition-colors flex flex-col items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="truck" class="lucide lucide-truck w-4 h-4" style="stroke-width: 1.5px;"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>
          <span class="">Dispatcher</span>
        </a>
        <a href="#setari" class="hover:text-white transition-colors flex flex-col items-center gap-1 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="settings" class="lucide lucide-settings w-4 h-4" style="stroke-width: 1.5px;"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg>
          <span class="">Settings</span>
        </a>
      </div>
    </div>
  </nav>

  <!-- Settings Section -->
  <section class="min-h-screen bg-[url(https://images.unsplash.com/photo-1659115516377-25ed306a3551?w=2560&amp;q=80)] bg-cover pt-20 pb-20">
    <div class="max-w-7xl mr-auto ml-auto pt-8 pr-6 pb-8 pl-6">
      
      <!-- Settings Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-semibold text-white tracking-tight mb-2">Settings</h1>
        <p class="text-gray-400">Manage your account, permissions, and application preferences</p>
      </div>

      <!-- Settings Layout -->
      <div class="flex gap-6">
        
        <!-- Settings Navigation Sidebar -->
        <div class="w-80 flex-shrink-0">
          <div class="glass-card sticky top-24 rounded-xl pt-6 pr-6 pb-6 pl-6">
  
  <!-- User Level Badges -->
  <div class="mb-6">
    <h3 class="uppercase text-xs font-medium text-gray-400 tracking-wide mb-3">User Level</h3>
    <div class="flex flex-wrap gap-2">
      <span class="px-2 py-1 text-xs font-medium text-white rounded-full bg-gray-500">Basic</span>
      <span class="px-2 py-1 text-xs font-medium text-black rounded-full bg-yellow-400">ID verified</span>
      <span class="px-2 py-1 text-xs font-medium text-white rounded-full bg-green-500">Licensed</span>
    </div>
  </div>
  
  <!-- User Permission Level Badge -->
  <div class="mb-8">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-medium text-gray-300">Account Status</h3>
      <span class="px-3 py-1 text-xs font-medium text-white rounded-full bg-gray-500 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 transition-all">Trial</span>
    </div>
    <div class="text-xs text-gray-400 mb-3">7 days remaining</div>
    <button onclick="upgradeModal()" class="w-full hover:bg-red-500 transition-colors text-sm font-medium text-white bg-gray-800 rounded-lg pt-2 pr-4 pb-2 pl-4">
      Upgrade to Pro
    </button>
  </div>

  <!-- Navigation Menu -->
  <nav class="space-y-2">
    <a href="#general" onclick="showSettingsSection('general')" class="settings-nav-item flex items-center gap-3 transition-colors glass-border settings-nav-active text-sm font-medium rounded-lg pt-3 pr-4 pb-3 pl-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="stroke-width: 1.5px;"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg>
      General Settings
    </a>
    
    <a href="#account" onclick="showSettingsSection('account')" class="settings-nav-item flex items-center gap-3 transition-colors text-sm font-medium rounded-lg pt-3 pr-4 pb-3 pl-4 text-gray-400 hover:text-white hover:bg-white/5">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="stroke-width: 1.5px;"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      Account &amp; Subscription
    </a>
    
    <a href="#notifications" onclick="showSettingsSection('notifications')" class="settings-nav-item flex items-center gap-3 transition-colors text-sm font-medium rounded-lg pt-3 pr-4 pb-3 pl-4 text-gray-400 hover:text-white hover:bg-white/5">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="stroke-width: 1.5px;"><path d="M10.268 21a2 2 0 0 0 3.464 0"></path><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path></svg>
      Notification Preferences
    </a>
  </nav>

  <!-- User Permission Levels Info -->
  <div class="border-gray-700 border-t mt-8 pt-6">
    <h4 class="text-xs font-medium text-gray-400 mb-4 uppercase tracking-wide">Permission Levels</h4>
    
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-xs text-gray-400">Marketplace Access</span>
        <span class="text-xs text-white hover:text-yellow-400 transition-colors">Limited</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-xs text-gray-400">Dispatcher</span>
        <span class="text-xs text-white hover:text-red-400 transition-colors">Locked</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-xs text-gray-400">AI Agent</span>
        <span class="text-xs text-white hover:text-red-400 transition-colors">Locked</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-xs text-gray-400">Advanced Chat</span>
        <span class="text-xs text-white hover:text-red-400 transition-colors">Locked</span>
      </div>
    </div>
  </div>
</div>
        </div>

        <!-- Settings Content Area -->
        <div class="flex-1">
          <div class="glass-card rounded-xl pt-8 pr-8 pb-8 pl-8">
            
            <!-- General Settings Section -->
            <div id="general-section" class="settings-section">
              <div class="mb-8">
                <h2 class="text-xl font-semibold text-white mb-2">General Settings</h2>
                <p class="text-gray-400">Configure your application preferences and behavior</p>
              </div>

              <div class="space-y-8">
                
                <!-- General Frontend Support -->
                <div class="">
  <h3 class="text-lg font-medium text-white mb-4">General Frontend Support</h3>
  <div class="space-y-4">
    
    <!-- Persistent Settings -->
    <div class="glass-border rounded-lg p-4">
      <div class="flex items-center justify-between mb-3">
        <div class="">
          <h4 class="text-sm font-medium text-white">Enable persistent settings</h4>
          <p class="text-xs text-gray-400">Save preferences across sessions</p>
        </div>
        <div class="custom-toggle">
          <input type="checkbox" id="persistent-settings" checked="">
          <span class="toggle-bg">
            <span class="toggle-dot"></span>
          </span>
        </div>
      </div>
      <div class="text-xs text-gray-500">
        Your settings and preferences will be automatically saved and restored when you return
      </div>
    </div>

    <!-- Real-time Updates -->
    <div class="glass-border rounded-lg p-4">
      <div class="flex items-center justify-between mb-3">
        <div class="">
          <h4 class="text-sm font-medium text-white">Enable real-time updates</h4>
          <p class="text-xs text-gray-400">Cargo and notifications updates</p>
        </div>
        <div class="custom-toggle">
          <input type="checkbox" id="realtime-updates" checked="">
          <span class="toggle-bg">
            <span class="toggle-dot"></span>
          </span>
        </div>
      </div>
      <div class="text-xs text-gray-500">
        Live cargo updates hover:text-red-400 transition-colors cursor-default"&gt;(Requires Pro)
      </div>
    </div>

    <!-- Detailed Error Messages -->
    <div class="glass-border rounded-lg p-4">
      <div class="flex items-center justify-between mb-3">
        <div class="">
          <h4 class="text-sm font-medium text-white">Show detailed error messages</h4>
          <p class="text-xs text-gray-400">Display technical error information</p>
        </div>
        <div class="custom-toggle">
          <input type="checkbox" id="detailed-errors">
          <span class="toggle-bg">
            <span class="toggle-dot"></span>
          </span>
        </div>
      </div>
      <div class="text-xs text-gray-500">
        Show technical details when errors occur (recommended for advanced users)
      </div>
    </div>

    <!-- Performance Optimization -->
    <div class="glass-border rounded-lg p-4">
      <div class="flex items-center justify-between mb-3">
        <div class="">
          <h4 class="text-sm font-medium text-white">Optimize for slower connections</h4>
          <p class="text-xs text-gray-400">Lazy load maps and heavy content</p>
        </div>
        <div class="custom-toggle">
          <input type="checkbox" id="performance-optimization">
          <span class="toggle-bg">
            <span class="toggle-dot"></span>
          </span>
        </div>
      </div>
      <div class="text-xs text-gray-500">
        Reduces data usage by loading maps and images only when needed
      </div>
    </div>
  </div>
</div>

                <!-- Save Button -->
                <div class="flex justify-end pt-6 border-t border-gray-700">
                  <button onclick="saveGeneralSettings()" class="bg-gray-800 hover:bg-red-500 transition-colors px-6 py-2 rounded-lg text-white font-medium">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            <!-- Account Section -->
            <div id="account-section" class="settings-section hidden">
              <div class="mb-8">
                <h2 class="text-xl font-semibold text-white mb-2">Account &amp; Subscription Management</h2>
                <p class="text-gray-400">Manage your account details and subscription plan</p>
              </div>

              <div class="space-y-8">
                
                <!-- Current Plan -->
                <div class="">
                  <h3 class="text-lg font-medium text-white mb-4">Current Plan</h3>
                  <div class="glass-border rounded-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                      <div>
                        <h4 class="text-lg font-medium text-white">Trial Plan</h4>
                        <p class="text-sm text-gray-400">7 days remaining</p>
                      </div>
                      <span class="px-4 py-2 text-sm font-medium text-white rounded-lg bg-gray-500 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 transition-all">Trial</span>
                    </div>
                    
                    <!-- Trial Limitations -->
                    <div class="mb-6">
                      <h5 class="text-sm font-medium text-gray-300 mb-3">Current Access</h5>
                      <div class="space-y-2">
                        <div class="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white hover:text-yellow-400 transition-colors" style="stroke-width: 1.5px;"><path d="M9 12l2 2 4-4"></path><circle cx="12" cy="12" r="9"></circle></svg>
                          <span class="text-sm text-gray-300">Limited Marketplace access (ALL OFFERS, MY CARGO limited)</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white hover:text-red-400 transition-colors" style="stroke-width: 1.5px;"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>
                          <span class="text-sm text-gray-400">No Cost Details access</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white hover:text-red-400 transition-colors" style="stroke-width: 1.5px;"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>
                          <span class="text-sm text-gray-400">No Dispatcher access</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white hover:text-red-400 transition-colors" style="stroke-width: 1.5px;"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>
                          <span class="text-sm text-gray-400">No AI Agent (L0/L1/L2)</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white hover:text-red-400 transition-colors" style="stroke-width: 1.5px;"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>
                          <span class="text-sm text-gray-400">Limited chat functionality</span>
                        </div>
                      </div>
                    </div>

                    <button onclick="upgradeModal()" class="w-full bg-gray-800 hover:bg-red-500 transition-colors px-4 py-3 rounded-lg text-white font-medium">
                      Upgrade to Pro - Unlock Full Access
                    </button>
                  </div>
                </div>

                <!-- Pro Plan Preview -->
                <div class="">
                  <h3 class="text-lg font-medium text-white mb-4">Pro Plan Benefits</h3>
                  <div class="glass-border rounded-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                      <div class="">
                        <h4 class="text-lg font-medium text-white">Pro Access</h4>
                        <p class="text-sm text-gray-400">Complete platform access</p>
                      </div>
                      <span class="px-4 py-2 text-sm font-medium text-white rounded-lg bg-gray-800 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 transition-all">Pro</span>
                    </div>
                    
                    <div class="space-y-3">
                      <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white hover:text-green-400 transition-colors" style="stroke-width: 1.5px;"><path d="M9 12l2 2 4-4"></path><circle cx="12" cy="12" r="9"></circle></svg>
                        <span class="text-sm text-gray-300">Full Marketplace access (all tabs, Cost Details, chat, quotes)</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white hover:text-green-400 transition-colors" style="stroke-width: 1.5px;"><path d="M9 12l2 2 4-4"></path><circle cx="12" cy="12" r="9"></circle></svg>
                        <span class="text-sm text-gray-300">Complete Dispatcher access with GPS tracking</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white hover:text-green-400 transition-colors" style="stroke-width: 1.5px;"><path d="M9 12l2 2 4-4"></path><circle cx="12" cy="12" r="9"></circle></svg>
                        <span class="text-sm text-gray-300">AI Agent levels (L0/L1/L2) with smart recommendations</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white hover:text-green-400 transition-colors" style="stroke-width: 1.5px;"><path d="M9 12l2 2 4-4"></path><circle cx="12" cy="12" r="9"></circle></svg>
                        <span class="text-sm text-gray-300">Advanced chat with real-time notifications</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white hover:text-green-400 transition-colors" style="stroke-width: 1.5px;"><path d="M9 12l2 2 4-4"></path><circle cx="12" cy="12" r="9"></circle></svg>
                        <span class="text-sm text-gray-300">Priority support and advanced analytics</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Notifications Section -->
            <div id="notifications-section" class="settings-section hidden">
              <div class="mb-8">
                <h2 class="text-xl font-semibold text-white mb-2">Notification Preferences</h2>
                <p class="text-gray-400">Control how and when you receive notifications</p>
              </div>

              <div class="space-y-8">
                
                <!-- Email Notifications -->
                <div class="">
                  <h3 class="text-lg font-medium text-white mb-4">Email Notifications</h3>
                  <div class="space-y-4">
                    
                    <div class="glass-border rounded-lg p-4">
                      <div class="flex items-center justify-between mb-3">
                        <div class="">
                          <h4 class="text-sm font-medium text-white">New Cargo Offers</h4>
                          <p class="text-xs text-gray-400">Get notified when new cargo matches your preferences</p>
                        </div>
                        <div class="custom-toggle">
                          <input type="checkbox" id="email-cargo" checked="">
                          <span class="toggle-bg">
                            <span class="toggle-dot"></span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="glass-border rounded-lg p-4">
                      <div class="flex items-center justify-between mb-3">
                        <div class="">
                          <h4 class="text-sm font-medium text-white">Messages &amp; Chat</h4>
                          <p class="text-xs text-gray-400">Receive email notifications for new messages</p>
                        </div>
                        <div class="custom-toggle">
                          <input type="checkbox" id="email-messages">
                          <span class="toggle-bg">
                            <span class="toggle-dot"></span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="glass-border rounded-lg p-4">
                      <div class="flex items-center justify-between mb-3">
                        <div class="">
                          <h4 class="text-sm font-medium text-white">Account Updates</h4>
                          <p class="text-xs text-gray-400">Important account and subscription changes</p>
                        </div>
                        <div class="custom-toggle">
                          <input type="checkbox" id="email-account" checked="">
                          <span class="toggle-bg">
                            <span class="toggle-dot"></span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Push Notifications -->
                <div class="">
                  <h3 class="text-lg font-medium text-white mb-4">Push Notifications</h3>
                  <div class="space-y-4">
                    
                    <div class="glass-border rounded-lg p-4">
                      <div class="flex items-center justify-between mb-3">
                        <div class="">
                          <h4 class="text-sm font-medium text-white">Real-time Updates</h4>
                          <p class="text-xs text-gray-400">Instant notifications for urgent updates</p>
                        </div>
                        <div class="custom-toggle">
                          <input type="checkbox" id="push-realtime" checked="">
                          <span class="toggle-bg">
                            <span class="toggle-dot"></span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="glass-border rounded-lg p-4">
                      <div class="flex items-center justify-between mb-3">
                        <div class="">
                          <h4 class="text-sm font-medium text-white">GPS Tracking Alerts</h4>
                          <p class="text-xs text-gray-400">Location updates and route deviations</p>
                        </div>
                        <div class="custom-toggle">
                          <input type="checkbox" id="push-gps">
                          <span class="toggle-bg">
                            <span class="toggle-dot"></span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Save Button -->
                <div class="flex justify-end pt-6 border-t border-gray-700">
                  <button onclick="saveNotificationSettings()" class="bg-gray-800 hover:bg-red-500 transition-colors px-6 py-2 rounded-lg text-white font-medium">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Upgrade Modal -->
  <div id="upgrade-modal" class="modal">
    <div class="glass-card max-w-5xl w-full rounded-2xl mx-4 p-0 max-h-[90vh] overflow-y-auto" style="background: rgba(255,255,255,0.02); backdrop-filter: blur(20px);">
  <div class="min-h-full font-inter">
    <style>
      #aura-emdxm5kik::-webkit-scrollbar {
        display: none;
      }
    </style>
    <!-- Close Button -->
    <button onclick="closeUpgradeModal()" class="absolute top-4 right-4 z-10 w-8 h-8 hover:bg-white/20 transition-colors flex hover:text-gray-300 text-white bg-white/10 rounded-full items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[16px] h-[16px]" style="width: 16px; height: 16px; color: rgb(209, 213, 219);">
        <path d="m18 6-12 12"></path>
        <path d="m6 6 12 12" class=""></path>
      </svg>
    </button>
    
    <header class="max-w-2xl mx-auto text-center pt-6 pb-4 px-4">
      <h1 class="font-satoshi text-2xl md:text-3xl text-white font-normal tracking-tight mb-2">Choose your plan</h1>
      <p class="text-white/60 text-sm md:text-base">Start free for 7 days, then pick the access you need.</p>
    </header>

    <main class="max-w-5xl mr-auto ml-auto pr-4 pl-4" style="overflow: hidden;">
      <section class="grid grid-cols-1 md:grid-cols-3 gap-4" style="scrollbar-width: none; -ms-overflow-style: none;">
  <style>
    #aura-emdxm9eny::-webkit-scrollbar {
      display: none;
    }
  </style>
  
  <!-- VAT Notice -->
  <div class="col-span-full text-center mb-4">
    <p class="text-xs text-red-400 font-medium">Prices include VAT. Cancel anytime.</p>
  </div>
  
  <!-- Starter -->
  <div class="glass border border-white/10 rounded-xl p-6 flex flex-col items-start" style="background: rgba(255,255,255,0.03); backdrop-filter: blur(8px);">
    <div class="text-white font-manrope font-semibold mb-2">Trial</div>
    <div class="flex items-end mb-3">
      <span class="text-2xl font-satoshi text-white font-semibold">0€</span>
      <span class="ml-1 text-sm text-white/40">/7 days</span>
    </div>
    <ul class="mb-4 space-y-1 text-xs text-white/80">
      <li>Post one cargo</li>
      <li class="">Browse marketplace</li>
      <li class="">No quotes, no dispatcher</li>        
    </ul>
    <a href="#" class="mt-auto inline-block w-full text-center py-2 rounded-lg border border-white/20 text-white text-xs hover:bg-white/10 transition">Start free</a>
  </div>
  <!-- Pro -->
  <div class="glass border border-indigo-500/30 rounded-xl p-6 flex flex-col items-start md:scale-105" style="background: rgba(255,255,255,0.03); backdrop-filter: blur(8px);">
    <div class="text-white font-manrope font-semibold mb-2">Basic</div>
    <div class="flex items-end mb-3">
      <span class="text-2xl font-satoshi text-white font-semibold">€17,99</span>
      <span class="ml-1 text-sm text-white/40">/mo</span>
    </div>
    <ul class="mb-4 space-y-1 text-xs text-white/80">
      <li class="">Cargo posts – unlimited</li>
      <li class="">Chat &amp; manual quotes</li>
      <li class="">ID badge (optional, free)</li>
    </ul>
    <a href="#" class="mt-auto inline-block w-full text-center py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition">Pick Basic</a>
  </div>
  <!-- Enterprise -->
  <div class="glass border border-white/10 rounded-xl p-6 flex flex-col items-start" style="background: rgba(255,255,255,0.03); backdrop-filter: blur(8px);">
    <div class="text-white font-manrope font-semibold mb-2">Agent</div>
    <div class="flex items-end mb-3">
      <span class="text-2xl font-satoshi text-white font-semibold">€29,99</span>
      <span class="ml-1 text-sm text-white/40">/mo</span>
    </div>
    <ul class="mb-4 space-y-1 text-xs text-white/80">
      <li>All Basic features</li>
      <li class="">Dispatcher + Fleet map</li>
      <li class="">AI Agent L0-L2</li>
      <li class="">License badge included</li>
    </ul>
    <a href="#" class="mt-auto inline-block w-full text-center py-2 rounded-lg border border-white/20 text-white text-xs hover:bg-white/10 transition">Pick Agent</a>
  </div>
</section>

      <!-- Feature Table -->
      <section class="mt-8">
        <table class="w-full text-xs glass rounded-xl border border-white/10 overflow-hidden" style="background: rgba(255,255,255,0.03); backdrop-filter: blur(8px);">
          <thead class="">
            <tr class="">
              <th class="text-left py-2 px-3 font-manrope text-white/80 font-normal">Features</th>
              <th class="py-2 px-3 font-manrope text-white/50 font-normal">Trial</th>
              <th class="py-2 px-3 font-manrope text-white/50 font-normal">Basic</th>
              <th class="py-2 px-3 font-manrope text-white/50 font-normal">Agent</th>
            </tr>
          </thead>
          <tbody class="text-white/70">
            <tr class="border-t border-white/10">
              <td class="py-2 px-3">Unlimited cargo posts</td>
              <td class="text-center">1</td>
              <td class="text-center">Unlimited</td>
              <td class="text-center">Unlimited</td>
            </tr>
            <tr class="border-t border-white/10">
              <td class="py-2 px-3">Dispatcher access</td>
              <td class="text-center">-</td>
              <td class="text-center">✓</td>
              <td class="text-center">✓</td>
            </tr>
            <tr class="border-t border-white/10">
              <td class="py-2 px-3">AI suggestions</td>
              <td class="text-center">-</td>
              <td class="text-center">✓</td>
              <td class="text-center">✓</td>
            </tr>
            <tr class="border-t border-white/10">
              <td class="py-2 px-3">Cost analysis</td>
              <td class="text-center text-white/30">-</td>
              <td class="text-center">✓</td>
              <td class="text-center">✓</td>
            </tr>
            <tr class="border-t border-white/10">
              <td class="py-2 px-3">Verification badge</td>
              <td class="text-center text-white/30">None</td>
              <td class="text-center text-white/50">ID</td>
              <td class="text-center">ID+License</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</div>
  </div>

  <script>
    // Settings Navigation
    function showSettingsSection(section) {
      // Hide all sections
      document.querySelectorAll('.settings-section').forEach(el => el.classList.add('hidden'));
      // Show selected section
      document.getElementById(section + '-section').classList.remove('hidden');
      
      // Update navigation
      document.querySelectorAll('.settings-nav-item').forEach(el => {
        el.classList.remove('settings-nav-active');
        el.classList.add('text-gray-400', 'hover:text-white', 'hover:bg-white/5');
      });
      
      event.target.closest('.settings-nav-item').classList.add('settings-nav-active');
      event.target.closest('.settings-nav-item').classList.remove('text-gray-400', 'hover:text-white', 'hover:bg-white/5');
    }

    // Modal Functions
    function upgradeModal() {
      document.getElementById('upgrade-modal').classList.add('active');
    }

    function closeUpgradeModal() {
      document.getElementById('upgrade-modal').classList.remove('active');
    }

    // Save Functions
    function saveGeneralSettings() {
      // Simulate saving
      setTimeout(() => {
        alert('General settings saved successfully!');
      }, 500);
    }

    function saveNotificationSettings() {
      // Simulate saving
      setTimeout(() => {
        alert('Notification preferences saved successfully!');
      }, 500);
    }

    // Close modal on outside click
    document.getElementById('upgrade-modal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeUpgradeModal();
      }
    });

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  </script>

</body></html>