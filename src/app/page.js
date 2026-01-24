'use client';

import { useState } from 'react';
import Link from 'next/link';
import { STICKERS, BUNDLES, REGIONS, BASE_PRICE, getAllStickers } from '@/data/stickers';
import { useCart } from '@/context/CartContext';

export default function Home() {
  const [activeTab, setActiveTab] = useState(REGIONS[0]);
  const [animatingItems, setAnimatingItems] = useState(new Set());
  
  const {
    cartItems,
    totalItems,
    pricePerItem,
    totalPrice,
    canCheckout,
    pricingTier,
    savings,
    toggleItem,
    updateQuantity,
    addBundle,
    openDrawer,
  } = useCart();

  const activeStickers = STICKERS[activeTab] || [];

  const cartStickers = Object.keys(cartItems)
    .map(id => ({
      ...getAllStickers().find(s => s.id === id),
      quantity: cartItems[id]
    }))
    .filter(s => s.id);

  const handleToggleSticker = (stickerId) => {
    setAnimatingItems(prev => new Set(prev).add(stickerId));
    setTimeout(() => {
      setAnimatingItems(prev => {
        const next = new Set(prev);
        next.delete(stickerId);
        return next;
      });
    }, 300);
    toggleItem(stickerId);
  };

  const handleCheckout = () => {
    const items = Object.entries(cartItems).map(([id, qty]) => {
      const sticker = getAllStickers().find(s => s.id === id);
      return { variantId: sticker?.shopifyVariantId || id, quantity: qty };
    });
    
    const cartString = items.map(item => `${item.variantId}:${item.quantity}`).join(',');
    const baseUrl = 'https://38a44d-4c.myshopify.com/cart/';
    
    let discountParam = '';
    if (totalItems >= 21) discountParam = '?discount=BULK21';
    else if (totalItems >= 11) discountParam = '?discount=BULK11';
    
    const checkoutUrl = `${baseUrl}${cartString}${discountParam}`;
    
    window.location.href = checkoutUrl;
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <header 
        className="flex-shrink-0 h-16 flex items-center justify-between px-6 z-50"
        style={{ 
          background: 'linear-gradient(135deg, #0A2540 0%, #0d3252 50%, #0A2540 100%)',
          boxShadow: '0 4px 20px rgba(10, 37, 64, 0.3)'
        }}
      >
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Otterseas" className="w-9 h-9 rounded-xl object-contain" />
          <span className="text-xl font-light tracking-tight text-white">Otterseas</span>
        </Link>
        
        <div className="hidden md:flex items-center text-sm" style={{ color: '#D99E30' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          Free shipping on orders of 10+ stickers
        </div>
        
        <button
          onClick={openDrawer}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all hover:scale-105"
          style={{ backgroundColor: '#D99E30', color: 'white' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {totalItems > 0 && <span>{totalItems}</span>}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Column - Marketplace */}
        <div className="flex-1 md:w-[70%] flex flex-col overflow-hidden bg-white">
          
          {/* Intro Section */}
          <div 
            className="flex-shrink-0 px-6 py-6"
            style={{ 
              background: 'linear-gradient(135deg, #0A2540 0%, #133659 50%, #0A2540 100%)',
              borderBottom: '4px solid #D99E30'
            }}
          >
            <div className="max-w-2xl">
              <h1 className="text-2xl md:text-3xl font-light text-white mb-3">
                Build Your Dive Story
              </h1>
              <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                Every sticker marks a memory. Collect the dive sites you've conquered, 
                the wrecks you've explored, and the reefs that took your breath away.
              </p>
              
              {/* Pricing Tiers */}
              <div className="flex flex-wrap gap-3 mt-5">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(148, 163, 184, 0.2)', color: '#cbd5e1', border: '1px solid rgba(148, 163, 184, 0.3)' }}>
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  1-10: £2.50 each
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(217, 158, 48, 0.2)', color: '#D99E30', border: '1px solid rgba(217, 158, 48, 0.3)' }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#D99E30' }}></span>
                  11-20: £1.75 each
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(74, 222, 128, 0.2)', color: '#4ade80', border: '1px solid rgba(74, 222, 128, 0.3)' }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4ade80' }}></span>
                  21+: £1.50 each
                </div>
              </div>
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex-shrink-0 px-6 py-4 bg-white" style={{ boxShadow: '0 4px 12px rgba(10, 37, 64, 0.08)' }}>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {REGIONS.map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveTab(region)}
                  className={`tab-button relative px-5 py-2.5 text-sm font-medium rounded-xl whitespace-nowrap ${activeTab === region ? 'text-white shadow-lg' : 'text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200'}`}
                  style={activeTab === region ? { background: 'linear-gradient(135deg, #D99E30 0%, #c48a20 100%)', boxShadow: '0 4px 12px rgba(217, 158, 48, 0.4)' } : {}}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Sticker Grid */}
          <div className="flex-1 overflow-y-auto hide-scrollbar p-6" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-medium flex items-center gap-3" style={{ color: '#0A2540' }}>
                  <span className="w-1.5 h-7 rounded-full" style={{ backgroundColor: '#D99E30' }}></span>
                  {activeTab}
                  <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(217, 158, 48, 0.15)', color: '#D99E30' }}>
                    {activeStickers.length} stickers
                  </span>
                </h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {activeStickers.map((sticker, index) => {
                  const isSelected = cartItems[sticker.id];
                  const isAnimating = animatingItems.has(sticker.id);
                  
                  return (
                    <div
                      key={sticker.id}
                      className={`sticker-card sticker-fade-in relative bg-white rounded-2xl p-4 text-left border-2 ${isSelected ? 'selected border-transparent' : 'border-gray-100 hover:border-gray-200'} ${isAnimating ? 'animating' : ''}`}
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <button
                        onClick={() => handleToggleSticker(sticker.id)}
                        className="w-full text-left"
                      >
                          <div 
                          className="aspect-square rounded-xl mb-3 flex items-center justify-center relative overflow-hidden"
                          style={{ background: isSelected ? 'linear-gradient(135deg, #D99E30 0%, #c48a20 100%)' : '#f8fafc' }}
                        >
                          {sticker.image ? (
                            <img src={sticker.image} alt={sticker.name} className="w-full h-full object-contain p-2" />
                          ) : (
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity={isSelected ? 0.9 : 0.4}>
                              <circle cx="12" cy="12" r="10"/>
                              <path d="M12 2a10 10 0 0 0 0 20"/>
                              <path d="M2 12h20"/>
                            </svg>
                          )}
                          
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center bg-white shadow-lg">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D99E30" strokeWidth="3">
                                <path d="M20 6L9 17l-5-5"/>
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-sm font-medium text-gray-900 truncate">{sticker.name}</p>
                        <p className="text-sm font-semibold mt-1" style={{ color: '#D99E30' }}>£{BASE_PRICE.toFixed(2)}</p>
                      </button>
                      
                      {/* View Page Link */}
                      <Link
                        href={`/stickers/${sticker.slug}`}
                        className="absolute bottom-3 right-3 w-6 h-6 rounded-md flex items-center justify-center transition-all hover:scale-110"
                        style={{ backgroundColor: 'rgba(10, 37, 64, 0.1)' }}
                        title="View sticker page"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bundles */}
            <div className="mt-8 rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #0A2540 0%, #0d3252 50%, #0A2540 100%)', boxShadow: '0 8px 32px rgba(10, 37, 64, 0.3)' }}>
              <h2 className="text-xl font-medium mb-1 text-white flex items-center gap-3">
                <span className="w-1.5 h-7 rounded-full" style={{ backgroundColor: '#D99E30' }}></span>
                Quick Add Packs
              </h2>
              <p className="text-white/50 text-sm mb-6 ml-5 font-light">Jump-start your collection</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {BUNDLES.map((bundle) => (
                  <div key={bundle.id} className="bundle-card rounded-xl p-5 flex flex-col" style={{ backgroundColor: 'rgba(217, 158, 48, 0.1)', border: '2px solid rgba(217, 158, 48, 0.3)' }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white">{bundle.name}</h3>
                        <p className="text-sm text-white/50 mt-0.5 font-light">{bundle.description}</p>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1.5 rounded-lg" style={{ backgroundColor: '#D99E30', color: 'white' }}>5 stickers</span>
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      {[0,1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-lg" style={{ background: 'linear-gradient(135deg, #D99E30 0%, #c48a20 100%)', opacity: 0.5 + (i * 0.12) }} />
                      ))}
                    </div>
                    
                    <button onClick={() => addBundle(bundle)} className="mt-auto w-full py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]" style={{ backgroundColor: '#D99E30', color: 'white' }}>
                      Add Pack · £{(BASE_PRICE * 5).toFixed(2)}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="h-48 md:h-8" />
          </div>
        </div>

        {/* Right Column - Cart (Desktop) */}
        <div className="hidden md:flex md:w-[30%] flex-col" style={{ background: 'linear-gradient(180deg, #0A2540 0%, #071a2e 100%)' }}>
          
          {/* Visualizer */}
          <div className="flex-shrink-0 p-6" style={{ background: 'linear-gradient(180deg, rgba(217, 158, 48, 0.15) 0%, transparent 100%)', borderBottom: '1px solid rgba(217, 158, 48, 0.2)' }}>
            <div className="relative flex items-center justify-center py-6">
              <div className="relative">
                <div className="w-24 h-36 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #1a4a7a 0%, #0A2540 100%)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D99E30" strokeWidth="1.5" opacity="0.7">
                    <path d="M6 2h12v6l-2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10L6 8V2z"/>
                    <path d="M6 2h12v2H6z"/>
                  </svg>
                </div>
                
                {totalItems > 0 && (
                  <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center text-base font-bold" style={{ backgroundColor: '#D99E30', color: 'white' }}>
                    {totalItems}
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-white/80 text-sm font-light">
                {totalItems === 0 ? 'Select stickers to build your pack' : `${totalItems} sticker${totalItems !== 1 ? 's' : ''} selected`}
              </p>
              
              {totalItems > 0 && (
                <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full text-xs font-semibold" style={{ backgroundColor: `${pricingTier.color}25`, color: pricingTier.color, border: `2px solid ${pricingTier.color}50` }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pricingTier.color }}></span>
                  {pricingTier.tier} · £{pricePerItem.toFixed(2)}/sticker
                </div>
              )}
            </div>
          </div>

          {/* Cart List */}
          <div className="flex-1 overflow-y-auto hide-scrollbar p-4">
            {cartStickers.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, rgba(217, 158, 48, 0.2) 0%, rgba(217, 158, 48, 0.1) 100%)', border: '2px dashed rgba(217, 158, 48, 0.3)' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D99E30" strokeWidth="1.5" opacity="0.7">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 12h8M12 8v8"/>
                  </svg>
                </div>
                <p className="text-white/50 text-sm font-medium">Your pack is empty</p>
              </div>
            ) : (
              <div className="space-y-2">
                {cartStickers.map((sticker, index) => (
                  <div key={sticker.id} className="cart-item-enter flex items-center gap-3 rounded-xl p-3" style={{ backgroundColor: 'rgba(217, 158, 48, 0.1)', border: '1px solid rgba(217, 158, 48, 0.2)', animationDelay: `${index * 50}ms` }}>
                    <div className="w-10 h-10 rounded-lg flex-shrink-0" style={{ background: 'linear-gradient(135deg, #D99E30 0%, #c48a20 100%)' }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{sticker.name}</p>
                      <p className="text-white/40 text-xs">{sticker.region}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQuantity(sticker.id, -1)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: '#D99E30', color: 'white' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/></svg>
                      </button>
                      <span className="w-8 text-center text-white text-sm font-bold">{sticker.quantity}</span>
                      <button onClick={() => updateQuantity(sticker.id, 1)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: '#D99E30', color: 'white' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 p-4" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(217, 158, 48, 0.1) 100%)', borderTop: '1px solid rgba(217, 158, 48, 0.2)' }}>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-white/60 text-sm font-medium">Total</span>
              <span className="text-3xl font-light" style={{ color: '#D99E30' }}>£{totalPrice.toFixed(2)}</span>
            </div>
            
            {savings > 0 && (
              <div className="text-right mb-4">
                <span className="text-sm font-bold px-3 py-1 rounded-lg" style={{ backgroundColor: 'rgba(74, 222, 128, 0.2)', color: '#4ade80' }}>
                  You save £{savings.toFixed(2)}!
                </span>
              </div>
            )}

            <button onClick={handleCheckout} disabled={!canCheckout} className="w-full py-4 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]" style={{ background: canCheckout ? 'linear-gradient(135deg, #D99E30 0%, #c48a20 100%)' : 'rgba(255, 255, 255, 0.1)', color: canCheckout ? 'white' : 'rgba(255, 255, 255, 0.3)', cursor: canCheckout ? 'pointer' : 'not-allowed', boxShadow: canCheckout ? '0 4px 20px rgba(217, 158, 48, 0.5)' : 'none' }}>
              {canCheckout ? 'Proceed to Checkout →' : 'Minimum 5 stickers required'}
            </button>
          </div>
        </div>

        {/* Mobile Cart Drawer */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50" style={{ background: 'linear-gradient(180deg, #0A2540 0%, #071a2e 100%)', boxShadow: '0 -4px 20px rgba(10, 37, 64, 0.4)' }}>
          <button onClick={openDrawer} className="w-full px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base" style={{ backgroundColor: '#D99E30', color: 'white' }}>
                {totalItems}
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-semibold">{totalItems === 0 ? 'Your pack is empty' : `${totalItems} sticker${totalItems !== 1 ? 's' : ''}`}</p>
                <span className="text-sm font-bold" style={{ color: '#D99E30' }}>£{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <span className="text-white/50 text-sm">Tap to view →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
