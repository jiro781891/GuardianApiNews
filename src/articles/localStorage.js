import { addValueToStorage } from './actions';
import { createStore } from 'redux'
import { articles } from './reducers'

// function is wrapped in a try/catch block because calls to localStorage.getItem can fail if the user privacy mode does not allow the use of localStorage.
export const loadStore = () => {
  try {
    const serializedPins = localStorage.getItem('pinned_articles_list');
    if (serializedPins === null) {
      return undefined;
    }
    return JSON.parse(serializedPins);
  } catch (err) {
    return undefined;
  }
};


export const saveStore = (Pins) => {
  try {
    const serializedState = JSON.stringify(Pins);
    localStorage.setItem('pinned_articles_list', serializedState);
    store.dispatch(addValueToStorage())
  } catch {
    // ignore write errors
  }
};

// creates redux store 
export const store = createStore(
  articles,
  loadStore()
);
