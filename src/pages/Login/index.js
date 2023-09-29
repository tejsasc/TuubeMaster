import React, { useEffect, useReducer, useRef } from "react";
import { useDispatch } from "react-redux";
import classes from "./login.module.scss";
import { ajaxCall } from "../../helpers/ajaxCall";
import { setToLocalStorage } from "../../helpers/helperFunctions";
import { authAction } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/UI/Popup";
import { uiAction } from "../../store/uiStore";

// creating initial reducer data
const intialLoginData = {
  userName: "",
  isUserError: false,
  password: "",
  isPassError: false,
  resetPassword: "",
  isError: false,
  errorMsg: "",
  isLoading: false,
  btnLabel: "Login",
  resetLabel: "Click to get reset Link",
};
const reducerLogin = function (state, action) {
  if (action.type === "reset") {
    return {
      ...state,
      isUserError: false,
      isPassError: false,
      resetPassword: "",
      isError: false,
      errorMsg: "",
      isLoading: false,
      btnLabel: "Login",
      resetLabel: "Click to get reset Link",
    };
  }
  return { ...state, [action.type]: action.value };
};

const Login = () => {
  const [loginData, dispatchLogin] = useReducer(reducerLogin, intialLoginData);
  const controller = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetReducerForm = () => {
    dispatchLogin({
      type: "reset",
    });
  };
  const popupData = (show, heading, msg) => {
    dispatch(
      uiAction.setNotification({
        show,
        heading,
        msg,
      })
    );
  };
  useEffect(() => {
    return () => {
      if (controller.current) {
        console.log("abortingg");
        controller.current.abort();
      }
    };
  }, []);
  const validateForm = () => {
    let isError = false;
    if (loginData.userName?.length < 1) {
      dispatchLogin({ type: "isUserError", value: true });
      isError = true;
    }
    if (loginData.password?.length < 1) {
      dispatchLogin({ type: "isPassError", value: true });
      isError = true;
    }
    if (isError) {
      dispatchLogin({ type: "isError", value: true });
      dispatchLogin({
        type: "errorMsg",
        value: "Please fill the username and password correctly",
      });
      return false;
    }
    return true;
  };
  const doLogin = async (e) => {
    resetReducerForm();
    e.preventDefault();
    if (!validateForm()) return;
    dispatchLogin({ type: "isLoading", value: true });
    dispatchLogin({ type: "btnLabel", value: "Logging In" });
    const jsonPost = JSON.stringify({
      username: loginData.userName,
      password: loginData.password,
    });
    controller.current = new AbortController();
    const signal = controller.current.signal;
    const gotLate = setTimeout(() => {
      // controller.current.abort();
      popupData(
        true,
        "Login",
        "Taking longer then usual,Trying to reach server"
      );
    }, 4000);
    const timeOutFunction = () => {
      controller.current.abort();
    };

    const response = await ajaxCall(
      "/user/login/",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: jsonPost,
        signal,
      },
      8000,
      timeOutFunction
    );
    clearTimeout(gotLate);
    console.log(response);
    if (response.status === 200) {
      console.log("loggedIn");
      if (response.data?.errors?.msg === -1) {
        dispatchLogin({ type: "isError", value: true });
        dispatchLogin({
          type: "errorMsg",
          value: "UserName or Password is wrong, Please try again!",
        });
        dispatchLogin({ type: "isLoading", value: false });
        dispatchLogin({ type: "btnLabel", value: "Login" });
        popupData(false, "", "");
        return;
      } else if (response.data?.msg === "Login Successful") {
        const localObj = {
          accessToken: response.data?.token?.access,
          refreshToken: response.data?.token?.refresh,
          user_type: response.data?.user_status,
          userId: response.data?.userid,
          timeOfLogin: Date.now(),
          userName: loginData.userName,
        };
        console.log("localobj is", localObj);
        setToLocalStorage("loginInfo", localObj, true);
        dispatch(
          authAction.setAuthStatus({
            userName: loginData.userName,
            loggedIn: true,
            accessToken: response.data?.token?.access,
            refreshToken: response.data?.token?.refresh,
            user_type: response.data?.user_status,
            userId: response.data?.userid,
            timeOfLogin: Date.now(),
            logInOperation: 1,
          })
        );
        setTimeout(
          () =>
            dispatch(
              authAction.setAuthStatus({
                userName: "",
                loggedIn: false,
                accessToken: null,
                refreshToken: null,
                userId: null,
                user_type: null,
                timeOfLogin: null,
                logInOperation: -1,
              })
            ),
          1000 * 60 * 30
        );
        popupData(true, loginData.userName, "Welcome To TubeMaster");
        navigate(`/`);
      } else {
        dispatchLogin({ type: "isLoading", value: false });
        dispatchLogin({ type: "btnLabel", value: "Login" });
        dispatchLogin({
          type: "errorMsg",
          value: "Some Problem Occured Please try again",
        });
        return false;
      }
    } else {
      dispatchLogin({ type: "isLoading", value: false });
      dispatchLogin({ type: "btnLabel", value: "Login" });
      dispatchLogin({
        type: "isError",
        value: true,
      });
      dispatchLogin({
        type: "errorMsg",
        value: "Some Problem Occured Please try again",
      });
      return false;
    }
  };
  return (
    <>
      <div className={classes.formForm}>
        <div className={classes.formFormWrap}>
          <div className={classes.formContainer}>
            <div className={classes.formContent}>
              <center>
                <img
                  className={classes.logoImg}
                  src="http://tubemastercrm.com/static/img/tm_logo.png"
                  alt="Tube Master Logo"
                />
              </center>
              <hr />
              <h1 className="">Sign In</h1>
              <p className="">Log in to your account to continue.</p>

              <form method="POST" className="text-left" onSubmit={doLogin}>
                <div className={classes.form}>
                  <div className={`${classes.fieldWrapper} ${classes.input}`}>
                    <label htmlFor="email">User Name</label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`feather ${classes.featherUser}`}
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <input
                      id="email"
                      type="text"
                      className={`form-control ${
                        loginData.isUserError ? "wrongInput" : ""
                      }`}
                      name="email"
                      required=""
                      autoFocus=""
                      value={loginData.userName}
                      onChange={(e) =>
                        dispatchLogin({
                          type: "userName",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className={`${classes.fieldWrapper} ${classes.input}`}>
                    <label htmlFor="password">Password</label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`feather ${classes.featherLock}`}
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <input
                      id="password"
                      type="password"
                      className={`form-control ${
                        loginData.isPassError ? "wrongInput" : ""
                      }`}
                      name="password"
                      required=""
                      autoComplete="current-password"
                      value={loginData.password}
                      onChange={(e) =>
                        dispatchLogin({
                          type: "password",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="d-sm-flex justify-content-between">
                    <div className={classes.fieldWrapper}>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loginData.isLoading}
                      >
                        {loginData.btnLabel}
                      </button>
                      {loginData.isError ? (
                        <p className="dangour">{loginData.errorMsg}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Popup />
    </>
  );
};

export default Login;
