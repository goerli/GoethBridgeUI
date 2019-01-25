import * as actionTypes from './actionTypes';
  
const initialState = {
  network: '',
  provider: '',
  pubkKey: '',
  componentIndex: 0,
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
    default: return state;
  }
}
