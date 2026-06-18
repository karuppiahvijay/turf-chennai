// Dedicated data for Kick & Flick Arena - Ernavoor, Chennai
const KICK_AND_FLICK_DATA = {
  name: "Kick & Flick Arena",
  tagline: "Ernavoor's Premier Multi-Sport Turf",
  area: "Ernavoor, Chennai",
  rating: 4.8,
  reviewsCount: 382,
  description: "Welcome to Kick & Flick Arena, Ernavoor's ultimate sports destination. We feature professional-grade shock-absorption turf for Football and Box Cricket, alongside a premium floodlit Volleyball court. Open 24/7 with international-spec LED lighting, changing rooms, and viewing lounges.",
  locationUrl: "https://maps.google.com/?q=Ernavoor+Chennai",
  amenities: [
    { name: "Pro LED Floodlights", icon: "💡" },
    { name: "Safe Netting Cage", icon: "🕸️" },
    { name: "Locker Rooms & Showers", icon: "🚿" },
    { name: "Covered Spectator Lounge", icon: "🛋️" },
    { name: "On-site Cafeteria", icon: "☕" },
    { name: "Secure Parking", icon: "🚗" },
    { name: "Mineral Water & Beverages", icon: "🥤" },
    { name: "First Aid Kit", icon: "🩹" }
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
