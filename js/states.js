export const STATES = {
    ADD: "add",
    LIST: "list",
    FORM: "form",
    PREVIEW_VIEW: "preview-view",
    PREVIEW_EDIT: "preview-edit",
    ACCOUNT: "account"
  };
  
  const KEY = "stateHistory";
  
  function getHistory() {
    return JSON.parse(sessionStorage.getItem(KEY)) || [];
  }
  
  function saveHistory(history) {
    sessionStorage.setItem(KEY, JSON.stringify(history));
  }
  
  export function pushState(state) {
    const history = getHistory();
    history.push(state);
    saveHistory(history);
  }
  
  export function popState() {
    const history = getHistory();
    const popped = history.pop();
    saveHistory(history);
    return popped;
  }
  
  export function getCurrentState() {
    const history = getHistory();
    return history[history.length - 1] || null;
  }
  
  export function clearStates() {
    sessionStorage.removeItem(KEY);
  }
  