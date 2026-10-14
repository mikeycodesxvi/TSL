export interface MenuItem {
  id: string;
  name: string;
  category: "soups" | "momos" | "thukpa" | "wok" | "beverages";
  type: "veg" | "non-veg";
  price: number;
  description: string;
  longDescription: string;
  spiceLevel: 1 | 2 | 3 | 4 | 5;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  image: string;
  prepTime: string;
  tags: string[];
  nutrition: {
    calories: number;
    protein: string;
    brothTime?: string;
  };
}

export interface Outlet {
  id: string;
  name: string;
  subtitle: string;
  address: string;
  landmark: string;
  phone: string;
  hours: string;
  isFlagship?: boolean;
  seating: string;
  googleMapsUrl: string;
  features: string[];
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  favoriteDish: string;
  verifiedLocal: boolean;
}

export const RESTAURANT_INFO = {
  name: "KC Soup Bar & Momos",
  brandTagline: "The Soul of Dehradun Since 1989",
  establishedYear: 1989,
  city: "Dehradun, Uttarakhand, India",
  phone: "+91 98970 12345",
  whatsappNumber: "919897012345",
  email: "hello@kcsoupbar.com",
  instagram: "@kcsoupbar_doon",
  stats: [
    { label: "Years of Legacy", value: "35+" },
    { label: "Bowls Simmered Daily", value: "8,500+" },
    { label: "Hand-Pleated Daily", value: "25,000+" },
    { label: "Google & Doon Rating", value: "4.8 ★" },
  ],
};

export const MENU_ITEMS: MenuItem[] = [
  // SIGNATURE SOUPS
  {
    id: "soup-1",
    name: "The Legendary Dumpling Soup",
    category: "soups",
    type: "non-veg",
    price: 240,
    description: "Our 1989 original: 6 juicy chicken momos submerged in an 18-hour slow-simmered Himalayan herbal clear broth with spring onions and toasted sesame drops.",
    longDescription: "The dish that made Rajpur Road famous. Hand-folded momos are poached directly in a delicate golden broth made from local ginger, garlic root, Himalayan coriander stems, and slow-roasted chicken stock.",
    spiceLevel: 2,
    isPopular: true,
    isChefSpecial: true,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    prepTime: "8 mins",
    tags: ["Best Seller", "Signature 1989", "Slow Simmered"],
    nutrition: { calories: 340, protein: "24g", brothTime: "18 Hours" },
  },
  {
    id: "soup-2",
    name: "Himalayan Forest Veg Dumpling Soup",
    category: "soups",
    type: "veg",
    price: 210,
    description: "Six garden-fresh vegetable & paneer momos soaking in an aromatic consommé infused with wild mountain celery and roasted garlic.",
    longDescription: "A soothing bowl favored by mountain travelers for over three decades. Fresh finely chopped hill cabbages, carrots, and sweetcorn dumplings swimming in an amber herb broth.",
    spiceLevel: 1,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1607528971899-2e89e6c0ec69?auto=format&fit=crop&w=800&q=80",
    prepTime: "8 mins",
    tags: ["Vegetarian Favorite", "Comfort Classic"],
    nutrition: { calories: 280, protein: "14g", brothTime: "12 Hours" },
  },
  {
    id: "soup-3",
    name: "Fiery Sichuan Hot & Sour Broth",
    category: "soups",
    type: "non-veg",
    price: 190,
    description: "Velvety spiced broth loaded with wood-ear mushrooms, shredded bamboo shoots, hand-pulled chicken, and dark vinegar warmth.",
    longDescription: "A punchy kick on chilly Dehradun evenings. Perfectly balanced between piquant black pepper, aged dark vinegar, and bird's eye chili oil.",
    spiceLevel: 4,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    prepTime: "6 mins",
    tags: ["Spicy Kick", "Winter Essential"],
    nutrition: { calories: 260, protein: "18g", brothTime: "8 Hours" },
  },
  {
    id: "soup-4",
    name: "Tibetan Manchow with Golden Crisps",
    category: "soups",
    type: "veg",
    price: 180,
    description: "Thick garlicky dark broth topped with cilantro and a generous mound of crunchy wok-fried wonton crisps.",
    longDescription: "A street-side Indo-Chinese staple elevated to perfection with our secret spice blend and hand-pressed garlic oil.",
    spiceLevel: 3,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80",
    prepTime: "5 mins",
    tags: ["Crispy Topping", "Indo-Chinese"],
    nutrition: { calories: 230, protein: "8g", brothTime: "6 Hours" },
  },

  // HANDCRAFTED MOMOS
  {
    id: "momo-1",
    name: "Classic Steamed Himalayan Chicken Momos",
    category: "momos",
    type: "non-veg",
    price: 210,
    description: "8 pieces of translucent paper-thin steamed dumplings bursting with succulent spiced chicken and natural bouillon.",
    longDescription: "Folded with precisely 18 pleats, steamed in traditional mountain pine baskets. Served with our iconic smoky red Jakhan chili chutney and sesame dip.",
    spiceLevel: 2,
    isPopular: true,
    isChefSpecial: true,
    image: "https://images.unsplash.com/photo-1677449477334-ffa76ad861e2?auto=format&fit=crop&w=800&q=80",
    prepTime: "7 mins",
    tags: ["Top Ranked", "18 Pleats", "Original Recipe"],
    nutrition: { calories: 360, protein: "28g" },
  },
  {
    id: "momo-2",
    name: "Pan-Seared Kothey Chicken Momos",
    category: "momos",
    type: "non-veg",
    price: 230,
    description: "Crisp and golden on the bottom, cloud-soft and juicy on top. The ultimate dual-texture dumpling experience.",
    longDescription: "First steamed to lock in the savory broth, then sizzling pan-fried on cast-iron griddles until the base achieves a shatteringly crisp lace crust.",
    spiceLevel: 3,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    prepTime: "10 mins",
    tags: ["Crispy Base", "Chef Pick"],
    nutrition: { calories: 410, protein: "27g" },
  },
  {
    id: "momo-3",
    name: "Smoked Afghani Malai Momos",
    category: "momos",
    type: "veg",
    price: 240,
    description: "Tandoor-charred paneer & vegetable momos drowned in rich cashew cream, melted butter, and crushed fenugreek leaves.",
    longDescription: "Our decadent tribute to North Indian tandoori magic. Smoked over real charcoal embers then tossed in velvety malai sauce.",
    spiceLevel: 1,
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80",
    prepTime: "12 mins",
    tags: ["Creamy & Mild", "Charcoal Smoked"],
    nutrition: { calories: 480, protein: "16g" },
  },
  {
    id: "momo-4",
    name: "Golden Kurkure Crunch Momos",
    category: "momos",
    type: "non-veg",
    price: 250,
    description: "Coated in spiced panko crumbs and fried to golden perfection with an explosive crunch in every single bite.",
    longDescription: "The student favorite of Dehradun! Juicy inner filling encased in an ultra-crisp seasoned crust. Paired with sweet chili mayo and hot chutney.",
    spiceLevel: 3,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    prepTime: "9 mins",
    tags: ["Super Crunchy", "Youth Icon"],
    nutrition: { calories: 510, protein: "25g" },
  },
  {
    id: "momo-5",
    name: "Fiery Jakhan Chilli Gravy Momos",
    category: "momos",
    type: "non-veg",
    price: 240,
    description: "Fried dumplings tossed in a sizzling wok with bell peppers, green chilies, dark soy, and fiery garlic reduction.",
    longDescription: "For real spice lovers. The wok-tossed sauce clings to every contour of the momos, delivering intense umami and mountain heat.",
    spiceLevel: 5,
    isChefSpecial: true,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    prepTime: "10 mins",
    tags: ["Extra Fiery", "Wok Tossed"],
    nutrition: { calories: 430, protein: "24g" },
  },

  // THUKPA & BOWLS
  {
    id: "thukpa-1",
    name: "Traditional Himalayan Chicken Thukpa",
    category: "thukpa",
    type: "non-veg",
    price: 270,
    description: "Big steaming bowl of hand-pulled wheat noodles, shredded chicken, bok choy, and soft-boiled egg in spiced ginger broth.",
    longDescription: "The quintessential comfort bowl of the Himalayas. Warming from inside out, prepared with our house-made wheat noodles and family recipe aromatics.",
    spiceLevel: 2,
    isPopular: true,
    isChefSpecial: true,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    prepTime: "12 mins",
    tags: ["Hearty Meal", "Tibetan Heritage"],
    nutrition: { calories: 520, protein: "32g", brothTime: "14 Hours" },
  },
  {
    id: "thukpa-2",
    name: "Monastery Vegetable Thukpa",
    category: "thukpa",
    type: "veg",
    price: 240,
    description: "Silky mountain noodles with shiitake mushrooms, winter greens, baby corn, and tofu in a fragrant golden broth.",
    longDescription: "Clean, nourishing, and soulful. Designed for clean eating without compromising on deep, complex umami notes.",
    spiceLevel: 1,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    prepTime: "10 mins",
    tags: ["Plant Rich", "Immunity Boost"],
    nutrition: { calories: 390, protein: "18g", brothTime: "10 Hours" },
  },

  // WOK & SIDES
  {
    id: "wok-1",
    name: "Smoky Jakhan Hakka Noodles",
    category: "wok",
    type: "veg",
    price: 220,
    description: "High-flame wok tossed thin noodles with julienned vegetables, white pepper, and toasted scallion oil.",
    longDescription: "Charred to perfection in carbon steel woks with high heat wok hei that delivers authentic roadside aroma with fine-dining finesse.",
    spiceLevel: 2,
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80",
    prepTime: "8 mins",
    tags: ["Wok Hei", "Classic Favorite"],
    nutrition: { calories: 450, protein: "12g" },
  },
  {
    id: "wok-2",
    name: "Crispy Honey Chilli Lotus & Potato",
    category: "wok",
    type: "veg",
    price: 230,
    description: "Twice-fried crisp potatoes and lotus stem glazed in hot red chili garlic sauce with wild Himalayan honey.",
    longDescription: "Crunchy, sweet, spicy, and endlessly addictive. Finished with toasted white sesame and chopped fresh chives.",
    spiceLevel: 3,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    prepTime: "8 mins",
    tags: ["Glazed Crunch", "Crowd Pleaser"],
    nutrition: { calories: 380, protein: "7g" },
  },

  // BEVERAGES
  {
    id: "bev-1",
    name: "Himalayan Spiced Butter Tea (Po Cha)",
    category: "beverages",
    type: "veg",
    price: 120,
    description: "Authentic Tibetan churned black brick tea with yak-style mountain butter and pink Himalayan mineral salt.",
    longDescription: "A traditional high-altitude warmer served piping hot in ceramic cups. Rich, savory, and restorative.",
    spiceLevel: 1,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    prepTime: "4 mins",
    tags: ["Authentic Tibetan", "Restorative"],
    nutrition: { calories: 160, protein: "3g" },
  },
  {
    id: "bev-2",
    name: "Wild Mountain Peach & Hibiscus Cooler",
    category: "beverages",
    type: "veg",
    price: 140,
    description: "Chilled infusion of Uttarakhand hill peaches, tart dried hibiscus petals, mint leaves, and sparkling mountain water.",
    longDescription: "The ideal palate cleanser after a bowl of steaming dumplings and fiery red chutney.",
    spiceLevel: 1,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    prepTime: "3 mins",
    tags: ["Refreshing", "Local Fruits"],
    nutrition: { calories: 95, protein: "1g" },
  },
];

export const OUTLETS: Outlet[] = [
  {
    id: "jakhan",
    name: "Jakhan Flagship Store",
    subtitle: "The 1989 Mother Outlet",
    address: "Rajpur Road, Jakhan (Opposite Punjab Grill & Reliance Jewels)",
    landmark: "Jakhan, Dehradun, Uttarakhand 248001",
    phone: "+91 98970 12345",
    hours: "11:00 AM – 11:30 PM (All 7 Days)",
    isFlagship: true,
    seating: "Dine-in (Indoor & Street Veranda), Takeaway, Delivery",
    googleMapsUrl: "https://maps.google.com/?q=KC+Soup+Bar+Jakhan+Rajpur+Road+Dehradun",
    features: [
      "Open Steamer & Wok Kitchen",
      "Special 18-Hour Broth Cauldron",
      "Street Vibe with Heated Seating",
      "Late-Night Counter till 11:30 PM",
    ],
  },
  {
    id: "balliwala",
    name: "Balliwala Junction",
    subtitle: "West Doon Hub",
    address: "Balliwala Chowk, GMS Road, Near Flyover",
    landmark: "Balliwala, Dehradun, Uttarakhand 248006",
    phone: "+91 98970 54321",
    hours: "12:00 PM – 11:00 PM",
    seating: "Air-Conditioned Dine-in, Express Drive-by Counter",
    googleMapsUrl: "https://maps.google.com/?q=KC+Soup+Bar+Balliwala+Dehradun",
    features: [
      "Family Dine-In Section",
      "Express Takeaway Pickup",
      "Curated Weekend Specials",
      "Zomato & Swiggy Superfast Dispatch",
    ],
  },
  {
    id: "anurag-chowk",
    name: "Anurag Chowk Station",
    subtitle: "Vasant Vihar Valley Outlet",
    address: "Near Anurag Chowk, Vasant Vihar Enclave",
    landmark: "Anurag Chowk, Dehradun, Uttarakhand 248006",
    phone: "+91 98970 99887",
    hours: "12:30 PM – 11:00 PM",
    seating: "Casual Lounge & Street Patio",
    googleMapsUrl: "https://maps.google.com/?q=KC+Soup+Bar+Anurag+Chowk+Dehradun",
    features: [
      "Cloud Kitchen & Fast Casual",
      "Student Loyalty Offers",
      "Artisan Dips Bottled to Take Home",
      "Instant Delivery Hub",
    ],
  },
];

export const TIMELINE_EVENTS = [
  {
    year: "1989",
    title: "The Rajpur Road Spark",
    subtitle: "A wooden steamer & a grandmother's broth recipe",
    description: "Started as a passionate roadside haven on Rajpur Road when Dehradun was a sleepy valley of lit lanterns and boarding schools. Students from The Doon School, Welham, and IMA cadets gathered every evening for genuine mountain momos.",
    highlight: "First outlet to introduce piping-hot momo dumpling soup to Dehradun.",
  },
  {
    year: "2002",
    title: "Mastering the 18-Hour Broth",
    subtitle: "The birth of the 'Soup Bar' phenomenon",
    description: "Realizing guests couldn't get enough of the poaching broth, we installed our iconic copper-lined stockpots to simmer mountain herbs, roasted bones, and garlic for over 18 continuous hours.",
    highlight: "Officially rebranded as KC Soup Bar & Momos — Dehradun's first dedicated soup bar.",
  },
  {
    year: "2016",
    title: "Spreading Across the Valley",
    subtitle: "Flagship revamp & multi-location family",
    description: "To meet relentless demand from travelers heading to Mussoorie and locals across town, outlets opened in Balliwala and Anurag Chowk, keeping recipes strictly artisanal and hand-folded.",
    highlight: "Serving over 10,000 satisfied dumpling enthusiasts every single day.",
  },
  {
    year: "2026",
    title: "The Modern Himalayan Culinary Era",
    subtitle: "Tradition preserved, craft elevated",
    description: "Blending 35 years of uncompromised taste with cutting-edge culinary precision, sustainable farm-to-pot sourcing from Uttarakhand hills, and modern immersive dining.",
    highlight: "Celebrated nationally as the gold standard of Himalayan street gastronomy.",
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Captain Vikram Rawat",
    role: "IMA Alumnus & Doon Local",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "2 weeks ago",
    text: "I have been coming to KC Soup Bar on Rajpur Road since 1996 during my cadet days. That first spoonful of Dumpling Soup on a chilly winter evening is pure therapy. The taste has remained delightfully uncompromised for nearly 30 years!",
    favoriteDish: "The Legendary Dumpling Soup",
    verifiedLocal: true,
  },
  {
    id: "rev-2",
    name: "Ananya Mukherjee",
    role: "Food & Travel Journalist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "1 month ago",
    text: "Whenever I drive up to Mussoorie, a mandatory pitstop at KC Jakhan is non-negotiable. Their Kothey momos have that ideal crisp lattice bottom, and the homemade chili chutney has that genuine Himalayan fiery character. Truly an institution.",
    favoriteDish: "Pan-Seared Kothey Chicken Momos",
    verifiedLocal: true,
  },
  {
    id: "rev-3",
    name: "Rohan Malhotra",
    role: "Architect & Long-time Regular",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "3 days ago",
    text: "The Kurkure momos and the Thukpa are unbelievable. Clean, deeply flavorful, generous portions. If you are in Dehradun and haven't had KC's hot soup on a foggy night, you haven't truly experienced the city.",
    favoriteDish: "Himalayan Chicken Thukpa",
    verifiedLocal: true,
  },
  {
    id: "rev-4",
    name: "Dr. Priyamvada Negi",
    role: "Faculty, UPES Dehradun",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "Just yesterday",
    text: "The new website experience and the broth alchemy concept is brilliant! Ordered 4 bowls for our department gathering via WhatsApp and it arrived steaming hot. Hands down the pride of Rajpur Road.",
    favoriteDish: "Himalayan Forest Veg Dumpling Soup",
    verifiedLocal: true,
  },
];
