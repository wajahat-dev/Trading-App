import { useDispatch } from "react-redux";
import { baseUrl } from "../../config";
import { setCurrentUser } from './current-user'
export const TOKEN_KEY = "TOKEN_KEY";
export const SET_TOKEN = "SET_TOKEN";
export const REMOVE_TOKEN = "REMOVE_TOKEN";

export const removeToken = (token) => ({ type: REMOVE_TOKEN });
export const setToken = (token) => ({ type: SET_TOKEN, token });

export const loadToken = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch(setToken(token));
  }
};

export const login = (email, password) => async (dispatch) => {
  // export const login = async (email, password)  => {
  const response = await fetch(`${process.env.React_APP_BASEURLPARTIAL}/login`, {
    method: "post",
    "accept": '*/*',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "username": email,
      "password": password,
      "clientid": 0
    }),
  });

  if (response.ok) {
    const data = await response.json();

    if (data.messageBox.includes('successfully')) {
      window.localStorage.setItem(TOKEN_KEY, data.token);
      dispatch(setToken(data.token));
      // dispatch(setCurrentUser(id));
      window.location.replace('/')
    } else {
      return data.messageBox
    }

  }




};

export const logout = () => async (dispatch, getState) => {
  // const {
  //   authentication: { token },
  // } = getState();
  // const response = await fetch(`${baseUrl}/session`, {
  //   method: "delete",
  //   headers: { Authorization: `Bearer ${token}` },
  // });

  // if (response.ok) {
  //   window.localStorage.removeItem(TOKEN_KEY);
  //   dispatch(removeToken());
  // }
  window.localStorage.removeItem(TOKEN_KEY);
  dispatch(removeToken());
};


export const signUp = (user) => async (dispatch) => {
  const response = await fetch(`${process.env.React_APP_BASEURLPARTIAL}/signup`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    "accept": '*/*',
    body: JSON.stringify({
      "userNameOrEmail": user.email,
      "password": user.password,
      "confirmPassword": user.confirmPassword
    }),
  });
 
  if (response.ok) {
    const data = await response.json();

    if (data.messageBox.includes('successfully')) {
      const { token } = await response.json();
      window.localStorage.setItem(TOKEN_KEY, token);
      dispatch(setToken(token));
    } 

  }


};



