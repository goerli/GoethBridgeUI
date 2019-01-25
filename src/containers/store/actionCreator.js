import * as actionTypes from './actionTypes';

export const initializeNetwork = (network, provider, pubKey) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.INITIALIZE_NETWORK,
      payload: { network, provider, pubKey },
    });
  };
};
