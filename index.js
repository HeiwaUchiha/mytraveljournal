import { setupThemeToggle } from './js/genFunction.js';
import { setupScrollEffect } from './js/genFunction.js';
import { isLoggedIn } from './js/genFunction.js';
import { setupAuthForms } from './js/auth.js';
import { dropdown, logData, enterData, checkExistingEntries } from './js/journalForm.js';
import { addEntry, searchEntry, viewEntry, backEntry, editEntry, deleteEntry, populateView, populateEdit } from './js/additionalFunctions.js';
import { STATES, setState, getPreviousState, getCurrentState } from "./js/states.js";

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
    viewEntry();
    editEntry();
    deleteEntry();
    // setState();
    // getCurrentState();
    // getPreviousState();
  }
  if (window.location.pathname.includes("preview.html")) {
    logData();
    dropdown();
    addEntry();
    backEntry();   
    populateView();
    populateEdit();
  }
  if (window.location.pathname.includes("user.html")) {
    logData();
    dropdown();
    backEntry();   
  }
});