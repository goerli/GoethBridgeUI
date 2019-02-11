import * as actionTypes from './actionTypes';

// export const initializeNetwork = (network) => {
//   return (dispatch) => {
//     dispatch({
//       type: actionTypes.INITIALIZE_NETWORK,
//       payload: { network },
//     });
//   };
// };
//
// // will tell us what component we need to render
// // 0 - form not submitted
// // 1 - waiting for events to return
// // 2 - display TX data
// export const setAppComponentState = (index) => {
//   return (dispatch) => {
//     dispatch({
//       type: actionTypes.SET_APP_COMPONENT_STATE,
//       payload: index,
//     });
//   };
// }
//
// export const setDepositEventData = (data) => {
//   return (dispatch) => {
//     dispatch({
//       type: actionTypes.SET_DEPOSIT_EVENT_TX_DATA,
//       payload: data,
//     });
//   };
// };
//
// export const setWithdrawalEventData = (data) => {
//   return (dispatch) => {
//     dispatch({
//       type: actionTypes.SET_WITHDRAWAL_EVENT_TX_DATA,
//       payload: data,
//     });
//   };
// };

export const enableMetaMask = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ENABLE_METAMASK,
      payload: null,
    })
  }
}

export const updateMetaMask = (newValues) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_METAMASK,
      payload: { address: newValues.selectedAddress, networkID: newValues.networkVersion },
    })
  }
}

export const submitDeposit = (amount, address) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SUBMIT_DEPOSIT,
      payload: { amount, address },
    })
  }
}

export const updateDepositHash = (txHash) => {
  return (dipatch) => {
    dipatch({
      type: actionTypes.UPDATE_DEPOSIT_HASH,
      payload: { txHash },
    })
  }
}

export const completeDeposit = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.COMPLETE_DEPOSIT,
    })
  }
}

export const completeWithdrawal = (withdrawalHash) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.COMPLETE_WITHDRAWAL,
      payload: { withdrawalHash },
    })
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.RESET,
    })
  }
}
