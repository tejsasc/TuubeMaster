import { ajaxCall } from "./ajaxCall";

Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value));
};

const setToLocalStorage = (key, value, isObj) => {
  let data = value;
  if (isObj) data = JSON.stringify(value);
  localStorage.setItem(key, data);
  return true;
};

const getFromLocalStorage = (key, isObj) => {
  if (localStorage.getItem(key)) {
    if (isObj) return JSON.parse(localStorage.getItem(key));
    return localStorage.getItem(key);
  }
  return -1;
};

const deleteFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

const getRefreshToken = async (refreshToken) => {
  const response = await ajaxCall(
    "token/refresh/",
    {
      // "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    "POST",
    JSON.stringify({
      refresh: refreshToken,
    })
  );
  // console.log(response);
  if (response.msg === "login Successful") {
    // let's set to localstorage
    const localObj = {
      accessToken: response.token.access,
      refreshToken: response.token.refresh,
      user_type: response.token.user_status,
      userId: response.token.userid,
      timeOfLogin: Date.now(),
      // userName: formData.userName,
    };
    // console.log("localobj is", localObj);
    setToLocalStorage("loginInfo", localObj, true);
  }
};

// function for checking whether loggedIn or Not
async function authenticateUser(timeInMs, refreshToken) {
  const timeDiff = Date.now() - timeInMs;
  if (
    Math.round(timeDiff / 1000 / 60) >= 30 &&
    Math.round(timeDiff / 1000 / 60 / 60) > 24
  ) {
    deleteFromLocalStorage("loginInfo");
    return -1;
  } else if (
    Math.round(timeDiff / 1000 / 60) >= 30 &&
    Math.floor(timeDiff / 1000 / 60 / 60) < 24
  ) {
    const response = await ajaxCall(
      "/token/refresh/",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ refresh: refreshToken }),
        // signal,
      },
      8000
    );
    return response;
  } else if (Math.round(timeDiff / 1000 / 60) < 30) {
    // console.log("no need to do anything");
    return true;
  }
}

export {
  setToLocalStorage,
  getFromLocalStorage,
  deleteFromLocalStorage,
  getRefreshToken,
  authenticateUser,
};
