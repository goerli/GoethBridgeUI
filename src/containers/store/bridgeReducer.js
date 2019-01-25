import * as actionTypes from './actionTypes';
  
const initialState = {
  network: '',
  provider: '',
  pubkKey: '',
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
    default: return state;
  }
}
