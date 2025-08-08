import { MapPin } from 'lucide-react';

export default function CargoDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <section className="min-h-screen bg-[url('https://images.unsplash.com/photo-1659115516377-25ed306a3551?w=2560&q=80')] bg-cover pt-6 px-6 pb-24">
      <div className="max-w-4xl mx-auto glass-card rounded-xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-white">Cargo #{id}</h1>
            <p className="text-sm text-gray-400">Posted 2 hours ago by TransCorp</p>
          </div>
          <span className="text-2xl font-medium text-white">€1,850</span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Route</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="w-3 h-3 text-green-400" />
                <span>From: NL Amsterdam 1012</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="w-3 h-3 text-red-400" />
                <span>To: DE Berlin 10115</span>
              </div>
            </div>
          </div>
          <div className="glass-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Cargo Details</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <div>Type: Pallets</div>
              <div>Weight: 2,500 kg</div>
              <div>Volume: 12.5 m³</div>
              <div>Urgency: Medium</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


