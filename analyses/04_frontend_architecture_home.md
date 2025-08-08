## Analiza 1 — Frontend Architecture & Home

Coverage (estimare): 78%

Implementat
- App Router + layout global cu `Header` și `BottomNav` (glassmorphism, fixed): da
- Navigare principală: Home, Marketplace, Dispatcher, Settings: da
- i18n (Zustand) + efecte `AnimateOnScroll` pe paginile principale: da
- Home: Hero, Quick Actions, How It Works, Testimonials: da
- API `/api/home-data` (stub) conectat: da

Lipsă / Incomplet
- Top Bar cu Profil integrat prin Clerk (autentificare reală): lipsă
- Quick Actions dinamice condiționate de login/rol (count deals): lipsă
- „Am marfă de transportat” → deschide AddCargoModal direct: parțial (merge spre marketplace addOpen, dar fără persist real)
- Acces vizual Trial/Pro prezent, dar fără enforcement real: lipsă

To‑Do (neimplementat)
- Integrare Clerk (frontend) + user menu în `Header` (avatar, profile, sign-in/out)
- Hook pentru stare auth (client) și gating vizual pentru Quick Actions
- Conectare Home la backend autentic (GET `/api/home-data` cu auth → personalizează răspunsul)
- Rute rapide: Post Cargo Fast → POST `/api/cargo/quick-post` (cu validare), Find Loads → `/api/loads/quick-search`, Track My Shipments → `/api/deals/active`

