export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    return JSON.parse(serializedState) || undefined;
  } catch (err) { // Ignore read errors.
    console.log(err); // eslint-disable-line no-console
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) { // Ignore write errors.
    console.log(err); // eslint-disable-line no-console
  }
};
