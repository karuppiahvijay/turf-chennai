// Kick & Flick Turf - Application Controller
document.addEventListener("DOMContentLoaded", () => {
  // --- STATE ---
  let appState = {
    bookings: JSON.parse(localStorage.getItem("turfnet_kick_flick_bookings")) || [],
    selectedSport: KICK_AND_FLICK_DATA.sports[0], // default to first sport (Football)
    selectedDate: null, // format: { dayName: 'Mon', dayNum: '15', dateString: '2026-06-15' }
    selectedSlot: null
  };

  // --- THEME MANAGEMENT ---
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const currentTheme = localStorage.getItem("turf_theme") || "dark";
  
  if (currentTheme === "light") {
    document.body.classList.add("light-theme");
    if (themeToggleBtn) themeToggleBtn.textContent = "🌙";
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const isLight = document.body.classList.contains("light-theme");
      localStorage.setItem("turf_theme", isLight ? "light" : "dark");
      themeToggleBtn.textContent = isLight ? "🌙" : "☀️";
    });
  }

  // --- SPA ROUTER ---
  const routes = ["home", "sports", "book", "bookings"];
  
  function handleRouting() {
    let hash = window.location.hash.substring(1) || "home";
    if (!routes.includes(hash)) {
      hash = "home";
    }

    // Toggle active section
    document.querySelectorAll(".section").forEach(section => {
      section.classList.remove("active");
    });
    const activeSection = document.getElementById(`${hash}-section`);
    if (activeSection) {
      activeSection.classList.add("active");
    }

    // Toggle active nav links (desktop)
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${hash}`) {
        link.classList.add("active");
      }
    });

    // Toggle active nav links (mobile bottom bar)
    document.querySelectorAll(".mobile-nav-link").forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${hash}`) {
        link.classList.add("active");
      }
    });

    // Control visibility of about section on landing pages
    const aboutSection = document.getElementById("about-section");
    if (hash === "bookings") {
      aboutSection.style.display = "none";
    } else {
      aboutSection.style.display = "block";
    }

    // Page-specific initialization
    if (hash === "bookings") {
      renderBookingsDashboard();
    }

    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", handleRouting);
  
  // --- TOAST SYSTEM ---
  function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let icon = "ℹ️";
    if (type === "success") icon = "✅";
    if (type === "error") icon = "❌";

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add("show"), 10);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // --- INITIALIZE LANDING PAGE DATA ---
  function initLandingPage() {
    // Set Hero texts
    document.getElementById("hero-title").textContent = KICK_AND_FLICK_DATA.name;
    document.getElementById("hero-tagline").textContent = KICK_AND_FLICK_DATA.tagline;
    document.getElementById("hero-desc").textContent = KICK_AND_FLICK_DATA.description;
    document.getElementById("about-desc-paragraph").textContent = KICK_AND_FLICK_DATA.description;

    // Render Sports Offered cards
    const sportsContainer = document.getElementById("sports-cards-container");
    sportsContainer.innerHTML = KICK_AND_FLICK_DATA.sports
      .map((sport, idx) => `
        <div class="sport-card glass-panel reveal" style="transition-delay: ${idx * 0.15}s">
          <img src="${sport.image}" alt="${sport.name}" class="sport-card-img">
          <div class="sport-card-body">
            <h3>${sport.name}</h3>
            <div class="sport-price-tag">₹${sport.pricePerHour} / hour</div>
            <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 0.95rem; line-height: 1.4;">
              Play on our premium ${sport.name.includes("Sand") ? "sand pit" : "artificial turf"}. Complete with professional netting and stadium floodlights.
            </p>
            <a href="#book" class="btn btn-primary btn-sm select-sport-btn" data-sport-id="${sport.id}" style="align-self: flex-start; padding: 8px 16px; font-size: 0.9rem;">
              Book Court
            </a>
          </div>
        </div>
      `).join("");

    // Add click event to "Select & Book Court" buttons to switch sport and open scheduler
    document.querySelectorAll(".select-sport-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const sportId = e.currentTarget.dataset.sportId;
        const targetSport = KICK_AND_FLICK_DATA.sports.find(s => s.id === sportId);
        if (targetSport) {
          appState.selectedSport = targetSport;
          document.getElementById("booking-sport-select").value = targetSport.id;
          loadSportScheduler();
        }
      });
    });

    // Render Amenities icons
    const amenitiesContainer = document.getElementById("amenities-container");
    amenitiesContainer.innerHTML = KICK_AND_FLICK_DATA.amenities
      .map((amenity, idx) => `
        <div class="amenity-card glass-panel reveal" style="transition-delay: ${idx * 0.05}s; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; text-align: center; border-radius: var(--radius-md);">
          <span class="amenity-icon-large" style="font-size: 3rem; margin-bottom: 16px; filter: drop-shadow(0 0 10px rgba(250,204,21,0.5));">${amenity.icon}</span>
          <span style="font-weight: 600; font-size: 1rem; color: var(--text-primary); letter-spacing: 0.5px;">${amenity.name}</span>
        </div>
      `).join("");
  }

  // --- INITIALIZE SCHEDULER ---
  function initScheduler() {
    // 1. Populate Sport dropdown
    const sportSelect = document.getElementById("booking-sport-select");
    sportSelect.innerHTML = KICK_AND_FLICK_DATA.sports
      .map(sport => `<option value="${sport.id}">${sport.name}</option>`)
      .join("");
    
    sportSelect.value = appState.selectedSport.id;
    sportSelect.addEventListener("change", (e) => {
      const targetSport = KICK_AND_FLICK_DATA.sports.find(s => s.id === e.target.value);
      if (targetSport) {
        appState.selectedSport = targetSport;
        appState.selectedSlot = null; // Reset slot
        loadSportScheduler();
      }
    });

    // 2. Render Add-ons / Gear rentals checklist
    const addonsGrid = document.getElementById("booking-addons-container");
    addonsGrid.innerHTML = AMENITIES_RENTALS
      .map(addon => `
        <div>
          <input type="checkbox" id="${addon.id}" class="addon-card-input" data-price="${addon.price}">
          <label for="${addon.id}" class="addon-card-label">
            <span class="checkbox-dot"></span>
            <div class="addon-info">
              <span class="addon-title">${addon.name}</span>
              <span class="addon-price">${addon.desc}</span>
            </div>
          </label>
        </div>
      `).join("");

    // Bind change listener to addons to recalculate price
    document.querySelectorAll(".addon-card-input").forEach(chk => {
      chk.addEventListener("change", calculateBookingTotal);
    });

    // 3. Generate Dates
    generateBookingDatePicker();
  }

  function loadSportScheduler() {
    loadAvailableSlots();
    calculateBookingTotal();
  }

  function generateBookingDatePicker() {
    const picker = document.getElementById("booking-date-picker");
    picker.innerHTML = "";
    
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      
      const dayName = daysOfWeek[futureDate.getDay()];
      const dayNum = futureDate.getDate();
      const dateString = futureDate.toISOString().split("T")[0]; // YYYY-MM-DD
      
      const dateObj = { dayName, dayNum, dateString };
      
      if (i === 0) {
        appState.selectedDate = dateObj;
      }
      
      const pill = document.createElement("div");
      pill.className = `date-pill ${i === 0 ? "active" : ""}`;
      pill.innerHTML = `
        <div class="day">${dayName}</div>
        <div class="date-num">${dayNum}</div>
      `;
      
      pill.addEventListener("click", () => {
        document.querySelectorAll(".date-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        appState.selectedDate = dateObj;
        appState.selectedSlot = null; // Reset slot
        loadAvailableSlots();
        calculateBookingTotal();
      });
      
      picker.appendChild(pill);
    }
    
    loadSportScheduler();
  }

  function loadAvailableSlots() {
    const slotsGrid = document.getElementById("booking-slots-grid");
    slotsGrid.innerHTML = "";
    
    const sport = appState.selectedSport;
    const dateStr = appState.selectedDate.dateString;
    const mockSlots = sport.slots;
    
    mockSlots.forEach(slot => {
      const btn = document.createElement("button");
      btn.className = "slot-item-btn";
      btn.textContent = slot;
      
      // Check if slot is already booked for this sport and date
      const isAlreadyBooked = appState.bookings.some(b => 
        b.sportId === sport.id && 
        b.dateString === dateStr && 
        b.timeSlot === slot
      );

      if (isAlreadyBooked) {
        btn.classList.add("booked");
        btn.disabled = true;
      } else {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".slot-item-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          appState.selectedSlot = slot;
          calculateBookingTotal();
        });
      }
      
      slotsGrid.appendChild(btn);
    });
  }

  function calculateBookingTotal() {
    const sport = appState.selectedSport;
    if (!sport) return;
    
    let isPeak = false;
    let hourlyPrice = sport.pricePerHour;
    
    if (appState.selectedSlot) {
      const slotHour = parseInt(appState.selectedSlot.split(":")[0]);
      const isPM = appState.selectedSlot.includes("PM");
      
      // peak: 4:00 PM to 11:00 PM
      if (isPM && ((slotHour >= 4 && slotHour <= 11) || slotHour === 12)) {
        isPeak = true;
        hourlyPrice = sport.peakHourPrice || (sport.pricePerHour * 1.25);
      }
    }

    // Base price layout
    document.getElementById("summary-hourly-details").textContent = `Base Price (${isPeak ? "Peak Slot" : "Regular Slot"})`;
    document.getElementById("summary-base-price").textContent = `₹${hourlyPrice}`;
    
    // Addons calc
    let addonsTotal = 0;
    document.querySelectorAll(".addon-card-input:checked").forEach(chk => {
      addonsTotal += parseInt(chk.dataset.price);
    });

    const addonsRow = document.getElementById("summary-addons-row");
    if (addonsTotal > 0) {
      addonsRow.style.display = "flex";
      document.getElementById("summary-addons-price").textContent = `₹${addonsTotal}`;
    } else {
      addonsRow.style.display = "none";
    }

    // Total
    const total = hourlyPrice + addonsTotal;
    document.getElementById("summary-total-price").textContent = `₹${total}`;

    // Enable/Disable checkout button
    const payBtn = document.getElementById("booking-btn-pay-now");
    if (appState.selectedSlot && appState.selectedDate) {
      payBtn.disabled = false;
      payBtn.textContent = `Pay Simulated ₹${total}`;
    } else {
      payBtn.disabled = true;
      payBtn.textContent = "Select Time Slot";
    }
  }

  // Pay Action Binding
  const payBtn = document.getElementById("booking-btn-pay-now");
  payBtn.addEventListener("click", () => {
    // Check if user is logged in
    const auth = window.firebaseAuth;
    if (!auth || !auth.currentUser) {
      alert("You must be logged in to book a slot. Please login or register an account.");
      window.location.href = "login.html";
      return;
    }
    
    const slot = appState.selectedSlot;
    const sport = appState.selectedSport;
    const dateObj = appState.selectedDate;
    const userNameInput = document.getElementById("booking-user-name").value.trim();
    const userPhoneInput = document.getElementById("booking-user-phone").value.trim();
    
    if (!slot || !sport || !dateObj) return;
    
    if (!userNameInput || !userPhoneInput) {
      alert("Please provide your Full Name and Phone Number to complete the booking.");
      return;
    }
    
    // Calculate final price string and numeric value
    const finalPriceStr = document.getElementById("summary-total-price").textContent;
    const finalPriceNum = finalPriceStr.replace(/[^0-9]/g, '');
    const bookingId = "BK" + Math.floor(100000 + Math.random() * 900000);
    
    // Setup UPI Data
    const upiId = "thutu@ptyes";
    const payeeName = "Kick and Flick Turf";
    const upiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${finalPriceNum}.00&cu=INR&tn=Booking%20${bookingId}`;
    
    // Show Modal
    const upiModal = document.getElementById("upi-payment-modal");
    document.getElementById("upi-modal-amount").textContent = finalPriceStr;
    
    // Generate QR Code using QRServer API
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUri)}`;
    document.getElementById("upi-qr-code").src = qrImageUrl;
    
    // Setup Mobile App Link
    document.getElementById("upi-pay-app-btn").href = upiUri;
    
    upiModal.style.display = "flex";
    
    // Handle Cancel
    document.getElementById("close-upi-modal-btn").onclick = () => {
      upiModal.style.display = "none";
    };
    
    // Handle "I Have Paid"
    document.getElementById("upi-confirm-paid-btn").onclick = () => {
      const confirmBtn = document.getElementById("upi-confirm-paid-btn");
      confirmBtn.textContent = "Verifying...";
      confirmBtn.disabled = true;
      
      setTimeout(() => {
        // Gather addons
        const addons = [];
        document.querySelectorAll(".addon-card-input:checked").forEach(chk => {
          addons.push(chk.parentNode.querySelector(".addon-title").textContent);
        });
        
        const newBooking = {
          id: bookingId,
          userId: auth && auth.currentUser ? auth.currentUser.uid : "guest",
          userEmail: auth && auth.currentUser ? (auth.currentUser.email || auth.currentUser.phoneNumber || "Guest User") : "Guest",
          playerName: userNameInput,
          playerPhone: userPhoneInput,
          sportId: sport.id,
          sportName: sport.name,
          turfImage: sport.image,
          dateString: dateObj.dateString,
          dateDisplay: `${dateObj.dayName}, ${dateObj.dayNum} June 2026`,
          timeSlot: slot,
          addons: addons,
          amountPaid: finalPriceStr,
          status: "Pending Verification", // New status!
          bookingDate: new Date().toLocaleDateString()
        };
        
        appState.bookings.unshift(newBooking);
        localStorage.setItem("turfnet_kick_flick_bookings", JSON.stringify(appState.bookings));
        
        // Clear selections
        appState.selectedSlot = null;
        document.querySelectorAll(".addon-card-input").forEach(chk => chk.checked = false);
        document.getElementById("booking-user-name").value = "";
        document.getElementById("booking-user-phone").value = "";
        
        upiModal.style.display = "none";
        confirmBtn.textContent = "I Have Paid";
        confirmBtn.disabled = false;
        
        showToast(`Booking ${bookingId} submitted for verification!`, "success");
        
        loadSportScheduler();
        window.location.hash = "#bookings";
      }, 1500);
    };
  });

  // --- MY BOOKINGS DASHBOARD ---
  function renderBookingsDashboard() {
    const container = document.getElementById("bookings-dashboard-container");
    container.innerHTML = "";
    
    // Filter bookings by current user
    const currentUser = window.firebaseAuth && window.firebaseAuth.currentUser;
    const currentUserId = currentUser ? currentUser.uid : "guest";
    const userBookings = appState.bookings.filter(b => b.userId === currentUserId);
    
    if (userBookings.length === 0) {
      container.innerHTML = `
        <div class="empty-bookings-state glass-panel">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <h3>No Active Bookings</h3>
          <p>You haven't reserved any playing timeslots yet at Kick & Flick Turf. Reserve yours now!</p>
          <a href="#book" class="btn btn-primary">Book Court Now</a>
        </div>
      `;
      return;
    }

    const listWrapper = document.createElement("div");
    listWrapper.className = "bookings-list";

    userBookings.forEach(booking => {
      const card = document.createElement("div");
      card.className = "booking-item-card glass-panel";
      
      const addonsHTML = booking.addons.length > 0 
        ? `<div style="margin-top: 8px; font-size: 0.8rem;"><span style="color: var(--text-muted)">Gear/Rentals:</span> ${booking.addons.join(", ")}</div>` 
        : "";

      card.innerHTML = `
        <img src="${booking.turfImage}" alt="${booking.sportName}" class="booking-item-img">
        <div class="booking-item-content">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="badge badge-cyan">${booking.sportName}</span>
            <span class="badge" style="background: ${booking.status === 'Confirmed' ? '#22c55e' : '#f59e0b'}; color: white; border: none;">${booking.status}</span>
          </div>
          <h3>${KICK_AND_FLICK_DATA.name}</h3>
          <div class="booking-item-details">
            <div>📍 <strong>${KICK_AND_FLICK_DATA.area}</strong></div>
            <div>📅 <strong>${booking.dateDisplay}</strong></div>
            <div>⏰ <strong>${booking.timeSlot}</strong></div>
            <div>💰 <strong>${booking.amountPaid}</strong></div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Booking ID: ${booking.id}</div>
          </div>
          ${addonsHTML}
        </div>
        <div class="booking-item-actions">
          <button class="btn btn-secondary btn-sm cancel-booking-btn" data-id="${booking.id}" style="padding: 6px 12px; font-size: 0.8rem; color: var(--accent-red); border-color: rgba(239, 68, 68, 0.2)">
            Cancel Slot
          </button>
        </div>
      `;

      // Cancel button bind
      card.querySelector(".cancel-booking-btn").addEventListener("click", (e) => {
        const bookingId = e.target.dataset.id;
        if (confirm("Are you sure you want to cancel this booking?")) {
          appState.bookings = appState.bookings.filter(b => b.id !== bookingId);
          localStorage.setItem("turfnet_kick_flick_bookings", JSON.stringify(appState.bookings));
          showToast("Booking cancelled successfully", "error");
          renderBookingsDashboard();
          loadSportScheduler(); // refresh slots grid if we are on the booking section
        }
      });

      listWrapper.appendChild(card);
    });

    container.appendChild(listWrapper);
  }

  // --- PREMIUM SCROLL REVEAL (IntersectionObserver) ---
  function initScrollReveal() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with the 'reveal' class
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
      });
    }, 100);
  }

  // --- INITIALIZE APPLICATION ---
  initLandingPage();
  initScheduler();
  initScrollReveal();
  handleRouting(); // Initial routing setup
});
