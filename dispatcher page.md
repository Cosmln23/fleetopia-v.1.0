<html lang="en"><head><meta charset="UTF-8">
<title>Jane Doe – Portfolio</title>
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
.level-active {
background: rgba(239, 68, 68, 0.1);
border-color: rgba(239, 68, 68, 0.3);
}
</style>
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;family=IBM+Plex+Serif:wght@300;400;500;600;700&amp;family=IBM+Plex+Mono:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"></head>

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
        <a href="#setari" class="hover:text-white transition-colors flex flex-col items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="settings" class="lucide lucide-settings w-4 h-4" style="stroke-width: 1.5px;"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg>
          <span>Settings</span>
        </a>
      </div>
    </div>
  </nav>

  <!-- Main AI Agent Dashboard Section -->
  <section class="min-h-screen bg-[url(https://images.unsplash.com/photo-1659115516377-25ed306a3551?w=2560&amp;q=80)] bg-cover pt-20 pb-20">
    <div class="max-w-7xl mr-auto ml-auto pt-8 pr-6 pb-8 pl-6">
      <!-- Dashboard Layout -->
      <div class="flex gap-6 h-full">
        
        <!-- Left Sidebar - Static Vertical Box -->
        <div class="w-80 flex-shrink-0">
          <div class="glass-card h-full sticky top-24 rounded-xl pt-6 pr-6 pb-6 pl-6">
            
            <!-- Agent Control Section -->
            <div class="mb-8">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-semibold text-white">AI Agent</h2>
                <div class="custom-toggle">
                  <input type="checkbox" id="agent-master-toggle" onchange="toggleAgent()">
                  <span class="toggle-bg">
                    <span class="toggle-dot"></span>
                  </span>
                </div>
              </div>
              
              <button onclick="openCostSettingsModal()" class="glass-border hover:bg-white/5 transition-all w-full flex gap-2 text-sm font-medium text-white rounded-lg pt-3 pr-4 pb-3 pl-4 items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="stroke-width: 1.5px;"><path d="M12.22 2h-.44a2 2 0 0 0-2 2.18l.25 2.22c-.05.17-.17.32-.38.4A7.5 7.5 0 0 0 8 7.5L6.3 6.8a2 2 0 0 0-2.4.6l-.22.38a2 2 0 0 0 .6 2.4L6 11c0 .17 0 .34 0 .5s0 .33 0 .5l-1.72.82a2 2 0 0 0-.6 2.4l.22.38a2 2 0 0 0 2.4.6L8 15.5a7.5 7.5 0 0 0 1.65.8c.21.08.33.23.38.4l-.25 2.22a2 2 0 0 0 2 2.18h.44a2 2 0 0 0 2-2.18l-.25-2.22c.05-.17.17-.32.38-.4A7.5 7.5 0 0 0 16 15.5l1.7.7a2 2 0 0 0 2.4-.6l.22-.38a2 2 0 0 0-.6-2.4L18 11.5c0-.17 0-.34 0-.5s0-.33 0-.5l1.72-.82a2 2 0 0 0 .6-2.4l-.22-.38a2 2 0 0 0-2.4-.6L16 7.5a7.5 7.5 0 0 0-1.65-.8c-.21-.08-.33-.23-.38-.4l.25-2.22A2 2 0 0 0 12.22 2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                Cost Settings
              </button>
            </div>

            <!-- Level Implementation Display -->
            <div class="space-y-4">
              <h3 class="text-sm font-medium text-gray-300 mb-4">Agent Levels</h3>
              
              <!-- L0 - Radar -->
              <div class="glass-border rounded-lg p-4 level-card" id="level-0-card">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex gap-2 items-center">
                    <span class="text-sm font-medium text-white">L0 — Radar</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[16px] h-[16px]" style="width: 16px; height: 16px; color: rgb(248, 113, 113);"><path d="M19.07 4.93A10 10 0 0 0 6.99 3.34"></path><path d="M4 6h.01"></path><path d="M2.29 9.62A10 10 0 1 0 21.31 8.35"></path><path d="M16.24 7.76A6 6 0 1 0 8.23 16.67"></path><path d="M12 18h.01"></path><path d="M17.99 11.66A6 6 0 0 1 15.77 16.67"></path><circle cx="12" cy="12" r="2"></circle><path d="m13.41 10.59 5.66-5.66"></path></svg>
                  </div>
                  <div class="custom-toggle">
                    <input type="checkbox" id="level-0-toggle" onchange="toggleLevel(0)">
                    <span class="toggle-bg">
                      <span class="toggle-dot"></span>
                    </span>
                  </div>
                </div>
                <p class="text-xs text-gray-400">Automatic cargo opportunity detection</p>
              </div>

              <!-- L1 - Calculator -->
              <div class="glass-border rounded-lg p-4 level-card" id="level-1-card">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-white">L1 — Calculator</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-400" style="width: 16px; height: 16px; color: rgb(248, 113, 113);"><rect width="16" height="20" x="4" y="2" rx="2"></rect><line x1="8" x2="16" y1="6" y2="6"></line><line x1="16" x2="16" y1="14" y2="18"></line><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path><path d="M8 18h.01"></path></svg>
                  </div>
                  <div class="custom-toggle">
                    <input type="checkbox" id="level-1-toggle" onchange="toggleLevel(1)">
                    <span class="toggle-bg">
                      <span class="toggle-dot"></span>
                    </span>
                  </div>
                </div>
                <p class="text-xs text-gray-400">Automatic cost and profit calculation</p>
              </div>

              <!-- L2 - Quote Bot -->
              <div class="glass-border rounded-lg p-4 level-card" id="level-2-card">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-white">L2 — Quote Bot</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-400" style="stroke-width: 1.5px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M13 8H7"></path><path d="M17 12H7"></path></svg>
                  </div>
                  <div class="custom-toggle">
                    <input type="checkbox" id="level-2-toggle" onchange="toggleLevel(2)">
                    <span class="toggle-bg">
                      <span class="toggle-dot"></span>
                    </span>
                  </div>
                </div>
                <p class="text-xs text-gray-400">Automatic quote suggestion</p>
              </div>
            </div>

            <!-- Agent Status -->
            <div class="mt-8 pt-6 border-t border-gray-700">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 bg-gray-500 rounded-full" id="agent-status-dot"></div>
                <span class="text-xs text-gray-400" id="agent-status-text">Agent Inactive</span>
              </div>
              <div class="text-xs text-gray-500" id="agent-activity">No active processes</div>
            </div>
          </div>
        </div>

        <!-- Right Content Area -->
        <div class="flex-1">
          <div class="glass-card rounded-xl h-full">
            
            <!-- Tab Navigation -->
            <div class="flex items-center gap-8 px-6 py-4 border-b border-gray-700">
              <button class="hover:text-white transition-colors tab-btn text-sm border-transparent border-b pb-2 text-gray-400" data-tab="ai-suggestions">
                AI Suggestions
              </button>
              <button class="hover:text-white transition-colors tab-btn tab-active text-sm border-transparent border-b pb-2" data-tab="fleet-management">
                Fleet Management
              </button>
            </div>

            <!-- Tab Content -->
            <div class="p-6">
              
              <!-- AI Suggestions View -->
              <div id="ai-suggestions-view" class="tab-content hidden">
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-lg font-semibold text-white">AI Suggestions</h3>
                  <div class="flex items-center gap-4">
                    <select class="glass-input focus:outline-none text-sm text-white bg-transparent rounded-lg pt-2 pr-3 pb-2 pl-3" id="suggestion-filter" onchange="sortSuggestions()">
                      <option value="all" style="background: #111827; color: white;">All Levels</option>
                      <option value="l0" style="background: #111827; color: white;">L0 - Radar</option>
                      <option value="l1" style="background: #111827; color: white;">L1 - Calculator</option>
                      <option value="l2" style="background: #111827; color: white;">L2 - Quote Bot</option>
                    </select>
                    <select class="glass-input px-3 py-2 rounded-lg text-sm text-white bg-transparent focus:outline-none" id="suggestion-sort" onchange="sortSuggestions()">
                      <option value="confidence" style="background: #111827; color: white;">High Confidence</option>
                      <option value="recent" style="background: #111827; color: white;">Most Recent</option>
                    </select>
                  </div>
                </div>

                <!-- Notification Feed -->
                <div class="space-y-4" id="suggestions-feed">
                  <!-- Empty State -->
                  <div class="text-center py-12" id="empty-suggestions">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-gray-500" style="stroke-width: 1.5px;"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" class=""></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <h4 class="text-lg font-medium text-white mb-2">No Active Suggestions</h4>
                    <p class="text-gray-400">Enable AI Agent levels to receive intelligent suggestions</p>
                  </div>
                </div>

                <!-- History Log -->
                <div class="mt-8 pt-6 border-t border-gray-700">
                  <h4 class="text-sm font-medium text-gray-300 mb-4">History Log</h4>
                  <div class="space-y-2" id="history-log">
                    <div class="text-xs text-gray-500">No previous suggestions</div>
                  </div>
                </div>
              </div>

              <!-- Fleet Management View -->
              <div id="fleet-management-view" class="tab-content">
                
                <!-- Map Interface -->
                <div class="mb-6">
                  <div class="glass-border h-[32rem] flex bg-gray-800/20 rounded-lg items-center justify-center relative">
                    <div class="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-gray-500" style="stroke-width: 1.5px;"><polygon points="3 6 9 1 15 6 21 1 21 18 15 23 9 18 3 23" class=""></polygon><line x1="9" x2="9" y1="1" y2="18"></line><line x1="15" x2="15" y1="6" y2="23"></line></svg>
                      <h4 class="text-lg font-medium text-white mb-2">Interactive Map</h4>
                      <p class="text-gray-400">GPS tracking with real-time vehicle positions</p>
                    </div>
                    <!-- Map Placeholder Markers -->
                    <div class="absolute top-16 left-20">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="4" fill="#ef4444" stroke="#ffffff" stroke-width="2"></circle>
                      </svg>
                    </div>
                    <div class="absolute top-32 right-24">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="">
                        <circle cx="6" cy="6" r="4" fill="#22c55e" stroke="#ffffff" stroke-width="2" class=""></circle>
                      </svg>
                    </div>
                    <div class="absolute bottom-20 left-1/3">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="">
                        <circle cx="6" cy="6" r="4" fill="#f59e0b" stroke="#ffffff" stroke-width="2" class=""></circle>
                      </svg>
                    </div>
                  </div>
                  <p class="text-xs text-gray-400 text-center mt-2">Real-time updates every 5-10s</p>
                </div>

                <!-- Vehicle Grid -->
                <div class="mb-6">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-white">Fleet Vehicles</h3>
                    <div class="flex items-center gap-4">
                      <input type="text" placeholder="Search vehicles..." class="glass-input px-3 py-2 rounded-lg text-sm text-white bg-transparent focus:outline-none" id="vehicle-search" oninput="filterVehicles()">
                      <select class="glass-input px-3 py-2 rounded-lg text-sm text-white bg-transparent focus:outline-none" id="status-filter" onchange="filterVehicles()">
                        <option value="all" style="background: #111827; color: white;">All Status</option>
                        <option value="active" style="background: #111827; color: white;">Active</option>
                        <option value="inactive" style="background: #111827; color: white;">Inactive</option>
                        <option value="maintenance" style="background: #111827; color: white;">Maintenance</option>
                      </select>
                    </div>
                  </div>

                  <!-- Vehicle Cards Grid -->
                  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4" id="vehicle-grid" style="--tw-space-y-reverse: 0; margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(0px * var(--tw-space-y-reverse));">
  <!-- Vehicle Card 1 -->
  <div class="glass-border rounded-lg p-4 vehicle-card group" data-status="active">
    <div class="flex items-center justify-between mb-3">
      <h4 class="text-sm font-medium text-white">Truck #001</h4>
      <span class="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">Active</span>
    </div>
    <div class="space-y-2 text-xs text-gray-400 mb-4">
      <div class="">Driver: John Smith</div>
      <div class="">Location: Dallas, TX</div>
      <div class="">Type: Dry Van</div>
    </div>
    <div class="flex gap-2">
      <button class="px-3 py-1 text-xs glass-border hover:bg-red-500 hover:text-white transition-colors rounded text-gray-300">Track</button>
      <button class="px-3 py-1 text-xs glass-border hover:bg-white/5 transition-colors rounded text-gray-300">Edit</button>
    </div>
  </div>

  <!-- Vehicle Card 2 -->
  <div class="glass-border rounded-lg p-4 vehicle-card group" data-status="active">
    <div class="flex items-center justify-between mb-3">
      <h4 class="text-sm font-medium text-white">Truck #002</h4>
      <span class="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">Active</span>
    </div>
    <div class="space-y-2 text-xs text-gray-400 mb-4">
      <div class="">Driver: Mike Johnson</div>
      <div class="">Location: Atlanta, GA</div>
      <div class="">Type: Reefer</div>
    </div>
    <div class="flex gap-2">
      <button class="px-3 py-1 text-xs glass-border hover:bg-red-500 hover:text-white transition-colors rounded text-gray-300">Track</button>
      <button class="glass-border hover:bg-white/5 transition-colors text-xs text-gray-300 rounded pt-1 pr-3 pb-1 pl-3">Edit</button>
    </div>
  </div>

  <!-- Vehicle Card 3 -->
  <div class="glass-border rounded-lg p-4 vehicle-card group" data-status="maintenance">
    <div class="flex items-center justify-between mb-3">
      <h4 class="text-sm font-medium text-white">Truck #003</h4>
      <span class="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-300">Maintenance</span>
    </div>
    <div class="space-y-2 text-xs text-gray-400 mb-4">
      <div class="">Driver: Sarah Wilson</div>
      <div class="">Location: Phoenix, AZ</div>
      <div class="">Type: Flatbed</div>
    </div>
    <div class="flex gap-2">
      <button class="px-3 py-1 text-xs bg-gray-600 cursor-not-allowed rounded text-gray-400" disabled="">Track</button>
      <button class="glass-border hover:bg-white/5 transition-colors text-xs text-gray-300 rounded pt-1 pr-3 pb-1 pl-3">Edit</button>
    </div>
  </div>
</div>
                </div>

                <!-- Add Fleet Button -->
                <button onclick="openAddFleetModal()" class="glass-border hover:bg-white/5 transition-all w-full flex gap-2 text-sm font-medium text-white rounded-lg pt-4 pr-6 pb-4 pl-6 items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="stroke-width: 1.5px;"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                  Add Fleet Vehicle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Toast Notification -->
      <div id="toast-notification" class="fixed top-4 right-4 glass-card rounded-lg p-4 transform translate-x-full transition-transform duration-300 z-50" style="display: none;">
        <div class="flex items-center gap-3">
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          <span class="text-sm text-white" id="toast-message">Settings saved successfully</span>
        </div>
      </div>

      <!-- Cost Settings Modal -->
      <div id="cost-settings-modal" class="modal">
        <div class="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl mx-4 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-white">Cost Settings</h2>
            <button onclick="closeCostSettingsModal()" class="text-gray-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="stroke-width: 1.5px;"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>

          <!-- Cost Settings Form -->
          <div class="space-y-6">
            <!-- Basic Costs -->
            <div>
              <h3 class="text-lg font-medium text-white mb-4">Basic Operating Costs</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Fuel Cost per Mile</label>
                  <input type="number" placeholder="0.50" step="0.01" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none cost-input" required="" oninput="calculateTotal()">
                </div>
                <div class="">
                  <label class="block text-sm font-medium text-gray-300 mb-2">Driver Rate per Mile</label>
                  <input type="number" placeholder="0.65" step="0.01" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none cost-input" required="" oninput="calculateTotal()">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Insurance per Mile</label>
                  <input type="number" placeholder="0.15" step="0.01" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none cost-input" required="" oninput="calculateTotal()">
                </div>
                <div class="">
                  <label class="block text-sm font-medium text-gray-300 mb-2">Maintenance per Mile</label>
                  <input type="number" placeholder="0.12" step="0.01" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none cost-input" required="" oninput="calculateTotal()">
                </div>
              </div>
            </div>

            <!-- Advanced Costs -->
            <div>
              <h3 class="text-lg font-medium text-white mb-4">Advanced Costs</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Deadhead Factor (%)</label>
                  <input type="number" placeholder="10" min="0" max="100" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Minimum Profit Margin (%)</label>
                  <input type="number" placeholder="15" min="0" max="100" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none">
                </div>
              </div>
            </div>

            <!-- Agent Level Costs -->
            <div class="">
              <h3 class="text-lg font-medium text-white mb-4">AI Agent Level Costs</h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between glass-border rounded-lg p-3">
                  <div>
                    <span class="text-sm font-medium text-white">L0 - Radar</span>
                    <p class="text-xs text-gray-400">Per cargo scan</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-300">$</span>
                    <input type="number" placeholder="0.05" step="0.01" class="glass-input w-20 px-2 py-1 rounded text-white bg-transparent focus:outline-none text-sm">
                  </div>
                </div>
                <div class="flex items-center justify-between glass-border rounded-lg p-3">
                  <div>
                    <span class="text-sm font-medium text-white">L1 - Calculator</span>
                    <p class="text-xs text-gray-400">Per calculation</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-300">$</span>
                    <input type="number" placeholder="0.10" step="0.01" class="glass-input w-20 px-2 py-1 rounded text-white bg-transparent focus:outline-none text-sm">
                  </div>
                </div>
                <div class="flex items-center justify-between glass-border rounded-lg p-3">
                  <div>
                    <span class="text-sm font-medium text-white">L2 - Quote Bot</span>
                    <p class="text-xs text-gray-400">Per quote generated</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-300">$</span>
                    <input type="number" placeholder="0.25" step="0.01" class="glass-input w-20 px-2 py-1 rounded text-white bg-transparent focus:outline-none text-sm">
                  </div>
                </div>
              </div>
            </div>

            <!-- Total Cost Display -->
            <div class="glass-border rounded-lg p-4">
              <div class="flex items-center justify-between">
                <span class="text-lg font-medium text-white">Total per Mile:</span>
                <span class="text-lg font-semibold text-red-400" id="total-cost">€0.00</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4 pt-4">
              <button onclick="saveCostSettings()" class="flex-1 bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded-lg text-white font-medium">
                Save Settings
              </button>
              <button onclick="resetCostSettings()" class="glass-border hover:bg-white/5 transition-colors font-medium text-white rounded-lg pt-2 pr-4 pb-2 pl-4">
                Reset
              </button>
              <button onclick="closeCostSettingsModal()" class="glass-border hover:bg-white/5 transition-colors font-medium text-white rounded-lg pt-2 pr-4 pb-2 pl-4">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Fleet Modal -->
      <div id="add-fleet-modal" class="modal">
        <div class="glass-card max-w-lg w-full rounded-xl mr-4 ml-4 pt-6 pr-6 pb-6 pl-6">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-xl font-semibold text-white text-center flex-1">Add Fleet Vehicle</h2>
    <button onclick="closeAddFleetModal()" class="text-gray-400 hover:text-white transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=""><path d="M18 6 6 18" class=""></path><path d="m6 6 12 12" class=""></path></svg>
    </button>
  </div>

  <form class="space-y-4" id="add-fleet-form">
    <div class="">
      <label class="block text-sm font-medium text-gray-300 mb-2">Vehicle Type <span class="text-red-400">*</span></label>
      <select class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" required="">
        <option value="" style="background: #111827; color: white;">Select Type</option>
        <option value="dry-van" style="background: #111827; color: white;">Dry Van</option>
        <option value="reefer" style="background: #111827; color: white;">Reefer</option>
        <option value="flatbed" style="background: #111827; color: white;">Flatbed</option>
        <option value="step-deck" style="background: #111827; color: white;">Step Deck</option>
        <option value="trailer" style="background: #111827; color: white;">Trailer</option>
        <option value="refrigerated-truck" style="background: #111827; color: white;">Refrigerated Truck</option>
      </select>
    </div>
    
    <div class="">
      <label class="block text-sm font-medium text-gray-300 mb-2">License Plate <span class="text-red-400">*</span></label>
      <input type="text" placeholder="Enter license plate" maxlength="20" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" required="">
    </div>
    
    <div class="">
      <label class="block text-sm font-medium text-gray-300 mb-2">Capacity</label>
      <div class="grid grid-cols-2 gap-2">
        <input type="number" placeholder="Enter weight capacity" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" min="0">
        <input type="number" placeholder="Enter volume capacity" step="0.1" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" min="0">
      </div>
      <div class="grid grid-cols-2 gap-2 mt-1">
        <span class="text-xs text-gray-400 text-center">Weight (kg)</span>
        <span class="text-xs text-gray-400 text-center">Volume (m³)</span>
      </div>
    </div>
    
    <div class="">
      <label class="block text-sm font-medium text-gray-300 mb-2">Driver Name <span class="text-red-400">*</span></label>
      <input type="text" placeholder="Enter driver name" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" required="">
    </div>
    
    <div class="">
      <label class="block text-sm font-medium text-gray-300 mb-2">GPS Tracking</label>
      <div class="space-y-3">
        <div class="">
          <label class="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
            <input type="radio" name="gps-option" value="device" class="text-red-500 focus:ring-red-500" onchange="toggleGpsOptions()">
            <span class="">Connect Device</span>
          </label>
          <div id="device-input" class="mt-2 ml-6 hidden">
            <input type="text" placeholder="Enter device ID" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none">
          </div>
        </div>
        <div class="">
          <label class="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
            <input type="radio" name="gps-option" value="manual" class="text-red-500 focus:ring-red-500" onchange="toggleGpsOptions()">
            <span class="">Manual Location</span>
          </label>
          <div id="manual-input" class="mt-2 ml-6 hidden space-y-2">
            <input type="text" placeholder="Enter address or coordinates" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none">
            <div class="glass-border rounded-lg p-4 flex items-center justify-center text-gray-400 text-sm">
              Map Picker Here
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex flex-col sm:flex-row gap-4 pt-4">
      <button type="button" onclick="closeAddFleetModal()" class="glass-border hover:bg-white/5 transition-colors font-medium text-white rounded-lg pt-2 pr-4 pb-2 pl-4">
        Cancel
      </button>
      <button type="button" onclick="console.log('Draft saved')" class="glass-border hover:bg-white/5 transition-colors font-medium text-white rounded-lg pt-2 pr-4 pb-2 pl-4">
        Save Draft
      </button>
      <button type="submit" onclick="addFleetVehicle()" class="flex-1 hover:bg-red-600 transition-colors font-medium text-white bg-red-500 rounded-lg pt-2 pr-4 pb-2 pl-4">
        Add Vehicle
      </button>
    </div>
  </form>

  <script>
    function toggleGpsOptions() {
      const deviceRadio = document.querySelector('input[name="gps-option"][value="device"]');
      const manualRadio = document.querySelector('input[name="gps-option"][value="manual"]');
      const deviceInput = document.getElementById('device-input');
      const manualInput = document.getElementById('manual-input');
      
      if (deviceRadio.checked) {
        deviceInput.classList.remove('hidden');
        manualInput.classList.add('hidden');
      } else if (manualRadio.checked) {
        deviceInput.classList.add('hidden');
        manualInput.classList.remove('hidden');
      }
    }
    
    // Form validation
    document.getElementById('add-fleet-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const requiredFields = this.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          isValid = false;
        } else {
          field.style.borderColor = '';
        }
      });
      
      if (isValid) {
        addFleetVehicle();
      }
    });
  </script>
</div></div></div>
  </section>

  <!-- Cost Settings Modal -->
  <div id="cost-settings-modal" class="modal">
    <div class="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl mx-4 p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-white">Cost Settings</h2>
        <button onclick="closeCostSettingsModal()" class="text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="stroke-width: 1.5px;"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
        </button>
      </div>

      <!-- Cost Settings Form -->
      <div class="space-y-6">
        <!-- Basic Costs -->
        <div>
          <h3 class="text-lg font-medium text-white mb-4">Basic Operating Costs</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Fuel Cost per Mile</label>
              <input type="number" placeholder="0.50" step="0.01" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none">
            </div>
            <div class="">
              <label class="block text-sm font-medium text-gray-300 mb-2">Driver Rate per Mile</label>
              <input type="number" placeholder="0.65" step="0.01" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Insurance per Mile</label>
              <input type="number" placeholder="0.15" step="0.01" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none">
            </div>
            <div class="">
              <label class="block text-sm font-medium text-gray-300 mb-2">Maintenance per Mile</label>
              <input type="number" placeholder="0.12" step="0.01" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none">
            </div>
          </div>
        </div>

        <!-- Advanced Costs -->
        <div>
          <h3 class="text-lg font-medium text-white mb-4">Advanced Costs</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Deadhead Factor (%)</label>
              <input type="number" placeholder="10" min="0" max="100" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Minimum Profit Margin (%)</label>
              <input type="number" placeholder="15" min="0" max="100" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none">
            </div>
          </div>
        </div>

        <!-- Agent Level Costs -->
        <div class="">
          <h3 class="text-lg font-medium text-white mb-4">AI Agent Level Costs</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between glass-border rounded-lg p-3">
              <div>
                <span class="text-sm font-medium text-white">L0 - Radar</span>
                <p class="text-xs text-gray-400">Per cargo scan</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-300">$</span>
                <input type="number" placeholder="0.05" step="0.01" class="glass-input w-20 px-2 py-1 rounded text-white bg-transparent focus:outline-none text-sm">
              </div>
            </div>
            <div class="flex items-center justify-between glass-border rounded-lg p-3">
              <div>
                <span class="text-sm font-medium text-white">L1 - Calculator</span>
                <p class="text-xs text-gray-400">Per calculation</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-300">$</span>
                <input type="number" placeholder="0.10" step="0.01" class="glass-input w-20 px-2 py-1 rounded text-white bg-transparent focus:outline-none text-sm">
              </div>
            </div>
            <div class="flex items-center justify-between glass-border rounded-lg p-3">
              <div>
                <span class="text-sm font-medium text-white">L2 - Quote Bot</span>
                <p class="text-xs text-gray-400">Per quote generated</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-300">$</span>
                <input type="number" placeholder="0.25" step="0.01" class="glass-input w-20 px-2 py-1 rounded text-white bg-transparent focus:outline-none text-sm">
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 pt-4">
          <button onclick="saveCostSettings()" class="flex-1 bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded-lg text-white font-medium">
            Save Settings
          </button>
          <button onclick="closeCostSettingsModal()" class="flex-1 glass-border hover:bg-white/5 transition-colors font-medium text-white rounded-lg pt-2 pr-4 pb-2 pl-4">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Add Fleet Modal -->
  <div id="add-fleet-modal" class="modal">
    <div class="glass-card max-w-lg w-full rounded-xl mx-4 p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-white">Add Fleet Vehicle</h2>
        <button onclick="closeAddFleetModal()" class="text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="stroke-width: 1.5px; width: 24px; height: 24px; color: rgb(255, 255, 255);" class="w-[24px] h-[24px]"><path d="M18 6 6 18" class=""></path><path d="m6 6 12 12" class=""></path></svg>
        </button>
      </div>

      <form class="space-y-4">
        <div class="">
          <label class="block text-sm font-medium text-gray-300 mb-2">Vehicle Name/ID</label>
          <input type="text" placeholder="Truck #1" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none">
        </div>
        
        <div class="">
          <label class="block text-sm font-medium text-gray-300 mb-2">Driver Name</label>
          <input type="text" placeholder="John Doe" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none">
        </div>
        
        <div class="">
          <label class="block text-sm font-medium text-gray-300 mb-2">Vehicle Type</label>
          <select class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none">
            <option value="" style="background: #111827; color: white;">Select Type</option>
            <option value="dry-van" style="background: #111827; color: white;">Dry Van</option>
            <option value="reefer" style="background: #111827; color: white;">Reefer</option>
            <option value="flatbed" style="background: #111827; color: white;">Flatbed</option>
            <option value="step-deck" style="background: #111827; color: white;">Step Deck</option>
          </select>
        </div>
        
        <div class="">
          <label class="block text-sm font-medium text-gray-300 mb-2">Current Location</label>
          <input type="text" placeholder="City, State" class="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none">
        </div>
        
        <div class="flex gap-4 pt-4">
          <button type="button" onclick="addFleetVehicle()" class="flex-1 bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded-lg text-white font-medium">
            Add Vehicle
          </button>
          <button type="button" onclick="closeAddFleetModal()" class="flex-1 glass-border hover:bg-white/5 transition-colors font-medium text-white rounded-lg pt-2 pr-4 pb-2 pl-4">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>

  <script>
    // Agent state management
    let agentState = {
      masterEnabled: false,
      levels: {
        0: false,
        1: false,
        2: false
      },
      suggestions: []
    };

    // Toggle master agent
    function toggleAgent() {
      const toggle = document.getElementById('agent-master-toggle');
      const statusDot = document.getElementById('agent-status-dot');
      const statusText = document.getElementById('agent-status-text');
      const activity = document.getElementById('agent-activity');
      
      agentState.masterEnabled = toggle.checked;
      
      if (agentState.masterEnabled) {
        statusDot.className = 'w-2 h-2 bg-green-500 rounded-full';
        statusText.textContent = 'Agent Active';
        activity.textContent = 'Monitoring system status';
      } else {
        statusDot.className = 'w-2 h-2 bg-gray-500 rounded-full';
        statusText.textContent = 'Agent Inactive';
        activity.textContent = 'No active processes';
        
        // Disable all levels when master is off
        Object.keys(agentState.levels).forEach(level => {
          agentState.levels[level] = false;
          const levelToggle = document.getElementById(`level-${level}-toggle`);
          const levelCard = document.getElementById(`level-${level}-card`);
          levelToggle.checked = false;
          levelCard.classList.remove('level-active');
        });
      }
      
      updateSuggestionsFeed();
    }

    // Toggle individual levels
    function toggleLevel(level) {
      if (!agentState.masterEnabled) {
        const toggle = document.getElementById(`level-${level}-toggle`);
        toggle.checked = false;
        return;
      }
      
      const toggle = document.getElementById(`level-${level}-toggle`);
      const card = document.getElementById(`level-${level}-card`);
      
      agentState.levels[level] = toggle.checked;
      
      if (toggle.checked) {
        card.classList.add('level-active');
        generateSuggestion(level);
      } else {
        card.classList.remove('level-active');
      }
      
      updateSuggestionsFeed();
    }

    // Generate suggestions based on level
    function generateSuggestion(level) {
      const suggestions = {
        0: [
          {
            level: 'L0',
            title: 'High-Value Cargo Detected',
            description: 'Found partial load from Dallas, TX to Atlanta, GA - $2,850 for 800 miles',
            confidence: 92,
            time: new Date().toLocaleTimeString()
          }
        ],
        1: [
          {
            level: 'L1',
            title: 'Cost Analysis Complete',
            description: 'Estimated costs: $1,240 | Projected profit: $1,610 (57% margin)',
            confidence: 88,
            time: new Date().toLocaleTimeString()
          }
        ],
        2: [
          {
            level: 'L2',
            title: 'Quote Recommendation',
            description: 'Suggested quote: $2,650 (competitive with 89% win probability)',
            confidence: 85,
            time: new Date().toLocaleTimeString()
          }
        ]
      };
      
      if (suggestions[level]) {
        agentState.suggestions.unshift(...suggestions[level]);
      }
    }

    // Update suggestions feed
    function updateSuggestionsFeed() {
      const feed = document.getElementById('suggestions-feed');
      const emptyState = document.getElementById('empty-suggestions');
      
      if (agentState.suggestions.length === 0) {
        emptyState.classList.remove('hidden');
        return;
      }
      
      emptyState.classList.add('hidden');
      
      feed.innerHTML = agentState.suggestions.map(suggestion => `
        <div class="glass-border rounded-lg p-4 hover:bg-white/5 transition-colors">
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-medium px-2 py-1 rounded-full bg-red-500/20 text-red-400">${suggestion.level}</span>
              <span class="text-sm font-medium text-white">${suggestion.title}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-400">${suggestion.confidence}% confidence</span>
              <span class="text-xs text-gray-500">${suggestion.time}</span>
            </div>
          </div>
          <p class="text-sm text-gray-300">${suggestion.description}</p>
          <div class="flex gap-2 mt-3">
            <button class="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 transition-colors rounded text-white">Accept</button>
            <button class="px-3 py-1 text-xs glass-border hover:bg-white/5 transition-colors rounded text-gray-300">Dismiss</button>
          </div>
        </div>
      `).join('');
    }

    // Tab switching
    document.addEventListener('DOMContentLoaded', function() {
      const tabButtons = document.querySelectorAll('.tab-btn');
      const tabContents = document.querySelectorAll('.tab-content');
      
      tabButtons.forEach(button => {
        button.addEventListener('click', function() {
          const targetTab = this.getAttribute('data-tab');
          
          // Remove active class from all tabs
          tabButtons.forEach(btn => {
            btn.classList.remove('tab-active');
            btn.classList.add('text-gray-400');
          });
          
          // Add active class to clicked tab
          this.classList.add('tab-active');
          this.classList.remove('text-gray-400');
          
          // Hide all content
          tabContents.forEach(content => content.classList.add('hidden'));
          
          // Show target content
          document.getElementById(targetTab + '-view').classList.remove('hidden');
        });
      });
    });

    // Modal functions
    function openCostSettingsModal() {
      document.getElementById('cost-settings-modal').classList.add('active');
    }

    function closeCostSettingsModal() {
      document.getElementById('cost-settings-modal').classList.remove('active');
    }

    function openAddFleetModal() {
      document.getElementById('add-fleet-modal').classList.add('active');
    }

    function closeAddFleetModal() {
      document.getElementById('add-fleet-modal').classList.remove('active');
    }

    function saveCostSettings() {
      // Implement cost settings save logic
      closeCostSettingsModal();
    }

    function addFleetVehicle() {
      // Implement add vehicle logic
      closeAddFleetModal();
    }

    // Close modals on outside click
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
      }
    });
  </script>

</body></html>