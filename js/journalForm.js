import { countries } from "./countries.js";
import { pushState, STATES } from "./states.js";
import { viewTripEntry } from "./tripEntry.js";

export function dropdown() {
  const btn = document.querySelector(".dropbtn");
  const menu = document.getElementById("myDropdown");

  if (!btn || !menu) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("show");
  });

  window.addEventListener("click", () => {
    menu.classList.remove("show");
  });
}

export function logData() {
    const userData = JSON.parse(localStorage.getItem("travelJournalUser"));

    //REDIRECT IF NOT LOGGED IN
    if (!userData || !userData.loggedIn) {
      window.location.href = "register.html?form=login";
    } else {
      document.querySelectorAll(".username").forEach(el => {
        el.textContent = userData.username
      })
    }

    // LOGOUT
    document.querySelectorAll(".logout").forEach(button => 
      { button.addEventListener("click", () => {
      const updated = { ...userData, loggedIn: false };
      localStorage.setItem("travelJournalUser", JSON.stringify(updated));
      window.location.href = "register.html?form=login";
})})
};

export function enterData(){
  
    const addBtn = document.querySelector(".add-btn");
    const entryFormSection = document.getElementById("entry-form");
    const addEntrySection = document.getElementById("add-entry");
  
    addBtn?.addEventListener("click", () => {
      addEntrySection.style.display = "none";
      // viewTripEntry()
      entryFormSection.style.display = "block";
      entryFormSection.innerHTML = buildFormHTML();
      countryPopu();
      locationAlert();
      setupFormEvents();
    });
  }  
    function buildFormHTML() {
      return `
        <form id="journal-entry-form">
          <input type="text" id="title" placeholder="Trip Title" />
          <input type="text" id="place" placeholder="Place" />
  
          <select id="type">
            <option value="" hidden>Travel Type</option>
            <option value="Adventure">Adventure</option>
            <option value="Leisure">Leisure</option>
            <option value="Business">Business</option>
            <option value="Cultural">Cultural</option>
            <option value="Solo">Solo</option>
            <option value="Family">Family</option>
            <option value="Romantic">Romantic</option>
            <option value="Backpacking">Backpacking</option>
            <option value="Road Trip">Road Trip</option>
            <option value="Eco-Tourism">Eco-Tourism</option>
            <option value="Religious">Religious</option>
            <option value="Wellness/Retreat">Wellness/Retreat</option>
            <option value="Cruise">Cruise</option>
            <option value="Volunteer/Humanitarian">Volunteer/Humanitarian</option>
            <option value="Group Tour">Group Tour</option>
            <option value="Weekend Getaway">Weekend Getaway</option>
            <option value="Festival/Event">Festival/Event</option>
            <option value="Study/Exchange Program">Study/Exchange Program</option>
            <option value="Staycation">Staycation</option>
            <option value="Other">Other</option>
          </select>
  
          <select id="country">
            <option value="" hidden>Select Country</option> 
          </select>
  
          <div class="date-box">
            <input type="date" id="start-date" required />
            <label for="start-date">Start Date</label>
          </div>

          <div class="date-box">
            <input type="date" id="end-date" required />
            <label for="end-date">End Date</label>
          </div>

          <div title="Click the Google Icon to go to Google maps, Search for your location and click on share to get the link" class="location-box">
            <input type="text" id="location" placeholder="Location Link" />
            <a href="https://maps.google.com" target="_blank"><i class="bxl bx-google"></i></a>
          </div>
          
          <input type="text" id="tag" placeholder="Tags (comma-separated)" />
  
          <textarea id="description" placeholder="Short Description"></textarea>
          <textarea id="story" placeholder="Full Story" rows="8"></textarea>
  
          <label for="main-image" class="file-label" id="image-label-main">Main Image</label>
          <input type="file" id="main-image" accept="image/*" hidden />

          <label for="images" class="file-label" id="image-label-gallery">Upload Other Photos</label>
          <input type="file" id="images" accept="image/*" hidden multiple />
          <div id="preview-container"></div>
  
          <div class="major-btn">
            <button type="button" id="back"><i class="material-symbols-outlined">arrow_back</i> Back</button>
            <button type="button" id="cancel"><i class="material-symbols-outlined">close</i> Cancel</button>
            <button type="submit" id="save"><i class="material-symbols-outlined">save</i> Save Entry</button>
          </div>
        </form>
      `;
    }

    function locationAlert() {
      const locationInput = document.getElementById("location");
      let alerted = false;
      locationInput?.addEventListener("click", () => {
        if (!alerted) {
          alert("To get a location link, open Google Maps, search your place, click on share and copy the link into this field.");
          alerted = true;
        }
      });

    }

    function countryPopu() {
      const countrySelect = document.getElementById('country');

      for (let country of countries) {
        const option = document.createElement("option");
        option.text = country;
        option.value = country;
        countrySelect.appendChild(option);
      }
    }
  
    function setupFormEvents() {
      const form = document.getElementById("journal-entry-form");
      const cancelBtn = document.getElementById("cancel");
      const backBtn = document.getElementById("back")
    
      const mainImageInput = document.getElementById("main-image");
      const galleryInput = document.getElementById("images");
      const previewContainer = document.getElementById("preview-container");
    
      const imageLabelMain = document.querySelector('label[for="main-image"]');
      const imageLabelGallery = document.querySelector('label[for="images"]');

      const entryFormSection = document.getElementById("entry-form");
      const addEntrySection = document.getElementById("add-entry");
    
      // Optional preview of main image and gallery
      mainImageInput?.addEventListener("change", () => {
        const file = mainImageInput.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            previewContainer.innerHTML = `
              <p><strong>Main Image:</strong></p>
              <img src="${e.target.result}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 8px;" />
              <p><strong>Gallery:</strong></p>
            `;
          };
          reader.readAsDataURL(file);
          imageLabelMain.textContent = "1 image selected (cover)";
        }
      });
    
      galleryInput?.addEventListener("change", () => {
        const files = Array.from(galleryInput.files);
        imageLabelGallery.textContent = `${files.length} image${files.length > 1 ? "s" : ""} selected`;
    
        files.forEach(file => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.width = "100px";
            img.style.height = "100px";
            img.style.objectFit = "cover";
            img.style.marginRight = "8px";
            img.style.borderRadius = "6px";
            img.style.border = "1px solid #ccc";
            previewContainer.appendChild(img);
          };
          reader.readAsDataURL(file);
        });
      });

    function resetForm() {
      form.reset();
      previewContainer.innerHTML = "";
      imageLabelMain.textContent = "Main Image";
      imageLabelGallery.textContent = "Upload Other Photos";
      entryFormSection.style.display = "none";
      viewTripEntry();
      alert("Entry saved!");
    }
      form?.addEventListener("submit", async (e) => {
        e.preventDefault();
    
        const entry = {
          id: Date.now(),
          title: form.title.value.trim(),
          place: form.place.value.trim(),
          type: form.type.value,
          country: form.country.value.toUpperCase(),
          startDate: form["start-date"].value,
          endDate: form["end-date"].value,
          location: form.location.value.trim(),
          tags: form.tag.value
                              .split(",")
                              .map(tag => tag.trim())
                              .filter(Boolean)
                              .map(tag => (tag.startsWith("#") ? tag : `#${tag}`)),
          description: form.description.value.trim(),
          story: form.story.value.trim(),
          mainImage: await convertSingleToBase64(mainImageInput.files[0]),
          images: await convertMultipleToBase64(galleryInput.files),
          createdAt: new Date().toISOString()
        };
    
        const saved = JSON.parse(localStorage.getItem("journalEntries")) || [];
        saved.push(entry);
        localStorage.setItem("journalEntries", JSON.stringify(saved));
        resetForm()
      
      });
    
      cancelBtn?.addEventListener("click", () => {
        form.reset();
        previewContainer.innerHTML = "";
        imageLabelMain.textContent = "Main Image";
        imageLabelGallery.textContent = "Upload Other Photos";
      });
    
      backBtn?.addEventListener("click", () => {
        const resolved = JSON.parse(localStorage.getItem("journalEntries")) || [];
    
        form.reset();
        previewContainer.innerHTML = "";
        imageLabelMain.textContent = "Main Image";
        imageLabelGallery.textContent = "Upload Other Photos";
    
        if (resolved.length === 0) {
          addEntrySection.style.display = "flex";
          entryFormSection.style.display = "none";
        } else {
          entryFormSection.style.display = "none";
          viewTripEntry();
        }
      });

      
      function convertSingleToBase64(file) {
        return new Promise((resolve, reject) => {
          if (!file) return resolve(null);
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }
    
      function convertMultipleToBase64(files) {
        return Promise.all(
          Array.from(files).map(file => convertSingleToBase64(file))
        );
      }
    
    }

export function checkExistingEntries() {
  const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  
  if (savedEntries.length > 0) {
    viewTripEntry();
    document.getElementById("add-entry").style.display = "none";
    document.getElementById("entry-form").style.display = "none";
  } else {
    pushState(STATES.ADD);
    document.getElementById("add-entry").style.display = "flex";
    document.getElementById("entry-form").style.display = "none";
  }
}
