import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // initially not collapse and easy for ternary, just check status and do
  tabs: [],
};
const tabStore = createSlice({
  name: "TabState",
  initialState,
  reducers: {
    addTab(state, action) {
      state.tabs.push(action.payload.newTab);
      // if(action.payload.){}
    },
    // setAuthStatus(state, action) {
    //   if (action.payload.loggedIn) {
    //     state.loggedIn = true;
    //     state.accessToken = action.payload.accessToken;
    //     state.refreshToken = action.payload.refreshToken;
    //     state.timeOfLogin = action.payload.timeOfLogin;
    //     state.userName = action.payload.userName;
    //     state.user_type = action.payload.user_type;
    //     state.userId = action.payload.userId;
    //     state.logInOperation = action.payload.logInOperation;
    //   } else {
    //     state.loggedIn = false;
    //     state.timeOfLogin = null;
    //     state.logInOperation = action.payload.logInOperation;
    //   }
    // },
  },
});

export const tabAction = tabStore.actions;

export default tabStore.reducer;
