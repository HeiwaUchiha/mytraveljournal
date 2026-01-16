export const STATES = {
    ADD: "add",
    LIST: "list",
    FORM: "form",
    PREVIEW_VIEW: "preview-view",
    PREVIEW_EDIT: "preview-edit"
  };
  
  let currentState = null;
  let previousState = null;
  
  export function setState(newState) {
    previousState = currentState;
    currentState = newState;
  }
  
  export function getPreviousState() {
    return previousState;
  }
  
  export function getCurrentState() {
    return currentState;
  }
  