"use client";

import { useI18nStore, Language } from "@/store/useI18nStore";

// Translation dictionary keyed by the original English label.
// If a key is missing, the original string is returned.
const translations: Record<Language, Record<string, string>> = {
  en: {},
  ro: {
    // Bottom nav
    Home: "Acasă",
    Marketplace: "Piață",
    Dispatcher: "Dispecer",
    Settings: "Setări",

    // Marketplace
    "How can we help you today? Pick your path below.": "Cum te putem ajuta azi? Alege opțiunea dorită.",
    "I have cargo to transport": "Am marfă de transportat",
    "I'm looking for cargo to transport": "Caut marfă de transportat",
    "Quick Actions": "Acțiuni rapide",
    "Get started": "Începe",
    "Search loads": "Caută curse",
    "Track My Shipments": "Urmărește transporturile",
    "View shipments": "Vezi transporturi",
    "How It Works": "Cum funcționează",
    "Post or Find": "Publică sau caută",
    "Connect & Quote": "Conectează & Oferă preț",
    "Track & Complete": "Urmărește & Finalizează",
    "Whether you have cargo to ship or you're looking for loads to transport, get started in seconds.": "Indiferent dacă ai marfă de expediat sau cauți curse, începe în câteva secunde.",
    "Connect with verified partners and send competitive quotes.": "Conectează-te cu parteneri verificați și trimite oferte competitive.",
    "Monitor shipments in real-time with GPS tracking and updates.": "Monitorizează transporturile în timp real cu urmărire GPS și actualizări.",
    "ALL OFFERS": "TOATE OFERTELE",
    "MY CARGO": "MARFA MEA",
    "MY QUOTES": "OFERTELE MELE",
    "ACTIVE DEALS": "TRANZACȚII ACTIVE",
    "Delete Cargo": "Șterge marfă",
    "Add Cargo": "Adaugă marfă",
    "Search cargo...": "Caută marfă...",
    "All Countries": "Toate Țările",
    Netherlands: "Olanda",
    Germany: "Germania",
    France: "Franța",
    Belgium: "Belgia",
    Italy: "Italia",
    "Newest First": "Cele mai noi",
    "Oldest First": "Cele mai vechi",
    "Price High to Low": "Preț descrescător",
    "Price Low to High": "Preț crescător",
    "All Types": "Toate tipurile",
    Pallets: "Paleți",
    Container: "Container",
    Bulk: "Vrac",
    "All Urgency": "Toate urgențele",
    Low: "Scăzută",
    Medium: "Medie",
    High: "Ridicată",
    Urgent: "Urgentă",
    "All Dates": "Toate datele",
    Today: "Astăzi",
    "This Week": "Săptămâna aceasta",
    "This Month": "Luna aceasta",
    Clear: "Curăță",
    "Add New Cargo": "Adaugă marfă nouă",
    Cancel: "Renunță",
    "Budget (EUR)": "Buget (EUR)",
    "Special Requirements": "Cerințe speciale",
    "No special requirements": "Fără cerințe speciale",
    "Additional Notes": "Note suplimentare",
    "Add Cargo Submit": "Adaugă marfă",
    Min: "Min",
    Max: "Max",

    // Dispatcher
    "AI Agent": "Agent AI",
    "Cost Settings": "Costuri",
    "Agent Levels": "Niveluri Agent",
    "AI Suggestions": "Sugestii AI",
    "Fleet Management": "Flotă",
    "Interactive Map": "Hartă interactivă",
    "GPS tracking with real-time vehicle positions": "Urmărire GPS cu poziții în timp real",
    "Fleet Vehicles": "Vehicule flotă",
    "Search vehicles...": "Caută vehicule...",
    "All Status": "Toate statusurile",
    Active: "Activ",
    Inactive: "Inactiv",
    Maintenance: "Mentenanță",
    "Add Fleet Vehicle": "Adaugă vehicul",
    "Settings saved successfully": "Setări salvate",

    // Agent status
    "Agent Active": "Agent Activ",
    "Agent Inactive": "Agent Inactiv",
    "Monitoring system status": "Monitorizează starea sistemului",
    "No active processes": "Niciun proces activ",

    // Cost settings modal
    "Basic Operating Costs": "Costuri de bază",
    "Fuel Cost per Mile": "Cost combustibil/ milă",
    "Driver Rate per Mile": "Tarif șofer/ milă",
    "Insurance per Mile": "Asigurare/ milă",
    "Maintenance per Mile": "Mentenanță/ milă",
    "Advanced Costs": "Costuri avansate",
    "Deadhead Factor (%)": "Factor deadhead (%)",
    "Minimum Profit Margin (%)": "Marjă minimă profit (%)",
    "AI Agent Level Costs": "Costuri niveluri Agent AI",
    "Total per Mile:": "Total pe milă:",
    "Save Settings": "Salvează",
    Reset: "Reset",
    // Note: duplicate keys avoided
    "Manage your account, permissions, and application preferences": "Gestionează contul, permisiunile și preferințele aplicației",
    "User Level": "Nivel utilizator",
    "Account Status": "Starea contului",
    "Upgrade to Pro": "Upgrade la Pro",
    "General Settings": "Setări generale",
    "Account & Subscription": "Cont & Abonament",
    "Notification Preferences": "Preferințe notificări",
    "Configure your application preferences and behavior": "Configurează preferințele și comportamentul aplicației",
    "Enable persistent settings": "Activează setări persistente",
    "Save preferences across sessions": "Salvează preferințele între sesiuni",
    "Your settings and preferences will be automatically saved and restored when you return": "Setările vor fi salvate și restaurate automat la revenire",
    "Enable real-time updates": "Activează actualizări în timp real",
    "Cargo and notifications updates": "Actualizări cargo și notificări",
    "Live cargo updates (Requires Pro)": "Actualizări cargo live (Necesită Pro)",
    "Show detailed error messages": "Afișează mesaje de eroare detaliate",
    "Display technical error information": "Afișează informații tehnice despre erori",
    "Show technical details when errors occur (recommended for advanced users)": "Afișează detalii tehnice când apar erori (recomandat utilizatorilor avansați)",
    "Optimize for slower connections": "Optimizează pentru conexiuni lente",
    "Lazy load maps and heavy content": "Încărcare întârziată pentru hărți și conținut voluminos",
    "Reduces data usage by loading maps and images only when needed": "Reduce traficul încărcând hărți și imagini doar când sunt necesare",
    "Save Changes": "Salvează modificările",
  },
};

export function translate(label: string, lang: Language): string {
  return translations[lang]?.[label] ?? label;
}

export function useT() {
  const lang = useI18nStore((s) => s.language);
  return (label: string) => translate(label, lang);
}


