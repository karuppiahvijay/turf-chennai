const TURF_DATA = [
  {
    id: "t1",
    name: "The Arena",
    area: "Nungambakkam",
    image: "https://images.unsplash.com/photo-1577223625856-745524fb081b?auto=format&fit=crop&w=800&q=80", // Premium floodlit football turf
    sports: ["Football (5v5)", "Football (7v7)", "Box Cricket"],
    rating: 4.8,
    reviewsCount: 240,
    pricePerHour: 1500,
    peakHourPrice: 1800,
    amenities: ["Floodlights", "Parking", "Locker Rooms", "Cafeteria", "Drinking Water"],
    description: "Experience professional-grade turf in the heart of Chennai. The Arena offers high-quality shock-absorption artificial grass, top-tier LED floodlights, and a comfortable seating lounge for spectators.",
    locationUrl: "https://maps.google.com/?q=Nungambakkam+Chennai",
    slots: ["06:00 AM", "07:00 AM", "08:00 AM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"]
  },
  {
    id: "t2",
    name: "Kickoff Turf",
    area: "Adyar",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80", // Outdoor football pitch evening
    sports: ["Football (7v7)", "Football (11v11)", "Sand Volleyball"],
    rating: 4.6,
    reviewsCount: 185,
    pricePerHour: 1800,
    peakHourPrice: 2200,
    amenities: ["Floodlights", "Parking", "Showers", "Cafeteria", "First Aid"],
    description: "Adyar's favorite destination for massive football matches. Kickoff Turf is one of the few places in Chennai with a FIFA-approved 7v7 and 11v11 layout. Premium turf fibers ensure minimal injuries.",
    locationUrl: "https://maps.google.com/?q=Adyar+Chennai",
    slots: ["05:00 AM", "06:00 AM", "07:00 AM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM"]
  },
  {
    id: "t3",
    name: "Turf 137",
    area: "Velachery",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80", // Professional cricket pitch/nets
    sports: ["Box Cricket", "Cricket Nets"],
    rating: 4.5,
    reviewsCount: 150,
    pricePerHour: 1200,
    peakHourPrice: 1500,
    amenities: ["Floodlights", "Parking", "Drinking Water", "Restrooms"],
    description: "Located near Velachery bypass, Turf 137 is perfect for high-octane box cricket and net practice sessions. Features a high ceiling net for unlimited cricket boundaries and bowling run-ups.",
    locationUrl: "https://maps.google.com/?q=Velachery+Chennai",
    slots: ["06:00 AM", "07:00 AM", "09:00 AM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"]
  },
  {
    id: "t4",
    name: "Game On Arena",
    area: "Anna Nagar",
    image: "https://images.unsplash.com/photo-1592656094267-764a45028570?auto=format&fit=crop&w=800&q=80", // Beach volleyball court floodlit
    sports: ["Indoor Volleyball", "Sand Volleyball", "Football (5v5)"],
    rating: 4.7,
    reviewsCount: 310,
    pricePerHour: 1600,
    peakHourPrice: 2000,
    amenities: ["Floodlights", "Indoor AC", "Parking", "Showers", "Cafeteria", "Equipment Rental"],
    description: "A premier multi-sport destination in Anna Nagar. Offers custom synthetic indoor volleyball courts, outdoor sand volleyball courts, and a premium 5v5 football pitch. Fully equipped with equipment rental options.",
    locationUrl: "https://maps.google.com/?q=Anna+Nagar+Chennai",
    slots: ["05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM"]
  },
  {
    id: "t5",
    name: "Tiki Taka Rooftop",
    area: "T. Nagar",
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80", // Rooftop view soccer pitch
    sports: ["Football (5v5)", "Box Cricket"],
    rating: 4.9,
    reviewsCount: 420,
    pricePerHour: 2000,
    peakHourPrice: 2500,
    amenities: ["Floodlights", "Parking", "Rooftop Lounge", "Showers", "Drinking Water", "Music System"],
    description: "Chennai's premium rooftop sporting experience. Play under the stars with a panoramic view of the T. Nagar skyline. Features professional safety nets, sound system, and a luxurious viewing deck.",
    locationUrl: "https://maps.google.com/?q=T+Nagar+Chennai",
    slots: ["06:00 AM", "07:00 AM", "08:00 AM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM", "12:00 AM"]
  },
  {
    id: "t6",
    name: "ECR Sports Hub",
    area: "ECR",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80", // Large grass field under sunset sky
    sports: ["Sand Volleyball", "Football (11v11)", "Box Cricket"],
    rating: 4.4,
    reviewsCount: 95,
    pricePerHour: 2200,
    peakHourPrice: 2800,
    amenities: ["Floodlights", "Parking", "Beach View", "Cafeteria", "Changing Rooms", "Swimming Pool Access"],
    description: "Located on the scenic East Coast Road, this massive sports hub features professional sand volleyball courts and massive grass pitches. The sea breeze and premium layouts make it a favorite for weekend matches.",
    locationUrl: "https://maps.google.com/?q=East+Coast+Road+Chennai",
    slots: ["05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"]
  }
];

const CHENNAI_AREAS = [
  "All Areas",
  "Nungambakkam",
  "Adyar",
  "Velachery",
  "Anna Nagar",
  "T. Nagar",
  "ECR"
];

const SPORTS_LIST = [
  "All Sports",
  "Football (5v5)",
  "Football (7v7)",
  "Football (11v11)",
  "Box Cricket",
  "Cricket Nets",
  "Sand Volleyball",
  "Indoor Volleyball"
];

const AMENITIES_LIST = [
  "Floodlights",
  "Parking",
  "Locker Rooms",
  "Cafeteria",
  "Drinking Water",
  "Showers",
  "First Aid",
  "Indoor AC",
  "Rooftop Lounge",
  "Equipment Rental"
];
