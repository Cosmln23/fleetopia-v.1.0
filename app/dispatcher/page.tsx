"use client";

import { useMemo, useState } from 'react';
import { MapPin, Settings as SettingsIcon, Gauge, Calculator, MessageSquare, X } from 'lucide-react';
import { useT } from '@/utils/i18n';
import Modal from '@/components/Modal';

type AgentSuggestion = {
  level: 'L0' | 'L1' | 'L2';
  title: string;
  description: string;
  confidence: number;
  time: string;
};

type Vehicle = {
  id: string;
  driver: string;
  location: string;
  type: string;
  status: 'active' | 'inactive' | 'maintenance';
};

export default function DispatcherPage() {
  const t = useT();
  // Tabs
  const [activeTab, setActiveTab] = useState<'ai-suggestions' | 'fleet-management'>('fleet-management');

  // Agent state
  const [agentEnabled, setAgentEnabled] = useState(false);
  const [levelsEnabled, setLevelsEnabled] = useState<Record<number, boolean>>({ 0: false, 1: false, 2: false });
  const [suggestions, setSuggestions] = useState<AgentSuggestion[]>([]);
  const [suggestionFilter, setSuggestionFilter] = useState<'all' | 'l0' | 'l1' | 'l2'>('all');
  const [suggestionSort, setSuggestionSort] = useState<'confidence' | 'recent'>('confidence');

  // Cost settings modal state
  const [isCostModalOpen, setIsCostModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Cost inputs
  const [fuelCost, setFuelCost] = useState<number | ''>('');
  const [driverRate, setDriverRate] = useState<number | ''>('');
  const [insurancePerMile, setInsurancePerMile] = useState<number | ''>('');
  const [maintenancePerMile, setMaintenancePerMile] = useState<number | ''>('');
  const totalPerMile = useMemo(() => {
    const f = Number(fuelCost) || 0;
    const d = Number(driverRate) || 0;
    const i = Number(insurancePerMile) || 0;
    const m = Number(maintenancePerMile) || 0;
    return f + d + i + m;
  }, [fuelCost, driverRate, insurancePerMile, maintenancePerMile]);

  // Add fleet modal state
  const [isAddFleetOpen, setIsAddFleetOpen] = useState(false);
  const [gpsOption, setGpsOption] = useState<'device' | 'manual' | ''>('');

  // Demo vehicles
  const vehicles: Vehicle[] = [
    { id: '001', driver: 'John Smith', location: 'Dallas, TX', type: 'Dry Van', status: 'active' },
    { id: '002', driver: 'Mike Johnson', location: 'Atlanta, GA', type: 'Reefer', status: 'active' },
    { id: '003', driver: 'Sarah Wilson', location: 'Phoenix, AZ', type: 'Flatbed', status: 'maintenance' },
  ];

  const filteredAndSortedSuggestions = useMemo(() => {
    let list = suggestions.filter((s) => {
      if (suggestionFilter === 'all') return true;
      if (suggestionFilter === 'l0') return s.level === 'L0';
      if (suggestionFilter === 'l1') return s.level === 'L1';
      return s.level === 'L2';
    });
    if (suggestionSort === 'confidence') {
      list = [...list].sort((a, b) => b.confidence - a.confidence);
    } else {
      list = [...list].sort((a, b) => b.time.localeCompare(a.time));
    }
    return list;
  }, [suggestions, suggestionFilter, suggestionSort]);

  function toggleMasterAgent(next: boolean) {
    setAgentEnabled(next);
    if (!next) {
      setLevelsEnabled({ 0: false, 1: false, 2: false });
    }
  }

  function generateSuggestion(level: 0 | 1 | 2) {
    const templates: Record<number, AgentSuggestion[]> = {
      0: [
        {
          level: 'L0',
          title: 'High-Value Cargo Detected',
          description: 'Found partial load from Dallas, TX to Atlanta, GA - $2,850 for 800 miles',
          confidence: 92,
          time: new Date().toLocaleTimeString(),
        },
      ],
      1: [
        {
          level: 'L1',
          title: 'Cost Analysis Complete',
          description: 'Estimated costs: $1,240 | Projected profit: $1,610 (57% margin)',
          confidence: 88,
          time: new Date().toLocaleTimeString(),
        },
      ],
      2: [
        {
          level: 'L2',
          title: 'Quote Recommendation',
          description: 'Suggested quote: $2,650 (competitive with 89% win probability)',
          confidence: 85,
          time: new Date().toLocaleTimeString(),
        },
      ],
    };
    setSuggestions((prev) => [...templates[level], ...prev]);
  }

  function toggleLevel(level: 0 | 1 | 2, next: boolean) {
    if (!agentEnabled) return;
    setLevelsEnabled((prev) => ({ ...prev, [level]: next }));
    if (next) {
      // L0 keeps local suggestion; L1/L2 call backend via Next API
      if (level === 0) {
        generateSuggestion(0);
      } else if (level === 1) {
        callAgentScore();
      } else if (level === 2) {
        callAgentSuggest();
      }
    }
  }

  async function callAgentScore() {
    try {
      const payload = {
        S: 2650, // anchor price
        M: 2500, // market ref
        C: 1240, // cost estimate
        beta: 6.0,
        f: {
          deadhead_km: 80,
          urgency_min: 360,
          lane_heat: 0.6,
          rel_score: 0.5,
          competition: 'med',
          urgency: 'med',
        },
      };
      const res = await fetch('/api/agent/score', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: any = await res.json();
      const description = `Estimated cost: €${payload.C.toFixed(0)} | P@S: ${(data.p_accept_at_S * 100).toFixed(0)}% | EV(S): €${data.EV_anchor}`;
      const conf = Math.max(75, Math.min(98, Math.round(data.p_accept_at_S * 100)));
      const item: AgentSuggestion = {
        level: 'L1',
        title: 'Cost Analysis Complete',
        description,
        confidence: conf,
        time: new Date().toLocaleTimeString(),
      };
      setSuggestions((prev) => [item, ...prev]);
    } catch (err) {
      // fallback to local demo
      generateSuggestion(1);
    }
  }

  async function callAgentSuggest() {
    try {
      const payload = {
        S: 2650,
        M: 2500,
        C: 1240,
        beta: 6.0,
        f: {
          deadhead_km: 80,
          urgency_min: 360,
          lane_heat: 0.6,
          rel_score: 0.5,
          competition: 'med',
          urgency: 'med',
        },
      };
      const res = await fetch('/api/agent/suggest', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: any = await res.json();
      const isRecommend = data.decision === 'RECOMMEND';
      const desc = isRecommend
        ? `Suggested quote: €${data.price} (ΔEV +€${(data.EV_opt - data.EV_anchor).toFixed(0)} vs S=€${payload.S})`
        : `Hold at €${payload.S}. Recheck in ${data.tau_minutes} min.`;
      const conf = Math.max(70, Math.min(95, Math.round((data.p_accept_at_S || 0.85) * 100)));
      const item: AgentSuggestion = {
        level: 'L2',
        title: isRecommend ? 'Quote Recommendation' : 'Hold Decision',
        description: desc,
        confidence: conf,
        time: new Date().toLocaleTimeString(),
      };
      setSuggestions((prev) => [item, ...prev]);
    } catch (err) {
      // fallback to local demo
      generateSuggestion(2);
    }
  }

  function saveCostSettings() {
    setIsCostModalOpen(false);
    setToast('Settings saved successfully');
    window.setTimeout(() => setToast(null), 2000);
  }

  return (
    <section className="min-h-screen bg-[url('https://images.unsplash.com/photo-1659115516377-25ed306a3551?w=2560&q=80')] bg-cover bg-center pt-6 px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <aside className="w-80 flex-shrink-0 hidden md:block">
            <div className="glass-card rounded-xl p-6 sticky top-24">
              {/* Agent Control */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">{t('AI Agent')}</h2>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={agentEnabled}
                      onChange={(e) => toggleMasterAgent(e.target.checked)}
                    />
                    <div className="w-10 h-5 bg-gray-500/50 peer-checked:bg-red-500/80 rounded-full relative transition-colors">
                      <div className={`h-4 w-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform ${agentEnabled ? 'translate-x-5' : ''}`} />
                    </div>
                  </label>
                </div>
                <button
                  onClick={() => setIsCostModalOpen(true)}
                  className="glass-border hover:bg-white/5 transition-all w-full flex gap-2 text-sm font-medium text-white rounded-lg px-4 py-3 items-center justify-center"
                >
                  <SettingsIcon className="w-4 h-4" /> {t('Cost Settings')}
                </button>
              </div>

              {/* Levels */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">{t('Agent Levels')}</h3>

                {/* L0 */}
                <div className={`glass-border rounded-lg p-4 ${levelsEnabled[0] ? 'level-active' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">L0 — Radar</span>
                      <Gauge className="w-4 h-4 text-red-400" />
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={!!levelsEnabled[0]}
                        onChange={(e) => toggleLevel(0, e.target.checked)}
                        disabled={!agentEnabled}
                      />
                      <div className={`w-10 h-5 ${levelsEnabled[0] ? 'bg-red-500/80' : 'bg-gray-500/50'} rounded-full relative transition-colors`}>
                        <div className={`h-4 w-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform ${levelsEnabled[0] ? 'translate-x-5' : ''}`} />
                      </div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-400">Automatic cargo opportunity detection</p>
                </div>

                {/* L1 */}
                <div className={`glass-border rounded-lg p-4 ${levelsEnabled[1] ? 'level-active' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">L1 — Calculator</span>
                      <Calculator className="w-4 h-4 text-red-400" />
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={!!levelsEnabled[1]}
                        onChange={(e) => toggleLevel(1, e.target.checked)}
                        disabled={!agentEnabled}
                      />
                      <div className={`w-10 h-5 ${levelsEnabled[1] ? 'bg-red-500/80' : 'bg-gray-500/50'} rounded-full relative transition-colors`}>
                        <div className={`h-4 w-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform ${levelsEnabled[1] ? 'translate-x-5' : ''}`} />
                      </div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-400">Automatic cost and profit calculation</p>
                </div>

                {/* L2 */}
                <div className={`glass-border rounded-lg p-4 ${levelsEnabled[2] ? 'level-active' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">L2 — Quote Bot</span>
                      <MessageSquare className="w-4 h-4 text-red-400" />
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={!!levelsEnabled[2]}
                        onChange={(e) => toggleLevel(2, e.target.checked)}
                        disabled={!agentEnabled}
                      />
                      <div className={`w-10 h-5 ${levelsEnabled[2] ? 'bg-red-500/80' : 'bg-gray-500/50'} rounded-full relative transition-colors`}>
                        <div className={`h-4 w-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform ${levelsEnabled[2] ? 'translate-x-5' : ''}`} />
                      </div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-400">Automatic quote suggestion</p>
                </div>
              </div>

              {/* Agent Status */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${agentEnabled ? 'bg-green-500' : 'bg-gray-500'}`} />
                  <span className="text-xs text-gray-400">{agentEnabled ? t('Agent Active') : t('Agent Inactive')}</span>
                </div>
                <div className="text-xs text-gray-500">{agentEnabled ? t('Monitoring system status') : t('No active processes')}</div>
              </div>
            </div>
          </aside>

          {/* Right Content */}
          <div className="flex-1">
            <div className="glass-card rounded-xl h-full">
              {/* Tabs */}
              <div className="flex items-center gap-8 px-6 py-4 border-b border-gray-700">
                <button
                  className={`tab-btn text-sm border-b pb-2 transition-colors ${activeTab === 'ai-suggestions' ? 'tab-active' : 'text-gray-400'}`}
                  onClick={() => setActiveTab('ai-suggestions')}
                >
                  {t('AI Suggestions')}
                </button>
                <button
                  className={`tab-btn text-sm border-b pb-2 transition-colors ${activeTab === 'fleet-management' ? 'tab-active' : 'text-gray-400'}`}
                  onClick={() => setActiveTab('fleet-management')}
                >
                  {t('Fleet Management')}
                </button>
              </div>

              <div className="p-6">
                {/* AI Suggestions View */}
                {activeTab === 'ai-suggestions' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white">AI Suggestions</h3>
                      <div className="flex items-center gap-4">
                        <select
                          className="glass-input text-sm text-white bg-transparent rounded-lg px-3 py-2 focus:outline-none"
                          value={suggestionFilter}
                          onChange={(e) => setSuggestionFilter(e.target.value as any)}
                        >
                          <option value="all" className="bg-gray-900 text-white">All Levels</option>
                          <option value="l0" className="bg-gray-900 text-white">L0 - Radar</option>
                          <option value="l1" className="bg-gray-900 text-white">L1 - Calculator</option>
                          <option value="l2" className="bg-gray-900 text-white">L2 - Quote Bot</option>
                        </select>
                        <select
                          className="glass-input text-sm text-white bg-transparent rounded-lg px-3 py-2 focus:outline-none"
                          value={suggestionSort}
                          onChange={(e) => setSuggestionSort(e.target.value as any)}
                        >
                          <option value="confidence" className="bg-gray-900 text-white">High Confidence</option>
                          <option value="recent" className="bg-gray-900 text-white">Most Recent</option>
                        </select>
                      </div>
                    </div>

                    {/* Feed */}
                    {filteredAndSortedSuggestions.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="mx-auto mb-4 text-gray-500">
                          <Gauge className="w-12 h-12 mx-auto" />
                        </div>
                        <h4 className="text-lg font-medium text-white mb-2">No Active Suggestions</h4>
                        <p className="text-gray-400">Enable AI Agent levels to receive intelligent suggestions</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredAndSortedSuggestions.map((sug, idx) => (
                          <div key={idx} className="glass-border rounded-lg p-4 hover:bg-white/5 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-500/20 text-red-400">{sug.level}</span>
                                <span className="text-sm font-medium text-white">{sug.title}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">{sug.confidence}% confidence</span>
                                <span className="text-xs text-gray-500">{sug.time}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-300">{sug.description}</p>
                            <div className="flex gap-2 mt-3">
                              <button className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 transition-colors rounded text-white">Accept</button>
                              <button className="px-3 py-1 text-xs glass-border hover:bg-white/5 transition-colors rounded text-gray-300">Dismiss</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* History Log */}
                    <div className="mt-8 pt-6 border-t border-gray-700">
                      <h4 className="text-sm font-medium text-gray-300 mb-4">History Log</h4>
                      <div className="space-y-2">
                        <div className="text-xs text-gray-500">No previous suggestions</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fleet Management View */}
                {activeTab === 'fleet-management' && (
                  <div>
                    {/* Map */}
                    <div className="mb-6">
                      <div className="glass-border h-[32rem] flex bg-gray-800/20 rounded-lg items-center justify-center relative">
                        <div className="text-center">
                          <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                          <h4 className="text-lg font-medium text-white mb-2">{t('Interactive Map')}</h4>
                          <p className="text-gray-400">{t('GPS tracking with real-time vehicle positions')}</p>
                        </div>
                        {/* Marker examples */}
                        <div className="absolute top-16 left-20">
                          <span className="block w-3 h-3 rounded-full bg-red-500 ring-2 ring-white" />
                        </div>
                        <div className="absolute top-32 right-24">
                          <span className="block w-3 h-3 rounded-full bg-green-500 ring-2 ring-white" />
                        </div>
                        <div className="absolute bottom-20 left-1/3">
                          <span className="block w-3 h-3 rounded-full bg-yellow-500 ring-2 ring-white" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 text-center mt-2">Real-time updates every 5-10s</p>
                    </div>

                    {/* Vehicle Grid */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">{t('Fleet Vehicles')}</h3>
                        <div className="flex items-center gap-4">
                          <input
                            type="text"
                             placeholder={t('Search vehicles...')}
                            className="glass-input px-3 py-2 rounded-lg text-sm text-white bg-transparent focus:outline-none"
                          />
                          <select className="glass-input px-3 py-2 rounded-lg text-sm text-white bg-transparent focus:outline-none">
                            <option value="all" className="bg-gray-900 text-white">{t('All Status')}</option>
                            <option value="active" className="bg-gray-900 text-white">{t('Active')}</option>
                            <option value="inactive" className="bg-gray-900 text-white">{t('Inactive')}</option>
                            <option value="maintenance" className="bg-gray-900 text-white">{t('Maintenance')}</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {vehicles.map((v) => (
                          <div key={v.id} className="glass-border rounded-lg p-4 group" data-status={v.status}>
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-sm font-medium text-white">Truck #{v.id}</h4>
                              {v.status === 'maintenance' ? (
                                <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400 group-hover:bg-yellow-500 group-hover:text-white transition-all">Maintenance</span>
                              ) : (
                                <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400 group-hover:bg-green-500 group-hover:text-white transition-all">Active</span>
                              )}
                            </div>
                            <div className="space-y-2 text-xs text-gray-400 mb-4">
                              <div>Driver: {v.driver}</div>
                              <div>Location: {v.location}</div>
                              <div>Type: {v.type}</div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                className={`px-3 py-1 text-xs rounded ${v.status === 'maintenance' ? 'bg-gray-600 cursor-not-allowed text-gray-400' : 'glass-border hover:bg-red-500 hover:text-white text-gray-300 transition-colors'}`}
                                disabled={v.status === 'maintenance'}
                              >
                                Track
                              </button>
                              <button className="px-3 py-1 text-xs glass-border hover:bg-white/5 transition-colors rounded text-gray-300">Edit</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add Fleet Button */}
                    <button
                      onClick={() => setIsAddFleetOpen(true)}
                      className="glass-border hover:bg-white/5 transition-all w-full flex gap-2 text-sm font-medium text-white rounded-lg px-6 py-4 items-center justify-center"
                    >
                      <span className="inline-flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                        {t('Add Fleet Vehicle')}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed top-4 right-4 glass-card rounded-lg p-4 z-50">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-white">{t('Settings saved successfully')}</span>
              <button className="text-gray-400 hover:text-white" onClick={() => setToast(null)} aria-label="Close toast">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Cost Settings Modal */}
        <Modal open={isCostModalOpen} onClose={() => setIsCostModalOpen(false)} title="Cost Settings">
          <div className="space-y-6">
            {/* Basic Costs */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Basic Operating Costs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Fuel Cost per Mile</label>
                  <input type="number" step="0.01" placeholder="0.50" value={fuelCost as any} onChange={(e) => setFuelCost(e.target.value === '' ? '' : Number(e.target.value))} className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Driver Rate per Mile</label>
                  <input type="number" step="0.01" placeholder="0.65" value={driverRate as any} onChange={(e) => setDriverRate(e.target.value === '' ? '' : Number(e.target.value))} className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Insurance per Mile</label>
                  <input type="number" step="0.01" placeholder="0.15" value={insurancePerMile as any} onChange={(e) => setInsurancePerMile(e.target.value === '' ? '' : Number(e.target.value))} className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Maintenance per Mile</label>
                  <input type="number" step="0.01" placeholder="0.12" value={maintenancePerMile as any} onChange={(e) => setMaintenancePerMile(e.target.value === '' ? '' : Number(e.target.value))} className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" />
                </div>
              </div>
            </div>

            {/* Advanced Costs */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Advanced Costs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Deadhead Factor (%)</label>
                  <input type="number" placeholder="10" min={0} max={100} className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Profit Margin (%)</label>
                  <input type="number" placeholder="15" min={0} max={100} className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" />
                </div>
              </div>
            </div>

            {/* AI Agent Level Costs */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">AI Agent Level Costs</h3>
              <div className="space-y-3">
                {[{label:'L0 - Radar', hint:'Per cargo scan', placeholder:'0.05'},{label:'L1 - Calculator', hint:'Per calculation', placeholder:'0.10'},{label:'L2 - Quote Bot', hint:'Per quote generated', placeholder:'0.25'}].map((row) => (
                  <div key={row.label} className="flex items-center justify-between glass-border rounded-lg p-3">
                    <div>
                      <span className="text-sm font-medium text-white">{row.label}</span>
                      <p className="text-xs text-gray-400">{row.hint}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-300">$</span>
                      <input type="number" placeholder={row.placeholder} step="0.01" className="glass-input w-20 px-2 py-1 rounded text-white bg-transparent focus:outline-none text-sm" />
                  </div>
                </div>
              ))}
              </div>
            </div>

            {/* Total */}
            <div className="glass-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-white">Total per Mile:</span>
                <span className="text-lg font-semibold text-red-400" aria-live="polite">€{totalPerMile.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button onClick={saveCostSettings} className="flex-1 bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded-lg text-white font-medium">Save Settings</button>
              <button onClick={() => { setFuelCost(''); setDriverRate(''); setInsurancePerMile(''); setMaintenancePerMile(''); }} className="glass-border hover:bg-white/5 transition-colors font-medium text-white rounded-lg px-4 py-2">Reset</button>
              <button onClick={() => setIsCostModalOpen(false)} className="glass-border hover:bg-white/5 transition-colors font-medium text-white rounded-lg px-4 py-2">Cancel</button>
            </div>
          </div>
        </Modal>

        {/* Add Fleet Modal */}
        <Modal open={isAddFleetOpen} onClose={() => setIsAddFleetOpen(false)} title="Add Fleet Vehicle">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setIsAddFleetOpen(false);
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Vehicle Type <span className="text-red-400">*</span></label>
              <select className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" required>
                <option value="" className="bg-gray-900 text-white">Select Type</option>
                <option value="dry-van" className="bg-gray-900 text-white">Dry Van</option>
                <option value="reefer" className="bg-gray-900 text-white">Reefer</option>
                <option value="flatbed" className="bg-gray-900 text-white">Flatbed</option>
                <option value="step-deck" className="bg-gray-900 text-white">Step Deck</option>
                <option value="trailer" className="bg-gray-900 text-white">Trailer</option>
                <option value="refrigerated-truck" className="bg-gray-900 text-white">Refrigerated Truck</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">License Plate <span className="text-red-400">*</span></label>
              <input type="text" placeholder="Enter license plate" maxLength={20} className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Capacity</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="Enter weight capacity" min={0} className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" />
                <input type="number" placeholder="Enter volume capacity" step="0.1" min={0} className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <span className="text-xs text-gray-400 text-center">Weight (kg)</span>
                <span className="text-xs text-gray-400 text-center">Volume (m³)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Driver Name <span className="text-red-400">*</span></label>
              <input type="text" placeholder="Enter driver name" className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">GPS Tracking</label>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input type="radio" name="gps-option" value="device" className="accent-red-500" onChange={() => setGpsOption('device')} />
                  <span>Connect Device</span>
                </label>
                {gpsOption === 'device' && (
                  <div className="mt-2 ml-6">
                    <input type="text" placeholder="Enter device ID" className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" />
                  </div>
                )}
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input type="radio" name="gps-option" value="manual" className="accent-red-500" onChange={() => setGpsOption('manual')} />
                  <span>Manual Location</span>
                </label>
                {gpsOption === 'manual' && (
                  <div className="mt-2 ml-6 space-y-2">
                    <input type="text" placeholder="Enter address or coordinates" className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" />
                    <div className="glass-border rounded-lg p-4 flex items-center justify-center text-gray-400 text-sm">Map Picker Here</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button type="button" onClick={() => setIsAddFleetOpen(false)} className="glass-border hover:bg-white/5 transition-colors font-medium text-white rounded-lg px-4 py-2">Cancel</button>
              <button type="button" onClick={() => console.log('Draft saved')} className="glass-border hover:bg-white/5 transition-colors font-medium text-white rounded-lg px-4 py-2">Save Draft</button>
              <button type="submit" className="flex-1 bg-red-500 hover:bg-red-600 transition-colors text-white rounded-lg px-4 py-2 font-medium">Add Vehicle</button>
            </div>
          </form>
        </Modal>
      </div>
    </section>
  );
}
