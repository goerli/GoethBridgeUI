import React from 'react';
import { connect } from 'react-redux';
import './Network.css'

class EventDisplay extends React.Component {
 render () {
  const { isLoading, network } = this.props;
    return (
      <div className="networkContainer">
        {
          isLoading
          ? null
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
  const { selectedNetwork, providerObj, pubKey } = network;
  return { network: selectedNetwork, provider: providerObj, pubKey};
};

export default connect(mapStateToProps, null)(EventDisplay);