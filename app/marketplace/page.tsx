"use client";

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Modal from '@/components/Modal';
import { MapPin } from 'lucide-react';

type Cargo = {
  id: number;
  title: string;
  company: string;
  price: string;
  time: string;
  from: string;
  to: string;
  type: string;
  weight: string;
  volume?: string;
  urgency: 'Low'|'Medium'|'High';
};

const demoCargo: Cargo[] = [
  { id:1, title:'Electronics Shipment', company:'TransCorp', price:'€1,850', time:'2 hours ago', from:'NL Amsterdam 1012', to:'DE Berlin 10115', type:'Pallets', weight:'2,500 kg', volume:'12.5 m³', urgency:'Medium' },
  { id:2, title:'Food & Beverages', company:'FoodLogistics', price:'€3,200', time:'5 hours ago', from:'DE Berlin 10115', to:'FR Paris 75001', type:'Container', weight:'15,000 kg', volume:'68.0 m³', urgency:'High' },
  { id:3, title:'Construction Materials', company:'BuildCorp', price:'€2,750', time:'1 day ago', from:'FR Paris 75001', to:'IT Rome 00118', type:'Bulk', weight:'8,000 kg', urgency:'Low' },
  { id:4, title:'Medical Supplies', company:'MedTrans', price:'€950', time:'3 hours ago', from:'BE Brussels 1000', to:'NL Utrecht 3511', type:'Refrigerated', weight:'1,200 kg', volume:'5.2 m³', urgency:'High' },
  { id:5, title:'Automotive Parts', company:'AutoLogistics', price:'€2,150', time:'6 hours ago', from:'DE Munich 80331', to:'FR Lyon 69001', type:'Pallets', weight:'3,800 kg', volume:'18.3 m³', urgency:'Low' },
  { id:6, title:'Textile Products', company:'FashionFreight', price:'€1,980', time:'8 hours ago', from:'IT Milan 20121', to:'DE Hamburg 20095', type:'Container', weight:'6,500 kg', volume:'42.8 m³', urgency:'Medium' },
];

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<'ALL'|'MY_CARGO'|'MY_QUOTES'|'ACTIVE_DEALS'>('ALL');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ country:'', sort:'newest', type:'', urgency:'', date:'', min:'', max:'' });
  const [addOpen, setAddOpen] = useState(false);
  const [detailId, setDetailId] = useState<number | null>(null);
  const searchParams = useSearchParams();

  // Initialize state from query params (e.g., ?add=1&tab=ACTIVE_DEALS)
  useEffect(() => {
    const add = searchParams.get('add');
    const tab = searchParams.get('tab') as any;
    if (add === '1') setAddOpen(true);
    if (tab && ['ALL','MY_CARGO','MY_QUOTES','ACTIVE_DEALS'].includes(tab)) setActiveTab(tab);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = demoCargo.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()));
    if (filters.type) list = list.filter((c) => c.type.toLowerCase().includes(filters.type));
    if (filters.urgency) list = list.filter((c) => c.urgency.toLowerCase() === filters.urgency);
    if (filters.min) list = list.filter((c) => Number(c.price.replace(/[^0-9.]/g,'')) >= Number(filters.min));
    if (filters.max) list = list.filter((c) => Number(c.price.replace(/[^0-9.]/g,'')) <= Number(filters.max));
    if (filters.sort === 'price-high') list = [...list].sort((a,b)=> Number(b.price.replace(/[^0-9.]/g,'')) - Number(a.price.replace(/[^0-9.]/g,'')));
    if (filters.sort === 'price-low') list = [...list].sort((a,b)=> Number(a.price.replace(/[^0-9.]/g,'')) - Number(b.price.replace(/[^0-9.]/g,'')));
    return list;
  }, [query, filters]);

  return (
    <section className="min-h-screen bg-[url('https://images.unsplash.com/photo-1659115516377-25ed306a3551?w=2560&q=80')] bg-cover pt-6 px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Header Tabs + Actions */}
        <div className="flex items-center justify-between mb-8 animate-on-scroll in-view">
          <div className="flex items-center gap-8 text-sm text-gray-400">
            {[
              {k:'ALL', label:'ALL OFFERS'},
              {k:'MY_CARGO', label:'MY CARGO'},
              {k:'MY_QUOTES', label:'MY QUOTES'},
              {k:'ACTIVE_DEALS', label:'ACTIVE DEALS'},
            ].map((t:any) => (
              <button key={t.k} onClick={()=>setActiveTab(t.k)} className={`hover:text-white transition-colors border-b pb-2 ${activeTab===t.k ? 'tab-active' : 'border-transparent'}`}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:text-white transition-colors flex items-center gap-2 text-sm text-gray-400 px-6 py-2" onClick={()=>{ /* placeholder delete */ }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              Delete Cargo
            </button>
            <button onClick={() => setAddOpen(true)} className="glass-border hover:bg-white/5 transition-all flex gap-2 text-sm font-medium text-white bg-gray-900 rounded-lg px-6 py-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
              Add Cargo
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 animate-on-scroll in-view">
          <div className="relative">
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search cargo..." className="glass-input w-full placeholder-gray-400 text-white rounded-lg py-3 pl-12 pr-10" />
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-3.5 text-gray-400"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
            {query && (
              <button aria-label="Clear" onClick={()=>setQuery('')} className="absolute right-3 top-3.5 text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 flex-wrap mb-8 items-center animate-on-scroll in-view">
          <select value={filters.country} onChange={(e)=>setFilters({...filters, country:e.target.value})} className="glass-input text-sm text-white bg-transparent rounded-lg px-3 py-2">
            <option value="">All Countries</option>
            <option value="nl">Netherlands</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
            <option value="be">Belgium</option>
            <option value="it">Italy</option>
          </select>
          <select value={filters.sort} onChange={(e)=>setFilters({...filters, sort:e.target.value})} className="glass-input text-sm text-white bg-transparent rounded-lg px-3 py-2">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-high">Price High to Low</option>
            <option value="price-low">Price Low to High</option>
          </select>
          <select value={filters.type} onChange={(e)=>setFilters({...filters, type:e.target.value})} className="glass-input text-sm text-white bg-transparent rounded-lg px-3 py-2">
            <option value="">All Types</option>
            <option value="pallets">Pallets</option>
            <option value="container">Container</option>
            <option value="bulk">Bulk</option>
          </select>
          <select value={filters.urgency} onChange={(e)=>setFilters({...filters, urgency:e.target.value})} className="glass-input text-sm text-white bg-transparent rounded-lg px-3 py-2">
            <option value="">All Urgency</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          <select value={filters.date} onChange={(e)=>setFilters({...filters, date:e.target.value})} className="glass-input text-sm text-white bg-transparent rounded-lg px-3 py-2">
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
          </select>
          <input value={filters.min} onChange={(e)=>setFilters({...filters, min:e.target.value})} type="number" placeholder="Min" className="glass-input text-sm text-white bg-transparent rounded-lg px-3 py-2 w-20" />
          <input value={filters.max} onChange={(e)=>setFilters({...filters, max:e.target.value})} type="number" placeholder="Max" className="glass-input text-sm text-white bg-transparent rounded-lg px-3 py-2 w-20" />
          <button onClick={()=>setFilters({ country:'', sort:'newest', type:'', urgency:'', date:'', min:'', max:'' })} className="text-sm text-gray-400 hover:text-white px-3 py-2">Clear</button>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll in-view">
          {filtered.map((c) => (
            <div key={c.id} className="glass-card rounded-xl p-6 hover:bg-white/5 transition-all cursor-pointer relative group" onClick={()=>setDetailId(c.id)}>
              <div className="absolute top-4 right-4">
                <span className={`text-xs px-2 py-1 rounded-full font-medium transition-all bg-white/10 text-white ${c.urgency==='High' ? 'group-hover:bg-red-500 group-hover:text-white' : c.urgency==='Medium' ? 'group-hover:bg-yellow-500 group-hover:text-black' : 'group-hover:bg-green-500 group-hover:text-white'}`}>{c.urgency}</span>
              </div>
              <div className="flex items-start justify-between mb-4 pr-16">
                <h3 className="text-sm font-medium text-white">{c.title}</h3>
                <span className="text-xs text-gray-400">{c.time}</span>
              </div>
              <div className="space-y-3 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <MapPin className="w-3 h-3 text-green-400" />
                    <span>From: {c.from}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <MapPin className="w-3 h-3 text-red-400" />
                    <span>To: {c.to}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400">{c.type} • {c.weight}{c.volume ? ` • ${c.volume}` : ''}</div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-white">{c.price}</span>
                <span className="text-xs text-gray-400">by {c.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Cargo Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add New Cargo">
        <form className="space-y-6" onSubmit={(e)=>{e.preventDefault(); setAddOpen(false);}}>
          <div>
            <h3 className="text-base font-medium text-gray-300 mb-3">Cargo Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
                <label className="block text-xs text-gray-400 mb-2">Cargo Title</label>
                <input className="glass-input w-full px-3 py-2 rounded-lg text-white placeholder-gray-400" placeholder="Enter cargo title" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Cargo Type</label>
                <select className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent">
                  <option value="">Select cargo type</option>
                  <option value="pallets">Pallets</option>
                  <option value="container">Container</option>
                  <option value="bulk">Bulk</option>
                  <option value="refrigerated">Refrigerated</option>
                  <option value="hazardous">Hazardous</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Weight (kg) *</label>
                <input type="number" className="glass-input w-full px-3 py-2 rounded-lg text-white placeholder-gray-400" placeholder="Enter weight" required />
            </div>
            <div>
                <label className="block text-xs text-gray-400 mb-2">Volume (m³)</label>
                <input type="number" step="0.1" className="glass-input w-full px-3 py-2 rounded-lg text-white placeholder-gray-400" placeholder="Enter volume (optional)" />
              </div>
            </div>
          </div>

            <div>
            <h3 className="text-base font-medium text-gray-300 mb-3">Route Information</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="text-xs text-gray-400 font-medium">FROM</h4>
                <input className="glass-input w-full px-3 py-2 rounded-lg text-white placeholder-gray-400" placeholder="From Address" />
                <input className="glass-input w-full px-3 py-2 rounded-lg text-white placeholder-gray-400" placeholder="City" />
                <input className="glass-input w-full px-3 py-2 rounded-lg text-white placeholder-gray-400" placeholder="Postal Code" />
                <select className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent">
                  <option value="">Select country</option>
                  <option value="nl">Netherlands</option>
                  <option value="de">Germany</option>
                  <option value="fr">France</option>
                  <option value="be">Belgium</option>
                  <option value="it">Italy</option>
                </select>
                <input type="date" className="glass-input w-full px-3 py-2 rounded-lg text-white" />
              </div>
              <div className="space-y-3">
                <h4 className="text-xs text-gray-400 font-medium">TO</h4>
                <input className="glass-input w-full px-3 py-2 rounded-lg text-white placeholder-gray-400" placeholder="To Address" />
                <input className="glass-input w-full px-3 py-2 rounded-lg text-white placeholder-gray-400" placeholder="City" />
                <input className="glass-input w-full px-3 py-2 rounded-lg text-white placeholder-gray-400" placeholder="Postal Code" />
                <select className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent">
                  <option value="">Select country</option>
                  <option value="nl">Netherlands</option>
                  <option value="de">Germany</option>
                  <option value="fr">France</option>
                  <option value="be">Belgium</option>
                  <option value="it">Italy</option>
              </select>
                <input type="date" className="glass-input w-full px-3 py-2 rounded-lg text-white" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium text-gray-300 mb-3">Pricing & Additional Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-2">Budget (EUR)</label>
                <input type="number" className="glass-input w-full px-3 py-2 rounded-lg text-white placeholder-gray-400" placeholder="Enter price" />
            </div>
            <div>
                <label className="block text-xs text-gray-400 mb-2">Special Requirements</label>
                <select className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent">
                  <option value="">No special requirements</option>
                  <option value="refrigerated">Refrigerated transport</option>
                  <option value="fragile">Fragile goods</option>
                  <option value="hazardous">Hazardous materials</option>
                  <option value="oversized">Oversized cargo</option>
                </select>
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-xs text-gray-400 mb-2">Additional Notes</label>
              <textarea rows={4} className="glass-input w-full px-3 py-2 rounded-lg text-white placeholder-gray-400 resize-none" placeholder="Add any additional information or special instructions..."></textarea>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-700">
            <button type="button" onClick={()=>setAddOpen(false)} className="px-6 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
            <button type="submit" className="glass-border hover:bg-white/5 transition-all px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg">Add Cargo</button>
          </div>
        </form>
      </Modal>

      {/* Cargo Detail Modal */}
      <Modal open={detailId !== null} onClose={()=>setDetailId(null)} title="Cargo Details">
        {detailId && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="text-xl font-medium text-white">{demoCargo.find(c=>c.id===detailId)?.title}</h2>
                  <p className="text-sm text-white">Posted {demoCargo.find(c=>c.id===detailId)?.time} by {demoCargo.find(c=>c.id===detailId)?.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2 bg-neutral-50/10 border-white/20 border rounded-full px-3 py-1 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[12px] h-[12px] text-green-500"><path d="m9 12 2 2 4-4"></path><circle cx="12" cy="12" r="9"></circle></svg>
                  <span className="text-xs font-medium text-green-500">Verified</span>
                </div>
              </div>
            </div>

            {/* Cargo Details Summary */}
            <div className="glass-border rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Cargo Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-white mb-1">Weight & Volume</p>
                  <p className="text-sm text-white">{demoCargo.find(c=>c.id===detailId)?.weight}{demoCargo.find(c=>c.id===detailId)?.volume ? ` • ${demoCargo.find(c=>c.id===detailId)?.volume}` : ''}</p>
                </div>
                <div>
                  <p className="text-xs text-white mb-1">Cargo Type | Urgency</p>
                  <p className="text-sm text-white">{demoCargo.find(c=>c.id===detailId)?.type} | {demoCargo.find(c=>c.id===detailId)?.urgency}</p>
                </div>
                <div>
                  <p className="text-xs text-white mb-1">Loading Date</p>
                  <p className="text-sm text-white">Dec 28, 2024</p>
                </div>
                <div>
                  <p className="text-xs text-white mb-1">Delivery Date</p>
                  <p className="text-sm text-white">Dec 30, 2024</p>
                </div>
              </div>
            </div>

            {/* Distance Information */}
            <div className="glass-border rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Distance Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  <div>
                    <p className="text-xs text-white">From</p>
                    <p className="text-sm text-white">Weesperstraat 105, 1018 VN Amsterdam, Netherlands</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  <div>
                    <p className="text-xs text-white">To</p>
                    <p className="text-sm text-white">Potsdamer Platz 1, 10785 Berlin, Germany</p>
                  </div>
                </div>
                <button className="glass-border hover:bg-white/5 transition-all w-full text-sm text-white rounded-lg mt-3 py-2 px-4">View full route (≈ 1.4k km)</button>
              </div>
            </div>

            {/* Cost Details */}
            <div className="glass-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-300">Cost Details</h3>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.663 17h4.673M12 3v1m6.21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386z"></path></svg>
                  <span className="text-xs text-white font-medium">Pro AI Analysis</span>
                  <button className="text-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg></button>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs text-white mb-2">Estimated Costs</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-gray-300"><span>Fuel & vehicle (1385km × €1.20/km):</span><span>€1,662.00</span></div>
                    <div className="flex justify-between text-gray-300"><span>Driver pay (17.31h × €25.00/h):</span><span>€432.75</span></div>
                    <div className="flex justify-between text-gray-300"><span>Insurance & fees:</span><span>€80.00</span></div>
                    <div className="border-t border-gray-700 pt-2 mt-2">
                      <div className="flex justify-between text-white font-medium"><span>Total Cost:</span><span>€2,174.75</span></div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-white mb-2">Profit Analysis</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-gray-300"><span>Agent recommendation:</span><span className="text-white">€2,500.96</span></div>
                    <div className="flex justify-between text-gray-300"><span>Profit at recommendation:</span><span className="text-white">€326.21</span></div>
                    <div className="flex justify-between text-gray-300"><span>Posted price:</span><span className="text-white">€1,850.00</span></div>
                    <div className="flex justify-between"><span className="text-gray-300">Your profit at posted price:</span><span className="text-red-500">€-324.75 (-14.9%)</span></div>
                  </div>
                </div>
                <div className="flex gap-2 items-center"><span className="text-xs text-white">Profit Assessment:</span><span className="text-xs text-red-500 bg-white/10 border-white/20 border rounded py-1 px-2">Low</span></div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-xs text-white mb-1">Additional Notes & Estimates</p>
                  <p className="text-xs text-gray-300">Consider negotiating higher rate due to premium electronics cargo and temperature control requirements.</p>
                </div>
              </div>
            </div>

            {/* Quote Status */}
            <div className="glass-border rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Quote Status</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span className="text-sm text-gray-300">3 quotes submitted • Awaiting shipper response</span>
              </div>
            </div>

            {/* Description */}
            <div className="glass-border rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Description</h3>
              <p className="text-sm text-white">High-value electronics requiring careful handling and temperature-controlled transport. Pickup between 8-10 AM, delivery before 6 PM.</p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-700">
              <button className="glass-border hover:bg-white/5 transition-all px-4 py-3 text-sm font-medium text-white bg-gray-900 rounded-lg flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" x2="8" y1="13" y2="13"></line><line x1="16" x2="8" y1="17" y2="17"></line><line x1="10" x2="8" y1="9" y2="9"></line></svg>
                Send Quote
              </button>
              <button className="glass-border hover:bg-white/5 transition-all px-4 py-3 text-sm font-medium text-white rounded-lg flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                Chat with Shipper
              </button>
              <button className="glass-border hover:bg-white/5 transition-all px-4 py-2 text-sm text-white rounded-lg flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"></path></svg>
                Save for Later
              </button>
              <button className="glass-border hover:bg-white/5 transition-all px-4 py-2 text-sm text-white rounded-lg flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18l-2 13H5L3 6z"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                Ignore
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
