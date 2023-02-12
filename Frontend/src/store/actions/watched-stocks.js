import { baseUrl } from "../../config";

export const LOAD_WATCHED = "LOAD_WATCHED";
export const EXIT_WATCHED = 'EXIT_WATCHED';

export const load = (watchedList) => ({ type: LOAD_WATCHED, watchedList });



export const createWatchedStock = (data) => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/watchlist/new`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    dispatch(getWatchedStocks());
  }
};




export const getWatchedStocks = () => async (dispatch, getState) => {
  try {
    const {
      authentication: { token },
    } = getState();
    const response = await fetch(`${baseUrl}/watchlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      const watchedList = await response.json();
      dispatch(load(watchedList));
    } 
  } catch (error) {
    console.log(error)
  }
};

export const exitWatchedStock = (id) => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/watchlist/delete/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    dispatch(getWatchedStocks());
    window.location.replace('/')
  }
};

export const updateWatchedStockAndGet = (data) => async (dispatch, getState) =>{
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/watchlist/update`, {
    method:"post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    await response.json();
  }
}