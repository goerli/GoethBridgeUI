import * as actionTypes from './actionTypes';

const initialState = {
  metaMaskEnabled: false,
  networkID: undefined,
  depositSubmitted: false,
  depositHash: undefined,
  withdrawalHash: undefined,
  depositEventFound: false,
  withdrawalEventFound: false,
  address: undefined,
  amount: undefined,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ENABLE_METAMASK: {
      return {
        ...state,
        metaMaskEnabled: true,
      };
    }
    case actionTypes.UPDATE_METAMASK: {
      return {
        ...state,
        address: action.payload.address,
        networkID: action.payload.networkID,
      }
    }
    case actionTypes.SUBMIT_DEPOSIT: {
      return {
        ...state,
        amount: action.payload.amount,
        address: action.payload.address,
        depositSubmitted: true,
      };
    }
    case actionTypes.UPDATE_DEPOSIT_HASH: {
      return {
        ...state,
        depositHash: action.payload.txHash,
      }
    }
    case actionTypes.COMPLETE_DEPOSIT: {
      return {
        ...state,
        depositEventFound: true,
      };
    }
    case actionTypes.COMPLETE_WITHDRAWAL: {
      return {
        ...state,
        withdrawalHash: action.payload.withdrawalHash,
        withdrawalEventFound: true,
      };
    }
    case actionTypes.RESET: {
      return {
        ...initialState,
        address: state.address,
        networkID: state.networkID,
        metaMaskEnabled: true,
      }
    }
    default: return state;
  }
}
