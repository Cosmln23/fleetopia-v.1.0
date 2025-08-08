"use client";

// Portare fidelă a UI-ului din `settings.md` în layout-ul existent (fără a schimba stilul global)

import { useT } from '@/utils/i18n';
import { useState } from 'react';
import Modal from '@/components/Modal';
import AnimateOnScroll from '@/components/AnimateOnScroll';

export default function SettingsPage() {
  const t = useT();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  return (
    <section className="min-h-screen bg-[url('https://images.unsplash.com/photo-1659115516377-25ed306a3551?w=2560&q=80')] bg-cover bg-center pt-6 px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">{t('Settings')}</h1>
          <p className="text-gray-400">{t('Manage your account, permissions, and application preferences')}</p>
        </div>
        </AnimateOnScroll>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-80 flex-shrink-0 hidden md:block">
            <div className="glass-card sticky top-24 rounded-xl p-6">
              <div className="mb-6">
                <h3 className="uppercase text-xs font-medium text-gray-400 tracking-wide mb-3">{t('User Level')}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs font-medium text-white rounded-full bg-gray-500">Basic</span>
                  <span className="px-2 py-1 text-xs font-medium text-black rounded-full bg-yellow-400">ID verified</span>
                  <span className="px-2 py-1 text-xs font-medium text-white rounded-full bg-green-500">Licensed</span>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-300">{t('Account Status')}</h3>
                  <span className="px-3 py-1 text-xs font-medium text-white rounded-full bg-gray-500">Trial</span>
                </div>
                <div className="text-xs text-gray-400 mb-3">7 days remaining</div>
                <button onClick={()=>setUpgradeOpen(true)} className="w-full hover:bg-red-500 transition-colors text-sm font-medium text-white bg-gray-800 rounded-lg px-4 py-2">
                  {t('Upgrade to Pro')}
                </button>
              </div>

              <nav className="space-y-2">
                <button className="settings-nav-item glass-border settings-nav-active text-sm font-medium rounded-lg px-4 py-3 text-left w-full">{t('General Settings')}</button>
                <button className="settings-nav-item text-sm font-medium rounded-lg px-4 py-3 text-left w-full text-gray-400 hover:text-white hover:bg-white/5">{t('Account & Subscription')}</button>
                <button className="settings-nav-item text-sm font-medium rounded-lg px-4 py-3 text-left w-full text-gray-400 hover:text-white hover:bg-white/5">{t('Notification Preferences')}</button>
              </nav>

              <div className="border-t border-gray-700 mt-8 pt-6">
                <h4 className="text-xs font-medium text-gray-400 mb-4 uppercase tracking-wide">Permission Levels</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between"><span className="text-gray-400">Marketplace Access</span><span className="text-white">Limited</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-400">Dispatcher</span><span className="text-white">Locked</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-400">AI Agent</span><span className="text-white">Locked</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-400">Advanced Chat</span><span className="text-white">Locked</span></div>
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <div className="glass-card rounded-xl p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-2">{t('General Settings')}</h2>
                <p className="text-gray-400">{t('Configure your application preferences and behavior')}</p>
              </div>

              <div className="space-y-4">
                <AnimateOnScroll>
                <div className="glass-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-medium text-white">{t('Enable persistent settings')}</h4>
                      <p className="text-xs text-gray-400">{t('Save preferences across sessions')}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-red-500" />
                  </div>
                  <div className="text-xs text-gray-500">{t('Your settings and preferences will be automatically saved and restored when you return')}</div>
                </div>
                </AnimateOnScroll>

                <AnimateOnScroll>
                <div className="glass-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-medium text-white">{t('Enable real-time updates')}</h4>
                      <p className="text-xs text-gray-400">{t('Cargo and notifications updates')}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-red-500" />
                  </div>
                  <div className="text-xs text-gray-500">{t('Live cargo updates (Requires Pro)')}</div>
                </div>
                </AnimateOnScroll>

                <AnimateOnScroll>
                <div className="glass-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-medium text-white">{t('Show detailed error messages')}</h4>
                      <p className="text-xs text-gray-400">{t('Display technical error information')}</p>
                    </div>
                    <input type="checkbox" className="accent-red-500" />
                  </div>
                  <div className="text-xs text-gray-500">{t('Show technical details when errors occur (recommended for advanced users)')}</div>
                </div>
                </AnimateOnScroll>

                <AnimateOnScroll>
                <div className="glass-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-medium text-white">{t('Optimize for slower connections')}</h4>
                      <p className="text-xs text-gray-400">{t('Lazy load maps and heavy content')}</p>
                    </div>
                    <input type="checkbox" className="accent-red-500" />
                  </div>
                  <div className="text-xs text-gray-500">{t('Reduces data usage by loading maps and images only when needed')}</div>
                </div>
                </AnimateOnScroll>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-700 mt-6">
                <button className="bg-gray-800 hover:bg-red-500 transition-colors px-6 py-2 rounded-lg text-white font-medium">{t('Save Changes')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal with 3 plans (exact layout from provided snippet) */}
      <Modal
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        hideHeader
        size="xl"
        contentClassName="w-full max-w-5xl rounded-2xl mx-4 p-0 max-h-[90vh] overflow-y-auto glass-card"
      >
        <div className="relative">
          {/* Close */}
          <button
            onClick={() => setUpgradeOpen(false)}
            className="absolute top-4 right-4 z-10 w-8 h-8 hover:bg-white/20 transition-colors flex hover:text-gray-300 text-white bg-white/10 rounded-full items-center justify-center"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[16px] h-[16px]">
              <path d="m18 6-12 12"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>

          {/* Header */}
          <header className="max-w-2xl mx-auto text-center pt-6 pb-4 px-4">
            <h1 className="text-2xl md:text-3xl text-white font-normal tracking-tight mb-2">Choose your plan</h1>
            <p className="text-white/60 text-sm md:text-base">Start free for 7 days, then pick the access you need.</p>
          </header>

          {/* Plans */}
          <main className="max-w-5xl mx-auto px-4" style={{ overflow: 'hidden' }}>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-full text-center mb-2">
                <p className="text-xs text-red-400 font-medium">Prices include VAT. Cancel anytime.</p>
              </div>

              {/* Trial */}
              <div className="rounded-xl p-6 flex flex-col items-start glass-border" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
                <div className="text-white font-semibold mb-2">Trial</div>
                <div className="flex items-end mb-3">
                  <span className="text-2xl text-white font-semibold">0€</span>
                  <span className="ml-1 text-sm text-white/40">/7 days</span>
                </div>
                <ul className="mb-4 space-y-1 text-xs text-white/80">
                  <li>Post one cargo</li>
                  <li>Browse marketplace</li>
                  <li>No quotes, no dispatcher</li>
                </ul>
                <a className="mt-auto inline-block w-full text-center py-2 rounded-lg border border-white/20 text-white text-xs hover:bg-white/10 transition" href="#">Start free</a>
              </div>

              {/* Basic */}
              <div className="rounded-xl p-6 flex flex-col items-start md:scale-105 glass-border border border-red-500/30" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
                <div className="text-white font-semibold mb-2">Basic</div>
                <div className="flex items-end mb-3">
                  <span className="text-2xl text-white font-semibold">€17,99</span>
                  <span className="ml-1 text-sm text-white/40">/mo</span>
                </div>
                <ul className="mb-4 space-y-1 text-xs text-white/80">
                  <li>Cargo posts – unlimited</li>
                  <li>Chat &amp; manual quotes</li>
                  <li>ID badge (optional, free)</li>
                </ul>
                <a className="mt-auto inline-block w-full text-center py-2 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition" href="#">Pick Basic</a>
              </div>

              {/* Agent */}
              <div className="rounded-xl p-6 flex flex-col items-start glass-border" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
                <div className="text-white font-semibold mb-2">Agent</div>
                <div className="flex items-end mb-3">
                  <span className="text-2xl text-white font-semibold">€29,99</span>
                  <span className="ml-1 text-sm text-white/40">/mo</span>
                </div>
                <ul className="mb-4 space-y-1 text-xs text-white/80">
                  <li>All Basic features</li>
                  <li>Dispatcher + Fleet map</li>
                  <li>AI Agent L0-L2</li>
                  <li>License badge included</li>
                </ul>
                <a className="mt-auto inline-block w-full text-center py-2 rounded-lg border border-white/20 text-white text-xs hover:bg-white/10 transition" href="#">Pick Agent</a>
              </div>
            </section>

            {/* Feature table */}
            <section className="mt-6">
              <table className="w-full text-xs rounded-xl border border-white/10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
                <thead>
                  <tr>
                    <th className="text-left py-2 px-3 text-white/80 font-normal">Features</th>
                    <th className="py-2 px-3 text-white/50 font-normal">Trial</th>
                    <th className="py-2 px-3 text-white/50 font-normal">Basic</th>
                    <th className="py-2 px-3 text-white/50 font-normal">Agent</th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  <tr className="border-t border-white/10">
                    <td className="py-2 px-3">Unlimited cargo posts</td>
                    <td className="text-center">1</td>
                    <td className="text-center">Unlimited</td>
                    <td className="text-center">Unlimited</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="py-2 px-3">Dispatcher access</td>
                    <td className="text-center">-</td>
                    <td className="text-center">✓</td>
                    <td className="text-center">✓</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="py-2 px-3">AI suggestions</td>
                    <td className="text-center">-</td>
                    <td className="text-center">✓</td>
                    <td className="text-center">✓</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="py-2 px-3">Cost analysis</td>
                    <td className="text-center text-white/30">-</td>
                    <td className="text-center">✓</td>
                    <td className="text-center">✓</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="py-2 px-3">Verification badge</td>
                    <td className="text-center text-white/30">None</td>
                    <td className="text-center text-white/50">ID</td>
                    <td className="text-center">ID+License</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </main>
        </div>
      </Modal>
    </section>
  );
}
