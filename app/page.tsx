"use client";

import Link from 'next/link';
import { Package, Search, MapPin, ArrowRight, Star, PlayCircle, Zap } from 'lucide-react';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { useT } from '@/utils/i18n';

export default function HomePage() {
  const t = useT();
  return (
    <>
      <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-[url('https://images.unsplash.com/photo-1659115516377-25ed306a3551?w=2560&q=80')] bg-cover bg-center">
        <h1 className="text-4xl md:text-7xl font-normal text-white tracking-tight text-center slide-up delay-400">Fleetopia</h1>
        <p className="max-w-md text-2xl text-gray-400 text-center mb-8 fade-in delay-600">{t('How can we help you today? Pick your path below.')}</p>
        <div className="flex gap-4 items-center">
          <Link href="/marketplace?add=1&tab=MY_CARGO" className="glass-border hover:bg-white/5 transition-all flex items-center gap-2 text-sm font-medium bg-gray-900 text-white rounded-lg px-6 py-2 slide-left delay-800">
            <Package className="w-4 h-4" /> {t('I have cargo to transport')}
          </Link>
          <Link href="/marketplace?tab=ALL" className="hover:text-white transition-colors flex items-center gap-2 text-sm text-gray-400 px-6 py-2 slide-right delay-1000">
            <Search className="w-4 h-4" /> {t("I'm looking for cargo to transport")}
          </Link>
        </div>
      </section>

      <section id="about" className="max-w-4xl mx-auto px-6 py-24">
        <AnimateOnScroll className="flex items-center gap-3 mb-8">
          <Zap className="w-5 h-5 text-gray-400" />
          <h2 className="text-xl font-medium text-white">{t('Quick Actions')}</h2>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: t('I have cargo to transport'), icon: <Package className="w-5 h-5" />, cta: t('Get started') },
            { title: t("I'm looking for cargo to transport"), icon: <Search className="w-5 h-5" />, cta: t('Search loads') },
            { title: t('Track My Shipments'), icon: <MapPin className="w-5 h-5" />, cta: t('View shipments') },
          ].map((card) => (
            <AnimateOnScroll key={card.title}>
              <div className="glass-card p-6 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 flex bg-gray-400/10 rounded-lg items-center justify-center">{card.icon}</div>
                  <h3 className="font-medium text-white text-sm md:text-base">{card.title}</h3>
                </div>
                <div className="flex gap-2 text-xs text-gray-400 items-center">
                  <span>{card.cta}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <section id="projects" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll className="flex items-center gap-3 mb-12">
            <PlayCircle className="w-5 h-5 text-gray-400" />
          <h2 className="text-xl font-medium text-gray-400">{t('How It Works')}</h2>
          </AnimateOnScroll>
          <div className="space-y-6">
            {[1,2,3].map((step) => (
              <AnimateOnScroll key={step}>
                <div className="glass-card p-6 rounded-xl hover:bg-white/5 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-400/10 rounded-lg flex items-center justify-center flex-shrink-0"><span className="text-xl font-medium text-gray-400">{step}</span></div>
                      <div>
                        <h3 className="font-medium text-gray-400 mb-1">{step === 1 ? t('Post or Find') : step === 2 ? t('Connect & Quote') : t('Track & Complete')}</h3>
                        <p className="text-sm text-gray-400">{step === 1 ? t("Whether you have cargo to ship or you're looking for loads to transport, get started in seconds.") : step === 2 ? t('Connect with verified partners and send competitive quotes.') : t('Monitor shipments in real-time with GPS tracking and updates.')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {(step === 1 ? ['Post Cargo Fast','Find Loads','Marketplace'] : step === 2 ? ['Send Quote','My Quotes','Chat Interface'] : ['Live Tracking','Status Updates','Active Deals','Secure Payment']).map((t) => (
                      <span key={t} className="text-xs text-gray-400 bg-gray-400/10 px-2 py-1 rounded">{t}</span>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll className="flex items-center gap-3 mb-12">
            <Star className="w-5 h-5 text-gray-400" />
          <h2 className="text-xl font-medium text-white">{t('What Our Users Say')}</h2>
          </AnimateOnScroll>
          <div className="testimonial-slider">
            <div className="testimonial-track">
              {[{name:'Michael Rodriguez',role:'Fleet Owner',icon:'truck'},{name:'Sarah Chen',role:'Logistics Manager',icon:'package'},{name:'David Thompson',role:'Independent Trucker',icon:'users'}].map((t)=> (
                <div key={t.name} className="testimonial-card glass-card p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-400/10 rounded-full flex items-center justify-center" />
                    <div>
                      <h4 className="font-medium text-white">{t.name}</h4>
                      <p className="text-sm text-gray-400">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">"Great experience with Fleetopia — efficient matching and smooth deals."</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
