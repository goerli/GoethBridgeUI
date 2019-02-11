import React from 'react'
import { connect } from 'react-redux';
// import './bridge/Network.css'
import '../App.css'

class Processing extends React.Component {
  render() {
    return (
      <div className="networkContainer">
        <div>
          <h3>
            Waiting for pending events ....:)
          </h3>
          <span className="loader"><span className="loader-inner" /></span>
        </div>
      </div>
    )
  }
}

export default connect()(Processing)
