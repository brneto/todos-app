const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    const json = JSON.parse(serializedState);

    if (json) return json;
  } catch (err) { // Ignore read errors.
    console.log(err); // eslint-disable-line no-console
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) { // Ignore write errors.
    console.log(err); // eslint-disable-line no-console
  }
};

export {
  loadState,
  saveState,
};
