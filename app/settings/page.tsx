"use client";

// Portare fidelă a UI-ului din `settings.md` în layout-ul existent (fără a schimba stilul global)

import { useT } from '@/utils/i18n';

export default function SettingsPage() {
  const t = useT();
  return (
    <section className="min-h-screen bg-[url('https://images.unsplash.com/photo-1659115516377-25ed306a3551?w=2560&q=80')] bg-cover bg-center pt-6 px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">{t('Settings')}</h1>
          <p className="text-gray-400">{t('Manage your account, permissions, and application preferences')}</p>
        </div>

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
                <button className="w-full hover:bg-red-500 transition-colors text-sm font-medium text-white bg-gray-800 rounded-lg px-4 py-2">
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
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-700 mt-6">
                <button className="bg-gray-800 hover:bg-red-500 transition-colors px-6 py-2 rounded-lg text-white font-medium">{t('Save Changes')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
