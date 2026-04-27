const INFO_PAGES = {
  faq: {
    title: 'FAQ — Questions Fréquentes',
    sections: [
      {
        q: 'Qu\'est-ce qu\'un peptide de recherche ?',
        a: 'Les peptides de recherche sont des composés synthétiques utilisés exclusivement en laboratoire pour des études scientifiques. Ils ne sont pas destinés à la consommation humaine.'
      },
      {
        q: 'Comment conserver mes peptides ?',
        a: 'Avant reconstitution, conservez les fioles au réfrigérateur (2-8°C) ou au congélateur (-20°C) pour une conservation longue durée. Après reconstitution avec de l\'eau bactériostatique, conservez au réfrigérateur et utilisez dans les 30 jours.'
      },
      {
        q: 'Qu\'est-ce que l\'eau bactériostatique ?',
        a: 'L\'eau bactériostatique est de l\'eau stérile contenant 0.9% d\'alcool benzylique qui empêche la croissance bactérienne. Elle est utilisée pour reconstituer les peptides lyophilisés.'
      },
      {
        q: 'Combien de temps prend la livraison ?',
        a: 'La livraison via Mondial Relay prend généralement 3 à 5 jours ouvrés en France métropolitaine. Vous recevrez un numéro de suivi dès l\'expédition.'
      },
      {
        q: 'Les peptides sont-ils testés ?',
        a: 'Oui, chaque lot est testé par HPLC (chromatographie liquide haute performance) avec un certificat d\'analyse (COA) garantissant une pureté supérieure à 98%.'
      },
      {
        q: 'Comment passer commande ?',
        a: 'Sélectionnez votre produit, choisissez le dosage et la quantité, puis validez via WhatsApp. Nous vous confirmerons votre commande et vous enverrons les détails de paiement.'
      },
    ],
  },
  livraison: {
    title: 'Livraison — Mondial Relay',
    content: `
**Mode de livraison : Mondial Relay**

Nous expédions toutes nos commandes via **Mondial Relay**, le réseau de points relais le plus étendu en France.

---

**📦 Tarif : 5,00 € (Offert dès 150€)**
Livraison forfaitaire de 5€. La livraison est gratuite pour toute commande à partir de 150€.

**⏱ Délai de livraison : 3 à 5 jours ouvrés**
Après validation de votre commande et réception du paiement.

**📍 Points relais**
Plus de 10 000 points relais disponibles en France. Choisissez le relais le plus proche de chez vous.

---

**Suivi de commande**
Un numéro de suivi vous sera communiqué par WhatsApp dès l'expédition de votre colis.

**Emballage discret**
Tous les colis sont emballés de manière neutre et discrète, sans mention du contenu.

**Conditions de conservation pendant le transport**
Nos peptides lyophilisés sont stables à température ambiante pendant le transport. Dès réception, placez-les au réfrigérateur (2-8°C).

**Zone de livraison**
France métropolitaine uniquement pour le moment. Contactez-nous via WhatsApp pour les livraisons en Europe.
    `,
  },
  cgv: {
    title: 'Conditions Générales de Vente',
    content: `
**Article 1 — Objet**
Les présentes conditions générales de vente régissent les ventes de produits peptidiques destinés à la recherche effectuées par KratosBio.

**Article 2 — Produits**
Les peptides vendus par KratosBio sont exclusivement destinés à des fins de recherche scientifique et ne sont pas approuvés pour la consommation humaine, vétérinaire ou toute autre utilisation non autorisée.

**Article 3 — Commande**
Les commandes sont passées via WhatsApp. La commande est confirmée après validation du paiement.

**Article 4 — Prix**
Les prix sont indiqués en euros TTC. KratosBio se réserve le droit de modifier ses prix à tout moment. Les produits sont facturés au prix en vigueur au moment de la commande.

**Article 5 — Paiement**
Le paiement s'effectue par virement bancaire ou par les moyens de paiement proposés lors de la commande.

**Article 6 — Livraison**
La livraison est effectuée via Mondial Relay sous 3 à 5 jours ouvrés. Les frais de livraison sont de 5€ (offerts à partir de 150€ d'achat).

**Article 7 — Responsabilité**
L'acheteur est seul responsable de l'utilisation des produits. KratosBio ne saurait être tenu responsable de toute utilisation non conforme.

**Article 8 — Retours**
En raison de la nature des produits, aucun retour n'est accepté une fois le colis livré, sauf en cas de produit défectueux ou non conforme.
    `,
  },
  confidentialite: {
    title: 'Politique de Confidentialité',
    content: `
**Protection de vos données**
KratosBio s'engage à protéger la confidentialité de vos informations personnelles.

**Données collectées**
Nous collectons uniquement les informations nécessaires au traitement de votre commande : nom, adresse de livraison, numéro de téléphone WhatsApp.

**Utilisation des données**
Vos données sont utilisées exclusivement pour :
- Traiter et expédier vos commandes
- Vous contacter concernant votre commande
- Vous notifier de la disponibilité des produits (si inscription à la liste d'attente)

**Stockage**
Vos données sont conservées de manière sécurisée et ne sont jamais partagées avec des tiers, sauf pour les besoins de la livraison (Mondial Relay).

**Cookies**
Ce site n'utilise aucun cookie de suivi publicitaire. Seuls des cookies techniques essentiels sont utilisés.

**Vos droits**
Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Contactez-nous via WhatsApp pour exercer vos droits.
    `,
  },
  mentions: {
    title: 'Mentions Légales',
    content: `
**Éditeur du site**
KratosBio — Peptides & Performance

**Hébergement**
Ce site est hébergé par un prestataire européen conforme aux normes RGPD.

**Propriété intellectuelle**
L'ensemble du contenu de ce site (textes, images, logos, design) est la propriété exclusive de KratosBio. Toute reproduction est interdite sans autorisation préalable.

**Clause de non-responsabilité**
Les produits présentés sur ce site sont destinés exclusivement à la recherche scientifique. KratosBio décline toute responsabilité en cas d'utilisation non conforme aux réglementations en vigueur.

**Contact**
Pour toute question, contactez-nous via WhatsApp.
    `,
  },
};

export default function InfoModal({ page, onClose }) {
  if (!page || !INFO_PAGES[page]) return null;
  const data = INFO_PAGES[page];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="info-modal" onClick={e => e.stopPropagation()}>
        <div className="info-modal-header">
          <h2>{data.title}</h2>
          <button className="pdm-close" onClick={onClose} style={{position:'static'}}>✕</button>
        </div>
        <div className="info-modal-body">
          {/* FAQ format */}
          {data.sections && data.sections.map((s, i) => (
            <div className="info-faq" key={i}>
              <h4>{s.q}</h4>
              <p>{s.a}</p>
            </div>
          ))}
          {/* Content format */}
          {data.content && data.content.split('\n').map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return <br key={i} />;
            if (trimmed.startsWith('**') && trimmed.endsWith('**'))
              return <h4 key={i} style={{margin:'1.2rem 0 .4rem',color:'var(--gold)'}}>{trimmed.replace(/\*\*/g, '')}</h4>;
            if (trimmed === '---')
              return <hr key={i} style={{border:'none',borderTop:'1px solid rgba(255,255,255,.08)',margin:'1rem 0'}} />;
            if (trimmed.startsWith('- '))
              return <li key={i} style={{color:'var(--gray-300)',fontSize:'.85rem',lineHeight:1.7,marginLeft:'1rem',listStyle:'disc'}}>{trimmed.slice(2)}</li>;
            return <p key={i} style={{color:'var(--gray-300)',fontSize:'.85rem',lineHeight:1.7,marginBottom:'.3rem'}}>{
              trimmed.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                part.startsWith('**') && part.endsWith('**')
                  ? <strong key={j} style={{color:'var(--white)'}}>{part.replace(/\*\*/g, '')}</strong>
                  : part
              )
            }</p>;
          })}
        </div>
      </div>
    </div>
  );
}
