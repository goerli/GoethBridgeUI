import * as actionTypes from './actionTypes';

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
  return (dispatch) => {
    dispatch({
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
