import { setupThemeToggle } from './js/genFunction.js';
import { setupScrollEffect } from './js/genFunction.js';
import { isLoggedIn } from './js/genFunction.js';
import { setupAuthForms } from './js/auth.js';
import { dropdown, logData, enterData, checkExistingEntries } from './js/journalForm.js';
import { accountOpen, userBackEntry, addEntry, searchEntry, viewEntry, backEntry, editEntry, deleteEntry, populateView, populateEdit, deleteAccount, viewDetails, editDetails, allImageDisplay, imageDisplay, editPassword, shareJournal, populateShare } from './js/additionalFunctions.js';
import { STATES, pushState, popState, getCurrentState } from './js/states.js';

document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  setupScrollEffect();
  isLoggedIn();
  setupAuthForms();
  if (window.location.pathname.includes("journal.html")) {
    logData();
    accountOpen();
    dropdown();
    enterData();
    checkExistingEntries();
    addEntry();
    searchEntry();
    viewEntry();
    editEntry();
    deleteEntry();
    allImageDisplay()
    shareJournal()
  }
  if (window.location.pathname.includes("preview.html")) {
    logData();
    accountOpen();
    dropdown();
    addEntry();
    backEntry();   
    populateView();
    populateEdit();
    allImageDisplay();
  }
  if (window.location.pathname.includes("share.html")) {
    logData();
    accountOpen();
    dropdown();
    populateShare();
  }
  if (window.location.pathname.includes("user.html")) {
    logData();
    accountOpen();
    dropdown();
    pushState();
    popState();
    getCurrentState();
    userBackEntry();   
    deleteAccount();
    viewDetails();
    editDetails();
    allImageDisplay();
    imageDisplay();
    editPassword()
  }
});