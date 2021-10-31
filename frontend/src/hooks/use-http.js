// take in a fetch data request set states accordingly

import { useReducer, useCallback } from 'react';

const initialState = {
  status: '',
  data: [],
  dataLength: 0,
};

const reducer = (prevState, action) => {
  if (action.type === 'REQUEST_SENT') {
    return {
      status: 'pending',
      data: [],
      dataLength: 0,
    };
  }
  if (action.type === 'REQUEST_COMPLETED') {
    return {
      status: 'success',
      data: action.payload,
      dataLength: action.dataLength,
    };
  }
  if (action.type === 'REQUEST_ERROR') {
    return {
      status: 'error',
      data: [],
      dataLength: 0,
    };
  }
};

const useHttp = (sendRequestFn) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // sendRequest is a function that dispatches actions to trigger the reducer function to change states
  const sendRequest = useCallback(
    async (...args) => {
      dispatch({ type: 'REQUEST_SENT' });

      try {
        const response = await sendRequestFn(...args);
        const responseLength = response.length;
        dispatch({
          type: 'REQUEST_COMPLETED',
          payload: response,
          dataLength: responseLength,
        });
      } catch (error) {
        dispatch({ type: 'REQUEST_ERROR' });
      }
    },
    [sendRequestFn]
  );

  return {
    sendRequest,
    ...state,
  };
};

export default useHttp;
