

BACKEND ARCHITECTURE



&nbsp;   HOME PAGE - (Node.js/Express/Prisma/Supabase, deploy Vercel)

&nbsp;       Tech Stack \& General Setup 

&nbsp;           Core Stack

&nbsp;                Node.js v20 cu Express (API routes)

&nbsp;                Prisma ORM (DB queries type-safe)

&nbsp;                Supabase (Postgres DB + auth/real-time)

&nbsp;                Clerk pentru token validate (integrat cu Supabase).

&nbsp;           Deploy

&nbsp;                Deploy: Vercel (gratuit inițial, scale auto).

&nbsp;           Pas cu pas setup:

&nbsp;           Conexiuni macro: Toate endpoints folosesc Clerk middleware pentru auth; Prisma conectează la Supabase DB; real-time (dacă nevoie) via Supabase Realtime (simplu WebSockets).

&nbsp;                1) npm init; install express prisma @prisma/client @supabase/supabase-js @clerk/backend;

&nbsp;                2) Prisma init cu Supabase URL; migrate DB models;

&nbsp;                3) Express server cu middleware Clerk;

&nbsp;                4) Test local cu nodemon.

&nbsp;       API Endpoints Necesare

&nbsp;            Pas cu pas implementare

&nbsp;                Creează folder /api/home în Express (ex. app.get('/api/home-data', clerkMiddleware, handler)).

&nbsp;            GET /api/home-data (principal endpoint – returnă tot ce e dynamic pentru Hero/Quick Actions).

&nbsp;               Request:  Query param opțional ?from=sign-up pentru post-sign-up redirect:

&nbsp;               Response: 

&nbsp;                Logică: Dacă ne-logat, returnă prompt generic + opțiuni cu redirect la Clerk sign-up; dacă logat/new user, check DB User.firstLogin; post-sign-up, redirect la action din query.

&nbsp;                    JSON { description: "Fletopia – Marketplace AI pentru transport marfă: Postezi rapid, găsești loads cu sugestii AI, optimizezi rute pentru profit maxim!", prompt: "Ce cauți astăzi?" (dacă new user), options: \[{label: "Am marfă de transportat", action: "/marketplace/create"}, {label: "Caut marfă de transportat", action: "/marketplace/all-offers"}], quickActions: \[{name: "Post Cargo Fast", action: "/api/cargo/quick-post"}, {name: "Find Loads", action: "/api/loads/quick-search"}, {name: "Track My Shipments", action: "/api/deals/active", count: number dacă logat}] }.

&nbsp;                Conexiune: Middleware Clerk validate token → Prisma query User → return data; edge case ne-logat → { isLoggedIn: false }.

&nbsp;                Permission:

&nbsp;                   Public pentru prompt/descriere,

&nbsp;                   authenticated pentru quick actions personalizate.

&nbsp;            POST /api/cargo/quick-post (pentru Quick Action „Post Cargo Fast” – creează cargo simplificat).

&nbsp;               Body: { title, fromAddress, toAddress, weight, urgency, price }.

&nbsp;               Response: { success: true, cargoId: uuid }.

&nbsp;                Logică: Validează weight/price (ex. weight > 0), salvează în DB Cargo model, notifică user via Supabase real-time dacă Pro.

&nbsp;                Conexiune: Clerk middleware check if Trial/Pro (limit Trial posts); Prisma create Cargo; edge case invalid input → 400 error.

&nbsp;            GET /api/loads/quick-search (pentru Quick Action „Find Loads” – căutare pre-setată).

&nbsp;                Query: ?filters=urgent (pre-setate).

&nbsp;                Response: { loads: \[{id, title, price, urgency}] (limit 5-10 recente) }.



&nbsp;               Logică: Query DB Cargo cu filtre (ex. urgency = high, status = open).

&nbsp;               Conexiune: Prisma findMany Cargo; Clerk pentru personalizare Pro (ex. show AI-enhanced loads).

&nbsp;            GET /api/deals/active (pentru Quick Action „Track My Shipments” – doar logat).

&nbsp;               Response: { deals: \[{id, status, progress}] , count: number }.



&nbsp;               Logică: Query DB Deal pentru userId, return count/status.

&nbsp;               Conexiune: Clerk middleware (only if logat/Pro); Prisma findMany Deal; edge case no deals → empty array.

&nbsp;       Database Models

&nbsp;           Pas cu pas setup: Prisma schema.prisma cu models; npx prisma migrate dev.

&nbsp;           User Model (conexiune principală pentru personalizare).

&nbsp;               Fields: id: string (Clerk ID), role: string (Trial/Pro), firstLogin: boolean (default true), subscriptionEnd: date, createdAt: date.

&nbsp;               Relations: hasMany Cargo, Quote, Deal (pentru quick actions count).

&nbsp;               Conexiune: Query pentru firstLogin (show prompt if true); update firstLogin = false post-sign-up/action.

&nbsp;           Cargo Model (pentru quick-post și search).

&nbsp;               Fields: id: uuid, userId: foreign (User), title: string, fromAddress: string, toAddress: string, weight: float, urgency: string (low/medium/high), price: float, status: string (open/active/closed), createdAt: date.

&nbsp;               Relations: belongsTo User, hasMany Quote.

&nbsp;               Conexiune: Create din quick-post; query pentru quick-search (filtre urgency).

&nbsp;           Deal Model (pentru Track My Shipments count).

&nbsp;               Fields: id: uuid, quoteId: foreign (Quote), status: string (pending/active/completed), progress: float (0-100), createdAt: date.

&nbsp;               Relations: belongsTo Quote (care belongsTo Cargo/User).

&nbsp;               Conexiune: Count pentru userId în /api/deals/active; no heavy progress calc (simplu status).

&nbsp;           No other models needed for Home: Ținem minimal – testimonials/HowItWorks static, no stats/activity tracking (evită jobs inutil).



&nbsp;       Real-time Features

&nbsp;           Pas cu pas: Integrează Socket.io în Express (ex. io.on('connection', ...)).

&nbsp;           WebSocket Events (minimal pentru Home – doar dacă logat).

&nbsp;               'user\_activity\_update': Push count quick actions (ex. new deal → update Track count real-time).

&nbsp;               'sign\_up\_complete': Trigger post-sign-up redirect (dar preferăm Clerk callback URL pentru simplitate).

&nbsp;           Alternative: Supabase Realtime (sub to User changes pentru firstLogin update).

&nbsp;           Conexiune: Dacă user click opțiune ne-logat, frontend subscribe la Socket pentru after-sign-up event; risc latency low, deoarece Home nu e heavy real-time.

&nbsp;           Edge case: Disconnect → fallback polling GET /api/home-data la interval.



&nbsp;       Background Jobs \& Processing



&nbsp;           Minimal – no heavy jobs: Pentru Home, doar un job simplu dacă nevoie (ex. cron-job Supabase pentru clean firstLogin old users, every day).



&nbsp;               UserCleanupJob (cron: daily): Query Prisma User, set firstLogin false dacă createdAt > 1 day și no activity.



&nbsp;           Conexiune: Folosește node-cron în Express; trigger după sign-up via API call.



&nbsp;           Edge case: Job fail → log error, no impact major (firstLogin se updatează manual la action).



&nbsp;       External Integrations

&nbsp;           Clerk pentru auth/sign-up: Callback afterSignUpUrl = action (ex. /marketplace/create?from=home).

&nbsp;           No other externals: No email (adaugă mai târziu dacă vrei welcome email post-sign-up); no analytics (folosește Vercel built-in pentru conversion tracking).

&nbsp;           Conexiune: Clerk webhook pentru post-sign-up event → update DB User.firstLogin = false.



&nbsp;       Caching Strategy



&nbsp;           Simplu – Supabase/Vercel edge caching: Cache /api/home-data 30s (ex. Vercel config json TTL).



&nbsp;           No Redis: Prea heavy pentru Home – risc cost inutil.



&nbsp;           Conexiune: Prisma cache query results in-memory pentru repeated calls; edge case cache miss → full DB query.



&nbsp;       Authentication \& Authorization



&nbsp;           Public Access: Hero descriere/prompt generic, opțiuni basic (redirect sign-up).



&nbsp;           Authenticated Access: Personalized quick actions (ex. Track My Shipments cu count), prompt ascuns dacă not new.



&nbsp;           Permission Checks: Middleware Clerk: Public endpoints no auth; authenticated pentru /api/deals/active (rate limit 10 req/min per user).



&nbsp;           Conexiune: Clerk token validate → Prisma User query role; Trial limit quick-post quota (ex. max 5/day, check DB count).



&nbsp;       Performance Optimizations



&nbsp;           Database: Index pe User.firstLogin + createdAt; limit query results (ex. quick-search top 10).



&nbsp;           API: Compressed responses (express-compression middleware); parallel async pentru count Cargo/Deals dacă logat.



&nbsp;           Conexiune: React.lazy inutil aici (frontend static); ISR Next.js pentru Home page cache.



&nbsp;           Edge case: High traffic → Supabase scale auto.



&nbsp;       Error Handling \& Monitoring



&nbsp;           Error Scenarios: Invalid token → 401 Unauthorized; DB query fail → 500 with fallback static data (ex. generic prompt).



&nbsp;           Monitoring: Supabase logs pentru API calls; Vercel analytics pentru response time.



&nbsp;           Conexiune: Try-catch în handlers, return { error: "Message" }; toast frontend pentru user feedback.



&nbsp;           Edge case: Sign-up callback fail → log, redirect manual la Home.



&nbsp;       Security Considerations

&nbsp;        Pas cu pas urmărire plan: 1) Setup tech (npm install); 2) Define DB models Prisma; 3) Implement API endpoints cu middleware; 4) Test auth/redirect Clerk; 5) Conectează frontend fetch /api/home-data; 6) Deploy Vercel, monitor logs.



&nbsp;           Rate Limiting: Express-rate-limit: 50 req/min per IP pentru public /api/home-data.



&nbsp;           Data Validation: Joi/Prisma validate inputs (ex. weight positive in quick-post).



&nbsp;           Privacy: No personal data in public responses; GDPR: User.firstLogin opt-in flag if needed.



&nbsp;           Conexiune: CORS restricted to frontend domain; CSRF pentru POST quick-post.

&nbsp;   MARKETPLACE -  (Tech stack: Node.js cu Express API, Prisma ORM, Supabase DB/Postgres + auth/real-time, Socket.io WebSockets; Deploy Vercel)

&nbsp;        Componente Majore (Nivel 1)

&nbsp;           Auth \& Permissions:

&nbsp;               Clerk integration (middleware pentru token validate, roles Trial/Pro; ex. check isPro în endpoints pentru AI/cost analysis)

&nbsp;           DB Modele:

&nbsp;               User

&nbsp;                   (id, role); 

&nbsp;               Cargo

&nbsp;                   (id, title, type, weight, volume?, vehicleType, urgency enum(low/medium/high/urgent), fromAddress, toAddress, fromCountry, toCountry, fromPostal, toPostal, fromCity, toCity, loadingDate, deliveryDate, totalPrice, pricePerKg calculated, status enum(draft/active/quoted/assigned/completed/cancelled), images json\[] optional, viewCount int, createdAt, updatedAt; relations belongsTo User, hasMany Quote, hasOne Deal); 

&nbsp;               Quote

&nbsp;                   (id, cargoId, transporterId, price, estimatedDays, message?, status enum(pending/accepted/rejected/expired), aiGenerated bool, confidence string, createdAt, expiresAt; relations belongsTo Cargo, belongsTo User, hasOne Deal); 

&nbsp;               Deal

&nbsp;                   (id, cargoId, quoteId, shipperId, transporterId, status enum(confirmed/in\_transit/delivered/disputed/completed), progress int(0-100), timeline json, totalAmount decimal, createdAt, completedAt; relations belongsTo Cargo/Quote, hasMany ChatMessage); 

&nbsp;               ChatThread

&nbsp;                    (id, dealId nullable, quoteId nullable, participants json\[userId1, userId2], lastMessageAt timestamp, isActive bool; hasMany ChatMessage);

&nbsp;               ChatMessage

&nbsp;                   (id, threadId, senderId, message text, messageType enum(text/image/file), readAt timestamp nullable, createdAt timestamp; belongsTo ChatThread/User); 

&nbsp;               CostSettings

&nbsp;                   (userId unique, driverPay decimal, fuel decimal, maintenance decimal, tolls decimal, insurance decimal, baseMargin decimal, updatedAt timestamp; belongsTo User)

&nbsp;           API Endpoints:

&nbsp;               REST (Express routes pentru CRUD) + WebSockets (Socket.io pentru real-time quotes/chat/notifications)

&nbsp;           AI Services:

&nbsp;               Calcul cost/profit (funcție cu Google Maps + user cost settings),

&nbsp;               suggestions (algoritm matching cargo-vehicle cu confidence),

&nbsp;               learning (DB feedback storage pentru retrain)

&nbsp;           Suport General:

&nbsp;               Error handling (try-catch, status codes),

&nbsp;               Logging (Winston),

&nbsp;               Security (rate limiting express-rate-limit, CORS)

&nbsp;        Backend per Pagină Frontend  Piața (Marketplace) (/marketplace/)

&nbsp;           Tech Stack Extensions (pe lângă Home setup)

&nbsp;               Additional Dependencies:

&nbsp;                   node-cron (pentru AI cost calculations/expiry jobs),

&nbsp;                   socket.io (real-time quotes/chat),

&nbsp;                   @google/maps (pentru route calculations),

&nbsp;                   multer (file uploads pentru cargo images),

&nbsp;                   joi (complex validation pentru forms)

&nbsp;               Database Extensions:

&nbsp;                   Full-text search (Postgres tsvector pentru title/description search),

&nbsp;                   Spatial indexing (pentru location-based queries cu PostGIS extension în Supabase)

&nbsp;           API Endpoints Necesare

&nbsp;               Tab Navigation Endpoints

&nbsp;                   GET /api/marketplace/all-offers (query params: page, limit, search, filters {country, type, urgency, minPrice, maxPrice, sortBy}; response: { cargo: \[], pagination {total, pages}, filters {appliedFilters} }; permission: Public enhanced Pro; conexiune: Prisma complex query cu joins/full-text/location proximity)

&nbsp;                   GET /api/marketplace/my-cargo (query params: page, limit, status; response: { myCargo: \[], quotesReceived {cargoId: quotesCount} }; permission: Authenticated; conexiune: Prisma filter by userId, include quotes count)

&nbsp;                   GET /api/marketplace/my-quotes (query params: page, limit, status; response: { myQuotes: \[{cargoId, quote, status, chatThread}] }; permission: Authenticated; conexiune: Prisma Quote cu cargo details)

&nbsp;                   GET /api/marketplace/active-deals (response: { activeDeals: \[{dealId, cargo, quote, progress, timeline}] }; permission: Authenticated; conexiune: Prisma Deal cu related data)

&nbsp;               Cargo Management Endpoints

&nbsp;                   POST /api/cargo/create (body: { title, type, weight, volume?, vehicleType, urgency, fromAddress, toAddress, fromCountry, toCountry, fromPostal, toPostal, fromCity, toCity, loadingDate, deliveryDate, totalPrice }; response: { success: true, cargoId: uuid, pricePerKg: calculated }; permission: Trial quota/Pro; conexiune: Prisma create + real-time broadcast Socket.io + notify watchers)

&nbsp;                   PUT /api/cargo/\[id]/update (body: same as create; permission: Owner only + edit time limit; conexiune: Prisma update + notify interested quotes)

&nbsp;                   DELETE /api/cargo/\[id] (permission: Owner only + no active quotes; conexiune: Cascade delete quotes/deals, notify watchers; edge case quotes active: Delete cascade – șterge quotes/deals asociate, nu mai există active)

&nbsp;                   POST /api/cargo/\[id]/save-draft (body: partial cargo data; response: { draftId: uuid }; permission: Authenticated; conexiune: Temporary storage in DB cu TTL expiry)

&nbsp;                   POST /api/cargo/\[id]/ignore (body: none; response: { success: true }; permission: Authenticated; conexiune: Update User ignored list in DB)

&nbsp;               Quote Management Endpoints

&nbsp;                   POST /api/cargo/\[id]/quote (body: { price, message?, estimatedDays }; response: { quoteId: uuid, chatThreadId: uuid }; permission: Pro; conexiune: Create Quote + ChatThread + notify owner via Socket.io)

&nbsp;                   GET /api/cargo/\[id]/quotes (response: { quotes: \[{quoteId, transporterId, price, message, createdAt}] }; permission: Owner only; conexiune: Prisma quotes cu transporter details)

&nbsp;                   PUT /api/quotes/\[id]/accept (response: { dealId: uuid, chatThreadId: uuid }; permission: Owner only; conexiune: Create Deal + update statuses + notify both via Socket.io)

&nbsp;               AI Cost Analysis Endpoints (Pro only)

&nbsp;                   GET /api/cargo/\[id]/cost-analysis (response: { estimatedCosts {fuel, driver, insurance, total}, profitAnalysis {recommendation, confidence, notes}, routeData {distance, duration} }; permission: Pro + AI active; conexiune: Google Maps API + AI calculation cu user cost settings)

&nbsp;                   POST /api/cargo/\[id]/ai-quote-suggestion (response: { suggestedPrice: number, confidence: string, reasoning: string }; permission: Pro + L2 active; conexiune: AI processing cu cost settings + market analysis)

&nbsp;           Database Models (Extensions)

&nbsp;               Cargo Model (Enhanced)

&nbsp;                   id: uuid, userId: foreign key

&nbsp;                   title: string, type: enum(general, fragile, liquid, etc.)

&nbsp;                   weight: float, volume: float nullable

&nbsp;                   vehicleType: enum(truck, van, trailer, etc.)

&nbsp;                   urgency: enum(low, medium, high, urgent)

&nbsp;                   fromAddress, toAddress: text

&nbsp;                   fromCountry, toCountry, fromPostal, toPostal, fromCity, toCity: string

&nbsp;                   loadingDate, deliveryDate: datetime

&nbsp;                   totalPrice, pricePerKg: decimal

&nbsp;                   status: enum(draft, active, quoted, assigned, completed, cancelled)

&nbsp;                   description: text optional

&nbsp;                   images: json array optional

&nbsp;                   viewCount: integer

&nbsp;                   createdAt, updatedAt: timestamp

&nbsp;                   Relations: belongsTo User, hasMany Quote, hasOne Deal

&nbsp;               Quote Model

&nbsp;                   id: uuid, cargoId: foreign key, transporterId: foreign key

&nbsp;                   price: decimal, estimatedDays: integer

&nbsp;                   message: text optional

&nbsp;                   status: enum(pending, accepted, rejected, expired)

&nbsp;                   aiGenerated: boolean

&nbsp;                   confidence: string

&nbsp;                   createdAt, expiresAt: timestamp

&nbsp;                   Relations: belongsTo Cargo, belongsTo User (transporter), hasOne Deal

&nbsp;               Deal Model

&nbsp;                   id: uuid, cargoId: foreign key, quoteId: foreign key

&nbsp;                   shipperId: foreign key, transporterId: foreign key

&nbsp;                   status: enum(confirmed, in\_transit, delivered, disputed, completed)

&nbsp;                   progress: integer (0-100)

&nbsp;                   timeline: json milestones

&nbsp;                   totalAmount: decimal

&nbsp;                   createdAt, completedAt: timestamp

&nbsp;                   Relations: belongsTo Cargo/Quote, hasMany ChatMessage

&nbsp;               ChatThread Model

&nbsp;                   id: uuid, dealId: nullable foreign key, quoteId: nullable foreign key

&nbsp;                   participants: json array \[userId1, userId2]

&nbsp;                   lastMessageAt: timestamp

&nbsp;                   isActive: boolean

&nbsp;                   Relations: hasMany ChatMessage

&nbsp;               ChatMessage Model

&nbsp;                   id: uuid, threadId: foreign key, senderId: foreign key

&nbsp;                   message: text, messageType: enum(text, image, file)

&nbsp;                   readAt: timestamp nullable

&nbsp;                   createdAt: timestamp

&nbsp;                   Relations: belongsTo ChatThread, belongsTo User

&nbsp;               CostSettings Model (pentru AI calculations)

&nbsp;                   userId: foreign key unique

&nbsp;                   driverPay: decimal, fuel: decimal, maintenance: decimal

&nbsp;                   tolls: decimal, insurance: decimal

&nbsp;                   baseMargin: decimal profit margin default

&nbsp;                   updatedAt: timestamp

&nbsp;                   Relations: belongsTo User

&nbsp;           Real-time Features

&nbsp;               WebSocket Events: 'new\_cargo\_posted' → Broadcast ALL OFFERS; 'quote\_received' → Notify owner; 'quote\_accepted' → Notify transporter; 'deal\_status\_update' → Update progress both; 'new\_message' → Chat real-time; 'cargo\_updated' → Notify watchers; 'ai\_analysis\_ready' → Notify cost gata

&nbsp;               Socket.io Rooms: 'all\_offers\_room' → live cargo updates; 'user\_{userId}' → personal notifications; 'cargo\_{cargoId}' → cargo-specific; 'chat\_{threadId}' → messages

&nbsp;               Real-time Subscriptions: Subscribe cargo changes pentru interested users; auto-unsubscribe on leave page; fallback polling connection loss

&nbsp;           Background Jobs \& Processing

&nbsp;               CargoExpiryJob (cron: every hour): Query expired cargo (30 days no quotes), update status 'expired', notify owners

&nbsp;               QuoteExpiryJob (cron: every 6 hours): Expire quotes >7 days no response, notify transporters, clean pending

&nbsp;               AIAnalysisJob (real-time trigger): Process cost requests, Google Maps calls route, AI calculation, store cache similar routes

&nbsp;               SearchIndexingJob (cron: every 15 minutes): Update full-text tsvector indexes, recalculate relevance, update location indexes

&nbsp;               NotificationDispatchJob (real-time): Process/send notifications, email fallback missed real-time

&nbsp;           External Integrations

&nbsp;               Google Maps API:

&nbsp;                   Route calculation distance/duration, geocoding addresses, traffic accurate estimates; integration: Cost per call, cache results

&nbsp;               AI Processing Engine:

&nbsp;                    Cost calculation algorithms, market price analysis, route optimization suggestions,

&nbsp;                   ML quote success rates

&nbsp;               File Storage:

&nbsp;                   AWS S3 / Cloudinary cargo images, compression optimization, CDN fast loading

&nbsp;           Caching Strategy

&nbsp;               Redis Cache Layers:

&nbsp;                   marketplace:all-offers (5min TTL) popular list; cargo:{id}:details (30min TTL) individual; user:{id}:quotes (10min TTL) user's quotes; route:{hash} (24h TTL) Google Maps; ai:cost:{hash} (1h TTL) AI calculations

&nbsp;               Database Query Optimization:

&nbsp;                   Materialized views complex aggregations, cached counts pagination, pre-computed search indexes

&nbsp;               CDN Caching:

&nbsp;                   Static cargo images, search filter options, country/city lists

&nbsp;           Authentication \& Authorization

&nbsp;               Public Access: ALL OFFERS browse limited details, basic search/filtering, cargo details without contact

&nbsp;               Trial User Access: Full ALL OFFERS details, MY CARGO limited posts, receive quotes can't send, no AI cost analysis, basic chat

&nbsp;               Pro User Access: All features, MY QUOTES full, AI cost/suggestions, advanced chat, priority search, bulk operations

&nbsp;               Permission Matrix: Create cargo Trial quota/Pro unlimited; Send quotes Pro only; View cost analysis Pro + AI active; Chat access Trial basic/Pro full; Delete cargo Owner only time-limited

&nbsp;           Performance Optimizations

&nbsp;               Database: Composite indexes (status, createdAt, location), partial indexes active cargo, query optimization EXPLAIN ANALYZE, connection pooling PgBouncer

&nbsp;               API: Pagination cursor-based large datasets, selective field loading, response compression gzip, parallel processing multiple queries

&nbsp;               Search: Full-text Postgres tsvector, fuzzy matching typos, auto-complete debounced requests

&nbsp;               Real-time: WebSocket connection pooling, message batching high frequency, selective subscription, graceful degradation connection loss

&nbsp;           Error Handling \& Monitoring

&nbsp;               Error Scenarios: Cargo creation fail → draft recovery options; Quote submission fail → retry mechanism; AI timeout → fallback basic calculation; Real-time loss → polling fallback; Payment issues → clear messages (future)

&nbsp;               Monitoring \& Alerts: API response times endpoint, real-time connection counts, background job success rates, search query performance, user action conversion rates

&nbsp;               Logging: Structured logging correlation IDs, user action tracking debugging, performance metrics collection, error aggregation alerting

&nbsp;           Security Considerations

&nbsp;               Input Validation: Joi schemas forms, price range validation, address format verification, file upload restrictions type/size

&nbsp;               Rate Limiting: Cargo creation 10/hour Trial 50/hour Pro, quote submission 20/hour user, search 100/minute IP, chat messages 60/minute user

&nbsp;               Data Protection: Personal info masking public views, chat message encryption, payment info security compliance, GDPR deletion capabilities

&nbsp;               Business Logic: Prevent quote manipulation, cargo ownership verification, deal state validation, anti-fraud fake postings

&nbsp;               API: JWT token validation endpoints, CORS frontend only, SQL injection prevention Prisma, XSS input sanitization

&nbsp;   DISPATCHER AI -  Node.js/Express/Prisma/Supabase + Socket.io

&nbsp;       Tech Stack Extensions

&nbsp;           Core Dependencies (pe lângă Marketplace setup)

&nbsp;               bullmq + ioredis - Job queues pentru AI processing (Redis adapter, previne blocaje)

&nbsp;               node-cron - Lightweight cron jobs pentru L0 monitoring și expiry cleanup

&nbsp;               socket.io + socket.io-redis - Scalable real-time pentru suggestions și GPS

&nbsp;               @turf/turf - Geospatial calculations pentru fleet proximity și manual positioning

&nbsp;               @google/maps - Route optimization cu aggressive caching (<€0.01/call după cache)

&nbsp;                joi - Type-safe validation pentru cost settings și fleet forms

&nbsp;           Database Extensions (Minimalist Approach)

&nbsp;               Supabase Real-time - Built-in subscriptions pentru GPS și suggestions changes

&nbsp;               Postgres Temporal Indexing - Indexes pe timestamp pentru AIHistory și GPS data

&nbsp;               PostGIS Extension Minimal - Spatial queries pentru manual GPS positioning (Supabase free tier)

&nbsp;               Archive Strategy - Background jobs pentru old data cleanup (>1 month GPS history)

&nbsp;       API Endpoints Architecture

&nbsp;           AI Agent Management

&nbsp;               GET /api/agent/status

&nbsp;                   Response: { isActive: boolean, levels: {L0: boolean, L1: boolean, L2: boolean}, lastActivity: timestamp }

&nbsp;                   Permission: Pro users only

&nbsp;                   Connection: Prisma query CostSettings/AIHistory → real-time sync Socket.io 

&nbsp;               PUT /api/agent/toggle

&nbsp;                   Body: { level: 'L0'|'L1'|'L2'|'all', active: boolean }

&nbsp;                   Response: { success: true, currentStatus: object, warnings: \[] }

&nbsp;                   Permission: Pro users only

&nbsp;                    Connection: Prisma update CostSettings → BullMQ queue job pentru start/stop → WS emit 'ai\_level\_change'

&nbsp;                    Business Logic: Independent toggles; L2 fără L1 → warning + fallback defaults; 'all' toggle toate nivelele

&nbsp;               POST /api/cost-settings

&nbsp;                   Body: { driverPay: decimal, fuel: decimal, maintenance: decimal, tolls: decimal, insurance: decimal }

&nbsp;                   Response: { success: true, totalBaseCost: calculated }

&nbsp;                   Permission: Pro users only

&nbsp;                   Connection: Prisma upsert CostSettings → Joi validation → BullMQ queue L1 recalculation → WS emit 'cost\_update'

&nbsp;               GET /api/agent/suggestions

&nbsp;                   Query: { page, limit, filterLevel: 'L0'|'L1'|'L2'|'all', sortBy: 'confidence'|'timestamp' } 

&nbsp;                   Response: { suggestions: \[{id, level, confidence, data, timestamp}], pagination: {total, pages} }

&nbsp;                   Permission: Pro with active agent

&nbsp;                   Connection: Prisma AIHistory query cu level filter/join Cargo → sort confidence high-low/timestamp recent-first

&nbsp;               POST /api/agent/feedback

&nbsp;                   Body: { suggestionId: uuid, feedbackType: 'up'|'down', notes?: string }

&nbsp;                   Response: { success: true }

&nbsp;                   Permission: Pro users only

&nbsp;                   Connection: Prisma create AIFeedback → BullMQ queue AILearningJob → WS emit 'feedback\_processed'

&nbsp;           Fleet Management

&nbsp;               GET /api/fleet/vehicles

&nbsp;                   Query: { page, limit, status, search }

&nbsp;                   Response: { vehicles: \[{id, type, license, capacity, gpsId, status}], pagination: {total, pages} }

&nbsp;                   Permission: Pro users only

&nbsp;                   Connection: Prisma Vehicle query cu filter/status → include current Cargo assignment

&nbsp;               POST /api/fleet/add

&nbsp;                   Body: { type: enum, licensePlate: string, capacity: json, driverId?: uuid, gpsDeviceId?: string, manualPosition?: {lat, long, address} }

&nbsp;                   Response: { success: true, vehicleId: uuid }

&nbsp;                   Permission: Pro users only

&nbsp;                   Connection: Prisma create Vehicle → Joi validation → Turf geospatial pentru manual position → BullMQ queue GPS verification

&nbsp;               PUT /api/fleet/vehicles/\[id]

&nbsp;                   Body: Partial vehicle data

&nbsp;                   Response: { success: true }

&nbsp;                   Permission: Pro users only

&nbsp;                   Connection: Prisma update → WS emit 'fleet\_status\_change' if status modified 

&nbsp;               DELETE /api/fleet/vehicles/\[id]

&nbsp;                   Response: { success: true }

&nbsp;                   Permission: Pro users only + no active cargo assignments

&nbsp;                   Connection: Prisma delete → check Cargo assignment → cascade remove GPS subscriptions

&nbsp;               GET /api/map/gps

&nbsp;                   Query: { vehicleId?: uuid }

&nbsp;                   Response: { positions: \[{vehicleId, lat, long, timestamp, cargoOverlay?}] }

&nbsp;                   Permission: Pro users only

&nbsp;                   Connection: Prisma VehicleLocation latest → Supabase real-time subscribe → Turf route calculations

&nbsp;       Database Models (Enhanced)

&nbsp;           Vehicle Model

&nbsp;               id: uuid, userId: foreign key (owner)

&nbsp;               type: enum('truck', 'van', 'trailer', 'flatbed', 'refrigerated')

&nbsp;               licensePlate: string (required, unique per user)

&nbsp;               capacity: json {weight: float, volume: float}

&nbsp;               gpsDeviceId: string (nullable pentru manual positioning)

&nbsp;               manualPosition: json {lat: float, long: float, address: string} (nullable)

&nbsp;               driverId: foreign key User (nullable driver assignment)

&nbsp;               status: enum('active', 'inactive', 'maintenance')

&nbsp;               currentCargoId: foreign key Cargo (nullable current assignment)

&nbsp;               createdAt, updatedAt: timestamp

&nbsp;               Relations: belongsTo User (owner), belongsTo User (driver), belongsTo Cargo (current), hasMany VehicleLocation

&nbsp;           VehicleLocation Model (Time-series Optimized)

&nbsp;               id: uuid, vehicleId: foreign key

&nbsp;               location: point (PostGIS pentru spatial queries)

&nbsp;               speed: decimal (km/h pentru route optimization)

&nbsp;               heading: integer (degrees pentru direction tracking)

&nbsp;               accuracy: decimal (meters pentru GPS precision)

&nbsp;               timestamp: timestamp (indexed pentru time-series queries)

&nbsp;               Relations: belongsTo Vehicle

&nbsp;               Performance: Index (vehicleId, timestamp); Archive >1 month cu cron job

&nbsp;           CostSettings Model (AI Calculation Base)

&nbsp;               userId: foreign key (unique constraint)

&nbsp;               driverPay: decimal, fuel: decimal, maintenance: decimal

&nbsp;               tolls: decimal, insurance: decimal

&nbsp;               totalBaseCost: decimal (calculated readonly field)

&nbsp;               updatedAt: timestamp (pentru cache invalidation) • Relations: belongsTo User

&nbsp;           AIHistory Model (Suggestions Log)

&nbsp;               id: uuid, userId: foreign key

&nbsp;               suggestionId: uuid (unique suggestion identifier)

&nbsp;               level: enum('L0', 'L1', 'L2')

&nbsp;               confidence: string ('high', 'medium', 'low')

&nbsp;               actionTaken: enum('accept', 'decline', 'skip', 'review')

&nbsp;               timestamp: timestamp (indexed pentru performance)

&nbsp;               Relations: belongsTo User, belongsTo Cargo (if applicable)

&nbsp;           AIFeedback Model (Learning Data)

&nbsp;               id: uuid, suggestionId: foreign key AIHistory

&nbsp;               feedbackType: enum('up', 'down')

&nbsp;               userId: foreign key

&nbsp;               timestamp: timestamp

&nbsp;               Relations: belongsTo User, belongsTo AIHistory

&nbsp;       Real-time Architecture

&nbsp;           WebSocket Events (Socket.io)

&nbsp;               'agent\_suggestion\_new' → Push new AI suggestions to feed 

&nbsp;               'fleet\_gps\_update' → Real-time vehicle position changes

&nbsp;               'fleet\_status\_change' → Vehicle status updates (active/inactive/maintenance)

&nbsp;               'ai\_level\_change' → Sync toggle changes across sessions

&nbsp;               'feedback\_processed' → Confirm AI learning feedback received

&nbsp;           Socket.io Room Structure

&nbsp;               'user\_{userId}' → Personal AI suggestions și fleet updates

&nbsp;               'fleet\_{vehicleId}' → Vehicle-specific GPS tracking

&nbsp;               'agent\_levels' → Level toggle synchronization

&nbsp;           Real-time Subscriptions (Supabase)

&nbsp;               Vehicle table changes pentru GPS și map updates 

&nbsp;               AI suggestions push când levels activate

&nbsp;               Fallback polling mechanism pentru connection loss scenarios

&nbsp;       Background Processing Pipeline

&nbsp;           AI Processing Jobs (BullMQ Queues)

&nbsp;               AISuggestionsRefreshJob (cron: every 5 minutes if agent ON)

&nbsp;                   Generate suggestions based pe active levels

&nbsp;                   L0: Monitor DB cargo changes pentru opportunities

&nbsp;                   L1: Calculate costs using Google Maps + user settings

&nbsp;                   L2: Suggest quotes based pe cost analysis 

&nbsp;                   Broadcast results via Socket.io

&nbsp;               AILearningJob (cron: every hour)

&nbsp;                   Process accumulated AIFeedback data

&nbsp;                   Update heuristic confidence algorithms

&nbsp;                   Simple ML pattern recognition (no complex retraining initially)

&nbsp;               FleetStatusJob (cron: every 10 minutes)

&nbsp;                   Update vehicle status based pe activity

&nbsp;                   Notify maintenance requirements

&nbsp;                   Clean abandoned drafts și temporary data

&nbsp;       External Service Integrations

&nbsp;           Google Maps API (Cost Optimized)

&nbsp;               Route optimization cu traffic overlay pentru map interface

&nbsp;               Manual positioning geocoding pentru address validation

&nbsp;               Aggressive Redis caching (24h TTL) → reduces costs by 90%

&nbsp;               Batch processing pentru multiple route calculations

&nbsp;           GPS Device Integration (Future Ready)

&nbsp;               Device pairing și verification API

&nbsp;               Real-time data stream processing

&nbsp;               Fallback manual positioning când device unavailable

&nbsp;       Caching Strategy (Performance Critical)

&nbsp;           Redis Cache Layers

&nbsp;               agent:suggestions:{userId} (5min TTL) - AI feed data

&nbsp;               fleet:vehicles:{userId} (10min TTL) - Vehicle grid information

&nbsp;               map:gps:{vehicleId} (30s TTL) - GPS positions pentru real-time map

&nbsp;               cost:settings:{userId} (1h TTL) - User cost preferences

&nbsp;           Database Query Optimization

&nbsp;               Composite indexes pe AIHistory (userId, level, timestamp)

&nbsp;               Cached vehicle lists cu selective updates

&nbsp;               Materialized views pentru complex analytics (future)

&nbsp;           CDN Asset Caching

&nbsp;               Static map assets și route overlays

&nbsp;               Vehicle icons și status badge images

&nbsp;       Security \& Authorization Framework

&nbsp;           Permission Matrix

&nbsp;               Pro Subscription Required: All dispatcher features access

&nbsp;               Toggle AI Levels: Pro + agent activation rights

&nbsp;               Fleet Management: Pro + vehicle ownership verification

&nbsp;               View Suggestions: Pro + corresponding level active

&nbsp;               Submit Feedback: Pro users only

&nbsp;           API Security Measures

&nbsp;               JWT token validation pe toate endpoints

&nbsp;               Rate limiting: Suggestions 50/min, Fleet operations 10/hour

&nbsp;               Input validation cu Joi schemas pentru complex forms

&nbsp;               CORS restricted la frontend domain only

&nbsp;           Data Protection Compliance

&nbsp;               GPS location data encryption în transit și at rest

&nbsp;               GDPR deletion capabilities pentru user data

&nbsp;               Driver personal information protection

&nbsp;               Location history retention policies (1 month limit)

&nbsp;       Performance \& Monitoring

&nbsp;           Database Performance

&nbsp;               Strategic indexes pe status și timestamp fields

&nbsp;               Connection pooling pentru heavy AI workloads

&nbsp;               Query optimization cu EXPLAIN ANALYZE pentru bottlenecks

&nbsp;           API Response Optimization

&nbsp;               Cursor-based pagination pentru large suggestion lists

&nbsp;               Selective field loading pentru mobile clients

&nbsp;               Response compression (gzip) pentru data-heavy endpoints 

&nbsp;           Real-time Performance

&nbsp;               WebSocket connection pooling și load balancing

&nbsp;               GPS update batching pentru high-frequency data

&nbsp;               Graceful degradation când external services fail

&nbsp;           Monitoring \& Alerting

&nbsp;               API response time tracking per endpoint

&nbsp;               Real-time connection count monitoring

&nbsp;               Background job success rate alerting

&nbsp;               External API availability checks (Google Maps, GPS)

&nbsp;               Resource usage alerts (CPU, memory, Redis)

&nbsp;       Error Handling \& Recovery

&nbsp;           Graceful Failure Scenarios

&nbsp;               AI level toggle failure → fallback la previous status

&nbsp;               Fleet addition failure → draft recovery options

&nbsp;               AI processing timeout → basic calculation fallback

&nbsp;               Real-time connection loss → polling mechanism activation

&nbsp;           Monitoring Strategy

&nbsp;               Structured logging cu correlation IDs

&nbsp;               User action tracking pentru debugging

&nbsp;               Performance metrics collection

&nbsp;               Error aggregation și automated alerting

&nbsp;           Business Continuity

&nbsp;               Cache warming strategies pentru common queries

&nbsp;               Circuit breaker pattern pentru external API calls

&nbsp;               Automated retry mechanisms cu exponential backoff

&nbsp;               Data consistency validation și repair procedures

&nbsp;   SETTINGS PAGE - Node.js + Express + Prisma + Supabase + Socket.io

&nbsp;       Tech Stack Consistency

&nbsp;           Core Infrastructure (Same as Previous Pages)

&nbsp;               Node.js + Express + Prisma + Supabase + Socket.io

&nbsp;               Clerk integration pentru subscription status validation

&nbsp;               Redis caching pentru settings data optimization

&nbsp;               BullMQ pentru background job processing

&nbsp;           Specialized Dependencies

&nbsp;               stripe - Payment processing și subscription lifecycle management

&nbsp;               node-cron - Subscription expiry monitoring și trial cleanup automation

&nbsp;               nodemailer/sendgrid - Email notifications pentru subscription events

&nbsp;               joi - Complex validation pentru settings forms și billing data

&nbsp;       API Endpoints Architecture

&nbsp;           General Settings Management

&nbsp;               GET /api/settings/general

&nbsp;                   Response: { userId, preferences: {language, timezone, currency, notifications}, theme: 'light'|'dark'|'auto', privacy: {profileVisible, dataSharing, analyticsOptIn} }

&nbsp;                   Permission: Authenticated users only

&nbsp;                   Connection: Prisma query UserSettings model → Redis cache 30min TTL → fallback DB query

&nbsp;               PUT /api/settings/general

&nbsp;                   Body: { preferences?: object, theme?: string, privacy?: object }

&nbsp;                   Response: { success: true, updated: object }

&nbsp;                   Permission: Authenticated users only

&nbsp;                   Connection: Joi validation → Prisma upsert UserSettings → Redis cache invalidation → WS emit 'settings\_updated'

&nbsp;           Account \& Subscription Management

&nbsp;               GET /api/settings/account

&nbsp;                   Response: { user: {id, email, name, avatar}, subscription: {plan: 'trial'|'pro', status, expiresAt, features}, billing: {nextPayment?, paymentMethod?} }

&nbsp;                   Permission: Authenticated users only

&nbsp;                   Connection: Clerk user data + Prisma Subscription query + Stripe customer information merge

&nbsp;               PUT /api/settings/account/profile

&nbsp;                   Body: { name?: string, avatar?: file }

&nbsp;                   Response: { success: true, user: updated\_user\_data }

&nbsp;                   Permission: Authenticated users only

&nbsp;                   Connection: Clerk user update + avatar upload S3/Cloudinary + Prisma sync + cache invalidation

&nbsp;               POST /api/settings/subscription/upgrade

&nbsp;                   Body: { plan: 'pro', billingCycle: 'monthly'|'yearly' }

&nbsp;                   Response: { success: true, checkoutUrl: string, subscriptionId: uuid }

&nbsp;                   Permission: Trial users only

&nbsp;                   Connection: Stripe checkout session create → Prisma create PendingSubscription → secure redirect URL generation

&nbsp;               POST /api/settings/subscription/cancel

&nbsp;                   Body: { reason?: string, feedback?: string }

&nbsp;                   Response: { success: true, cancelsAt: timestamp, accessUntil: timestamp }

&nbsp;                   Permission: Pro users only

&nbsp;                   Connection: Stripe subscription cancel → Prisma status update → email notification → WS emit downgrade warning

&nbsp;               GET /api/settings/subscription/invoices

&nbsp;                   Query: { page, limit, year? }

&nbsp;                   Response: { invoices: \[{id, date, amount, status, downloadUrl}], pagination: {total, pages} }

&nbsp;                   Permission: Pro users only

&nbsp;                   Connection: Stripe invoices API → format data → secure download URLs generation

&nbsp;           Notification Preferences Management

&nbsp;               GET /api/settings/notifications

&nbsp;                   Response: { preferences: {email: {marketing, updates, alerts, quotes, deals}, push: {quotes, deals, fleet, suggestions}, inApp: {suggestions, messages, system}}, devices: \[{deviceId, type, lastSeen}] }

&nbsp;                   Permission: Authenticated users only

&nbsp;                   Connection: Prisma NotificationSettings query cu intelligent defaults based pe user plan

&nbsp;               PUT /api/settings/notifications

&nbsp;                   Body: { preferences: object }

&nbsp;                   Response: { success: true, updated: object }

&nbsp;                   Permission: Authenticated users only

&nbsp;                   Connection: Joi validation → Prisma upsert NotificationSettings → update WS room subscriptions → validate channel permissions

&nbsp;               POST /api/settings/notifications/test

&nbsp;                   Body: { channel: 'email'|'push'|'inApp', type: 'quote'|'deal'|'fleet'|'suggestion' }

&nbsp;                   Response: { success: true, sent: boolean, deliveredAt: timestamp }

&nbsp;                   Permission: Authenticated users only

&nbsp;                   Connection: Send test notification via configured channel → track delivery success → log pentru debugging 

&nbsp;           Data \& Privacy Management (GDPR Compliant)

&nbsp;               GET /api/settings/privacy

&nbsp;                   Response: { dataRetention: {period: string, lastCleanup: timestamp}, exports: \[{date, type, status, downloadUrl?}], permissions: {dataSharing, analytics, marketing} }

&nbsp;                   Permission: Authenticated users only

&nbsp;                   Connection: Prisma privacy settings query + DataExport history + retention policy display

&nbsp;               POST /api/settings/data/export

&nbsp;                   Body: { dataTypes: \['cargo', 'quotes', 'messages', 'gps', 'all'], format: 'json'|'csv' }

&nbsp;                   Response: { success: true, exportId: uuid, estimatedTime: string, notificationMethod: 'email'|'inApp' }

&nbsp;                   Permission: Authenticated users only

&nbsp;                   Connection: Validate data types → BullMQ queue DataExportJob → Prisma create export record → email notification when ready

&nbsp;               DELETE /api/settings/data/delete

&nbsp;                   Body: { confirmationCode: string, dataTypes: \['all'|'specific'], keepAccount: boolean }

&nbsp;                   Response: { success: true, deletionScheduledAt: timestamp, completionEstimate: string }

&nbsp;                   Permission: Authenticated users only

&nbsp;                   Connection: Validation confirmation code → BullMQ queue GDPR deletion job → cascade delete user data → account deactivation/deletion

&nbsp;       Database Models (Enhanced)

&nbsp;           UserSettings Model

&nbsp;               userId: foreign key (unique constraint)

&nbsp;               preferences: json {language: string, timezone: string, currency: string, autoSave: boolean, marketingOptIn: boolean}

&nbsp;               theme: enum('light', 'dark', 'auto')

&nbsp;               privacy: json {profileVisible: boolean, dataSharing: boolean, analyticsOptIn: boolean, marketingOptIn: boolean}

&nbsp;               lastUpdated: timestamp (pentru cache invalidation)

&nbsp;               Relations: belongsTo User 

&nbsp;           Subscription Model (Core Business Logic)

&nbsp;               id: uuid, userId: foreign key (unique constraint)

&nbsp;               plan: enum('trial', 'pro')

&nbsp;               status: enum('active', 'cancelled', 'expired', 'pending', 'past\_due')

&nbsp;               stripeCustomerId: string (unique, indexed)

&nbsp;               stripeSubscriptionId: string (nullable, unique când not null)

&nbsp;               currentPeriodStart: timestamp, currentPeriodEnd: timestamp

&nbsp;               cancelAtPeriodEnd: boolean (default false)

&nbsp;               trialEndsAt: timestamp (nullable pentru non-trial users)

&nbsp;               features: json {dispatcher: boolean, aiAgent: boolean, advancedChat: boolean, apiAccess: boolean}

&nbsp;               billingCycle: enum('monthly', 'yearly')

&nbsp;               createdAt, updatedAt: timestamp

&nbsp;               Relations: belongsTo User, hasMany Invoice, hasMany SubscriptionEvent 

&nbsp;           NotificationSettings Model

&nbsp;               userId: foreign key (unique constraint)

&nbsp;               emailNotifications: json {marketing: boolean, updates: boolean, alerts: boolean, quotes: boolean, deals: boolean, system: boolean}

&nbsp;               pushNotifications: json {quotes: boolean, deals: boolean, fleet: boolean, suggestions: boolean, system: boolean}

&nbsp;               inAppNotifications: json {suggestions: boolean, messages: boolean, system: boolean, realtime: boolean}

&nbsp;               devices: json \[{deviceId: string, type: 'web'|'mobile'|'desktop', token: string, lastSeen: timestamp}]

&nbsp;               emailFrequency: enum('instant', 'daily', 'weekly', 'never')

&nbsp;               quietHours: json {enabled: boolean, start: string, end: string, timezone: string}

&nbsp;               updatedAt: timestamp

&nbsp;               Relations: belongsTo User

&nbsp;           DataExport Model (GDPR Compliance)

&nbsp;               id: uuid, userId: foreign key

&nbsp;               exportType: enum('full', 'partial', 'gdpr')

&nbsp;               dataTypes: json \['cargo', 'quotes', 'messages', 'gps', 'settings', 'billing'] 

&nbsp;               format: enum('json', 'csv', 'zip')

&nbsp;               status: enum('requested', 'processing', 'completed', 'failed', 'expired')

&nbsp;               fileUrl: string (nullable, S3 pre-signed URL când completed)

&nbsp;               fileSize: integer (bytes, pentru progress tracking)

&nbsp;               expiresAt: timestamp (7 days după completion)

&nbsp;               errorMessage: text (nullable când status = failed)

&nbsp;               requestedAt, startedAt, completedAt: timestamp

&nbsp;               Relations: belongsTo User

&nbsp;           Invoice Model (Billing History)

&nbsp;               id: uuid, subscriptionId: foreign key

&nbsp;               stripeInvoiceId: string (unique, indexed)

&nbsp;               amount: decimal, currency: string (default 'EUR')

&nbsp;               status: enum('pending', 'paid', 'failed', 'voided')

&nbsp;               description: string (plan name + period)

&nbsp;               dueDate: timestamp, paidAt: timestamp (nullable)

&nbsp;               downloadUrl: string (Stripe hosted invoice URL)

&nbsp;               paymentMethod: string (last 4 digits + type)

&nbsp;               createdAt: timestamp

&nbsp;               Relations: belongsTo Subscription

&nbsp;           SubscriptionEvent Model (Audit Trail)

&nbsp;               id: uuid, subscriptionId: foreign key

&nbsp;               eventType: enum('created', 'upgraded', 'downgraded', 'cancelled', 'renewed', 'payment\_failed') 

&nbsp;               oldPlan: string (nullable), newPlan: string (nullable)

&nbsp;               reason: text (nullable, user provided cancellation reason)

&nbsp;               metadata: json (additional event data)

&nbsp;               createdAt: timestamp

&nbsp;               Relations: belongsTo Subscription

&nbsp;       Real-time Features (Socket.io Integration)

&nbsp;           WebSocket Events (Settings Specific)

&nbsp;               'settings\_updated' → Sync settings changes across user sessions

&nbsp;               'subscription\_changed' → Immediate plan upgrade/downgrade notifications

&nbsp;               'trial\_expiry\_warning' → Progressive countdown notifications (7, 3, 1 days)

&nbsp;               'data\_export\_ready' → Export completion notification cu download link

&nbsp;               'payment\_failed' → Critical billing issue alerts

&nbsp;               'feature\_access\_changed' → Real-time feature lockdown/unlock

&nbsp;           Socket.io Room Management

&nbsp;               'user\_{userId}' → Personal settings și subscription updates

&nbsp;               'trial\_users' → Broadcast expiry reminders și upgrade promotions

&nbsp;               'pro\_users' → Pro-specific feature announcements și updates

&nbsp;               'billing\_issues' → Payment failure și recovery notifications

&nbsp;           Subscription State Synchronization

&nbsp;               Real-time feature access updates across all user sessions

&nbsp;               Immediate UI component enabling/disabling on plan changes

&nbsp;               Progressive feature lockdown warnings before cancellation takes effect

&nbsp;               Live billing status updates (payment processing, failures, success) 

&nbsp;       Background Jobs \& Processing Pipeline

&nbsp;           Subscription Lifecycle Management

&nbsp;               TrialExpiryCheckJob (cron: daily at 09:00 UTC)

&nbsp;                   Query trials expiring în 7, 3, 1 days

&nbsp;                   Send personalized reminder emails cu upgrade incentives

&nbsp;                   Push WebSocket notifications pentru active users

&nbsp;                   Auto-downgrade expired trials la read-only mode

&nbsp;                   Create SubscriptionEvent records pentru audit

&nbsp;               SubscriptionSyncJob (cron: every 6 hours)

&nbsp;                   Sync Stripe subscription status cu local database

&nbsp;                   Handle payment failures, renewals, și plan changes

&nbsp;                   Update feature access rights based pe current status

&nbsp;                   Process cancellations și reactivations automatically

&nbsp;                   Reconcile discrepancies între Stripe și local data

&nbsp;               InvoiceProcessingJob (trigger: Stripe webhook events)

&nbsp;                   Process new invoices, payments, și failures din Stripe

&nbsp;                   Update local Invoice records cu latest status

&nbsp;                   Send payment confirmation emails pentru successful payments

&nbsp;                   Trigger failed payment recovery sequences

&nbsp;                   Generate usage reports pentru Pro users

&nbsp;           Data Management \& Privacy Jobs

&nbsp;               DataExportJob (trigger: user export request)

&nbsp;                   Collect comprehensive user data from all related tables

&nbsp;                   Generate structured exports în requested format (JSON/CSV)

&nbsp;                   Apply data anonymization pentru privacy compliance

&nbsp;                   Upload secure files la S3 cu 7-day expiry

&nbsp;                   Email secure download links la verified user email addresses

&nbsp;               DataRetentionJob (cron: weekly Sunday at 02:00 UTC)

&nbsp;                   Archive old data based pe configured retention policies

&nbsp;                   Delete expired data exports (>7 days) din storage

&nbsp;                   Clean soft-deleted user data after 30-day grace period

&nbsp;                   GDPR compliance cleanup pentru deleted accounts

&nbsp;                   Generate data retention reports pentru compliance

&nbsp;               AnalyticsAggregationJob (cron: daily at 02:00 UTC)

&nbsp;                   Aggregate anonymized user activity patterns pentru insights

&nbsp;                   Calculate subscription conversion metrics și churn analysis

&nbsp;                   Generate usage reports pentru Pro users (fleet utilization, AI usage)

&nbsp;                   Privacy-compliant analytics only (no personally identifiable information)

&nbsp;                   Update business intelligence dashboards

&nbsp;       External Service Integrations

&nbsp;           Stripe Integration (Payment Processing Core)

&nbsp;               Customer creation și comprehensive lifecycle management

&nbsp;               Subscription creation, updates, cancellations, și renewals

&nbsp;               Invoice generation, payment processing, și failure handling

&nbsp;               Webhook event processing pentru real-time subscription updates

&nbsp;               Secure API key management + webhook signature validation

&nbsp;               Integration Architecture: Direct API calls + webhook listeners + retry logic

&nbsp;           Email Service Integration (Communication Hub)

&nbsp;               Transactional emails pentru subscription changes și account updates

&nbsp;               Marketing emails pentru feature announcements (cu opt-out compliance)

&nbsp;               System notifications pentru payment failures și trial expiry

&nbsp;               Data export completion emails cu secure download links

&nbsp;               Integration: SendGrid/AWS SES cu template management + delivery tracking

&nbsp;           Cloud Storage Integration (Secure File Management)

&nbsp;               Secure file storage pentru user data exports

&nbsp;               Pre-signed temporary URLs cu automatic 7-day expiry

&nbsp;               Encryption at rest pentru sensitive user data

&nbsp;               Access logging și audit trails pentru compliance

&nbsp;               Integration: AWS S3 cu IAM policies + lifecycle management

&nbsp;           Analytics Integration (Privacy-First Insights)

&nbsp;               Anonymized user behavior tracking pentru product improvement

&nbsp;               Feature usage analytics pentru Pro users only

&nbsp;               Subscription conversion funnel analysis

&nbsp;               Privacy-compliant tools only (no personal data collection)

&nbsp;               Integration: Custom analytics + privacy-first tools compliance

&nbsp;       Caching Strategy (Performance Optimization)

&nbsp;           Multi-Layer Redis Caching

&nbsp;               settings:user:{userId} (30min TTL) - Complete user preferences și settings

&nbsp;               subscription:{userId} (15min TTL) - Current subscription status și features

&nbsp;               notifications:{userId} (1h TTL) - Notification preferences și device tokens

&nbsp;               billing:{userId} (5min TTL) - Recent billing information și payment status

&nbsp;               exports:{userId} (10min TTL) - Active data export status și history

&nbsp;           Database Query Optimization

&nbsp;               Strategic indexes pe subscription status, expiry dates, și user relationships

&nbsp;               Materialized views pentru complex subscription analytics

&nbsp;               Efficient joins optimization între User și related settings tables

&nbsp;               Query result caching pentru expensive aggregation operations

&nbsp;           CDN Asset Caching

&nbsp;               Static UI assets pentru settings interfaces (long TTL)

&nbsp;               User avatar images cu intelligent cache invalidation

&nbsp;               Invoice PDFs cu secure access control și reasonable TTL

&nbsp;               Email template assets cu version-based cache busting 

&nbsp;       Authentication \& Authorization Framework

&nbsp;           Tiered Permission System

&nbsp;               Trial Users: Basic settings access, limited notifications, no billing management

&nbsp;               Pro Users: Complete settings access, advanced notifications, full billing control

&nbsp;               Expired Users: Read-only settings access, persistent upgrade prompts, data export only

&nbsp;               Suspended Users: Minimal access pentru account recovery și data export

&nbsp;           Dynamic Feature Access Control

&nbsp;               Real-time feature flags based pe current subscription status

&nbsp;               Graceful feature degradation când subscription expires

&nbsp;               Immediate feature access grants upon successful upgrade

&nbsp;               Progressive warnings before feature lockdown

&nbsp;           Data Access Security Matrix

&nbsp;               Users can access only their own settings și related data

&nbsp;               Admin endpoints pentru subscription management (future expansion)

&nbsp;               Comprehensive audit logging pentru sensitive operations (billing, exports, deletions)

&nbsp;               Role-based access control pentru customer support scenarios

&nbsp;       Performance Optimization Strategies

&nbsp;           Settings Load Performance

&nbsp;               Batch loading all user settings într-o single optimized request

&nbsp;               Lazy loading pentru data-heavy sections (invoices, export history)

&nbsp;               Optimistic UI updates pentru instant user feedback

&nbsp;               Intelligent prefetching based pe user navigation patterns

&nbsp;           Subscription Status Checking

&nbsp;               Aggressive caching of subscription status pentru frequent access

&nbsp;               Background synchronization cu Stripe pentru data accuracy

&nbsp;               Circuit breaker pattern pentru Stripe API failure handling

&nbsp;               Fallback mechanisms când external services unavailable

&nbsp;           Data Export Optimization

&nbsp;               Streaming exports pentru large user datasets

&nbsp;               Compressed file formats (ZIP cu JSON/CSV) pentru efficient downloads

&nbsp;               Progress tracking și real-time updates pentru long-running exports

&nbsp;               Chunked processing pentru memory efficiency

&nbsp;       Error Handling \& Monitoring Framework

&nbsp;           Security Considerations (Multi-Layer Protection)

&nbsp;               Payment Security Compliance

&nbsp;                   PCI DSS compliance prin complete Stripe integration

&nbsp;                   Zero local storage of sensitive card data

&nbsp;                   Secure webhook signature verification pentru all Stripe events

&nbsp;                   Encrypted storage of billing metadata și transaction history

&nbsp;               Data Privacy Protection (GDPR/CCPA Compliant)

&nbsp;                   Complete GDPR-compliant data export functionality

&nbsp;                   Right to deletion implementation cu comprehensive data removal

&nbsp;                   Granular consent management pentru data processing activities

&nbsp;                   Privacy policy compliance cu automatic updates și user notifications

&nbsp;               Settings Security Framework

&nbsp;                   Comprehensive input validation pentru all settings forms

&nbsp;                   Rate limiting pentru settings updates (prevent abuse)

&nbsp;                   Secure session management pentru sensitive operations

&nbsp;                   Complete audit trail pentru account changes și administrative actions

&nbsp;               API Security Enhancement

&nbsp;                   Enhanced JWT validation pentru billing și sensitive endpoints

&nbsp;                   CSRF protection pentru payment operations și account modifications

&nbsp;                   Secure file access control pentru exports cu time-limited access

&nbsp;                   IP filtering și geolocation restrictions pentru admin operations (future capability)

&nbsp;                   Request signing și integrity verification pentru critical operations

&nbsp;           Payment Processing Error Management

&nbsp;               Card declined scenarios → intelligent retry flows cu alternative payment methods

&nbsp;               Subscription sync failures → automated reconciliation cu manual override options

&nbsp;               Webhook processing errors → exponential backoff retry cu dead letter queues

&nbsp;               Billing disputes và chargebacks → automated notification și manual review triggers 

&nbsp;           Data Export Error Scenarios

&nbsp;               Export timeout handling → partial exports cu continuation mechanisms

&nbsp;               Storage failures → automatic fallback la alternative storage providers

&nbsp;               Large dataset processing → intelligent chunking și memory management

&nbsp;               Corrupt data detection → data validation și repair procedures

&nbsp;           Settings Synchronization Errors

&nbsp;               Conflicting concurrent updates → last-write-wins cu user conflict notifications

&nbsp;               Cache invalidation failures → force refresh mechanisms cu user notifications

&nbsp;               Real-time sync issues → polling fallback cu transparent user experience

&nbsp;               Cross-session consistency → eventual consistency cu conflict resolution

&nbsp;           Comprehensive Monitoring Strategy

&nbsp;               Stripe webhook delivery success rates și processing times

&nbsp;               Data export job completion rates și failure analysis

&nbsp;               Settings update performance tracking și bottleneck identification

&nbsp;               Subscription conversion funnel analysis cu drop-off point identification

&nbsp;               Real-time alerting pentru critical system failures și business metrics



