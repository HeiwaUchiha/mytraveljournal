import { countries } from "./countries.js";
import { viewTripEntry } from "./tripEntry.js";
import { STATES, pushState, popState, getCurrentState } from './states.js';

export function addEntry() {
    const addButton = document.getElementById("add");
    const entryFormSection = document.getElementById("entry-form");

    addButton?.addEventListener('click', () =>{
        document.querySelector(".trip-nav").style.display = "none";
        entryFormSection.style.display = "block";
        entryFormSection.innerHTML = buildFormHTML();
        document.getElementById("trip-entry").style.display = "none";
        countryPopu();
        locationAlert();
        setupFormEvents();
        pushState(STATES.FORM);
        console.log(getCurrentState())
        
    })

    function buildFormHTML() {
          return `
            <form id="journal-entry-form">
              <input type="text" id="title" placeholder="Trip Title" />
              <input type="text" id="place" placeholder="Place" />
      
              <select id="type">
                <option value="" hidden>Travel Type</option>
                <option value="solo">Solo</option>
                <option value="group">Group</option>
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
          const backBtn = document.getElementById("back");
        
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
              country: form.country.value,
              startDate: form["start-date"].value,
              endDate: form["end-date"].value,
              location: form.location.value.trim(),
              tags: form.tag.value.split(",").map(tag => tag.trim()).filter(Boolean),
              description: form.description.value.trim(),
              story: form.story.value.trim(),
              createdAt: new Date().toISOString(),
              mainImage: await convertSingleToBase64(mainImageInput.files[0]),
              images: await convertMultipleToBase64(galleryInput.files)
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
              history.replaceState(null, "", "")
            } else {
              entryFormSection.style.display = "none";
              window.location.href = "journal.html"
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
  };

export function searchEntry() {
    const searchInput = document.getElementById("search-bar");
    const searchBtn = document.getElementById("search");
    const addEntrySection = document.getElementById("add-entry");
  
    searchBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      
      const query = searchInput.value.trim().toLowerCase();
      if (!query) {
        alert("Please enter something to search.");
        return;
      }
      
      

      const allEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  
      const filtered = allEntries.filter(entry => {
        return (
          entry.title.toLowerCase().includes(query) ||
          entry.place.toLowerCase().includes(query) ||
          entry.country.toLowerCase().includes(query) ||
          entry.type.toLowerCase().includes(query) ||
          (Array.isArray(entry.tags) && entry.tags.some(tag => tag.toLowerCase().includes(query))) ||
          entry.startDate.includes(query) ||
          entry.endDate.includes(query)
        );
      });

      function buildNewAddEntry(){
        return `<h1>Entry not Found!</h1>
                <p>Perhaps you can add it</p>
                <button class="add-btn">+ Add Entry</button>
                <button class="back-btn">Go Back</button>
                `
      }
  
      if (!filtered.includes(query)) {
        console.log("Not a match");
        addEntrySection.style.display = "flex"
        addEntrySection.innerHTML = buildNewAddEntry()
      }

      const goBackBtn = document.querySelector(".back-btn");

      goBackBtn?.addEventListener('click', () =>{
        window.location.href = "journal.html"
      })

    if (typeof viewTripEntry === "function") {
      viewTripEntry(filtered);
    } else {
      console.error("viewTripEntry is not defined");
    }
    });
  };

  export function backEntry(){
    const backButton = document.querySelectorAll(".back2")

    backButton.forEach(button => {
      button.addEventListener('click', () => {
        window.location.href = "journal.html"
        localStorage.removeItem("currentEntryId");
      })
    })
  }

  export function accountOpen() {
    const user = document.querySelectorAll(".username")

    user.forEach(button => 
      { button.addEventListener("click",() => {
        pushState(getCurrentState());
        pushState(STATES.ACCOUNT);
        window.location.href = "user.html";
      })
    })
}

  export function userBackEntry(){
    const userBackBtn = document.querySelector(".user-back-nav")

    userBackBtn.addEventListener("click", () => {
      popState(); // remove ACCOUNT

  const previous = popState();

  if (!previous) {
    window.location.href = "/journal.html";
    return;
  }

  switch (previous) {
    case STATES.ADD:
    case STATES.LIST:
      window.location.href = "journal.html";
      break;

    case STATES.FORM:
      window.location.href = "journal.html";
      break;

    case STATES.PREVIEW_VIEW:
      window.location.href = "preview.html?preview=view";
      break;

    case STATES.PREVIEW_EDIT:
      window.location.href = "preview.html?preview=edit";
      break;

    default:
      window.location.href = "journal.html";
  }
    })
  }

  export function viewEntry() {
    const viewButtons = document.querySelectorAll(".view-btn");
    viewButtons.forEach(button => {
      button.addEventListener("click", () => {
        const entryId = button.getAttribute("data-id");
        localStorage.setItem("currentEntryId", entryId); 
        window.location.href = "preview.html?preview=view";
        pushState(STATES.PREVIEW_VIEW);
      });
    });
  }  

  export function populateView() {
      if (window.location.href.includes("?preview=view")) {
        
      const tripContainer = document.getElementById("trip");
    
      const entryId = localStorage.getItem("currentEntryId");
      const allEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    
      const selectedEntry = allEntries.find(entry => entry.id == entryId);

      function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    
      if (!selectedEntry || !tripContainer) {
        tripContainer.innerHTML = "<p>No entry found.</p>";
        return;
      }
    
      tripContainer.innerHTML = `
        <img class="m-img" src="${selectedEntry.mainImage}" alt="">
        <h1 class="trip-title">${selectedEntry.title}</h1>
        <span>
          <h2 class="trip-place">${selectedEntry.place}</h2>
          <h2 class="trip-country">${selectedEntry.country.toUpperCase()}</h2>
        </span>
        <span class="details1">
          <h4>${selectedEntry.startDate} - ${selectedEntry.endDate}</h4>
          <a href="${selectedEntry.location}" target="_blank">View on Google Maps</a>
        </span>
        <span class="details2">
          <h4>${capitalizeFirstLetter(selectedEntry.type)}</h4>
          <h4>${selectedEntry.tags.map(tag => `${tag}`).join(" ")}</h4>
        </span>
        <div class="description">
          <h2>Description:</h2>
          <p>${selectedEntry.description}</p>
        </div>
        <div class="story">
          <h2>Story:</h2>
          <p>${selectedEntry.story}</p>
        </div>
        <div class="gallery">
          <h2>Gallery:</h2>
          <div class="gallery-con">
            ${selectedEntry.images.map(img => `<img src="${img}" class="gallery-img" />`).join("")}
          </div>
        </div>
        
      `;
      } else {
        const tripContainer = document.getElementById("trip");
        

        tripContainer.style.display = "none"
      }
    }
  export function editEntry() {
    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach(button => {
      button.addEventListener("click", () => {
        const entryId = button.getAttribute("data-id");
        localStorage.setItem("currentEntryId", entryId); 
        window.location.href = "preview.html?preview=edit";
        pushState(STATES.PREVIEW_EDIT);
      });
    });
  }

  export function populateEdit() {
      if (window.location.href.includes("?preview=edit")) {
        const entryFormSection = document.getElementById("entry-form");

        const entryId = localStorage.getItem("currentEntryId");
        const allEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    
        const selectedEntry = allEntries.find(entry => entry.id == entryId);

        function capitalizeFirstLetter(str) {
          return str.charAt(0).toUpperCase() + str.slice(1);
        }

        entryFormSection.style.display = "block";
        entryFormSection.innerHTML = buildFormHTML();
        locationAlert();
        countryPopu();
        setTypeValue();

        function buildFormHTML() {
          return `
            <form id="journal-entry-form">
              <input type="text" id="title" placeholder="Trip Title" value="${selectedEntry.title}" />
              <input type="text" id="place" placeholder="Place" value="${selectedEntry.place}" />
      
              <select id="type">
                <option value="" id="type-placeholder" hidden>Travel Type</option>
                <option value="Solo">Solo</option>
                <option value="Group">Group</option>
              </select>
      
              <select id="country">
                <option value="" hidden>Country</option> 
              </select>
      
              <div class="date-box">
                <input type="date" id="start-date" value="${selectedEntry.startDate}" required />
                <label for="start-date">Start Date</label>
              </div>
    
              <div class="date-box">
                <input type="date" id="end-date" value="${selectedEntry.endDate}" required />
                <label for="end-date">End Date</label>
              </div>
    
              <div title="Click the Google Icon to go to Google maps, Search for your location and click on share to get the link" class="location-box">
                <input type="text" id="location" placeholder="Location Link" value="${selectedEntry.location}" />
                <a href="https://maps.google.com" target="_blank"><i class="bxl bx-google"></i></a>
              </div>
              
              <input type="text" id="tag" placeholder="Tags (comma-separated)" value="${selectedEntry.tags.join(', ')}" />
      
              <textarea id="description" placeholder="Short Description">${selectedEntry.description}</textarea>
              <textarea id="story" placeholder="Full Story" rows="8">${selectedEntry.story}</textarea>
      
              <label for="main-image" class="file-label" id="image-label-main">Main Image</label>
              <input type="file" id="main-image" accept="image/*" hidden />
    
              <label for="images" class="file-label" id="image-label-gallery">Upload Other Photos</label>
              <input type="file" id="images" accept="image/*" hidden multiple />
              <div id="preview-container"></div>
      
              <div class="major-btn">
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
          const countrySelect = document.getElementById("country");
        
          for (let country of countries) {
            const option = document.createElement("option");
            option.text = country;
            option.value = country;
            if (country === selectedEntry.country) {
              option.selected = true;
            }
            countrySelect.appendChild(option);
          }
        }
        
        function setTypeValue() {
          const typeSelect = document.getElementById("type-placeholder");
          typeSelect.innerText = capitalizeFirstLetter(selectedEntry.type);
        }
        
        const previewContainer = document.getElementById("preview-container");

        previewContainer.innerHTML = `
          <p><strong>Current Main Image:</strong></p>
          <img src="${selectedEntry.mainImage}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 8px;" />
          <p><strong>Gallery:</strong></p>
        `;

        selectedEntry.images.forEach(image => {
          const img = document.createElement("img");
          img.src = image;
          img.style.width = "100px";
          img.style.height = "100px";
          img.style.objectFit = "cover";
          img.style.marginRight = "8px";
          img.style.borderRadius = "6px";
          previewContainer.appendChild(img);
        });

        const mainImageInput = document.getElementById("main-image");
        const galleryInput = document.getElementById("images");

        const imageLabelMain = document.querySelector('label[for="main-image"]');
        const imageLabelGallery = document.querySelector('label[for="images"]');

        mainImageInput?.addEventListener("change", () => {
          const file = mainImageInput.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const existingImages = previewContainer.querySelectorAll("img");
              existingImages.forEach(img => img.remove());
        
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
        
        const form = document.getElementById("journal-entry-form");
        form?.addEventListener("submit", async (e) => {
          e.preventDefault();
        
          const entryId = localStorage.getItem("currentEntryId");
          let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
        
          const index = entries.findIndex(entry => entry.id == entryId);
          if (index === -1) {
            alert("Entry not found!");
            return;
          }
        
          const updatedEntry = {
            ...entries[index], // preserve ID and creation date
            title: form.title.value.trim(),
            place: form.place.value.trim(),
            type: form.type.value.toLowerCase(),
            country: form.country.value.toUpperCase(),
            startDate: form["start-date"].value,
            endDate: form["end-date"].value,
            location: form.location.value.trim(),
            tags: form.tag.value.split(",").map(tag => "#" + tag.trim()).filter(Boolean),
            description: form.description.value.trim(),
            story: form.story.value.trim(),
            mainImage: await convertSingleToBase64(form["main-image"].files[0]) || entries[index].mainImage,
            images: (form["images"].files.length > 0)
              ? await convertMultipleToBase64(form["images"].files)
              : entries[index].images
          };
        
          // Update entry
          entries[index] = updatedEntry;
        
          localStorage.setItem("journalEntries", JSON.stringify(entries));
          alert("Entry updated successfully!");
          window.location.href = "journal.html"; // or redirect to preview
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

      } else {
      }
  }
  export function deleteEntry() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
  
    deleteButtons.forEach(button => {
      button.addEventListener("click", () => {
        const entryId = button.getAttribute("data-id");
        const confirmDelete = confirm("Are you sure you want to delete this entry?");
        
        if (confirmDelete) {
          console.log(entryId);
          
          let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

          const updated = entries.filter(entry => entry.id != entryId);
          localStorage.setItem("journalEntries", JSON.stringify(updated));

          // Refresh entries
          viewTripEntry();
        }
      });
    });
  }
  