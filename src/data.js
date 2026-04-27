export const WA_NUM = '33600000000'; // REMPLACER par ton vrai numéro
export const wa = (m) => `https://wa.me/${WA_NUM}?text=${encodeURIComponent(m)}`;

export const BAC_WATER_PRICE = 3;

export const PRODUCTS = [
  {
    id: 'retatrutide',
    name: 'Retatrutide',
    desc: 'Le catalyseur métabolique ultime. Conçu pour maximiser l\'oxydation des graisses et supprimer les fringales.',
    stars: 5,
    img: '/images/bpc157.png',
    inStock: true,
    dosages: [
      { label: '10MG', price: 60 },
    ],
    defaultDosage: 0,
    volumes: [
      { label: '2 Fioles', price: 100 },
      { label: '3 Fioles', price: 145 },
      { label: '5+ Fioles', price: 45, suffix: '/u' },
    ],
    specs: [
      ['Pureté', '> 99% (HPLC)'],
      ['Forme', 'Lyophilisé'],
      ['Conservation', '2-8°C'],
    ],
    usage: 'Reconstituer avec de l\'eau bactériostatique. Injection sous-cutanée hebdomadaire. Commencer par 1mg/semaine puis augmenter progressivement.',
  },
  {
    id: 'melanotan2',
    name: 'Melanotan II',
    desc: 'Analogue synthétique de l\'hormone alpha-mélanocyte. Utilisé en recherche sur la pigmentation cutanée et la photoprotection.',
    price: '45,00 €',
    priceNum: 45,
    stars: 5,
    img: '/images/melanotan.png',
    inStock: false,
    specs: [
      ['Dosage', '10mg / fiole'],
      ['Pureté', '> 98% (HPLC)'],
      ['Forme', 'Lyophilisé'],
      ['Conservation', '2-8°C'],
    ],
    usage: 'Reconstituer avec de l\'eau bactériostatique. Injection sous-cutanée. Doses faibles recommandées pour débuter.',
  },
  {
    id: 'ghkcu',
    name: 'GHK-Cu',
    desc: 'Tripeptide cuivré aux propriétés régénératives. Recherche sur la cicatrisation, le collagène et le rajeunissement tissulaire.',
    price: '55,00 €',
    priceNum: 55,
    stars: 5,
    img: '/images/cjc1295.png',
    inStock: false,
    specs: [
      ['Dosage', '50mg / fiole'],
      ['Pureté', '> 98% (HPLC)'],
      ['Forme', 'Lyophilisé'],
      ['Conservation', '2-8°C'],
    ],
    usage: 'Peut être utilisé en injection sous-cutanée ou en application topique (mélangé à une crème). Dosage typique : 1-2mg/jour.',
  },
];

export const PEPTIDE_INFO = {
  retatrutide: {
    title: 'Retatrutide',
    what: 'Le Retatrutide est un triple agoniste ciblant simultanément les récepteurs GLP-1, GIP et Glucagon. C\'est le peptide le plus avancé pour la recherche sur le métabolisme. Les essais cliniques montrent jusqu\'à 24% de réduction du poids corporel.',
    benefits: [
      'Suppression significative de l\'appétit via GLP-1',
      'Combustion des graisses par activation du glucagon',
      'Amélioration de la sensibilité à l\'insuline via GIP',
      'Dosage hebdomadaire unique pratique',
    ],
    howTo: 'Reconstituer la fiole lyophilisée avec 1ml d\'eau bactériostatique. Injecter le long de la paroi, ne pas secouer. Conserver au réfrigérateur après reconstitution. Injection sous-cutanée 1x/semaine (abdomen, cuisse ou bras). Protocole progressif : Semaines 1-4 : 1mg, Sem 5-8 : 2mg, Sem 9-12 : 4mg, puis jusqu\'à 8-12mg selon tolérance.',
  },
  melanotan2: {
    title: 'Melanotan II',
    what: 'Le Melanotan II est un analogue synthétique de l\'hormone α-MSH (alpha-mélanotropine). Il agit sur les récepteurs mélanocortines MC1R pour stimuler la production de mélanine, offrant une pigmentation cutanée sans exposition UV excessive.',
    benefits: [
      'Stimulation de la mélanogenèse (bronzage)',
      'Photoprotection cutanée accrue',
      'Recherche sur la libido et le comportement',
      'Effets potentiels sur la composition corporelle',
    ],
    howTo: 'Reconstituer avec 1-2ml d\'eau bactériostatique. Injection sous-cutanée, de préférence le soir. Phase de charge : 0.25mg/jour pendant 2-3 semaines. Phase d\'entretien : 0.25mg tous les 2-3 jours. Conserver au réfrigérateur (2-8°C). Utiliser dans les 30 jours après reconstitution.',
  },
  ghkcu: {
    title: 'GHK-Cu',
    what: 'Le GHK-Cu (Glycyl-L-Histidyl-L-Lysine cuivré) est un tripeptide naturellement présent dans le plasma humain. Sa concentration diminue avec l\'âge. Il est reconnu pour ses propriétés régénératives sur la peau, les cheveux et les tissus.',
    benefits: [
      'Stimulation de la synthèse de collagène et d\'élastine',
      'Accélération de la cicatrisation cutanée',
      'Propriétés anti-inflammatoires',
      'Recherche sur la croissance capillaire',
      'Effet antioxydant et réparation de l\'ADN',
    ],
    howTo: 'Utilisation injectable : reconstituer avec eau bactériostatique, injection sous-cutanée de 1-2mg/jour. Utilisation topique : mélanger la poudre dans une crème hydratante à 0.1-1%. Appliquer 1-2x/jour sur la zone ciblée. Les deux méthodes sont étudiées en recherche. Conserver au réfrigérateur.',
  },
};
