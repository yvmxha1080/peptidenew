import { useState } from 'react';
import { wa, BAC_WATER_PRICE } from '../data';

const WA_ICON = <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;

export default function ProductModal({ product, onClose }) {
  const [dosageIdx, setDosageIdx] = useState(product?.defaultDosage || 0);
  const [qty, setQty] = useState(1);
  const [bacWaterQty, setBacWaterQty] = useState(1);
  const [showOrder, setShowOrder] = useState(false);

  if (!product) return null;

  const hasDosages = product.dosages && product.dosages.length > 0;

  const unitPrice = hasDosages ? product.dosages[dosageIdx].price : 0;
  const dosageLabel = hasDosages ? product.dosages[dosageIdx].label : '';
  
  let peptideTotal = unitPrice * qty;
  if (qty === 2) peptideTotal = peptideTotal * (100 / 120);
  else if (qty === 3) peptideTotal = peptideTotal * (145 / 180);
  else if (qty === 4) peptideTotal = peptideTotal * (190 / 240);
  else if (qty >= 5) peptideTotal = peptideTotal * (45 / 60);
  peptideTotal = Math.round(peptideTotal);

  const bacWaterTotal = bacWaterQty > 0 ? (bacWaterQty * 2 + 1) : 0;
  const total = peptideTotal + bacWaterTotal;

  const orderMsg = `Bonjour, je souhaite commander :\n• ${qty}x ${product.name} ${dosageLabel} (${peptideTotal}€)\n• ${bacWaterQty}x Eau Bactériostatique 3ml (${bacWaterTotal}€)\nTotal : ${total}€`;

  // Out of stock product — dark modal
  if (!product.inStock) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="product-detail-modal" onClick={e => e.stopPropagation()}>
          <button className="pdm-close" onClick={onClose}>✕</button>
          <div className="pdm-grid">
            <div className="pdm-image">
              <img src={product.img} alt={product.name} />
            </div>
            <div className="pdm-config">
              <div className="pdm-stock" style={{color:'#ef4444'}}>● RUPTURE DE STOCK</div>
              <h2 className="pdm-name">{product.name}</h2>
              <div className="pdm-price">{product.price}</div>
              <p className="pdm-desc">{product.desc}</p>
              <div style={{marginBottom:'1rem'}}>
                {product.specs.map(([k,v]) => (
                  <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'.5rem 0',borderBottom:'1px solid rgba(255,255,255,.06)',fontSize:'.82rem'}}>
                    <span style={{color:'var(--gray-400)'}}>{k}</span>
                    <span style={{fontWeight:700,color:'var(--white)'}}>{v}</span>
                  </div>
                ))}
              </div>
              <a href={wa(`Bonjour, je souhaite être notifié quand le ${product.name} sera de retour en stock.`)} target="_blank" rel="noopener noreferrer" className="pdm-cta" style={{background:'linear-gradient(135deg,#c9a94e,#a08838)'}}>
                📩 M'INSCRIRE SUR LA LISTE D'ATTENTE
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ORDER CONFIRMATION MODAL (dark)
  if (showOrder) {
    return (
      <div className="modal-overlay" onClick={() => setShowOrder(false)}>
        <div className="order-modal" onClick={e => e.stopPropagation()}>
          <div className="order-header">
            <div><span className="order-title">COMMANDE</span><span className="order-stock-badge">EN STOCK</span></div>
            <button className="order-close" onClick={() => setShowOrder(false)}>✕</button>
          </div>
          <p className="order-subtitle">{qty}x {product.name} {dosageLabel}</p>

          <div className="order-summary">
            <div className="order-line">
              <div><strong>{product.name}</strong><br /><span className="order-dosage">{dosageLabel}</span></div>
              <div className="order-qty">x{qty}</div>
              <div className="order-line-price">{peptideTotal.toFixed(2)} €</div>
            </div>
            <div className="order-line">
              <div><strong>Eau bactériostatique</strong><br /><span className="order-dosage">Fiole de 3ml</span></div>
              <div className="order-qty">x{bacWaterQty}</div>
              <div className="order-line-price">{bacWaterTotal.toFixed(2)} €</div>
            </div>
            <div className="order-line">
              <div><strong>Livraison</strong><br /><span className="order-dosage">{(peptideTotal + bacWaterTotal) >= 150 ? 'Offerte dès 150€' : 'Standard'}</span></div>
              <div className="order-qty"></div>
              <div className="order-line-price" style={(peptideTotal + bacWaterTotal) >= 150 ? {color:'#22c55e'} : {}}>{(peptideTotal + bacWaterTotal) >= 150 ? 'GRATUIT' : '5.00 €'}</div>
            </div>
            <div className="order-total">
              <span>Total</span>
              <span className="order-total-price">{((peptideTotal + bacWaterTotal) >= 150 ? (peptideTotal + bacWaterTotal) : (peptideTotal + bacWaterTotal + 5)).toFixed(2)} €</span>
            </div>
          </div>

          <div className="order-instructions">
            <div className="order-instr-title">INSTRUCTIONS</div>
            <div className="order-instr-box">
              <p>Votre sélection <strong>[{dosageLabel}]</strong> est exceptionnellement <span style={{color:'#c9a94e'}}>disponible en stock</span>.</p>
              <p style={{marginTop:'.5rem',fontSize:'.78rem'}}>Validez votre commande via le bouton WhatsApp ci-dessous pour une réservation et un traitement immédiat.</p>
            </div>
          </div>

          <div className="order-crypto">
            <span><svg width="28" height="28" viewBox="0 0 24 24" fill="#f7931a"><path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546z"/><path d="M17.075 10.26c.24-1.6-0.98-2.46-2.64-3.03l.54-2.16-1.32-.33-.52 2.1c-.35-.09-.71-.17-1.07-.25l.53-2.11-1.32-.33-.54 2.16c-.29-.07-.57-.13-.84-.2l0-.01-1.82-.45-.35 1.41s.98.22.96.24c.53.13.63.5.61.78l-.61 2.46c.04.01.08.02.13.04l-.13-.03-.86 3.44c-.07.16-.23.4-.6.31.01.02-.96-.24-.96-.24l-.66 1.51 1.72.43c.32.08.63.16.94.24l-.54 2.19 1.32.33.54-2.17c.36.1.71.19 1.05.28l-.54 2.15 1.32.33.54-2.18c2.24.42 3.93.25 4.64-1.77.57-1.63-.03-2.57-1.2-3.18.86-.2 1.5-.76 1.67-1.93zm-2.99 4.2c-.4 1.63-3.14.75-4.03.53l.72-2.88c.89.22 3.73.66 3.31 2.35zm.41-4.22c-.37 1.48-2.65.73-3.39.54l.65-2.61c.74.18 3.13.53 2.74 2.07z" fill="#fff"/></svg></span>
            <div><strong>PAIEMENT CRYPTO</strong><span className="crypto-badge">BIENTÔT</span></div>
            <p>Paiement par crypto-monnaie prochainement disponible</p>
          </div>

          <a href={wa(orderMsg)} target="_blank" rel="noopener noreferrer" className="order-wa-btn">
            {WA_ICON}
            <div>
              <strong>VALIDER VIA WHATSAPP</strong>
              <span>Sécurisez ma commande maintenant</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>

          <p className="order-secure">🔒 Paiement sécurisé · Discrétion garantie</p>
        </div>
      </div>
    );
  }

  // MAIN PRODUCT DETAIL
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={e => e.stopPropagation()}>
        <button className="pdm-close" onClick={onClose}>✕</button>
        <div className="pdm-grid">
          {/* Left: image */}
          <div className="pdm-image">
            <span className="pdm-purity">PURETÉ &gt; 99%</span>
            <img src={product.img} alt={product.name} />
          </div>
          {/* Right: config */}
          <div className="pdm-config">
            <div className="pdm-stock">● EN STOCK</div>
            <h2 className="pdm-name">{product.name}</h2>
            <div className="pdm-price">{unitPrice.toFixed(2)} €</div>
            <p className="pdm-desc">{product.desc}</p>

            {/* Dosage */}
            <div className="pdm-row">
              <label className="pdm-label">Dosage :</label>
              <div className="pdm-label" style={{marginLeft:'auto'}}>Quantité :</div>
            </div>
            <div className="pdm-row">
              <div className="pdm-dosages">
                {product.dosages.map((d, i) => (
                  <button key={d.label} className={`pdm-dosage-btn ${i === dosageIdx ? 'active' : ''}`} onClick={() => setDosageIdx(i)}>{d.label}</button>
                ))}
              </div>
              <div className="pdm-qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

            {/* Volume promo */}
            {product.volumes && (
              <>
                <label className="pdm-label">Volume promotionnel :</label>
                <div className="pdm-volumes">
                  {product.volumes.map((v, i) => {
                    const targetQty = i === 0 ? 2 : (i === 1 ? 3 : 5);
                    const isActive = qty >= targetQty && (i === 2 || qty < (i === 0 ? 3 : 5));
                    return (
                      <div 
                        className={`pdm-volume ${isActive ? 'active' : ''}`} 
                        key={v.label}
                        onClick={() => setQty(targetQty)}
                        style={{ 
                          cursor: 'pointer', 
                          transition: 'all 0.2s',
                          ...(isActive ? { borderColor: 'var(--gold)', background: 'rgba(201,169,78,0.1)' } : {}) 
                        }}
                      >
                        <span className="pdm-vol-label">{v.label}</span>
                        <span className="pdm-vol-price">{v.price} €{v.suffix || ''}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Bac water */}
            <label className="pdm-label">Eau bactériostatique :</label>
            <div className="pdm-bac">
              <div className="pdm-bac-info">
                <strong>Bac Water</strong> <span>(Fiole de 3ml)</span>
                <div className="pdm-bac-added">+{bacWaterTotal}€ ajoutés</div>
              </div>
              <div className="pdm-qty">
                <button onClick={() => setBacWaterQty(q => Math.max(0, q - 1))}>−</button>
                <span>{bacWaterQty}</span>
                <button onClick={() => setBacWaterQty(q => q + 1)}>+</button>
              </div>
            </div>
            <p className="pdm-bac-note">Prix dégressifs : 1 pour 3€, 2 pour 5€, 3 pour 7€, etc.</p>

            {/* CTA */}
            <button className="pdm-cta" onClick={() => setShowOrder(true)}>
              {WA_ICON} COMMANDER — {total.toFixed(2)} €
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
