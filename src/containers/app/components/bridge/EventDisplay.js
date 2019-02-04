import React from 'react';
import './Network.css'

class EventDisplay extends React.Component {
 render () {
    return (
      <div className="networkContainer">
        <div>
          <h3> 
            Waiting for pending events ....:) 
          </h3>
          <span className="loader"><span className="loader-inner"></span></span>
        </div>
      </div>
    )
 }
}

export default EventDisplay;