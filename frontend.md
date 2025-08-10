

FRONTEND ARCHITECTURE (Next.js 14 + App Router)



&nbsp;    Structura Pagini și Navigare (Page Structure \& Navigation)

&nbsp;        Bara de Sus (Top Bar): Fletopia + logo | Mesaje (Messages) + Notificări (Notifications) + Profil (Profile) - Clerk

&nbsp;       Navigare Principală (Main Navigation): Acasă (Home) | Piața (Marketplace) | Dispecer (Dispatcher) | Setări (Settings) 

&nbsp;            

&nbsp;   ACASĂ (HOME) (/)

&nbsp;       Hero Section cu întrebare pentru vizitatori:

&nbsp;           Main Question:

&nbsp;                "Ce cauți astăzi?" sau "How can we help you today?"

&nbsp;           Două opțiuni mari:

&nbsp;               "Am marfă de transportat" → Direct la Add Cargo modal

&nbsp;               "Caut marfă de transportat" → Direct la Marketplace ALL OFFERS

&nbsp;       Quick Actions

&nbsp;           Post Cargo Fast → AddCargoModal cu formular simplificat

&nbsp;           Find Loads → Marketplace cu filtre pre-setate

&nbsp;           Track My Shipments → Direct la ACTIVE DEALS (dacă e logat)

&nbsp;       HowItWorksCards (3-step explainer)

&nbsp;       Testimonial slider cu feedback real de la utilizatori

&nbsp;   PIAȚA (MARKETPLACE) (/marketplace/) - STRUCTURĂ COMPLETĂ

&nbsp;       Layout Principal

&nbsp;           Header Superior:

&nbsp;               Stânga:

&nbsp;                   ALL OFFERS | MY CARGO | MY QUOTES | ACTIVE DEALS

&nbsp;               Dreapta:

&nbsp;                   Delete Cargo -- Add Cargo (trigger modal)

&nbsp;           Bara de Căutare (Search Bar)

&nbsp;               căutare generală

&nbsp;           Filtre de Căutare (Search Filters): 

&nbsp;               All Countries | Newest First | All Types | All Urgency | Min (preț) | Max (preț)

&nbsp;               Clear

&nbsp;           Grid Principal:

&nbsp;                CargoCard components (content variază pe tab)

&nbsp;           Modal Overlays:

&nbsp;               AddCargoModal + CargoDetailModal

&nbsp;       Pagini Secundare

&nbsp;           create/page.tsx - Formular Adaugă Marfă (backup/full page version)

&nbsp;           \[id]/page.tsx - Detalii marfă + istoric cotații

&nbsp;       Componente Principale (Components)

&nbsp;           AddCargoModal.tsx - Pop-up Modal Adăugare

&nbsp;               Cargo Details:

&nbsp;                   Cargo Title 

&nbsp;                   Cargo Type (dropdown) 

&nbsp;                   Weight (kg) - required 

&nbsp;                   Volume (m³) - optional 

&nbsp;                   Vehicle Type (dropdown) 

&nbsp;                   Urgency Level (dropdown/buttons)

&nbsp;               Route Information:

&nbsp;                   From Address | To Address 

&nbsp;                   From Country | To Country

&nbsp;                   From Postal Code | To Postal Code

&nbsp;                   From City | To City

&nbsp;               Schedule: 

&nbsp;                   Loading Date (date picker)

&nbsp;                   Delivery Date (date picker)

&nbsp;               Price Information:

&nbsp;                   Total Price (EUR) - input

&nbsp;                   Price per kg - auto-calculated (readonly)

&nbsp;               Actions:

&nbsp;                   Cancel

&nbsp;                   Save Draft

&nbsp;                   Post Cargo

&nbsp;           CargoCard.tsx - Card Compact pe Grid

&nbsp;               Display Elements:

&nbsp;                   Cargo Title

&nbsp;                   Adresă: Țară (NL) + Oraș + Cod poștal

&nbsp;                   Cargo Type

&nbsp;                   Weight (kg)

&nbsp;                   Preț

&nbsp;                   Nume poster

&nbsp;           CargoDetailModal.tsx - Modal Detaliat (click pe card)

&nbsp;               Header Section:

&nbsp;                   Stânga:

&nbsp;                       Nume + date poster

&nbsp;                   Dreapta: 

&nbsp;                       Verified/Not Verified badge

&nbsp;               Cargo Details Section:

&nbsp;                   Weight \& Volume

&nbsp;                   Cargo Type | Urgency

&nbsp;                   Loading Date | Delivery Date

&nbsp;               Distance Information Section:

&nbsp;                   From: \[adresa completă]

&nbsp;                   To: \[adresa completă]

&nbsp;                   Button:

&nbsp;                       "View full route (≈ 1.4k km)" → opens Google Maps

&nbsp;               Cost Details Section (cu expand button - doar Pro users cu AI agent):

&nbsp;                   Estimated Costs: -exemple

&nbsp;                       Fuel \& vehicle (1385km × €1.20/km): €1,662.00

&nbsp;                       Driver pay (17.31h × €25.00/h): €432.75

&nbsp;                       Insurance \& fees: €80.00 •

&nbsp;                   Total Cost: xxxx

&nbsp;                   Profit Analysis: exemple

&nbsp;                       Agent recommendation: €2,500.96

&nbsp;                       Profit at recommendation: €326.21

&nbsp;                       Posted price: €1,200.00

&nbsp;                       Your profit at posted price: €-974.75 (-44.8%)

&nbsp;                   Profit Assessment:

&nbsp;                       Low/Medium/High

&nbsp;                   Additional Notes \& Estimates

&nbsp;               Quote Status Section:

&nbsp;                   Current status (No quotes/Pending/etc.)

&nbsp;               Action Buttons Section:

&nbsp;                   Send Quote (manual price input)

&nbsp;                   Chat with Shipper

&nbsp;                   Ignore/Save for Later

&nbsp;                   Close Modal

&nbsp;           Componente de Suport













&nbsp;           Business Logic și Flow





&nbsp;               Flow Standard: Ion postează → MY CARGO (Ion) + ALL OFFERS (toți) → Aurel aplică cotație → MY QUOTES (Aurel) + notificare (Ion) → Ion acceptă → ACTIVE DEALS (ambii) + status change

&nbsp;               Delete Logic: activ doar în MY CARGO pentru propriile postări

&nbsp;               Action Flow: • Send Quote → Manual price input → trimite notificare • Chat with Shipper → Deschide ChatInterface • Ignore → Remove din feed personal • Cost Details → Doar dacă AI Agent activ în Dispatcher



&nbsp;           Permissions per Tab



&nbsp;               Trial Users: ALL OFFERS + MY CARGO (limited) - nu văd Cost Details

&nbsp;               Pro Users: Toate taburile + cotații + chat + AI cost analysis

&nbsp;               SearchBar.tsx - Bara de căutare principală

&nbsp;               CargoFilters.tsx - Bara filtrare (countries, date, types, urgency, price range)

&nbsp;               TabNavigation.tsx - 4 taburi cu logică:

&nbsp;                   ALL OFFERS: toate marfurile disponibile (toți utilizatorii)

&nbsp;                   MY CARGO: marfa postată de mine (Delete activ aici)

&nbsp;                   MY QUOTES: cotațiile trimise de mine (cel ce a postat marfa vede aplicațiile) 

&nbsp;                   ACTIVE DEALS: contractele în desfășurare (ambii văd progresul)

&nbsp;               StatusBadge.tsx - Indicatori vizuali status (diferit pe fiecare tab)

&nbsp;               QuoteManagement.tsx - Creare cotație manuală + sugestii AI

&nbsp;               ChatInterface.tsx - Mesagerie directă pentru negocieri

&nbsp;               DealProgress.tsx - Tracking progres în ACTIVE DEALS

&nbsp;   Dispecer (Dispatcher) (/dispatcher/) - FLOW COMPLET - Doar utilizatori Pro

&nbsp;        Sidebar Stâng (Static Vertical Box) - Permanent vizibil

&nbsp;            Agent Control Section

&nbsp;                Agent Toggle: Buton ON/OFF principal pentru activarea agent-ului

&nbsp;                Cost Settings Button → Trigger CostSettingsModal

&nbsp;            Level Implementation Display (Independent Activation)

&nbsp;                L0 — Radar: Automatic cargo opportunity detection

&nbsp;                   Toggle: OFF gri / ON roșu; Funcție: Monitorizează DB cargo nou

&nbsp;                L1 — Calculator: Automatic cost and profit calculation

&nbsp;                   Toggle: OFF gri / ON roșu; Funcție: Calculează costuri pe baza Cost Settings

&nbsp;                L2 — Quote Bot: Automatic quote suggestion

&nbsp;                   Toggle: OFF gri / ON roșu; Funcție: Sugerează quotes în UI (nu trimite automat); Dependent de L1 pentru accuracy – fallback defaults dacă L1 OFF

&nbsp;        Content Area Dreapta (Tab Switching)

&nbsp;            Tab Navigation: AI Suggestions | Fleet Management

&nbsp;        AI Suggestions View (Tab 1)

&nbsp;            Content Structure

&nbsp;                Notification Feed: Sugestii și alerte de la agent bazate pe nivelele active \[Prioritizare: Confidence score high-low, apoi timestamp recent-first; Separate categories by level cu filtre; Allow user sort/filter]

&nbsp;                Action Buttons: Accept/Decline/Review pentru fiecare sugestie \[Plus thumbs up/down pentru feedback]

&nbsp;                Filter Options: Filtrare pe tip sugestie (L0/L1/L2)

&nbsp;            Logic pe Nivele Active

&nbsp;                L0 ON: Afișează cargo opportunities detectate (ex. "New cargo available...") \[Action: View Details / Add to Watchlist]

&nbsp;                L1 ON: Afișează cost calculations (ex. "Profit analysis...") \[Action: View Full Analysis / Adjust Parameters]

&nbsp;                L2 ON: Afișează quote suggestions (ex. "Recommended quote...") \[Action: Send Quote / Modify Quote / Skip]

&nbsp;                Combinații: L0+L1, L0+L2, L1+L2, toate active \[Edge case L2 fără L1: Fallback defaults costs + warning]

&nbsp;        Fleet Management View (Tab 2)

&nbsp;            Top Section - Map Interface

&nbsp;                Interactive Map: GPS tracking cu vehicle positions \[Real-time updates: WebSockets principal, polling fallback 5-10s]

&nbsp;                Real-time Updates: Locații vehicule în timp real

&nbsp;                Cargo Overlay: Afișare cargo current pe fiecare vehicul

&nbsp;            Bottom Section - Vehicle Grid

&nbsp;                VehicleCard Components: Grid cu toate vehiculele

&nbsp;                Status Indicators: Active/Inactive/Maintenance

&nbsp;                Quick Actions: View Details / Edit / Remove

&nbsp;            Add Fleet Section

&nbsp;                Add Fleet Button → Trigger AddFleetModal \[Locație: Sub grid, prominent]

&nbsp;        Componente Specializate

&nbsp;            AgentSidebar.tsx (Static Component)

&nbsp;                AgentToggle.tsx; CostSettingsButton.tsx;

&nbsp;                LevelDisplay.tsx - Independent toggles cu status updates

&nbsp;            CostSettingsModal.tsx 

&nbsp;               Form: Driver Pay, Fuel, etc.;

&nbsp;               Total calculated; Actions: Reset/Cancel/Save;

&nbsp;               Validation: Required/numeric/real-time calc

&nbsp;            AISuggestionsPanel.tsx

&nbsp;               Dynamic content per nivel;

&nbsp;               Notifications: Real-time, priority sorting, timestamp;

&nbsp;               Actions: Accept/Decline + Feedback (thumbs up/down → POST backend pentru AI learning); History log]

&nbsp;            FleetManagementPanel.tsx

&nbsp;               MapInterface.tsx: GPS tracking, markers, route overlay, traffic;

&nbsp;               VehicleGrid.tsx: Responsive, filter/search/bulk;

&nbsp;               AddFleetButton.tsx: Placement, permissions]

&nbsp;            AddFleetModal.tsx

&nbsp;               Form: Vehicle Type, License Plate, Capacity, Driver;

&nbsp;               GPS Options: Connect Device (ID/pairing/verification) / Manual (map picker/address/coords);

&nbsp;               Creation: Auto-generate card, initial status;

&nbsp;               Actions: Cancel/Save Draft (store localStorage/DB temp) / Add Vehicle; Edge case fail: Error modal, păstrează draft

&nbsp;   Setări (Settings) (/settings/)



&nbsp;   • Suport General Frontend

&nbsp;   • State Management (Zustand): Pentru toggles/levels (ex. L0/L1/L2 ON/OFF), permissions (ex. isPro), state persistent (ex. localStorage pentru refresh)

&nbsp;   • API Integration (SWR/React Query): Pentru real-time fetch/mutate (ex. cargo updates, GPS tracking), WebSockets wrapper (Socket.io pentru push notifications)

&nbsp;   • Error Handling (Toastify/Custom): În modale/panel-uri pentru validation/feedback errors (ex. invalid input, API fail; toast „Feedback sent”)

&nbsp;   • Performance Optimizations (React.lazy): Pentru MapInterface heavy components (ex. lazy load GPS map; ISR pentru cache)

&nbsp;   • Nivele Permisiuni Utilizator (User Permission Levels)

&nbsp;   • Probă (Trial) (7/14 zile): Acces limitat la Piața (Marketplace) - postare + vizualizare cargo (ALL OFFERS, MY CARGO limitat); fără Cost Details, Dispatcher, AI Agent, chat complet

&nbsp;   • Pro: Acces complet - Piața (toate taburile, Cost Details, chat, quotes) + Dispecer (AI Suggestions, Fleet Management, map, cost-settings) + Agent AI (L0/L1/L2) + notificări avansate

&nbsp;        page.tsx - Setări generale (General settings)

&nbsp;        account/page.tsx - Cont (Account) + management abonament (subscription management)

&nbsp;        notifications/page.tsx - Preferințe notificări (Notification preferences)

&nbsp;        Componente (Components)

&nbsp;           SubscriptionGate.tsx - Control acces Probă vs Pro (Trial vs Pro access control)



