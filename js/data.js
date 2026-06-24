// Dedicated data for Kick & Flick Turf - Ernavoor, Chennai
const KICK_AND_FLICK_DATA = {
  name: "Kick & Flick Turf",
  tagline: "Ernavoor's Premier Multi-Sport Turf",
  area: "Ernavoor, Chennai",
  rating: 4.8,
  reviewsCount: 382,
  description: "Welcome to Kick & Flick Turf, Ernavoor's ultimate sports destination. We feature professional-grade shock-absorption turf for Football and Box Cricket, alongside a premium floodlit Volleyball court. Open 24/7 with international-spec LED lighting, changing rooms, and viewing lounges.",
  locationUrl: "https://maps.google.com/?q=Ernavoor+Chennai",
  amenities: [
    { name: "Pro LED Floodlights", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary-neon)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>` },
    { name: "Safe Netting Cage", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary-neon)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>` },
    { name: "Locker Rooms & Showers", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary-neon)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v20"/><path d="M14 2v20"/><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="8" cy="12" r="1"/><circle cx="16" cy="12" r="1"/></svg>` },
    { name: "Covered Spectator Lounge", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary-neon)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10h20"/><path d="M5 10v6"/><path d="M19 10v6"/><path d="M2 16h20"/><path d="M6 16v4"/><path d="M18 16v4"/><rect x="5" y="4" width="14" height="6" rx="2"/></svg>` },
    { name: "On-site Cafeteria", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary-neon)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>` },
    { name: "Secure Parking", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary-neon)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>` },
    { name: "Mineral Water & Beverages", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary-neon)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a4 4 0 0 0 4-4c0-4-4-8-4-8s-4 4-4 8a4 4 0 0 0 4 4z"/></svg>` },
    { name: "First Aid Kit", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary-neon)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><path d="M9 14h6"/><path d="M12 11v6"/></svg>` }
  ],
  sports: [
    {
      id: "sport_football",
      name: "Football",
      image: "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800",
      pricePerHour: 1500,
      peakHourPrice: 1800,
      slots: ["06:00 AM", "07:00 AM", "08:00 AM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"]
    },
    {
      id: "sport_cricket",
      name: "Cricket",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
      pricePerHour: 1200,
      peakHourPrice: 1500,
      slots: ["06:00 AM", "07:00 AM", "09:00 AM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"]
    },
    {
      id: "sport_volleyball",
      name: "Volleyball",
      image: "https://images.pexels.com/photos/1263426/pexels-photo-1263426.jpeg?auto=compress&cs=tinysrgb&w=800",
      pricePerHour: 1000,
      peakHourPrice: 1200,
      slots: ["06:00 AM", "07:00 AM", "08:00 AM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM"]
    }
  ]
};

const AMENITIES_RENTALS = [
  { id: "addon-ball", name: "Pro Matchball", price: 150, desc: "+ ₹150 / match" },
  { id: "addon-bibs", name: "Set of Bibs (10x)", price: 200, desc: "+ ₹200 / match" },
  { id: "addon-water", name: "Mineral Water Box", price: 100, desc: "+ ₹100 / box" },
  { id: "addon-referee", name: "Book a Referee", price: 500, desc: "+ ₹500 / match" }
];
