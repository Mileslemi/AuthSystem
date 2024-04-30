import {
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
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
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      console.log("user logged in success");
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case LOAD_USER_SUCCESS:
      console.log("User Loaded", payload);
      return {
        ...state,
        user: payload,
      };
    case LOAD_USER_FAIL:
      console.log("load user fail");
      return {
        ...state,
        user: null,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      console.log("log fail");

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
