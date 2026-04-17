export type FeaturedBadge =
  | "Favorito del chef"
  | "Mas pedido"
  | "Producto de estacion"
  | "Recomendado";

export type MenuCatalogDish = {
  name: string;
  description: string;
  ingredients?: string;
  priceLabel?: string;
  tags?: string[];
  image?: string;
  highlight?: boolean;
};

export type MenuCatalogCategory = {
  id: string;
  slug: string;
  title: string;
  intro: string;
  image: string;
  dishes: MenuCatalogDish[];
};

export type HomeFeaturedDish = {
  name: string;
  description: string;
  ingredients: string;
  price: string;
  badge: FeaturedBadge;
  image: string;
};

export type SignatureDish = {
  name: string;
  description: string;
  ingredients: string;
  price: string;
  tags: string[];
  image: string;
  category: string;
};

const defaultPrice = "Consultar";

export const menuIngredientChips = [
  "Habas",
  "Maiz",
  "Quinoa",
  "Queso de cabra",
  "Locoto",
  "Hongos",
  "Trufa",
  "Pasta artesanal",
  "Oliva",
  "Mollejas",
];

export const homeMenuChips = [
  "Pastas artesanales",
  "Productos del NOA",
  "Cocina italo-colonial",
  "Ingredientes de estacion",
  "Reservas limitadas",
];

const rawMenuCategoriesCatalog: MenuCatalogCategory[] = [
  {
    id: "entradas",
    slug: "entradas",
    title: "Entradas",
    intro: "Inicios de producto noble, tecnica precisa y fusion italo-colonial.",
    image:
      "/platos/burrataJamonCrudo.jpg",
    dishes: [
      {
        name: "Burrata de bufala y mozzarella",
        description:
          "Mozzarella de bufala con olivas verdes y negras marinadas en limon, tomate cherry, albahaca fresca y jamon crudo.",
        ingredients: "Bufala, olivas, limon, jamon crudo",
        priceLabel: defaultPrice,
      },
      {
        name: "Ensalada de Feche, Fragge Cre y Nuts",
        description:
          "Higos, palta, zucchini, habas, pistachos, jengibre, panceta y queso brie con vinagreta de miel y naranja.",
        ingredients: "Higos, habas, pistachos, brie",
        priceLabel: defaultPrice,
      },
      {
        name: "Ensalada de Acellus, Pulpa Roja, Acai, Carcefe",
        description: "Ensalada de mollejas crocantes, pomelo rosado, palta y alcauciles.",
        ingredients: "Mollejas, pomelo, palta, alcauciles",
        priceLabel: defaultPrice,
      },
      {
        name: "Carpaccio de pulpo",
        description:
          "Carpaccio de pulpo espanol con vinagreta de maracuya, olivas y alcauciles.",
        ingredients: "Pulpo, maracuya, olivas, alcauciles",
        priceLabel: defaultPrice,
        tags: ["Mas pedido"],
        highlight: true,
      },
      {
        name: "Ensalada de langostinos",
        description:
          "Maiz mote, langostinos, tomatitos, habas frescas, quinoa, locoto y vivos de citricos.",
        ingredients: "Langostinos, maiz mote, quinoa, locoto",
        priceLabel: defaultPrice,
      },
      {
        name: "Strudel verde de Paen Terra",
        description: "Strudel tibio de maiz y queso Gruyere, sobre charco de azafran.",
        ingredients: "Maiz, gruyere, azafran",
        priceLabel: defaultPrice,
      },
      {
        name: "Le Allusciana de Fragge",
        description:
          "Aceitunas horneadas, rellenas de queso, acompanadas de queso pategras y mayonesa alimonada.",
        ingredients: "Aceitunas, pategras, mayonesa al limon",
        priceLabel: defaultPrice,
      },
      {
        name: "Rawal Crust",
        description: "Maiz, carne de res, aji colorado, envueltos en chala.",
        ingredients: "Maiz, res, aji colorado",
        priceLabel: defaultPrice,
      },
      {
        name: "Le Allu Asclana",
        description:
          "Aceitunas horneadas, rellenas con ternera, parmesano y panceta ahumada, acompanadas de jamon crudo y mayonesa alimonada.",
        ingredients: "Ternera, parmesano, panceta, jamon crudo",
        priceLabel: defaultPrice,
      },
      {
        name: "Fritata de papas con Funghi Secca con al Tartufo",
        description: "Tortilla de papas con girgolas y manteca trufada.",
        ingredients: "Papas, girgolas, trufa",
        priceLabel: defaultPrice,
      },
      {
        name: "Pulpo espanol sobre humita",
        description: "Pulpo espanol confitado, sobre humita de maiz amarillo en olla.",
        ingredients: "Pulpo, humita, maiz amarillo",
        priceLabel: defaultPrice,
        tags: ["Favorito del chef"],
        highlight: true,
      },
      {
        name: "Pastel de choclo",
        description: "Receta tradicional de pastel de maiz, queso y caramelo.",
        ingredients: "Maiz, queso, caramelo",
        priceLabel: defaultPrice,
      },
      {
        name: "Cech de pesca blanca",
        description:
          "Pesca del dia, cebolla morada, locoto, cilantro, habas, maiz chancha y fruta de estacion.",
        ingredients: "Pesca blanca, locoto, habas, maiz",
        priceLabel: defaultPrice,
      },
      {
        name: "Carpaccio de Ello Carcefe alla Geudea",
        description: "Carpaccio de ternera, corazones de alcauciles, queso y habas frescas.",
        ingredients: "Ternera, alcauciles, habas",
        priceLabel: defaultPrice,
      },
      {
        name: "Ensalada del campo",
        description:
          "Hojas verdes, tomates cherries, panceta ahumada, croutons y vinagreta de citricos.",
        ingredients: "Hojas verdes, panceta, citricos",
        priceLabel: defaultPrice,
      },
      {
        name: "Duo de empanadas Jujuy de Yus",
        description: "Empanadas de queso y masa casera al horno.",
        ingredients: "Queso, masa casera",
        priceLabel: defaultPrice,
      },
    ],
  },
  {
    id: "risottos",
    slug: "risottos",
    title: "Risottos",
    intro: "Carnaroli, cocciones lentas y capas de sabor con impronta de la casa.",
    image:
      "/platos/quesillo.jpg",
    dishes: [
      {
        name: "Risotto al Procc con Anello al Burr Tartufo",
        description:
          "Arroz Carnaroli, vino espumante, mollejas y manteca de trufas negras italianas.",
        ingredients: "Carnaroli, mollejas, trufa negra",
        priceLabel: defaultPrice,
      },
      {
        name: "Risotto Nero de Sepia",
        description: "Arroz Carnaroli con pulpo espanol confitado y tinta de sepia.",
        ingredients: "Carnaroli, pulpo, tinta de sepia",
        priceLabel: defaultPrice,
      },
      {
        name: "Risotto al Pomodoro Fragge Bre al Tartufo",
        description: "Arroz Carnaroli, tomates frescos y secos, leche de coco y queso brie.",
        ingredients: "Carnaroli, tomate, coco, brie",
        priceLabel: defaultPrice,
      },
      {
        name: "Risotto de Ossobuco alla Milanese",
        description: "Arroz Carnaroli, ossobuco, azafran y parmesano.",
        ingredients: "Carnaroli, ossobuco, azafran",
        priceLabel: defaultPrice,
      },
      {
        name: "Risotto de Funghi Freschi Fragge Bre",
        description: "Arroz Carnaroli, champinones, portobellas y parmesano.",
        ingredients: "Carnaroli, hongos, parmesano",
        priceLabel: defaultPrice,
      },
      {
        name: "Risotto de Haba Fragge de Cabra",
        description: "Arroz Carnaroli, habas frescas y queso de cabra del norte.",
        ingredients: "Carnaroli, habas, queso de cabra",
        priceLabel: defaultPrice,
        tags: ["Favorito del chef"],
        highlight: true,
      },
    ],
  },
  {
    id: "pastas-frescas",
    slug: "pastas-frescas",
    title: "Pastas Frescas",
    intro: "Masa artesanal, rellenos nobles y tecnica italiana como corazon de la carta.",
    image:
      "/platos/ravioli.jpg",
    dishes: [
      {
        name: "Ravioli de Perla Pistacche",
        description: "Ravioles de queso provolone y pistachos.",
        ingredients: "Provolone, pistachos",
        priceLabel: defaultPrice,
      },
      {
        name: "Ravioli de Foie alla Crema de Tartufo Nero",
        description:
          "Ravioles de foie de ganso y queso Caciocavallo con crema de trufas negras italianas.",
        ingredients: "Foie, Caciocavallo, trufa negra",
        priceLabel: defaultPrice,
        tags: ["Favorito del chef"],
        highlight: true,
      },
      {
        name: "Cannelloni de Ricotta Grana Padana",
        description:
          "Canelones rellenos de ricota, queso grana padano, espinaca y mascarpone con crema de hongos y champana.",
        ingredients: "Ricota, grana padano, espinaca, hongos",
        priceLabel: defaultPrice,
      },
      {
        name: "Tortellini de Gorgonzola Noce",
        description: "Pasta rellena de queso azul, brandy y nueces, en manteca de olivas negras.",
        ingredients: "Gorgonzola, brandy, nueces",
        priceLabel: defaultPrice,
      },
      {
        name: "Ravioli al Limon Panna de Coco Gambre",
        description:
          "Ravioles de gruyere, provolone, limon, crema, leche de coco, langostinos y curry.",
        ingredients: "Langostinos, limon, coco, curry",
        priceLabel: defaultPrice,
        tags: ["Mas pedido"],
        highlight: true,
      },
      {
        name: "Tortelli de Zucca, Mascarpone e Almendras",
        description: "Pasta rellena de calabaza, mascarpone y almendras, en manteca de hierbas.",
        ingredients: "Calabaza, mascarpone, almendras",
        priceLabel: defaultPrice,
      },
      {
        name: "Ravioli de Fragge de Capra Haba Noce en Burro de Olive Nero",
        description:
          "Ravioles de queso de cabra, habas y avellanas en manteca de olivas negras.",
        ingredients: "Queso de cabra, habas, avellanas",
        priceLabel: defaultPrice,
        tags: ["Producto de estacion"],
      },
      {
        name: "Ravioli de Tacchon con Crema de Champagn Funghi Freschi",
        description:
          "Ravioles de pavita macerada en conac, crema de champana y variedad de hongos frescos.",
        ingredients: "Pavita, champana, hongos",
        priceLabel: defaultPrice,
      },
      {
        name: "Gnocchi alla Romana con Funghi Freschi",
        description:
          "Noquis de semola gratinados con hongos frescos, Martini Dry y crema de leche tibia.",
        ingredients: "Semola, hongos, Martini Dry",
        priceLabel: defaultPrice,
      },
      {
        name: "Ravioli de Agnello en Brodo de Malbec",
        description: "Ravioles de cordero en caldo de Malbec y romero fresco.",
        ingredients: "Cordero, malbec, romero",
        priceLabel: defaultPrice,
      },
      {
        name: "Ravioli de Spinace",
        description: "Ravioles de espinaca, tomate, oliva y albahaca fresca.",
        ingredients: "Espinaca, tomate, oliva, albahaca",
        priceLabel: defaultPrice,
      },
      {
        name: "Cappelletti en Brodo",
        description:
          "Tradicional pasta italiana rellena de ternera y parmesano en caldo de apio.",
        ingredients: "Ternera, parmesano, apio",
        priceLabel: defaultPrice,
      },
    ],
  },
  {
    id: "pastas-asciutta",
    slug: "pastas-asciutta",
    title: "Pastas Asciutta",
    intro: "Pastas secas italianas con salsas intensas y perfil de autor.",
    image:
      "/platos/burrataJamonCrudo.jpg",
    dishes: [
      {
        name: "Penne Rigate al Fragge con Gorgonzola",
        description:
          "Pasta corta italiana, queso azul, damascos turcos, olivas, albahaca, tomates secos y pistachos.",
        ingredients: "Penne, gorgonzola, damascos, pistachos",
        priceLabel: defaultPrice,
      },
      {
        name: "Regatone alla Carbonara",
        description: "Pasta italiana, huevo, panceta, pecorino y pimienta negra.",
        ingredients: "Rigatoni, huevo, panceta, pecorino",
        priceLabel: defaultPrice,
      },
    ],
  },
  {
    id: "segundi",
    slug: "segundi",
    title: "Segundi",
    intro: "Cortes, braseados y cocciones de gran profundidad para mesa de celebracion.",
    image:
      "/platos/salon.jpg",
    dishes: [
      {
        name: "Bocconcini alla Toscana",
        description:
          "Bifecitos de lomo con limon y alcaparras, acompanados de papines jujenos.",
        ingredients: "Lomo, limon, alcaparras, papines",
        priceLabel: defaultPrice,
      },
      {
        name: "Lomo a la pimienta con papas a la crema",
        description: "Lomo sellado con salsa a la pimienta y papas a la crema.",
        ingredients: "Lomo, pimienta, papas a la crema",
        priceLabel: defaultPrice,
      },
      {
        name: "Filetto de Ello alla Rossini",
        description:
          "Lomo de ternera envuelto en jamon crudo, mollejas, gruyere gratinado, acompanado de manzanas glaseadas con aceto balsamico.",
        ingredients: "Ternera, jamon crudo, mollejas, gruyere",
        priceLabel: defaultPrice,
      },
      {
        name: "Bife de bife 300 gs",
        description: "Papas a la crema, hojas verdes con parmesano y papitas nortenas.",
        ingredients: "Bife, papas a la crema, parmesano",
        priceLabel: defaultPrice,
      },
      {
        name: "Bife de chorizo 300 gs",
        description: "Papas a la crema, hojas verdes con parmesano y papitas nortenas.",
        ingredients: "Bife de chorizo, papas, parmesano",
        priceLabel: defaultPrice,
      },
      {
        name: "Cotoletta alla Milanese",
        description:
          "Ternera apanada con almendras y parmesano, acompanada de papines con panceta, queso blanco y hierbas frescas.",
        ingredients: "Ternera, almendras, parmesano, papines",
        priceLabel: defaultPrice,
      },
      {
        name: "Petto de pollo al Rosmarino",
        description: "Pechuguitas de pollo con crema de romero y papines.",
        ingredients: "Pollo, romero, papines",
        priceLabel: defaultPrice,
      },
      {
        name: "Pastel de pollo con Coberta de maiz, ajies colorados y Cacho",
        description: "Pastel de pollo cubierto de maiz con ajies colorados.",
        ingredients: "Pollo, maiz, ajies",
        priceLabel: defaultPrice,
      },
      {
        name: "Ossobuco brasado con arroz azafranado",
        description: "Braseado lento de ossobuco con arroz al azafran.",
        ingredients: "Ossobuco, arroz, azafran",
        priceLabel: defaultPrice,
        tags: ["Mas pedido"],
        highlight: true,
      },
    ],
  },
  {
    id: "pescados",
    slug: "pescados",
    title: "Pescados",
    intro: "Preparaciones limpias con perfil mediterraneo y equilibrio citrico.",
    image:
      "/platos/salmonerosato.jpg",
    dishes: [
      {
        name: "Salmon rosado con Burro Capperi",
        description:
          "Salmon rosado chileno, horneado con jengibre, manteca de limon y alcaparras acompanado de espinacas salteadas sobre salsa de naranjas y zanahorias.",
        ingredients: "Salmon, jengibre, alcaparras, espinaca",
        priceLabel: defaultPrice,
        tags: ["Recomendado"],
        highlight: true,
      },
    ],
  },
  {
    id: "postres",
    slug: "postres",
    title: "Postres",
    intro: "Finales de cocina emocional entre tradicion italiana y dulces del norte.",
    image:
      "/platos/postre.jpg",
    dishes: [
      {
        name: "Semifreddo al Frutti della Passione",
        description: "Crema helada casera de maracuya fresco.",
        ingredients: "Maracuya",
        priceLabel: defaultPrice,
      },
      {
        name: "Tiramisu al Mod Nostri",
        description:
          "Postre de mascarpone, vainillas, licor de cafe acompanado de sorbete de cafe.",
        ingredients: "Mascarpone, cafe, vainillas",
        priceLabel: defaultPrice,
        tags: ["Mas pedido"],
        highlight: true,
      },
      {
        name: "Cheesecake de maracuya",
        description: "Cheesecake de mascarpone perfumado con maracuya.",
        ingredients: "Mascarpone, maracuya",
        priceLabel: defaultPrice,
      },
      {
        name: "Marquesa al Cioccolato Glace alla Panna",
        description: "Chocolate negro, frutos rojos y helado casero de crema.",
        ingredients: "Chocolate negro, frutos rojos",
        priceLabel: defaultPrice,
      },
      {
        name: "Glace al Cioccolato con Cascaritas Naranja",
        description: "Helado casero de chocolate negro con cascaritas de naranja glaseadas.",
        ingredients: "Chocolate negro, naranja",
        priceLabel: defaultPrice,
      },
      {
        name: "Glace de dulce de leche y coco",
        description: "Helado casero de dulce de leche y hebras de coco.",
        ingredients: "Dulce de leche, coco",
        priceLabel: defaultPrice,
      },
      {
        name: "Glace de Pistacchio",
        description: "Helado casero de pistachos.",
        ingredients: "Pistacho",
        priceLabel: defaultPrice,
      },
      {
        name: "Flan colonial",
        description: "Crema cocida de leche y caramelo.",
        ingredients: "Leche, caramelo",
        priceLabel: defaultPrice,
      },
      {
        name: "Pasta real",
        description: "Postre tradicional norteno de pasta de almendras, conac y dulce de cayotes.",
        ingredients: "Almendras, cayote, conac",
        priceLabel: defaultPrice,
      },
      {
        name: "Panqueques de dulce de leche",
        description: "Panqueques tibios con dulce de leche artesanal.",
        ingredients: "Dulce de leche",
        priceLabel: defaultPrice,
      },
      {
        name: "Helado de ambrosia",
        description: "Crema helada con ambrosia de huevos.",
        ingredients: "Ambrosia de huevos",
        priceLabel: defaultPrice,
      },
      {
        name: "Strudel de manzana con Glace alla Cannella",
        description: "Strudel tibio de manzana con helado de canela.",
        ingredients: "Manzana, canela",
        priceLabel: defaultPrice,
        tags: ["Favorito de la casa"],
        highlight: true,
      },
    ],
  },
];

const dishImageRules: Array<{ pattern: RegExp; image: string }> = [
  { pattern: /burrata|mozzarella/i, image: "/platos/burrataJamonCrudo.jpg" },
  { pattern: /carpaccio/i, image: "/platos/carpaccio.jpg" },
  { pattern: /pulpo|sepia|cech|pesca blanca/i, image: "/platos/pulpoHumita.jpg" },
  { pattern: /risotto|carnaroli/i, image: "/platos/quesillo.jpg" },
  { pattern: /ravioli|tortelli|tortellini|cannelloni|gnocchi|cappelletti|penne|regatone/i, image: "/platos/ravioli.jpg" },
  { pattern: /salmon/i, image: "/platos/salmonerosato.jpg" },
  { pattern: /strudel|tiramisu|cheesecake|glace|flan|panqueques|marquesa|semifreddo|pasta real|ambrosia/i, image: "/platos/postre.jpg" },
  { pattern: /tortilla|fritata/i, image: "/platos/tortilla.jpg" },
  { pattern: /pastel de choclo|strudel verde/i, image: "/platos/struddelChoclo.jpg" },
  { pattern: /ossobuco|lomo|bife|cotoletta|pollo|petto|rossini|bocconcini/i, image: "/platos/salon.jpg" },
  { pattern: /higo|higos|ensalada/i, image: "/platos/ensaladaHigo.jpg" },
  { pattern: /atun/i, image: "/platos/ensaladadeatunrojo.jpg" },
  { pattern: /ceviche/i, image: "/platos/ceviche.jpg" },
];

function resolveDishImage(dishName: string, fallbackImage: string) {
  const rule = dishImageRules.find((entry) => entry.pattern.test(dishName));
  return rule?.image ?? fallbackImage;
}

export const menuCategoriesCatalog: MenuCatalogCategory[] = rawMenuCategoriesCatalog.map((category) => ({
  ...category,
  dishes: category.dishes.map((dish) => ({
    ...dish,
    image: resolveDishImage(dish.name, category.image),
  })),
}));

export const signatureDishesCatalog: SignatureDish[] = [
  {
    name: "Ravioli al Limon Panna de Coco Gambre",
    description:
      "Ravioles de gruyere, provolone, limon, crema, leche de coco, langostinos y curry.",
    ingredients: "Langostinos, limon, coco, curry",
    price: defaultPrice,
    tags: ["Chef Signature", "Mas pedido"],
    image:
      "/platos/ravioli.jpg",
    category: "Pastas Frescas",
  },
  {
    name: "Pulpo espanol sobre humita",
    description: "Pulpo espanol confitado sobre humita de maiz amarillo en olla.",
    ingredients: "Pulpo, humita, maiz",
    price: defaultPrice,
    tags: ["House Favorite", "Seasonal"],
    image:
      "/platos/pulpoHumita.jpg",
    category: "Entradas",
  },
  {
    name: "Risotto de Haba Fragge de Cabra",
    description: "Arroz Carnaroli, habas frescas y queso de cabra del norte.",
    ingredients: "Carnaroli, habas, queso de cabra",
    price: defaultPrice,
    tags: ["Chef Signature"],
    image:
      "/platos/quesillo.jpg",
    category: "Risottos",
  },
  {
    name: "Carpaccio de pulpo",
    description: "Carpaccio de pulpo espanol con vinagreta de maracuya, olivas y alcauciles.",
    ingredients: "Pulpo, maracuya, olivas",
    price: defaultPrice,
    tags: ["Seasonal"],
    image:
      "/platos/carpaccio.jpg",
    category: "Entradas",
  },
  {
    name: "Ossobuco brasado con arroz azafranado",
    description: "Braseado lento de ossobuco con arroz al azafran.",
    ingredients: "Ossobuco, azafran, arroz",
    price: defaultPrice,
    tags: ["Most Requested", "House Favorite"],
    image:
      "/platos/salon.jpg",
    category: "Segundi",
  },
  {
    name: "Ravioli de Foie alla Crema de Tartufo Nero",
    description:
      "Ravioles de foie de ganso y queso Caciocavallo con crema de trufas negras italianas.",
    ingredients: "Foie, Caciocavallo, trufa negra",
    price: defaultPrice,
    tags: ["Chef Signature"],
    image:
      "/platos/ravioli.jpg",
    category: "Pastas Frescas",
  },
  {
    name: "Ravioli de Fragge de Capra Haba Noce en Burro de Olive Nero",
    description: "Ravioles de queso de cabra, habas y avellanas en manteca de olivas negras.",
    ingredients: "Queso de cabra, habas, avellanas",
    price: defaultPrice,
    tags: ["Seasonal"],
    image:
      "/platos/ravioli.jpg",
    category: "Pastas Frescas",
  },
  {
    name: "Salmon rosado con Burro Capperi",
    description:
      "Salmon rosado chileno con jengibre, manteca de limon y alcaparras.",
    ingredients: "Salmon, jengibre, limon, alcaparras",
    price: defaultPrice,
    tags: ["House Favorite"],
    image:
      "/platos/salmonerosato.jpg",
    category: "Pescados",
  },
  {
    name: "Strudel de manzana con Glace alla Cannella",
    description: "Strudel tibio de manzana con helado de canela.",
    ingredients: "Manzana, canela",
    price: defaultPrice,
    tags: ["Most Requested"],
    image:
      "/platos/postre.jpg",
    category: "Postres",
  },
];

export const homeFeaturedDishes: HomeFeaturedDish[] = [
  {
    name: "Burrata de bufala y mozzarella",
    description: "Mozzarella de bufala con olivas marinadas, tomate cherry y jamon crudo.",
    ingredients: "Bufala, olivas, jamon crudo",
    price: defaultPrice,
    badge: "Recomendado",
    image:
      "/platos/burrataJamonCrudo.jpg",
  },
  {
    name: "Carpaccio de pulpo",
    description: "Pulpo espanol con vinagreta de maracuya, olivas y alcauciles.",
    ingredients: "Pulpo, maracuya, olivas",
    price: defaultPrice,
    badge: "Producto de estacion",
    image:
      "/platos/carpaccio.jpg",
  },
  {
    name: "Pulpo espanol sobre humita",
    description: "Pulpo confitado sobre humita de maiz amarillo en olla.",
    ingredients: "Pulpo, humita, maiz",
    price: defaultPrice,
    badge: "Favorito del chef",
    image:
      "/platos/pulpoHumita.jpg",
  },
  {
    name: "Risotto de Haba Fragge de Cabra",
    description: "Arroz Carnaroli con habas frescas y queso de cabra del norte.",
    ingredients: "Carnaroli, habas, cabra",
    price: defaultPrice,
    badge: "Mas pedido",
    image:
      "/platos/quesillo.jpg",
  },
  {
    name: "Ravioli al Limon Panna de Coco Gambre",
    description: "Ravioles con langostinos y curry de perfil citrico y cremoso.",
    ingredients: "Langostinos, limon, curry",
    price: defaultPrice,
    badge: "Mas pedido",
    image:
      "/platos/ravioli.jpg",
  },
  {
    name: "Ravioli de Foie alla Crema de Tartufo Nero",
    description: "Foie de ganso y queso Caciocavallo con crema de trufa negra.",
    ingredients: "Foie, trufa negra, Caciocavallo",
    price: defaultPrice,
    badge: "Favorito del chef",
    image:
      "/platos/ravioli.jpg",
  },
  {
    name: "Ossobuco brasado con arroz azafranado",
    description: "Braseado lento con fondo profundo y arroz al azafran.",
    ingredients: "Ossobuco, azafran, arroz",
    price: defaultPrice,
    badge: "Recomendado",
    image:
      "/platos/salon.jpg",
  },
  {
    name: "Strudel de manzana con Glace alla Cannella",
    description: "Strudel tibio de manzana con helado de canela.",
    ingredients: "Manzana, canela",
    price: defaultPrice,
    badge: "Producto de estacion",
    image:
      "/platos/postre.jpg",
  },
];

export const seasonalRecommendations = [
  "Ravioli de Fragge de Capra Haba Noce en Burro de Olive Nero",
  "Risotto de Funghi Freschi Fragge Bre",
  "Pulpo espanol sobre humita",
];

export const categorySummary = [
  { title: "Entradas", text: "Inicio con producto noble y tecnica precisa." },
  { title: "Pastas", text: "Ravioles, noquis y recetas italianas artesanales." },
  { title: "Risottos", text: "Cremosidad, fondo y caracter de temporada." },
  { title: "Principales", text: "Cocciones lentas y cortes seleccionados." },
  { title: "Pescados", text: "Pulpo, salmon y frescura mediterranea." },
  { title: "Postres", text: "Cierre emocional con identidad de la casa." },
];
