import React from 'react'
import { connect } from 'react-redux';
import '../App.css'
import { isValidNetworkID, executeDeposit } from './helpers';
import { bindActionCreators } from 'redux';
import { submitDeposit, updateDepositHash } from '../../store/actionCreator';

const style = {
  btn: {
    width: '22vw',
    fontSize: '12px',
    margin: '0 auto',
    alignText: 'center',
    justifyContent: 'center',
    flex: 1,
    borderColor: 'black',
    borderWidth: '2px',
    overflow: 'hidden',
  },
  btnEnabled: {
    backgroundColor: '#82d5ec',
  },
  btnDisabled: {
    backgroundColor: '#fca19b',
  },
}

class TxForm extends React.Component {
  state = {
    amount: '',
  }

  handleChange = (e) => {
    this.setState({ amount: e.target.value })
  }

  executeExchange = async () => {
    try {     
      const txHash = await executeDeposit(this.props.address, this.state.amount, this.props.networkID)
      this.props.submitDeposit()
      this.props.updateDepositHash(txHash)
    } catch (err) {
      console.log('rejected TX - ', { err });      
    }
  }

  render() {
    return (
      <div className="inputContainer">
        <input
          className="txtAmount"
          placeholder="enter testnet ether amount for goeth exchange"
          disabled={!this.props.validNetwork}
          onChange={this.handleChange}
          value={this.state.amount}
        />
        <button
          style={ !this.props.validNetwork ? { ...style.btn, ...style.btnDisabled } : { ...style.btn, ...style.btnEnabled } }
          className="btnExchange"
          disabled={!this.props.validNetwork}
          onClick={this.executeExchange}
          type="button"
        >
          exchange
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  submitDeposit,
  updateDepositHash,
}, dispatch)

const mapStateToProps = (state) => {
  return ({
    validNetwork: isValidNetworkID(state.networkID),
    address: state.address,
    networkID: state.networkID,
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(TxForm)
