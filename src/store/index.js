import { configureStore } from "@reduxjs/toolkit";
import authStore from "./authStore";
import uiStore from "./uiStore";
import tabStore from "./tabStore";
const store = configureStore({
  reducer: {
    authStore,
    uiStore,
    tabStore,
  },
});

export default store;
