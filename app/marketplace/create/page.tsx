"use client";

import { useState } from 'react';

export default function CreateCargoPage() {
  const [saving, setSaving] = useState(false);
  return (
    <section className="min-h-screen bg-[url('https://images.unsplash.com/photo-1659115516377-25ed306a3551?w=2560&q=80')] bg-cover pt-6 px-6 pb-24">
      <div className="max-w-3xl mx-auto glass-card rounded-xl p-6">
        <h1 className="text-xl font-semibold text-white mb-4">Post New Cargo</h1>
        <form
          className="space-y-6"
          onSubmit={async (e) => {
            e.preventDefault();
            setSaving(true);
            setTimeout(() => setSaving(false), 800);
          }}
        >
          <div>
            <label className="block text-xs text-gray-400 mb-2">Cargo Title</label>
            <input className="glass-input w-full px-3 py-2 rounded-lg text-white placeholder-gray-400" placeholder="Enter cargo title" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">From Address</label>
              <input className="glass-input w-full px-3 py-2 rounded-lg text-white placeholder-gray-400" placeholder="Pickup address" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">To Address</label>
              <input className="glass-input w-full px-3 py-2 rounded-lg text-white placeholder-gray-400" placeholder="Delivery address" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">Type</label>
              <select className="glass-input w-full px-3 py-2 rounded-lg text-white bg-transparent">
                <option value="pallets">Pallets</option>
                <option value="container">Container</option>
                <option value="bulk">Bulk</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Weight (kg)</label>
              <input type="number" className="glass-input w-full px-3 py-2 rounded-lg text-white placeholder-gray-400" placeholder="0" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Budget (EUR)</label>
              <input type="number" className="glass-input w-full px-3 py-2 rounded-lg text-white placeholder-gray-400" placeholder="0" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-700">
            <button type="submit" className="glass-border px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg" disabled={saving}>
              {saving ? 'Posting…' : 'Post Cargo'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}


