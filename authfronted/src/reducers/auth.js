import {
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  AUTH_FAIL,
  AUTH_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
} from "../actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTH_SUCCESS:
      console.log("Authenticated");
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      console.log("user logged in success");
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case SIGN_UP_SUCCESS:
      console.log("sign up success");
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOAD_USER_SUCCESS:
      console.log("User Loaded", payload);
      return {
        ...state,
        user: payload,
      };
    case AUTH_FAIL:
      console.log("Not Authenticated");
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOAD_USER_FAIL:
      console.log("load user fail");
      return {
        ...state,
        user: null,
      };
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
      console.log(type);
      return {
        ...state,
      };

    case LOGIN_FAIL:
    case SIGN_UP_FAIL:
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      console.log("log fail/logout");

      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
        user: null,
      };

    default:
      return state;
  }
}
