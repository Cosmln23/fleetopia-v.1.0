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
          <span>Home</span>
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

  <!-- Hero -->
  <section class="min-h-screen flex flex-col bg-[url(https://images.unsplash.com/photo-1659115516377-25ed306a3551?w=2560&amp;q=80)] bg-cover pt-16 pr-6 pl-6 items-center justify-center">
    
    <h1 class="md:text-7xl slide-up delay-400 text-4xl font-normal text-white tracking-tight font-serif text-center mb-4">Fleetopia</h1>
    <p class="max-w-md fade-in delay-600 text-2xl text-gray-400 text-center mb-12">How can we help you today? Pick your path below.</p>
    <div class="flex gap-4 items-center">
  <a href="#transport-cargo" class="glass-border hover:bg-white/5 transition-all flex items-center gap-2 text-sm font-medium bg-gray-900 text-white rounded-lg px-6 py-2 slide-left delay-800">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="package" class="lucide lucide-package w-4 h-4" style="stroke-width: 1.5px;"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
    I have cargo to transport
  </a>
  <a href="#find-cargo" class="hover:text-white transition-colors flex items-center gap-2 text-sm text-gray-400 px-6 py-2 slide-right delay-1000">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="search" class="lucide lucide-search w-4 h-4" style="stroke-width: 1.5px;"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
    I'm looking for cargo to transport
  </a>
</div>
  </section>

  <!-- About -->
  <section id="about" class="max-w-4xl mr-auto ml-auto pt-24 pr-6 pb-24 pl-6">
  <div class="flex items-center gap-3 mb-12 animate-on-scroll in-view">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="zap" class="lucide lucide-zap w-5 h-5 text-gray-400" style="stroke-width: 1.5px;"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
    <h2 class="text-xl font-medium text-white">Quick Actions</h2>
  </div>
  
  <div class="grid md:grid-cols-3 gap-6">
    <!-- Post Cargo Fast -->
    <div class="glass-card p-6 rounded-xl hover:bg-white/5 transition-all cursor-pointer animate-on-scroll in-view">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 flex bg-slate-300/10 rounded-lg items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="package" class="lucide lucide-package w-[20px] h-[20px]" style="stroke-width: 1.5px; width: 20px; height: 20px;"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
        </div>
        <h3 class="font-medium text-white">I have cargo to transport</h3>
      </div>
      <p class="text-sm text-gray-300 mb-4">Quick cargo posting with AI-powered route optimization and instant carrier matching.</p>
      <div class="flex gap-2 text-xs text-gray-400 items-center">
        <span class="">Get started</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="arrow-right" class="lucide lucide-arrow-right w-3 h-3" style="stroke-width: 1.5px;"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
      </div>
    </div>

    <!-- Find Loads -->
    <div class="glass-card p-6 rounded-xl hover:bg-white/5 transition-all cursor-pointer animate-on-scroll in-view">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 flex bg-gray-400/10 rounded-lg items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="search" class="lucide lucide-search w-[20px] h-[20px]" style="stroke-width: 1.5px; width: 20px; height: 20px; color: rgb(156, 163, 175);"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
        </div>
        <h3 class="font-medium text-white">I'm looking for cargo to transport</h3>
      </div>
      <p class="text-sm text-gray-300 mb-4">Browse available cargo loads with smart filtering and real-time availability updates.</p>
      <div class="flex gap-2 text-xs text-gray-400 items-center">
        <span class="">Search loads</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="arrow-right" class="lucide lucide-arrow-right w-3 h-3" style="stroke-width: 1.5px;"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
      </div>
    </div>

    <!-- Messages/Notifications -->
    <div class="glass-card hover:bg-white/5 transition-all cursor-pointer animate-on-scroll in-view rounded-xl pt-6 pr-6 pb-6 pl-6">
  <!-- Conditional: Show tracking card for logged-in users with active shipments -->
  <div class="flex items-center gap-3 mb-4">
    <div class="w-12 h-12 flex bg-gray-400/10 rounded-lg items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-[20px] h-[20px] text-gray-400" style="stroke-width: 1.5px; width: 20px; height: 20px;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
    </div>
    <h3 class="font-medium text-white">Track My Shipments</h3>
  </div>
  <p class="text-sm text-gray-300 mb-4">Monitor your active shipments in real-time.</p>
  <div class="flex gap-2 text-xs text-gray-400 items-center">
    <span>View shipments</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="arrow-right" class="lucide lucide-arrow-right w-3 h-3" style="stroke-width: 1.5px;"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
  </div>
</div>
  </div>
</section>

  <!-- Projects -->
  <section id="projects" class="pt-24 pb-24">
    <div class="max-w-5xl mx-auto px-6">
  <div class="flex items-center gap-3 mb-12 animate-on-scroll in-view">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="play-circle" class="lucide lucide-play-circle w-5 h-5 text-gray-400" style="stroke-width: 1.5px;"><path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"></path><circle cx="12" cy="12" r="10"></circle></svg>
    <h2 class="text-xl font-medium text-gray-400">How It Works</h2>
  </div>
  
  <div class="space-y-6">
    <!-- Step 1 -->
    <div class="glass-card p-6 rounded-xl hover:bg-white/5 transition-all group animate-on-scroll in-view">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-gray-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <span class="text-xl font-medium text-gray-400">1</span>
          </div>
          <div class="">
            <h3 class="font-medium text-gray-400 mb-1">Post or Find</h3>
            <p class="text-sm text-gray-400">Whether you have cargo to ship or you're looking for loads to transport, get started in seconds. Post your shipment details or browse thousands of available cargo opportunities.</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="p-2 bg-gray-400/10 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="search" class="lucide lucide-search w-4 h-4 text-gray-400" style="stroke-width: 1.5px;"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <span class="text-xs text-gray-400 bg-gray-400/10 px-2 py-1 rounded">Post Cargo Fast</span>
        <span class="text-xs text-gray-400 bg-gray-400/10 px-2 py-1 rounded">Find Loads</span>
        <span class="text-xs text-gray-400 bg-gray-400/10 px-2 py-1 rounded">Marketplace</span>
      </div>
    </div>

    <!-- Step 2 -->
    <div class="glass-card p-6 rounded-xl hover:bg-white/5 transition-all group animate-on-scroll in-view">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-gray-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <span class="text-xl font-medium text-gray-400">2</span>
          </div>
          <div class="">
            <h3 class="font-medium text-gray-400 mb-1">Connect &amp; Quote</h3>
            <p class="text-sm text-gray-400">Connect with verified partners and send competitive quotes. Use our built-in chat system to negotiate terms and finalize details before accepting any deal.</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="p-2 bg-gray-400/10 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="dollar-sign" class="lucide lucide-dollar-sign w-4 h-4 text-gray-400" style="stroke-width: 1.5px;"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <span class="text-xs text-gray-400 bg-gray-400/10 px-2 py-1 rounded">Send Quote</span>
        <span class="text-xs text-gray-400 bg-gray-400/10 px-2 py-1 rounded">My Quotes</span>
        <span class="text-xs text-gray-400 bg-gray-400/10 px-2 py-1 rounded">Chat Interface</span>
      </div>
    </div>

    <!-- Step 3 -->
    <div class="glass-card hover:bg-white/5 transition-all group animate-on-scroll in-view rounded-xl pt-6 pr-6 pb-6 pl-6">
  <div class="flex items-start justify-between mb-4">
    <div class="flex items-start gap-4">
      <div class="w-12 h-12 bg-gray-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
        <span class="text-xl font-medium text-gray-400">3</span>
      </div>
      <div>
        <h3 class="font-medium text-gray-400 mb-1">Track &amp; Complete</h3>
        <p class="text-sm text-gray-400">Monitor shipments in real-time with GPS tracking, automated status updates, and seamless communication. Complete transactions securely with integrated payment processing.</p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <div class="p-2 bg-gray-400/10 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-4 h-4 text-gray-400" style="stroke-width: 1.5px;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
      </div>
    </div>
  </div>
  <div class="flex gap-2">
    <span class="text-xs text-gray-400 bg-gray-400/10 px-2 py-1 rounded">Live Tracking</span>
    <span class="text-xs text-gray-400 bg-gray-400/10 px-2 py-1 rounded">Status Updates</span>
    <span class="text-xs text-gray-400 bg-gray-400/10 px-2 py-1 rounded">Active Deals</span>
    <span class="text-xs text-gray-400 bg-gray-400/10 px-2 py-1 rounded">Secure Payment</span>
  </div>
</div>
  </div>
</div>
  </section>

  <!-- Testimonials Section -->
  <section id="testimonials" class="pt-24 pb-24">
    <div class="max-w-6xl mr-auto ml-auto pr-6 pl-6">
      <div class="flex items-center gap-3 mb-12 animate-on-scroll in-view">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="star" class="lucide lucide-star w-5 h-5 text-gray-400" style="stroke-width: 1.5px;"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
        <h2 class="text-xl font-medium text-white">What Our Users Say</h2>
      </div>
      
      <div class="testimonial-slider animate-on-scroll in-view">
        <div class="testimonial-track">
          <!-- Testimonial 1 -->
          <div class="testimonial-card glass-card p-6 rounded-xl">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-gray-400/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="truck" class="lucide lucide-truck w-5 h-5 text-gray-400" style="stroke-width: 1.5px;"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>
              </div>
              <div>
                <h4 class="font-medium text-white">Michael Rodriguez</h4>
                <p class="text-sm text-gray-400">Fleet Owner</p>
              </div>
            </div>
            <p class="text-sm text-gray-300 mb-4">"Fleetopia has revolutionized how we find loads. The AI matching system connects us with perfect cargo opportunities, and we've increased our efficiency by 40%."</p>
            <div class="flex gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-yellow-400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-yellow-400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-yellow-400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-yellow-400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-yellow-400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon></svg>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div class="testimonial-card glass-card p-6 rounded-xl">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-gray-400/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="package" class="lucide lucide-package w-5 h-5 text-gray-400" style="stroke-width: 1.5px;"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
              </div>
              <div>
                <h4 class="font-medium text-white">Sarah Chen</h4>
                <p class="text-sm text-gray-400">Logistics Manager</p>
              </div>
            </div>
            <p class="text-sm text-gray-300 mb-4">"The speed of posting cargo and receiving quotes is incredible. What used to take hours now takes minutes. Our supply chain has never been more efficient."</p>
            <div class="flex gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-yellow-400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" class=""></polygon></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-yellow-400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-yellow-400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-yellow-400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-yellow-400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon></svg>
            </div>
          </div>

          <!-- Testimonial 3 -->
          <div class="testimonial-card glass-card p-6 rounded-xl">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-gray-400/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="users" class="lucide lucide-users w-5 h-5 text-gray-400" style="stroke-width: 1.5px;"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
              </div>
              <div>
                <h4 class="font-medium text-white">David Thompson</h4>
                <p class="text-sm text-gray-400">Independent Trucker</p>
              </div>
            </div>
            <p class="text-sm text-gray-300 mb-4">"As an independent driver, Fleetopia helps me stay competitive. The transparent pricing and easy communication make every deal smooth and profitable."</p>
            <div class="flex gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-yellow-400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-yellow-400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-yellow-400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-yellow-400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-yellow-400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="max-w-6xl mx-auto px-6 pt-16 pb-8">
    <div class="glass-border rounded-xl p-8">
      <div class="flex flex-col md:flex-row justify-between items-start gap-8">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <span class="font-medium text-white text-lg">Fleetopia</span>
          </div>
          <p class="max-w-md text-sm text-gray-400">Connecting shippers and carriers through intelligent freight matching. Fast, reliable, and efficient logistics solutions for modern transportation needs.</p>
        </div>
        
        <div class="flex gap-12 text-sm">
          <div class="flex flex-col gap-3">
            <h4 class="font-medium text-white">Platform</h4>
            <a href="#marketplace" class="text-gray-400 hover:text-white transition-colors">Marketplace</a>
            <a href="#dispatcher" class="text-gray-400 hover:text-white transition-colors">Dispatcher</a>
            <a href="#tracking" class="text-gray-400 hover:text-white transition-colors">Live Tracking</a>
          </div>
          
          <div class="flex flex-col gap-3">
            <h4 class="font-medium text-white">Support</h4>
            <a href="#help" class="text-gray-400 hover:text-white transition-colors">Help Center</a>
            <a href="#contact" class="text-gray-400 hover:text-white transition-colors">Contact Us</a>
            <a href="#api" class="text-gray-400 hover:text-white transition-colors">API Docs</a>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs text-gray-500">© 2024 Fleetopia. All rights reserved.</p>
        <div class="flex gap-6 text-xs text-gray-500">
          <a href="#privacy" class="hover:text-gray-400 transition-colors">Privacy Policy</a>
          <a href="#terms" class="hover:text-gray-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- JavaScript for animations and interactions -->
  <script>
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Scroll animation observer
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
    
    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  </script>

</body></html>s