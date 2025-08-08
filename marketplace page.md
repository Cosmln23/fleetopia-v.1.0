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
.custom-toggle input:checked + .toggle-bg {
background: rgba(0, 0, 0, 0.8);
}
.custom-toggle input:checked + .toggle-bg .toggle-dot {
transform: translateX(14px);
background: white;
}
.fade-in {
animation: fadeIn 0.8s ease-out forwards;
opacity: 0;
}
.slide-up {
animation: slideUp 0.8s ease-out forwards;
opacity: 0;
transform: translateY(30px);
}
.slide-left {
animation: slideLeft 0.8s ease-out forwards;
opacity: 0;
transform: translateX(30px);
}
.slide-right {
animation: slideRight 0.8s ease-out forwards;
opacity: 0;
transform: translateX(-30px);
}
.blur-in {
animation: blurIn 0.8s ease-out forwards;
opacity: 0;
filter: blur(10px);
}
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }
.delay-600 { animation-delay: 0.6s; }
.delay-700 { animation-delay: 0.7s; }
.delay-800 { animation-delay: 0.8s; }
.delay-900 { animation-delay: 0.9s; }
.delay-1000 { animation-delay: 1.0s; }
.delay-1100 { animation-delay: 1.1s; }
.delay-1200 { animation-delay: 1.2s; }
@keyframes fadeIn {
to { opacity: 1; }
}
@keyframes slideUp {
to {
opacity: 1;
transform: translateY(0);
}
}
@keyframes slideLeft {
to {
opacity: 1;
transform: translateX(0);
}
}
@keyframes slideRight {
to {
opacity: 1;
transform: translateX(0);
}
}
@keyframes blurIn {
to {
opacity: 1;
filter: blur(0);
}
}
.animate-on-scroll {
opacity: 0;
transform: translateY(30px);
transition: all 0.8s ease-out;
}
.animate-on-scroll.in-view {
opacity: 1;
transform: translateY(0);
}
.testimonial-slider {
overflow-x: auto;
scrollbar-width: none;
-ms-overflow-style: none;
}
.testimonial-slider::-webkit-scrollbar {
display: none;
}
.testimonial-track {
display: flex;
gap: 1.5rem;
width: max-content;
padding: 0 1.5rem;
}
.testimonial-card {
width: 320px;
flex-shrink: 0;
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
</style>
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;family=IBM+Plex+Serif:wght@300;400;500;600;700&amp;family=IBM+Plex+Mono:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"></head>

<body class="antialiased text-gray-100 bg-black pb-20">
  <!-- Top Navbar -->
  <header class="fixed w-full z-50 glass-border fade-in">
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

  <!-- Main Cargo Management Section -->
  <section class="min-h-screen bg-[url(https://images.unsplash.com/photo-1659115516377-25ed306a3551?w=2560&amp;q=80)] bg-cover pt-20">
    <div class="max-w-6xl mr-auto ml-auto pt-12 pr-6 pb-12 pl-6">
      <!-- Header Section -->
      <div class="flex items-center justify-between mb-8 animate-on-scroll in-view">
        <!-- Left - Tabs -->
        <div class="flex items-center gap-8 text-sm text-gray-400">
          <button class="hover:text-white transition-colors tab-btn tab-active border-transparent border-b pb-2" data-tab="all-offers">ALL OFFERS</button>
          <button class="hover:text-white transition-colors pb-2 border-b border-transparent tab-btn" data-tab="my-cargo">MY CARGO</button>
          <button class="hover:text-white transition-colors pb-2 border-b border-transparent tab-btn" data-tab="my-quotes">MY QUOTES</button>
          <button class="hover:text-white transition-colors pb-2 border-b border-transparent tab-btn" data-tab="active-deals">ACTIVE DEALS</button>
        </div>
        
        <!-- Right - Actions -->
        <div class="flex items-center gap-4">
          <button class="hover:text-white transition-colors flex items-center gap-2 text-sm text-gray-400 pt-2 pr-6 pb-2 pl-6" onclick="deleteCargo()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="trash-2" class="lucide lucide-trash-2 w-4 h-4" style="stroke-width: 1.5px;"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            Delete Cargo
          </button>
          <button class="glass-border hover:bg-white/5 transition-all flex gap-2 text-sm font-medium text-white bg-gray-900 rounded-lg pt-2 pr-6 pb-2 pl-6 items-center" onclick="openAddCargoModal()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" class="lucide lucide-plus w-4 h-4" style="stroke-width: 1.5px;"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
            Add Cargo
          </button>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="mb-6 animate-on-scroll in-view">
        <div class="relative">
          <input type="text" id="search-input" placeholder="Search cargo..." class="glass-input w-full focus:outline-none focus:ring-0 placeholder-gray-400 text-white rounded-lg pt-3 pr-12 pb-3 pl-12" oninput="toggleClearButton()">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="search" class="lucide lucide-search absolute left-4 top-3.5 w-4 h-4 text-gray-400" style="stroke-width: 1.5px;"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
          <button id="clear-search" class="absolute right-4 top-3.5 text-gray-400 hover:text-white transition-colors hidden" onclick="clearSearch()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>
      </div>

      <!-- Search Filters -->
      <div class="flex gap-4 animate-on-scroll in-view flex-wrap mb-8 items-center">
  <select id="filter-country" class="glass-input focus:outline-none text-sm text-white bg-transparent rounded-lg pt-2 pr-3 pb-2 pl-3" style="color-scheme: dark;">
    <option value="" style="background: #111827; color: white;">All Countries</option>
    <option value="nl" style="background: #111827; color: white;">Netherlands</option>
    <option value="de" style="background: #111827; color: white;">Germany</option>
    <option value="fr" style="background: #111827; color: white;">France</option>
    <option value="be" style="background: #111827; color: white;">Belgium</option>
    <option value="it" style="background: #111827; color: white;">Italy</option>
  </select>
  <select id="filter-sort" class="glass-input focus:outline-none text-sm text-white bg-transparent rounded-lg pt-2 pr-3 pb-2 pl-3" style="color-scheme: dark;">
    <option value="newest" style="background: #111827; color: white;">Newest First</option>
    <option value="oldest" style="background: #111827; color: white;">Oldest First</option>
    <option value="price-high" style="background: #111827; color: white;">Price High to Low</option>
    <option value="price-low" style="background: #111827; color: white;">Price Low to High</option>
  </select>
  <select id="filter-type" class="glass-input px-3 py-2 rounded-lg text-sm text-white bg-transparent focus:outline-none" style="color-scheme: dark;">
    <option value="" style="background: #111827; color: white;">All Types</option>
    <option value="pallets" style="background: #111827; color: white;">Pallets</option>
    <option value="container" style="background: #111827; color: white;">Container</option>
    <option value="bulk" style="background: #111827; color: white;">Bulk</option>
  </select>
  <select id="filter-urgency" class="glass-input focus:outline-none text-sm text-white bg-transparent rounded-lg pt-2 pr-3 pb-2 pl-3" style="color-scheme: dark;">
    <option value="" style="background: #111827; color: white;">All Urgency</option>
    <option value="low" style="background: #111827; color: white;">Low</option>
    <option value="medium" style="background: #111827; color: white;">Medium</option>
    <option value="high" style="background: #111827; color: white;">High</option>
    <option value="urgent" style="background: #111827; color: white;">Urgent</option>
  </select>
  <select id="filter-date" class="glass-input focus:outline-none text-sm text-white bg-transparent rounded-lg pt-2 pr-3 pb-2 pl-3" style="color-scheme: dark;">
    <option value="" style="background: #111827; color: white;">All Dates</option>
    <option value="today" style="background: #111827; color: white;">Today</option>
    <option value="this-week" style="background: #111827; color: white;">This Week</option>
    <option value="this-month" style="background: #111827; color: white;">This Month</option>
  </select>
  <input type="number" id="filter-min" placeholder="Min" class="glass-input px-3 py-2 rounded-lg text-sm text-white bg-transparent focus:outline-none w-20">
  <input type="number" id="filter-max" placeholder="Max" class="glass-input px-3 py-2 rounded-lg text-sm text-white bg-transparent focus:outline-none w-20">
  <button class="text-sm text-gray-400 hover:text-white transition-colors px-3 py-2" onclick="clearAllFilters()">Clear</button>
</div>

      <!-- Main Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll in-view">
  <!-- Cargo Card 1 -->
  <div class="glass-card hover:bg-white/5 transition-all cursor-pointer relative rounded-xl pt-6 pr-6 pb-6 pl-6 group" onclick="openCargoDetailModal(1)">
    <div class="absolute top-4 right-4">
      <span class="text-xs bg-white/10 text-white px-2 py-1 rounded-full font-medium transition-all duration-300 group-hover:bg-yellow-500 group-hover:text-black">Medium</span>
    </div>
    <div class="flex items-start justify-between mb-4 pr-16">
      <h3 class="text-sm font-medium text-white">Electronics Shipment</h3>
      <span class="text-xs text-gray-400">2 hours ago</span>
    </div>
    <div class="mb-4 space-y-3">
      <div class="space-y-2">
        <div class="flex gap-2 text-sm text-gray-300 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-3 h-3 text-green-400" style="stroke-width: 1.5px;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span class="">From: NL Amsterdam 1012</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-3 h-3 text-red-400" style="stroke-width: 1.5px;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span class="">To: DE Berlin 10115</span>
        </div>
      </div>
      <div class="text-xs text-gray-400">Pallets • 2,500 kg • 12.5 m³</div>
    </div>
    <div class="flex items-center justify-between">
      <span class="text-lg font-medium text-white">€1,850</span>
      <span class="text-xs text-gray-400">by TransCorp</span>
    </div>
  </div>

  <!-- Cargo Card 2 -->
  <div class="glass-card hover:bg-white/5 transition-all cursor-pointer relative rounded-xl pt-6 pr-6 pb-6 pl-6 group" onclick="openCargoDetailModal(2)">
    <div class="absolute top-4 right-4">
      <span class="text-xs bg-white/10 text-white px-2 py-1 rounded-full font-medium transition-all duration-300 group-hover:bg-red-500 group-hover:text-white">High</span>
    </div>
    <div class="flex items-start justify-between mb-4 pr-16">
      <h3 class="font-medium text-white text-sm">Food &amp; Beverages</h3>
      <span class="text-xs text-gray-400">5 hours ago</span>
    </div>
    <div class="space-y-3 mb-4">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-3 h-3 text-green-400" style="stroke-width: 1.5px;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span class="">From: DE Berlin 10115</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-3 h-3 text-red-400" style="stroke-width: 1.5px;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span class="">To: FR Paris 75001</span>
        </div>
      </div>
      <div class="text-xs text-gray-400">Container • 15,000 kg • 68.0 m³</div>
    </div>
    <div class="flex items-center justify-between">
      <span class="text-lg font-medium text-white">€3,200</span>
      <span class="text-xs text-gray-400">by FoodLogistics</span>
    </div>
  </div>

  <!-- Cargo Card 3 -->
  <div class="glass-card hover:bg-white/5 transition-all cursor-pointer relative rounded-xl pt-6 pr-6 pb-6 pl-6 group" onclick="openCargoDetailModal(3)">
    <div class="absolute top-4 right-4">
      <span class="text-xs bg-white/10 text-white px-2 py-1 rounded-full font-medium transition-all duration-300 group-hover:bg-green-500 group-hover:text-white">Low</span>
    </div>
    <div class="flex items-start justify-between mb-4 pr-16">
      <h3 class="font-medium text-white text-sm">Construction Materials</h3>
      <span class="text-xs text-gray-400">1 day ago</span>
    </div>
    <div class="space-y-3 mb-4">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-3 h-3 text-green-400" style="stroke-width: 1.5px;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span class="">From: FR Paris 75001</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-3 h-3 text-red-400" style="stroke-width: 1.5px;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span class="">To: IT Rome 00118</span>
        </div>
      </div>
      <div class="text-xs text-gray-400">Bulk • 8,000 kg</div>
    </div>
    <div class="flex items-center justify-between">
      <span class="text-lg font-medium text-white">€2,750</span>
      <span class="text-xs text-gray-400">by BuildCorp</span>
    </div>
  </div>

  <!-- Cargo Card 4 -->
  <div class="glass-card hover:bg-white/5 transition-all cursor-pointer relative rounded-xl pt-6 pr-6 pb-6 pl-6 group" onclick="openCargoDetailModal(4)">
    <div class="absolute top-4 right-4">
      <span class="text-xs bg-white/10 text-white px-2 py-1 rounded-full font-medium transition-all duration-300 group-hover:bg-red-500 group-hover:text-white">High</span>
    </div>
    <div class="flex items-start justify-between mb-4 pr-16">
      <h3 class="text-sm font-medium text-white">Medical Supplies</h3>
      <span class="text-xs text-gray-400">3 hours ago</span>
    </div>
    <div class="mb-4 space-y-3">
      <div class="space-y-2">
        <div class="flex gap-2 text-sm text-gray-300 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-3 h-3 text-green-400" style="stroke-width: 1.5px;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span class="">From: BE Brussels 1000</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-3 h-3 text-red-400" style="stroke-width: 1.5px;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span class="">To: NL Utrecht 3511</span>
        </div>
      </div>
      <div class="text-xs text-gray-400">Refrigerated • 1,200 kg • 5.2 m³</div>
    </div>
    <div class="flex items-center justify-between">
      <span class="text-lg font-medium text-white">€950</span>
      <span class="text-xs text-gray-400">by MedTrans</span>
    </div>
  </div>

  <!-- Cargo Card 5 -->
  <div class="glass-card hover:bg-white/5 transition-all cursor-pointer relative group rounded-xl pt-6 pr-6 pb-6 pl-6" onclick="openCargoDetailModal(5)">
    <div class="absolute top-4 right-4">
      <span class="text-xs bg-white/10 text-white px-2 py-1 rounded-full font-medium transition-all duration-300 group-hover:bg-green-500 group-hover:text-white">Low</span>
    </div>
    <div class="flex items-start justify-between mb-4 pr-16">
      <h3 class="font-medium text-white text-sm">Automotive Parts</h3>
      <span class="text-xs text-gray-400">6 hours ago</span>
    </div>
    <div class="space-y-3 mb-4">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-3 h-3 text-green-400" style="stroke-width: 1.5px;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span class="">From: DE Munich 80331</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-3 h-3 text-red-400" style="stroke-width: 1.5px;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span class="">To: FR Lyon 69001</span>
        </div>
      </div>
      <div class="text-xs text-gray-400">Pallets • 3,800 kg • 18.3 m³</div>
    </div>
    <div class="flex items-center justify-between">
      <span class="text-lg font-medium text-white">€2,150</span>
      <span class="text-xs text-gray-400">by AutoLogistics</span>
    </div>
  </div>

  <!-- Cargo Card 6 -->
  <div class="glass-card hover:bg-white/5 transition-all cursor-pointer relative rounded-xl pt-6 pr-6 pb-6 pl-6 group" onclick="openCargoDetailModal(6)">
    <div class="absolute top-4 right-4">
      <span class="text-xs bg-white/10 text-white px-2 py-1 rounded-full font-medium transition-all duration-300 group-hover:bg-yellow-500 group-hover:text-black">Medium</span>
    </div>
    <div class="flex items-start justify-between mb-4 pr-16">
      <h3 class="font-medium text-white text-sm">Textile Products</h3>
      <span class="text-xs text-gray-400">8 hours ago</span>
    </div>
    <div class="space-y-3 mb-4">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-3 h-3 text-green-400" style="stroke-width: 1.5px;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span class="">From: IT Milan 20121</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-3 h-3 text-red-400" style="stroke-width: 1.5px;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span class="">To: DE Hamburg 20095</span>
        </div>
      </div>
      <div class="text-xs text-gray-400">Container • 6,500 kg • 42.8 m³</div>
    </div>
    <div class="flex items-center justify-between">
      <span class="text-lg font-medium text-white">€1,980</span>
      <span class="text-xs text-gray-400">by FashionFreight</span>
    </div>
  </div>
</div>

<!-- Add Cargo Modal -->
  <div id="add-cargo-modal" class="modal">
    <div class="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl mr-4 ml-4 pt-6 pr-6 pb-6 pl-6">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-xl font-bold text-white">Add New Cargo</h2>
    <button onclick="closeAddCargoModal()" class="text-gray-400 hover:text-white transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="x" class="lucide lucide-x w-[20px] h-[20px]" style="stroke-width: 1.5px; width: 20px; height: 20px; color: rgb(255, 255, 255);"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
    </button>
  </div>

  <form class="space-y-8">
    <!-- Cargo Details -->
    <div class="space-y-4">
      <h3 class="text-base font-medium text-gray-300">Cargo Details</h3>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="">
          <label class="block text-xs text-gray-400 mb-2">Cargo Title</label>
          <input type="text" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter cargo title">
        </div>
        <div class="">
          <label class="block text-xs text-gray-400 mb-2">Cargo Type</label>
          <select class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
            <option value="" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Select cargo type</option>
            <option value="pallets" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Pallets</option>
            <option value="container" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Container</option>
            <option value="bulk" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Bulk</option>
            <option value="refrigerated" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Refrigerated</option>
            <option value="hazardous" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Hazardous</option>
          </select>
        </div>
        <div class="">
          <label class="block text-xs text-gray-400 mb-2">Weight (kg) *</label>
          <input type="number" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter weight" required="">
        </div>
        <div class="">
          <label class="block text-xs text-gray-400 mb-2">Volume (m³)</label>
          <input type="number" step="0.1" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter volume (optional)">
        </div>
        <div class="">
          <label class="block text-xs text-gray-400 mb-2">Vehicle Type</label>
          <select class="glass-input w-full focus:outline-none text-white bg-transparent rounded-lg pt-2 pr-3 pb-2 pl-3">
            <option value="" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Select vehicle type</option>
            <option value="van" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Van</option>
            <option value="truck" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Truck</option>
            <option value="trailer" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Trailer</option>
            <option value="refrigerated-truck" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Refrigerated Truck</option>
            <option value="flatbed" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Flatbed</option>
          </select>
        </div>
        <div class="">
          <label class="block text-xs text-gray-400 mb-2">Urgency Level</label>
          <select class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
            <option value="low" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Low</option>
            <option value="medium" selected="" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Medium</option>
            <option value="high" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">High</option>
            <option value="urgent" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Urgent</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Route Information -->
    <div class="space-y-4">
      <h3 class="text-base font-medium text-gray-300">Route Information</h3>
      <div class="grid md:grid-cols-2 gap-8">
        <!-- From Section -->
        <div class="space-y-4">
          <h4 class="text-xs text-gray-400 font-medium">FROM</h4>
          <div class="space-y-3">
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">From Address</label>
              <input type="text" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter pickup address" required="">
            </div>
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">City</label>
              <input type="text" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter city">
            </div>
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">Postal Code</label>
              <input type="text" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter postal code">
            </div>
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">Country</label>
              <select class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
                <option value="" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Select country</option>
                <option value="nl" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Netherlands</option>
                <option value="de" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Germany</option>
                <option value="fr" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">France</option>
                <option value="be" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Belgium</option>
                <option value="it" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Italy</option>
              </select>
            </div>
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">Pickup Date</label>
              <input type="date" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white">
            </div>
          </div>
        </div>

        <!-- To Section -->
        <div class="space-y-4">
          <h4 class="text-xs text-gray-400 font-medium">TO</h4>
          <div class="space-y-3">
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">To Address</label>
              <input type="text" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter delivery address" required="">
            </div>
            <div>
              <label class="block text-xs text-gray-400 mb-2">City</label>
              <input type="text" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter city">
            </div>
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">Postal Code</label>
              <input type="text" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter postal code">
            </div>
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">Country</label>
              <select class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
                <option value="" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Select country</option>
                <option value="nl" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Netherlands</option>
                <option value="de" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Germany</option>
                <option value="fr" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">France</option>
                <option value="be" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Belgium</option>
                <option value="it" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Italy</option>
              </select>
            </div>
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">Delivery Date</label>
              <input type="date" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing & Additional Info -->
    <div class="space-y-4">
      <h3 class="text-base font-medium text-gray-300">Pricing &amp; Additional Information</h3>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="">
          <label class="block text-xs text-gray-400 mb-2">Budget (EUR)</label>
          <input type="number" class="glass-input w-full focus:outline-none placeholder-gray-400 text-white rounded-lg pt-2 pr-3 pb-2 pl-3" placeholder="Enter price">
        </div>
        <div class="">
          <label class="block text-xs text-gray-400 mb-2">Special Requirements</label>
          </div></div></div></form></div></div></div>
  </section>

  <!-- Add Cargo Modal -->
  <div id="add-cargo-modal" class="modal">
    <div class="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl mr-4 ml-4 pt-6 pr-6 pb-6 pl-6">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-xl font-bold text-white">Add New Cargo</h2>
    <button onclick="closeAddCargoModal()" class="text-gray-400 hover:text-white transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="x" class="lucide lucide-x w-[20px] h-[20px]" style="stroke-width: 1.5px; width: 20px; height: 20px; color: rgb(255, 255, 255);"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
    </button>
  </div>

  <form class="space-y-8">
    <!-- Cargo Details -->
    <div class="space-y-4">
      <h3 class="text-base font-medium text-gray-300">Cargo Details</h3>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="">
          <label class="block text-xs text-gray-400 mb-2">Cargo Title</label>
          <input type="text" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter cargo title">
        </div>
        <div class="">
          <label class="block text-xs text-gray-400 mb-2">Cargo Type</label>
          <select class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
            <option value="" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Select cargo type</option>
            <option value="pallets" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Pallets</option>
            <option value="container" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Container</option>
            <option value="bulk" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Bulk</option>
            <option value="refrigerated" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Refrigerated</option>
            <option value="hazardous" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Hazardous</option>
          </select>
        </div>
        <div class="">
          <label class="block text-xs text-gray-400 mb-2">Weight (kg) *</label>
          <input type="number" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter weight" required="">
        </div>
        <div class="">
          <label class="block text-xs text-gray-400 mb-2">Volume (m³)</label>
          <input type="number" step="0.1" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter volume (optional)">
        </div>
        <div class="">
          <label class="block text-xs text-gray-400 mb-2">Vehicle Type</label>
          <select class="glass-input w-full focus:outline-none text-white bg-transparent rounded-lg pt-2 pr-3 pb-2 pl-3">
            <option value="" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Select vehicle type</option>
            <option value="van" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Van</option>
            <option value="truck" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Truck</option>
            <option value="trailer" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Trailer</option>
            <option value="refrigerated-truck" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Refrigerated Truck</option>
            <option value="flatbed" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Flatbed</option>
          </select>
        </div>
        <div class="">
          <label class="block text-xs text-gray-400 mb-2">Urgency Level</label>
          <select class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
            <option value="low" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Low</option>
            <option value="medium" selected="" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Medium</option>
            <option value="high" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">High</option>
            <option value="urgent" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Urgent</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Route Information -->
    <div class="space-y-4">
      <h3 class="text-base font-medium text-gray-300">Route Information</h3>
      <div class="grid md:grid-cols-2 gap-8">
        <!-- From Section -->
        <div class="space-y-4">
          <h4 class="text-xs text-gray-400 font-medium">FROM</h4>
          <div class="space-y-3">
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">From Address</label>
              <input type="text" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter pickup address" required="">
            </div>
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">City</label>
              <input type="text" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter city">
            </div>
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">Postal Code</label>
              <input type="text" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter postal code">
            </div>
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">Country</label>
              <select class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
                <option value="" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Select country</option>
                <option value="nl" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Netherlands</option>
                <option value="de" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Germany</option>
                <option value="fr" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">France</option>
                <option value="be" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Belgium</option>
                <option value="it" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Italy</option>
              </select>
            </div>
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">Pickup Date</label>
              <input type="date" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white">
            </div>
          </div>
        </div>

        <!-- To Section -->
        <div class="space-y-4">
          <h4 class="text-xs text-gray-400 font-medium">TO</h4>
          <div class="space-y-3">
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">To Address</label>
              <input type="text" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter delivery address" required="">
            </div>
            <div>
              <label class="block text-xs text-gray-400 mb-2">City</label>
              <input type="text" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter city">
            </div>
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">Postal Code</label>
              <input type="text" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter postal code">
            </div>
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">Country</label>
              <select class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
                <option value="" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Select country</option>
                <option value="nl" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Netherlands</option>
                <option value="de" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Germany</option>
                <option value="fr" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">France</option>
                <option value="be" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Belgium</option>
                <option value="it" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Italy</option>
              </select>
            </div>
            <div class="">
              <label class="block text-xs text-gray-400 mb-2">Delivery Date</label>
              <input type="date" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing & Additional Info -->
    <div class="space-y-4">
      <h3 class="text-base font-medium text-gray-300">Pricing &amp; Additional Information</h3>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="">
          <label class="block text-xs text-gray-400 mb-2">Budget (EUR)</label>
          <input type="number" class="glass-input w-full focus:outline-none placeholder-gray-400 text-white rounded-lg pt-2 pr-3 pb-2 pl-3" placeholder="Enter price">
        </div>
        <div class="">
          <label class="block text-xs text-gray-400 mb-2">Special Requirements</label>
          <select class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
            <option value="" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">No special requirements</option>
            <option value="refrigerated" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Refrigerated transport</option>
            <option value="fragile" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Fragile goods</option>
            <option value="hazardous" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Hazardous materials</option>
            <option value="oversized" style="background: rgb(17, 24, 39); color: rgb(255, 255, 255);">Oversized cargo</option>
          </select>
        </div>
      </div>
      <div class="">
        <label class="block text-xs text-gray-400 mb-2">Additional Notes</label>
        <textarea rows="4" class="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400 resize-none" placeholder="Add any additional information or special instructions..."></textarea>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex items-center justify-end gap-4 pt-4 border-t border-gray-700">
      <button type="button" onclick="closeAddCargoModal()" class="px-6 py-2 text-sm text-gray-400 hover:text-white transition-colors">
        Cancel
      </button>
      <button type="submit" class="glass-border hover:bg-white/5 transition-all px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg">
        Add Cargo
      </button>
    </div>
  </form>
</div>
  </div>

  <!-- Cargo Detail Modal -->
  <div id="cargo-detail-modal" class="modal">
    <div class="glass-card max-w-3xl w-full max-h-[90vh] rounded-xl mr-4 ml-4 pt-6 pr-6 pb-6 pl-6" style="overflow-y: scroll; scrollbar-width: none; -ms-overflow-style: none;">
  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-3">
      <div>
        <h2 class="text-xl font-medium text-white">Electronics Shipment</h2>
        <p class="text-sm text-white">Posted 2 hours ago by TransCorp</p>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <div class="flex gap-2 bg-neutral-50/10 border-white/20 border rounded-full pt-1 pr-3 pb-1 pl-3 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[12px] h-[12px] text-green-500" style="width: 12px; height: 12px;"><path d="m9 12 2 2 4-4" class=""></path><circle cx="12" cy="12" r="9" class=""></circle></svg>
        <span class="text-xs font-medium text-green-500">Verified</span>
      </div>
      <button onclick="closeCargoDetailModal()" class="text-white hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[24px] h-[24px]" style="width: 24px; height: 24px; color: rgb(255, 255, 255);"><path d="M18 6 6 18" class=""></path><path d="m6 6 12 12" class=""></path></svg>
      </button>
    </div>
  </div>

  <div class="space-y-6">
    <!-- Cargo Details Section -->
    <div class="glass-border rounded-lg p-4">
      <h3 class="text-sm font-medium text-gray-300 mb-3">Cargo Details</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="">
          <p class="text-xs text-white mb-1">Weight &amp; Volume</p>
          <p class="text-sm text-white">2,500 kg • 12.5 m³</p>
        </div>
        <div class="">
          <p class="text-xs text-white mb-1">Cargo Type | Urgency</p>
          <p class="text-sm text-white">Pallets | Medium</p>
        </div>
        <div class="">
          <p class="text-xs text-white mb-1">Loading Date</p>
          <p class="text-sm text-white">Dec 28, 2024</p>
        </div>
        <div class="">
          <p class="text-xs text-white mb-1">Delivery Date</p>
          <p class="text-sm text-white">Dec 30, 2024</p>
        </div>
      </div>
    </div>

    <!-- Distance Information Section -->
    <div class="glass-border rounded-lg p-4">
      <h3 class="text-sm font-medium text-gray-300 mb-3">Distance Information</h3>
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <div class="">
            <p class="text-xs text-white">From</p>
            <p class="text-sm text-white">Weesperstraat 105, 1018 VN Amsterdam, Netherlands</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <div class="">
            <p class="text-xs text-white">To</p>
            <p class="text-sm text-white">Potsdamer Platz 1, 10785 Berlin, Germany</p>
          </div>
        </div>
        <button class="glass-border hover:bg-white/5 transition-all w-full text-sm text-white rounded-lg mt-3 pt-2 pr-4 pb-2 pl-4">
          View full route (≈ 1.4k km)
        </button>
      </div>
    </div>

    <!-- Cost Details Section -->
    <div class="glass-border rounded-lg p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-medium text-gray-300">Cost Details</h3>
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M9.663 17h4.673M12 3v1m6.21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386z"></path></svg>
          <span class="text-xs text-white font-medium">Pro AI Analysis</span>
          <button class="text-white hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=""><path d="m6 9 6 6 6-6"></path></svg>
          </button>
        </div>
      </div>
      
      <div class="space-y-4">
        <div class="">
          <p class="text-xs text-white mb-2">Estimated Costs</p>
          <div class="space-y-1 text-sm">
            <div class="flex justify-between text-gray-300">
              <span class="">Fuel &amp; vehicle (1385km × €1.20/km):</span>
              <span class="">€1,662.00</span>
            </div>
            <div class="flex justify-between text-gray-300">
              <span>Driver pay (17.31h × €25.00/h):</span>
              <span>€432.75</span>
            </div>
            <div class="flex justify-between text-gray-300">
              <span>Insurance &amp; fees:</span>
              <span>€80.00</span>
            </div>
            <div class="border-t border-gray-700 pt-2 mt-2">
              <div class="flex justify-between text-white font-medium">
                <span>Total Cost:</span>
                <span class="">€2,174.75</span>
              </div>
            </div>
          </div>
        </div>

        <div class="">
          <p class="text-xs text-white mb-2">Profit Analysis</p>
          <div class="space-y-1 text-sm">
            <div class="flex justify-between text-gray-300">
              <span>Agent recommendation:</span>
              <span class="text-white">€2,500.96</span>
            </div>
            <div class="flex justify-between text-gray-300">
              <span>Profit at recommendation:</span>
              <span class="text-white">€326.21</span>
            </div>
            <div class="flex justify-between text-gray-300">
              <span>Posted price:</span>
              <span class="text-white">€1,850.00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-300">Your profit at posted price:</span>
              <span class="text-red-500">€-324.75 (-14.9%)</span>
            </div>
          </div>
        </div>

        <div class="flex gap-2 items-center">
          <span class="text-xs text-white">Profit Assessment:</span>
          <span class="text-xs text-red-500 bg-white/10 border-white/20 border rounded pt-1 pr-2 pb-1 pl-2">Low</span>
        </div>

        <div class="bg-gray-800/50 rounded-lg p-3">
          <p class="text-xs text-white mb-1">Additional Notes &amp; Estimates</p>
          <p class="text-xs text-gray-300">Consider negotiating higher rate due to premium electronics cargo and temperature control requirements.</p>
        </div>
      </div>
    </div>

    <!-- Quote Status Section -->
    <div class="glass-border rounded-lg p-4">
      <h3 class="text-sm font-medium text-gray-300 mb-2">Quote Status</h3>
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
        <span class="text-sm text-gray-300">3 quotes submitted • Awaiting shipper response</span>
      </div>
    </div>

    <!-- Description -->
    <div class="glass-border rounded-lg p-4">
      <h3 class="text-sm font-medium text-gray-300 mb-2">Description</h3>
      <p class="text-sm text-white">High-value electronics requiring careful handling and temperature-controlled transport. Pickup between 8-10 AM, delivery before 6 PM.</p>
    </div>

    <!-- Action Buttons -->
    <div class="grid grid-cols-2 gap-3 pt-4 border-t border-gray-700">
      <button class="glass-border hover:bg-white/5 transition-all px-4 py-3 text-sm font-medium text-white bg-gray-900 rounded-lg flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" x2="8" y1="13" y2="13"></line><line x1="16" x2="8" y1="17" y2="17"></line><line x1="10" x2="8" y1="9" y2="9"></line></svg>
        Send Quote
      </button>
      <button class="glass-border hover:bg-white/5 transition-all px-4 py-3 text-sm font-medium text-white rounded-lg flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        Chat with Shipper
      </button>
      <button class="glass-border hover:bg-white/5 transition-all px-4 py-2 text-sm text-white hover:text-white rounded-lg flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"></path></svg>
        Save for Later
      </button>
      <button class="glass-border hover:bg-white/5 transition-all px-4 py-2 text-sm text-white hover:text-white rounded-lg flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=""><path d="M3 6h18l-2 13H5L3 6z" class=""></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        Ignore
      </button>
    </div>
  </div>
  <style>
    #aura-emdxfw9ax::-webkit-scrollbar {
      display: none;
    }
  </style>
</div>
  </div>

  <!-- JavaScript -->
  <script>
    // Initialize Lucide icons
    lucide.createIcons();

    // Tab functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all tabs
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('tab-active'));
        // Add active class to clicked tab
        this.classList.add('tab-active');
        
        // Here you would typically filter the cargo grid based on the selected tab
        const tabType = this.getAttribute('data-tab');
        console.log('Switched to tab:', tabType);
      });
    });

    // Modal functions
    function openAddCargoModal() {
      document.getElementById('add-cargo-modal').classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeAddCargoModal() {
      document.getElementById('add-cargo-modal').classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    function openCargoDetailModal(cargoId) {
      const modal = document.getElementById('cargo-detail-modal');
      const content = document.getElementById('cargo-detail-content');
      
      // Sample cargo data (in a real app, this would come from an API)
      const cargoData = {
        1: {
          title: 'Electronics Shipment',
          company: 'TransCorp',
          price: '€1,850',
          time: '2 hours ago',
          from: 'Amsterdam, Netherlands 1012',
          to: 'Berlin, Germany 10115',
          type: 'Pallets',
          weight: '2,500 kg',
          urgency: 'Medium',
          description: 'High-value electronics requiring careful handling and temperature-controlled transport.'
        },
        2: {
          title: 'Food & Beverages',
          company: 'FoodLogistics',
          price: '€3,200',
          time: '5 hours ago',
          from: 'Berlin, Germany 10115',
          to: 'Paris, France 75001',
          type: 'Container',
          weight: '15,000 kg',
          urgency: 'High',
          description: 'Perishable goods requiring refrigerated transport and quick delivery.'
        },
        3: {
          title: 'Construction Materials',
          company: 'BuildCorp',
          price: '€2,750',
          time: '1 day ago',
          from: 'Paris, France 75001',
          to: 'Rome, Italy 00118',
          type: 'Bulk',
          weight: '8,000 kg',
          urgency: 'Low',
          description: 'Heavy construction materials for building project. Requires specialized vehicle.'
        }
      };

      const cargo = cargoData[cargoId];
      if (cargo) {
        content.innerHTML = `
          <div class="flex items-start justify-between mb-6">
            <div>
              <h3 class="text-lg font-medium text-white mb-2">${cargo.title}</h3>
              <p class="text-sm text-gray-400">Posted ${cargo.time} by ${cargo.company}</p>
            </div>
            <span class="text-2xl font-medium text-white">${cargo.price}</span>
          </div>

          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-300 mb-2">Route</h4>
                <div class="space-y-2">
                  <div class="flex items-center gap-2 text-sm text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-3 h-3 text-green-400" style="stroke-width: 1.5px;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>From: ${cargo.from}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-3 h-3 text-red-400" style="stroke-width: 1.5px;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>To: ${cargo.to}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-300 mb-2">Cargo Details</h4>
                <div class="space-y-2 text-sm text-gray-300">
                  <div>Type: ${cargo.type}</div>
                  <div>Weight: ${cargo.weight}</div>
                  <div>Urgency: ${cargo.urgency}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-6">
            <h4 class="text-sm font-medium text-gray-300 mb-2">Description</h4>
            <p class="text-sm text-gray-400">${cargo.description}</p>
          </div>

          <div class="flex items-center justify-end gap-4 pt-4 border-t border-gray-700">
            <button class="px-6 py-2 text-sm text-gray-400 hover:text-white transition-colors">
              Contact ${cargo.company}
            </button>
            <button class="glass-border hover:bg-white/5 transition-all px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg">
              Submit Quote
            </button>
          </div>
        `;
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeCargoDetailModal() {
      document.getElementById('cargo-detail-modal').classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    function deleteCargo() {
      if (confirm('Are you sure you want to delete the selected cargo?')) {
        console.log('Cargo deleted');
        // Here you would implement the actual delete functionality
      }
    }

    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === this) {
          this.classList.remove('active');
          document.body.style.overflow = 'auto';
        }
      });
    });

    // Form submission
    document.querySelector('#add-cargo-modal form').addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Cargo added successfully');
      closeAddCargoModal();
      // Here you would implement the actual form submission
    });

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  </script>

</body></html>