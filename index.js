import { setupThemeToggle } from './js/genFunction.js';
import { setupScrollEffect } from './js/genFunction.js';
import { isLoggedIn } from './js/genFunction.js';
import { setupAuthForms } from './js/auth.js';
import { dropdown, logData, enterData, checkExistingEntries } from './js/journalForm.js';
import { addEntry, searchEntry } from './js/additionalFunctions.js';

document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  setupScrollEffect();
  isLoggedIn();
  setupAuthForms();
  if (window.location.pathname.includes("journal.html")) {
    logData();
    dropdown();
    enterData();
    checkExistingEntries();
    addEntry();
    searchEntry();
  }
});