
export interface Product {
  id: number;
  title: string;
  artist: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  longDescription: string;
  year: number;
  dimensions: string;
  technique: string;
  category: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Arbeiterparadies",
    artist: "Hans Müller",
    price: 850,
    image: "photo-1541961017774-22349e4a1262",
    images: [
      "photo-1541961017774-22349e4a1262",
      "photo-1578662996442-48f60103fc96",
      "photo-1571115764595-644a1f56a55c"
    ],
    description: "Ein kraftvolles Gemälde, das die Würde der Arbeiterklasse in der DDR feiert.",
    longDescription: "Dieses beeindruckende Werk aus dem Jahr 1975 zeigt die idealistische Darstellung des Arbeiterparadieses, wie es in der DDR-Propaganda häufig zu sehen war. Mit kräftigen Farben und dynamischen Formen vermittelt das Gemälde den Optimismus und die Hoffnung einer ganzen Generation. Die Komposition zeigt Arbeiter in heroischer Pose vor industrieller Kulisse, umrahmt von den charakteristischen Farben der sozialistischen Kunstrichtung.",
    year: 1975,
    dimensions: "80 x 60 cm",
    technique: "Öl auf Leinwand",
    category: "Sozialistischer Realismus",
    inStock: true
  },
  {
    id: 2,
    title: "Brandenburger Tor bei Nacht",
    artist: "Petra Schmidt",
    price: 1200,
    image: "photo-1587330979470-3016b6702d89",
    images: [
      "photo-1587330979470-3016b6702d89",
      "photo-1560969184-10fe8719e047",
      "photo-1539650116574-75c0c6d73ece"
    ],
    description: "Eine nostalgische Darstellung des geteilten Berlins mit dem berühmten Wahrzeichen.",
    longDescription: "Diese emotionale Darstellung des Brandenburger Tors aus dem Jahr 1982 fängt die Melancholie und Sehnsucht der geteilten Stadt ein. Die nächtliche Szenerie mit den charakteristischen warmen Farbtönen der DDR-Zeit vermittelt sowohl die politische Spannung als auch die menschliche Hoffnung auf Wiedervereinigung. Die Künstlerin verwendete eine spezielle Maltechnik, die an die damaligen Fotografien erinnert.",
    year: 1982,
    dimensions: "100 x 70 cm",
    technique: "Acryl auf Leinwand",
    category: "Stadtansichten",
    inStock: true
  },
  {
    id: 3,
    title: "Erntedankfest",
    artist: "Wilhelm Weber",
    price: 650,
    image: "photo-1574263867128-a3d5c1b1deae",
    images: [
      "photo-1574263867128-a3d5c1b1deae",
      "photo-1500937386664-56d1dfef3854",
      "photo-1506905925346-21bda4d32df4"
    ],
    description: "Eine fröhliche Darstellung des ländlichen Lebens und der Gemeinschaft in der DDR.",
    longDescription: "Dieses lebendige Gemälde aus dem Jahr 1978 zeigt eine idealisierte Darstellung des Erntedankfestes in einem DDR-Kolchos. Die warmen, erdigen Farbtöne und die detailreiche Darstellung der Menschen bei der Feier vermitteln ein Gefühl von Gemeinschaft und Tradition. Weber war bekannt für seine romantisierte Darstellung des Landlebens, die oft als Gegenpol zur industriellen Modernisierung gesehen wurde.",
    year: 1978,
    dimensions: "90 x 65 cm",
    technique: "Öl auf Holz",
    category: "Genremalerei",
    inStock: true
  },
  {
    id: 4,
    title: "Pioniere am Lagerfeuer",
    artist: "Ingrid Hoffmann",
    price: 750,
    image: "photo-1501594907352-04cda38ebc29",
    images: [
      "photo-1501594907352-04cda38ebc29",
      "photo-1542273917363-3b1817f69a2d",
      "photo-1506905925346-21bda4d32df4"
    ],
    description: "Ein warmherziges Bild von Jungpionieren bei einem Sommerlager.",
    longDescription: "Diese herzerwärmende Szene aus dem Jahr 1979 zeigt Jungpioniere bei einem Sommerlager der FDJ. Das Gemälde strahlt die Unschuld und den Idealismus der Jugend aus, eingefangen in den goldenen Stunden des Abends. Die Künstlerin war selbst Pionierleiterin und brachte ihre persönlichen Erfahrungen in dieses authentische Werk ein. Die Darstellung verzichtet auf übertriebene Propaganda und konzentriert sich auf die menschlichen Momente.",
    year: 1979,
    dimensions: "70 x 50 cm",
    technique: "Öl auf Leinwand",
    category: "Kinder und Jugend",
    inStock: false
  },
  {
    id: 5,
    title: "Plattenbau-Romantik",
    artist: "Klaus Becker",
    price: 950,
    image: "photo-1545324418-cc1a3fa10c00",
    images: [
      "photo-1545324418-cc1a3fa10c00",
      "photo-1518780664697-55e3ad937233",
      "photo-1570129477492-45c003edd2be"
    ],
    description: "Eine überraschend poetische Darstellung der DDR-Architektur im Abendlicht.",
    longDescription: "Dieses außergewöhnliche Werk aus dem Jahr 1985 zeigt die charakteristischen Plattenbauten der DDR in einem völlig neuen Licht. Becker gelang es, der oft kritisierten Architektur eine poetische Qualität zu verleihen, indem er das warme Abendlicht und die Schatten der Gebäude nutzte, um eine fast romantische Atmosphäre zu schaffen. Das Gemälde ist ein wichtiges Zeugnis für die Alltagsästhetik der späten DDR-Zeit.",
    year: 1985,
    dimensions: "120 x 80 cm",
    technique: "Acryl auf Leinwand",
    category: "Architektur",
    inStock: true
  },
  {
    id: 6,
    title: "Traktor-Brigade",
    artist: "Friedrich Lange",
    price: 800,
    image: "photo-1520038410233-7141be7e6f97",
    images: [
      "photo-1520038410233-7141be7e6f97",
      "photo-1523741543316-beb7fc7023d8",
      "photo-1500937386664-56d1dfef3854"
    ],
    description: "Ein dynamisches Bild der Landwirtschafts-Modernisierung in der DDR.",
    longDescription: "Dieses kraftvolle Gemälde aus dem Jahr 1973 zeigt eine Traktor-Brigade bei der Feldarbeit und symbolisiert die Modernisierung der Landwirtschaft in der DDR. Die dynamische Komposition mit den charakteristischen grünen und roten Farbtönen vermittelt den Fortschrittsoptimismus der sozialistischen Ära. Lange war bekannt für seine technisch präzisen Darstellungen landwirtschaftlicher Maschinen und deren Integration in die Landschaft.",
    year: 1973,
    dimensions: "110 x 75 cm",
    technique: "Öl auf Leinwand",
    category: "Landwirtschaft",
    inStock: true
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getAvailableProducts = (): Product[] => {
  return products.filter(product => product.inStock);
};
