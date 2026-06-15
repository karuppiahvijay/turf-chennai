// TurfNet Chennai Application Logic
document.addEventListener("DOMContentLoaded", () => {
  // --- STATE ---
  let appState = {
    bookings: JSON.parse(localStorage.getItem("turfnet_bookings")) || [],
    customTurfs: JSON.parse(localStorage.getItem("turfnet_custom_turfs")) || [],
    selectedTurf: null,
    selectedSport: "",
    selectedDate: null, // format: { dayName: 'Mon', dayNum: '15', dateString: '2026-06-15' }
    selectedSlot: null,
    activeFilters: {
      search: "",
      area: "All Areas",
      sports: [],
      maxPrice: 3000,
      amenities: []
    }
  };

  // Merge default mock data with custom user-added turfs
  function getFullTurfList() {
    return [...TURF_DATA, ...appState.customTurfs];
  }

  // --- SPA ROUTER ---
  const routes = ["home", "explore", "bookings", "host"];
  
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

    // Toggle active nav links
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${hash}`) {
        link.classList.add("active");
      }
    });

    // Page-specific initialization
    if (hash === "explore") {
      renderFilters();
      renderTurfs();
    } else if (hash === "bookings") {
      renderBookingsDashboard();
    } else if (hash === "home") {
      updateHomeStats();
    }

    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", handleRouting);
  // Initial routing
  handleRouting();

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
    
    // Trigger animation
    setTimeout(() => toast.classList.add("show"), 10);

    // Remove toast
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // --- HOME PAGE STATS ---
  function updateHomeStats() {
    const totalTurfs = getFullTurfList().length;
    const slotsCount = 1240 + (appState.bookings.length * 3);
    
    document.getElementById("stat-turfs-count").textContent = `${totalTurfs}+`;
    document.getElementById("stat-slots-booked").textContent = slotsCount.toLocaleString();
  }

  // --- RENDER SIDEBAR FILTERS ---
  function renderFilters() {
    // 1. Locations dropdown
    const areaSelect = document.getElementById("filter-area");
    if (areaSelect.children.length === 0) {
      CHENNAI_AREAS.forEach(area => {
        const option = document.createElement("option");
        option.value = area;
        option.textContent = area;
        areaSelect.appendChild(option);
      });
      areaSelect.value = appState.activeFilters.area;
      areaSelect.addEventListener("change", (e) => {
        appState.activeFilters.area = e.target.value;
        renderTurfs();
      });
    }

    // 2. Sports checkboxes
    const sportsContainer = document.getElementById("filter-sports-container");
    if (sportsContainer.children.length === 0) {
      SPORTS_LIST.forEach((sport, index) => {
        if (sport === "All Sports") return;
        
        const wrapper = document.createElement("div");
        const id = `sport-chk-${index}`;
        
        wrapper.innerHTML = `
          <input type="checkbox" id="${id}" class="pill-checkbox" value="${sport}">
          <label for="${id}" class="pill-label">${sport}</label>
        `;
        
        const chk = wrapper.querySelector("input");
        chk.addEventListener("change", (e) => {
          if (e.target.checked) {
            appState.activeFilters.sports.push(e.target.value);
          } else {
            appState.activeFilters.sports = appState.activeFilters.sports.filter(s => s !== e.target.value);
          }
          renderTurfs();
        });
        
        sportsContainer.appendChild(wrapper);
      });
    }

    // 3. Price slider
    const priceSlider = document.getElementById("filter-price-range");
    const priceValue = document.getElementById("price-range-value");
    priceSlider.value = appState.activeFilters.maxPrice;
    priceValue.textContent = `₹${appState.activeFilters.maxPrice}`;
    
    // Single event listener bound once
    if (!priceSlider.dataset.bound) {
      priceSlider.addEventListener("input", (e) => {
        appState.activeFilters.maxPrice = parseInt(e.target.value);
        priceValue.textContent = `₹${e.target.value}`;
        renderTurfs();
      });
      priceSlider.dataset.bound = "true";
    }

    // 4. Amenities checkboxes
    const amenitiesContainer = document.getElementById("filter-amenities-container");
    if (amenitiesContainer.children.length === 0) {
      AMENITIES_LIST.forEach((amenity, index) => {
        const wrapper = document.createElement("div");
        const id = `amenity-chk-${index}`;
        
        wrapper.innerHTML = `
          <input type="checkbox" id="${id}" class="pill-checkbox" value="${amenity}">
          <label for="${id}" class="pill-label">${amenity}</label>
        `;
        
        const chk = wrapper.querySelector("input");
        chk.addEventListener("change", (e) => {
          if (e.target.checked) {
            appState.activeFilters.amenities.push(e.target.value);
          } else {
            appState.activeFilters.amenities = appState.activeFilters.amenities.filter(a => a !== e.target.value);
          }
          renderTurfs();
        });
        
        amenitiesContainer.appendChild(wrapper);
      });
    }

    // 5. Search bar input binding
    const searchInput = document.getElementById("explore-search");
    if (!searchInput.dataset.bound) {
      searchInput.addEventListener("input", (e) => {
        appState.activeFilters.search = e.target.value.toLowerCase().trim();
        renderTurfs();
      });
      searchInput.dataset.bound = "true";
    }

    // Reset filters button
    const btnReset = document.getElementById("btn-reset-filters");
    if (!btnReset.dataset.bound) {
      btnReset.addEventListener("click", () => {
        appState.activeFilters = {
          search: "",
          area: "All Areas",
          sports: [],
          maxPrice: 3000,
          amenities: []
        };
        
        // Reset sidebar inputs visually
        areaSelect.value = "All Areas";
        document.querySelectorAll(".filters-sidebar input[type='checkbox']").forEach(chk => chk.checked = false);
        priceSlider.value = 3000;
        priceValue.textContent = "₹3000";
        searchInput.value = "";
        
        showToast("Filters reset successfully", "info");
        renderTurfs();
      });
      btnReset.dataset.bound = "true";
    }
  }

  // --- RENDER TURF CARDS ---
  function renderTurfs() {
    const grid = document.getElementById("turf-cards-grid");
    grid.innerHTML = "";
    
    const filters = appState.activeFilters;
    const filteredTurfs = getFullTurfList().filter(turf => {
      // 1. Search Query
      if (filters.search) {
        const query = filters.search;
        const nameMatch = turf.name.toLowerCase().includes(query);
        const areaMatch = turf.area.toLowerCase().includes(query);
        const sportsMatch = turf.sports.some(s => s.toLowerCase().includes(query));
        if (!nameMatch && !areaMatch && !sportsMatch) return false;
      }
      
      // 2. Area Filter
      if (filters.area !== "All Areas" && turf.area !== filters.area) {
        return false;
      }

      // 3. Price Filter (matches hourly base price)
      if (turf.pricePerHour > filters.maxPrice) {
        return false;
      }

      // 4. Sports Filter (all selected sports must be offered)
      if (filters.sports.length > 0) {
        const hasAllSelectedSports = filters.sports.every(selectedSport => 
          turf.sports.includes(selectedSport)
        );
        if (!hasAllSelectedSports) return false;
      }

      // 5. Amenities Filter (all selected amenities must be offered)
      if (filters.amenities.length > 0) {
        const hasAllSelectedAmenities = filters.amenities.every(selectedAmenity => 
          turf.amenities.includes(selectedAmenity)
        );
        if (!hasAllSelectedAmenities) return false;
      }

      return true;
    });

    if (filteredTurfs.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 0; color: var(--text-muted);">
          <p style="font-size: 1.25rem; margin-bottom: 8px;">No turfs match your filter selection.</p>
          <button class="btn btn-secondary btn-sm" id="empty-state-reset">Reset Filters</button>
        </div>
      `;
      const btn = document.getElementById("empty-state-reset");
      if (btn) {
        btn.addEventListener("click", () => document.getElementById("btn-reset-filters").click());
      }
      return;
    }

    filteredTurfs.forEach(turf => {
      const card = document.createElement("div");
      card.className = "turf-card glass-panel";
      
      // Get sport tag templates
      const sportsTagsHTML = turf.sports
        .map(sport => `<span class="sport-tag">${sport}</span>`)
        .join("");
        
      card.innerHTML = `
        <div class="turf-image-container">
          <img class="turf-card-image" src="${turf.image}" alt="${turf.name}" onerror="this.src='assets/images/turf_football.png'">
          <span class="badge badge-neon turf-card-badge">Verified</span>
        </div>
        <div class="turf-info">
          <div class="turf-meta">
            <span class="turf-location">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${turf.area}
            </span>
            <span class="turf-rating">
              <span class="rating-star">★</span> ${turf.rating}
            </span>
          </div>
          <h3>${turf.name}</h3>
          <div class="turf-sports-tags">
            ${sportsTagsHTML}
          </div>
          <div class="turf-pricing-footer">
            <div class="price-text">Hourly price</div>
            <div class="price-amount">₹${turf.pricePerHour}</div>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        openTurfDetails(turf);
      });

      grid.appendChild(card);
    });
  }

  // --- TURF DETAILS MODAL ---
  function openTurfDetails(turf) {
    appState.selectedTurf = turf;
    
    document.getElementById("detail-turf-name").textContent = turf.name;
    document.getElementById("detail-turf-image").src = turf.image;
    document.getElementById("detail-turf-image").onerror = function() {
      this.src = "assets/images/turf_football.png";
    };
    document.getElementById("detail-turf-location").textContent = turf.area;
    document.getElementById("detail-turf-rating").textContent = `★ ${turf.rating} (${turf.reviewsCount} reviews)`;
    document.getElementById("detail-turf-price").textContent = `₹${turf.pricePerHour} / hr`;
    document.getElementById("detail-turf-description").textContent = turf.description;
    
    // Amenities tags
    const amenitiesGrid = document.getElementById("detail-turf-amenities");
    amenitiesGrid.innerHTML = turf.amenities
      .map(amenity => `
        <div class="detail-amenity-item">
          <span class="detail-amenity-icon">✓</span>
          <span>${amenity}</span>
        </div>
      `).join("");

    // Map link
    const mapBtn = document.getElementById("detail-turf-map-link");
    mapBtn.href = turf.locationUrl || `https://maps.google.com/?q=${encodeURIComponent(turf.name + " Chennai")}`;

    // Book Now modal trigger
    const bookNowBtn = document.getElementById("detail-btn-book-now");
    bookNowBtn.onclick = () => {
      closeModal("turf-detail-modal");
      openBookingSimulator(turf);
    };

    openModal("turf-detail-modal");
  }

  // --- BOOKING SIMULATOR MODAL ---
  function openBookingSimulator(turf) {
    appState.selectedTurf = turf;
    appState.selectedSlot = null;
    appState.selectedSport = turf.sports[0];
    
    // Set text details
    document.getElementById("booking-modal-turf-name").textContent = turf.name;
    
    // Load sports category picker
    const sportSelect = document.getElementById("booking-sport-select");
    sportSelect.innerHTML = turf.sports
      .map(sport => `<option value="${sport}">${sport}</option>`)
      .join("");
    
    sportSelect.value = appState.selectedSport;
    sportSelect.onchange = (e) => {
      appState.selectedSport = e.target.value;
    };

    // Date picker rendering (generate next 7 days starting today)
    generateBookingDatePicker();
    
    // Clear add-ons
    document.querySelectorAll(".addon-card-input").forEach(chk => {
      chk.checked = false;
      chk.onchange = () => calculateBookingTotal();
    });

    calculateBookingTotal();
    openModal("booking-simulator-modal");
  }

  function generateBookingDatePicker() {
    const picker = document.getElementById("booking-date-picker");
    picker.innerHTML = "";
    
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    
    // Generate dates
    for (let i = 0; i < 7; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      
      const dayName = daysOfWeek[futureDate.getDay()];
      const dayNum = futureDate.getDate();
      const dateString = futureDate.toISOString().split("T")[0]; // YYYY-MM-DD
      
      const dateObj = { dayName, dayNum, dateString };
      
      // Default select the first date (today)
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
        appState.selectedSlot = null; // Reset slot on date change
        loadAvailableSlots();
        calculateBookingTotal();
      });
      
      picker.appendChild(pill);
    }
    
    loadAvailableSlots();
  }

  function loadAvailableSlots() {
    const slotsGrid = document.getElementById("booking-slots-grid");
    slotsGrid.innerHTML = "";
    
    const turf = appState.selectedTurf;
    const dateStr = appState.selectedDate.dateString;
    
    // Find all simulated slots that this turf supports
    const mockSlots = turf.slots || ["06:00 AM", "07:00 AM", "08:00 AM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"];
    
    mockSlots.forEach(slot => {
      const btn = document.createElement("button");
      btn.className = "slot-item-btn";
      btn.textContent = slot;
      
      // Check if this slot has already been booked by the user in this session
      const isAlreadyBooked = appState.bookings.some(b => 
        b.turfId === turf.id && 
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
    const turf = appState.selectedTurf;
    if (!turf) return;
    
    // Check if peak hour slot is selected (simulated peak hours between 4PM and 10PM)
    let isPeak = false;
    let hourlyPrice = turf.pricePerHour;
    
    if (appState.selectedSlot) {
      const slotHour = parseInt(appState.selectedSlot.split(":")[0]);
      const isPM = appState.selectedSlot.includes("PM");
      
      // peak: 4:00 PM to 10:00 PM (16:00 to 22:00)
      if (isPM && ((slotHour >= 4 && slotHour <= 10) || slotHour === 12)) {
        isPeak = true;
        hourlyPrice = turf.peakHourPrice || (turf.pricePerHour * 1.2);
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
    const turf = appState.selectedTurf;
    const dateObj = appState.selectedDate;
    const slot = appState.selectedSlot;
    const sport = appState.selectedSport;
    
    if (!turf || !dateObj || !slot) return;
    
    // Disable pay button and show processing loading
    payBtn.disabled = true;
    payBtn.textContent = "Processing Payment...";
    
    // Add simulated checkout delay
    setTimeout(() => {
      // Gather addons
      const addons = [];
      document.querySelectorAll(".addon-card-input:checked").forEach(chk => {
        addons.push(chk.parentNode.querySelector(".addon-title").textContent);
      });
      
      // Calculate final total paid
      const finalPrice = document.getElementById("summary-total-price").textContent;
      
      // Save new booking object
      const newBooking = {
        id: "BK" + Math.floor(100000 + Math.random() * 900000),
        turfId: turf.id,
        turfName: turf.name,
        turfImage: turf.image,
        area: turf.area,
        sport: sport,
        dateString: dateObj.dateString,
        dateDisplay: `${dateObj.dayName}, ${dateObj.dayNum} June 2026`,
        timeSlot: slot,
        addons: addons,
        amountPaid: finalPrice,
        status: "Confirmed",
        bookingDate: new Date().toLocaleDateString()
      };
      
      appState.bookings.unshift(newBooking);
      localStorage.setItem("turfnet_bookings", JSON.stringify(appState.bookings));
      
      closeModal("booking-simulator-modal");
      showToast(`Booking Confirmed! Slot: ${slot} at ${turf.name}`, "success");
      
      // Redirect to Bookings list
      window.location.hash = "#bookings";
    }, 1500);
  });

  // --- MY BOOKINGS DASHBOARD ---
  function renderBookingsDashboard() {
    const container = document.getElementById("bookings-dashboard-container");
    container.innerHTML = "";
    
    if (appState.bookings.length === 0) {
      container.innerHTML = `
        <div class="empty-bookings-state glass-panel">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <h3>No Bookings Yet</h3>
          <p>You haven't booked any turf slots yet. Explore venues across Chennai and play today!</p>
          <a href="#explore" class="btn btn-primary">Find a Pitch</a>
        </div>
      `;
      return;
    }

    const listWrapper = document.createElement("div");
    listWrapper.className = "bookings-list";

    appState.bookings.forEach(booking => {
      const card = document.createElement("div");
      card.className = "booking-item-card glass-panel";
      
      const addonsHTML = booking.addons.length > 0 
        ? `<div style="margin-top: 8px; font-size: 0.8rem;"><span style="color: var(--text-muted)">Gear/Rentals:</span> ${booking.addons.join(", ")}</div>` 
        : "";

      card.innerHTML = `
        <img src="${booking.turfImage}" alt="${booking.turfName}" class="booking-item-img" onerror="this.src='assets/images/turf_football.png'">
        <div class="booking-item-content">
          <span class="badge badge-cyan" style="margin-bottom: 8px;">${booking.sport}</span>
          <h3>${booking.turfName}</h3>
          <div class="booking-item-details">
            <div>📍 <strong>${booking.area}</strong></div>
            <div>📅 <strong>${booking.dateDisplay}</strong></div>
            <div>⏰ <strong class="neon-text">${booking.timeSlot}</strong></div>
          </div>
          ${addonsHTML}
        </div>
        <div class="booking-item-actions">
          <span class="badge badge-neon">CONFIRMED</span>
          <div style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${booking.amountPaid}</div>
          <button class="btn btn-secondary btn-sm cancel-booking-btn" data-id="${booking.id}" style="padding: 6px 12px; font-size: 0.8rem; color: var(--accent-red); border-color: rgba(239, 68, 68, 0.2)">
            Cancel Slot
          </button>
        </div>
      `;

      // Cancel button bind
      card.querySelector(".cancel-booking-btn").addEventListener("click", (e) => {
        const bookingId = e.target.dataset.id;
        if (confirm("Are you sure you want to cancel this booking? (Simulated refund will be processed)")) {
          appState.bookings = appState.bookings.filter(b => b.id !== bookingId);
          localStorage.setItem("turfnet_bookings", JSON.stringify(appState.bookings));
          showToast("Booking cancelled successfully", "error");
          renderBookingsDashboard();
        }
      });

      listWrapper.appendChild(card);
    });

    container.appendChild(listWrapper);
  }

  // --- HOST A TURF FORM SUBMISSION ---
  const hostSportsContainer = document.getElementById("host-sports-list");
  const hostAmenitiesContainer = document.getElementById("host-amenities-list");

  // Populate form checklist pills dynamically
  SPORTS_LIST.forEach((sport, index) => {
    if (sport === "All Sports") return;
    const div = document.createElement("div");
    div.innerHTML = `
      <input type="checkbox" id="host-sport-${index}" class="pill-checkbox host-sport-chk" value="${sport}">
      <label for="host-sport-${index}" class="pill-label">${sport}</label>
    `;
    hostSportsContainer.appendChild(div);
  });

  AMENITIES_LIST.forEach((amenity, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <input type="checkbox" id="host-amenity-${index}" class="pill-checkbox host-amenity-chk" value="${amenity}">
      <label for="host-amenity-${index}" class="pill-label">${amenity}</label>
    `;
    hostAmenitiesContainer.appendChild(div);
  });

  const hostForm = document.getElementById("host-turf-form");
  hostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("host-name").value.trim();
    const area = document.getElementById("host-area").value;
    const price = parseInt(document.getElementById("host-price").value);
    const description = document.getElementById("host-description").value.trim();
    const mapUrl = document.getElementById("host-map").value.trim();
    
    // Gather selected sports
    const selectedSports = [];
    document.querySelectorAll(".host-sport-chk:checked").forEach(chk => {
      selectedSports.push(chk.value);
    });
    
    // Gather selected amenities
    const selectedAmenities = [];
    document.querySelectorAll(".host-amenity-chk:checked").forEach(chk => {
      selectedAmenities.push(chk.value);
    });

    // Form validations
    if (selectedSports.length === 0) {
      showToast("Please select at least one sport category offered.", "error");
      return;
    }

    if (!area) {
      showToast("Please select a location area.", "error");
      return;
    }

    // Create a new Turf Object
    const newTurf = {
      id: "cust_" + Date.now(),
      name: name,
      area: area,
      image: "assets/images/turf_football.png", // Defaults to football image
      sports: selectedSports,
      rating: 5.0,
      reviewsCount: 1,
      pricePerHour: price,
      peakHourPrice: Math.round(price * 1.25),
      amenities: selectedAmenities.length > 0 ? selectedAmenities : ["Floodlights", "Drinking Water"],
      description: description,
      locationUrl: mapUrl || `https://maps.google.com/?q=${encodeURIComponent(name + " " + area + " Chennai")}`,
      slots: ["06:00 AM", "07:00 AM", "08:00 AM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"]
    };

    // Save state
    appState.customTurfs.push(newTurf);
    localStorage.setItem("turfnet_custom_turfs", JSON.stringify(appState.customTurfs));
    
    showToast(`Successfully registered "${name}" in ${area}!`, "success");
    
    // Reset Form
    hostForm.reset();
    document.querySelectorAll("#host-turf-form input[type='checkbox']").forEach(chk => chk.checked = false);
    
    // Redirect to Explore list to see it
    window.location.hash = "#explore";
  });
});

// --- MODAL UTILITIES ---
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Re-enable background scroll
  }
}
