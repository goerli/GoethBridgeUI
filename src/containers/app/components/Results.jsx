import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { reset } from '../../store/actionCreator';

const style = {
  btnReset: {
    backgroundColor: '#82d5ec',
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
              <h3> <b> Deposit TX </b> </h3>
              <p> <a href={this.getDepositLink()} target="_blank" rel="noopener noreferrer" style={link}> { this.props.depositHash}  </a>  </p>
              <br />
              <h3> <b> Withdrawal TX </b> </h3>
              <p> <a href={`https://blockscout.com/eth/goerli/tx/${this.props.withdrawalHash}`} target="_blank" rel="noopener noreferrer" style={link}> { this.props.withdrawalHash} </a> </p>
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


const link = {
  color: '#8ad9d1',
  textDecoration: 'none',
};

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
