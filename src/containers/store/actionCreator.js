import * as actionTypes from './actionTypes';

export const initializeNetwork = (network) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.INITIALIZE_NETWORK,
      payload: { network },
    });
  };
};

// will tell us what component we need to render
// 0 - form not submitted
// 1 - waiting for events to return
// 2 - display TX data
export const setAppComponentState = (index) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_APP_COMPONENT_STATE,
      payload: index,
    });
  };
}

export const setDepositEventData = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_DEPOSIT_EVENT_TX_DATA,
      payload: data,
    });
  };
};

export const setWithdrawlEventData = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_WITHDRAWL_EVENT_TX_DATA,
      payload: data,
    });
  };
};
