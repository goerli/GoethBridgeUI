import React from 'react';
import { connect } from 'react-redux';
import './Network.css'

class Network extends React.Component {

 render () {
  const { isLoading, network } = this.props;  
    return (
      <div className="networkContainer">
        {
          isLoading
          ? <p> Network Loading</p>
          : <p className="netowrkStyles">
              Network detected:  
              <code className="networkName"> 
                { 
                  network === ''
                  ? 'Pending'
                  : network 
                } 
              </code>
            </p>
        }       
      </div>
    )
 }
}

const mapStateToProps = ({ network }) => {
  const { selectedNetwork } = network;
  return { network: selectedNetwork};
};

export default connect(mapStateToProps, null)(Network);