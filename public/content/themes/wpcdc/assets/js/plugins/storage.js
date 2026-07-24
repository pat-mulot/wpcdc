// NOTICE JS storage is an object allowing data storage
const storage = {

  set: function(storageVarName, value) {
    const json = JSON.stringify(value);
    window.localStorage.setItem(storageVarName, json);
  },

  get: function(storageVarName) {
    const json = window.localStorage.getItem(storageVarName);
    const value = JSON.parse(json);
    return value;
  },

  unset: function(storageVarName) {
    window.localStorage.removeItem(storageVarName);
  },
}

// export default storage;
