import React from 'react';
import './Network.css'

class Network extends React.Component {
 render () {
  const { isLoading } = this.props;
    return (
      <div className="networkContainer">
        {
          isLoading
          ? null
          : <p className="netowrkStyles">
              Network detected:  <code className="networkName"> ropsten </code>
            </p>
        }       
      </div>
    )
 }
}

export default Network;