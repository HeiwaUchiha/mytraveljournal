import { addEntry } from "./additionalFunctions.js";
import { searchEntry } from "./additionalFunctions.js";

export function viewTripEntry(filteredEntries = null) {
  const entriesContainer = document.getElementById("trip-entry");
  const stored = localStorage.getItem("journalEntries");
  const allEntries = stored ? JSON.parse(stored) : [];

  const entries = filteredEntries || allEntries;

  // Always show the nav first
  function buildTripNav() {
    return `
      <div class="trip-nav">
        <button id="add"><i class="material-symbols-outlined">add</i> Add</button>
        <div class="search-con">
          <input type="search" id="search-bar" placeholder="Search tags, country, type, date..." />
          <button id="search"><i class="material-symbols-outlined">search</i> Search</button>
        </div>
      </div>
    `;
  }

  entriesContainer.innerHTML = buildTripNav();

  if (entries.length === 0) {
    entriesContainer.innerHTML = `
      <div class="trip-nav">
        <button id="add"><i class="material-symbols-outlined">add</i> Add</button>
        <div class="search-con">
          <input type="search" id="search-bar" placeholder="Search tags, country, type, date..." />
          <button id="search"><i class="material-symbols-outlined">search</i> Search</button>
        </div>
      </div>
      <div class="not-found">
        <h1>Sorry, No Search results</h1>
        <h2>Perhaps you can add it</h2>
      </div>
    `;
    searchEntry(allEntries); // still wire the search back
    return;
  }

  searchEntry(allEntries);
  addEntry();

  entries.forEach(entry => {
    const entryDiv = document.createElement("div");
    entryDiv.classList.add("entry");

    entryDiv.innerHTML = `
      <div class="entry-con">
        <img src="${entry.mainImage}" alt="${entry.title}" class="entry-img" />
        <div class="place">
          <div class="place-link">
            <span>
              <img src="/assets/marker.png" alt="marker" />
              <p>${entry.country}</p>
            </span>
            <a href="${entry.location}" target="_blank">View on Google Maps</a>
          </div>
          <h1 class="place-title">${entry.title}</h1>
          <h2 class="place-name">${entry.place}</h2>
          <p class="place-text">${entry.description}</p>
        </div>
      </div>
      <div class="layer">
        <button id="view"><i class="material-symbols-outlined">visibility</i> View</button>
        <button id="edit"><i class="material-symbols-outlined">edit</i> Edit</button>
        <button id="delete"><i class="material-symbols-outlined">delete</i> Delete</button>
      </div>
    `;

    entriesContainer.appendChild(entryDiv);
  });
}
