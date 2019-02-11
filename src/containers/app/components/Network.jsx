import React from 'react';
import { connect } from 'react-redux';
// import './Network.css'
import '../App.css'

class Network extends React.Component {
  render() {
    const { isLoading, networkID } = this.props;  
    return (
      <div className="networkContainer">
        {
          isLoading
            ? <p> Network Loading</p>
            : <p className="netowrkStyles">
              Network detected:  
              <code className="networkName"> 
                { 
                  networkID === ''
                    ? 'Pending'
                    : networkID 
                } 
              </code>
            </p>
        }       
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    networkID: state.networkID,
  })
};

export default connect(mapStateToProps, null)(Network);
