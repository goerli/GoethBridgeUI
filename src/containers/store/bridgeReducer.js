import * as actionTypes from './actionTypes';
  
const initialState = {
  network: '',
  provider: '',
  pubkKey: '',
  componentIndex: 1,
  depositEventData: null,
  withdrawlEventData: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.INITIALIZE_NETWORK: {
      return {
        ...state, 
        network: action.payload.network,
        provider: action.payload.provider,
        pubkKey: action.payload.pubKey,
      };
    }
    case actionTypes.SET_APP_COMPONENT_STATE: {
      return {
        ...state, 
        componentIndex: action.payload,
      };
    }  
    case actionTypes.SET_DEPOSIT_EVENT_TX_DATA: {
      return {
        ...state, 
        depositEventData: action.payload,
      };
    } 
    case actionTypes.SET_WITHDRAWL_EVENT_TX_DATA: {
      return {
        ...state, 
        withdrawlEventData: action.payload,
      };
    } 
    default: return state;
  }
}
