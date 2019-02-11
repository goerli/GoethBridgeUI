import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../App.css'
import { reset } from '../../store/actionCreator';

const style = {
  btnReset: {
    backgroundColor: '#fca19b',
    width: '22vw',
    fontSize: '12px',
    margin: '0 auto',
    height: '50px',
    alignText: 'center',
    justifyContent: 'center',
    flex: 1,
    borderColor: 'black',
    borderWidth: '2px',
    overflow: 'hidden',
  },
  btnEnabled: {
    backgroundColor: '#82d5ec',
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
  link: {
    color: '#8ad9d1',
    textDecoration: 'none',
  },
}

class Results extends React.Component {
  getDepositLink = () => {
    let url;
    if (this.props.networkID === '3') {
      url = `https://ropsten.etherscan.io/tx/${this.props.depositHash}`;
    } else if (this.props.networkID === '42') {
      url = `https://kovan.etherscan.io/tx/${this.props.depositHash}`;
    } else if (this.props.networkID === '4') {
      url = `https://rinkeby.etherscan.io/tx/${this.props.depositHash}`;
    } else if (this.props.networkID === '1337') {
      url = 'testnet'
    }
    return url;
  };

  render() {
    return (
      <div>
        <div>
          <div
            className="inputContainer"
            onClick={() => window.open(this.getDepositLink(), '_blank', 'resizable=yes')} >
            <button
              style={ style.btnEnabled } 
              className="btnExchange"
              type="button"> 
              Deposit Tx 
            </button>                      
            <input 
              className="txDisplay"                
              disabled               
              value={this.props.depositHash}
            />
          </div>
          <br />
          <div 
            className="inputContainer"
            onClick={() => window.open(`https://blockscout.com/eth/goerli/tx/${this.props.withdrawalHash}`, '_blank', 'resizable=yes')}>
            <button
              style={ style.btnEnabled } 
              className="btnExchange"
              type="button"
              > 
                Withdrawal TX
            </button>
            <input 
              className="txDisplay"                 
              disabled               
              value={this.props.withdrawalHash}
            />
          </div>
          <br />
          <button
            style={style.btnReset}
            onClick={this.props.reset}
            className="btnMetaMask"
            type="button"
          >
            Reset
          </button> 
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    depositHash: state.depositHash,
    withdrawalHash: state.withdrawalHash,
    networkID: state.networkID,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  reset,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Results)
