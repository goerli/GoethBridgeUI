import React from 'react';
import './BridgeForm.css'

class BridgeForm extends React.Component {
  render () {
    return (
      <div className="inputContainer">
        <input className="txtAmount" placeholder="Ex. 1.5" />
        <button style={btnExchange} className="btnExchange"> exchange </button>   
      </div>
    )
  }
}

const btnExchange = {
  width: '20vw',
  fontSize: '12px',
  margin: '0 auto',
  alignText: 'center',
  justifyContent: 'center',
  flex: 1,
  backgroundColor: '#82d5ec',
  borderColor: 'black',
  borderWidth: '2px',
  overflow: 'hidden',
};

export default BridgeForm;
