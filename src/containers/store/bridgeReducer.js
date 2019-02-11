import * as actionTypes from './actionTypes';
  
// const initialState = {
//   network: '',
//   provider: '',
//   pubkKey: '',
//   componentIndex: 1,
//   depositEventData: null,
//   withdrawalEventData: null,
// };


// export default function (state = initialState, action) {
//   switch (action.type) {
//     case actionTypes.INITIALIZE_NETWORK: {
//       return {
//         ...state,
//         network: action.payload.network,
//         provider: action.payload.provider,
//         pubkKey: action.payload.pubKey,
//       };
//     }
//     case actionTypes.SET_APP_COMPONENT_STATE: {
//       return {
//         ...state,
//         componentIndex: action.payload,
//       };
//     }
//     case actionTypes.SET_DEPOSIT_EVENT_TX_DATA: {
//       return {
//         ...state,
//         depositEventData: action.payload,
//       };
//     }
//     case actionTypes.SET_WITHDRAWAL_EVENT_TX_DATA: {
//       return {
//         ...state,
//         withdrawalEventData: action.payload,
//       };
//     }
//     default: return state;
//   }
// }


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
