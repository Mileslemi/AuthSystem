import axios from "axios";
import {
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT,
} from "./types";

export const checkAuthenticated = () => async (dispatch) => {
  console.log("Checking Authentication");
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
        body,
        config
      );
      // or res
      if (response && response.data.code !== "token_not_valid") {
        dispatch({
          type: AUTH_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTH_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: AUTH_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTH_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

    //   on success, load user
    dispatch(load_user());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`,
        config
      );
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_USER_FAIL,
      });
    }
  } else {
    dispatch({
      type: LOAD_USER_FAIL,
    });
  }
};

export const logout = () => (dispath) => {
  dispath({
    type: LOGOUT,
  });
};
