import React from "react";

const context = React.createContext({
  savedVideosList: [],
  addVideoToSavedVideoList: () => {},
  removeSavedVideoList: () => {},
  dark: "",
  toggleDark: () => {},
});

export default context;
