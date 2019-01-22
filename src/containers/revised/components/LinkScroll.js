import React, { Component } from 'react';
import './LinkScroll.css';
import * as constants from '../config/constants';

class LinkScroll extends Component {
  state = { 
    linkData: []
  };

  componentDidMount = () => {
    this.generateBatch(5);
    this.createScrollView();
  };

  createScrollView = () => {
    setInterval(() => { 
      this.generateBatch(2);
    }, 25000);
  };

  generateBatch = (amount) => {
    let data = [];
    for (let i = 0; i < amount; i += 1) {
      data.push({ href: constants.HREF_ABOUT, text: constants.TITLE_ABOUT });
      data.push({ href: constants.HREF_WEBSITE, text: constants.TITLE_WEBSITE });
      data.push({ href: constants.HREF_GITHUB, text: constants.TITLE_GITHUB });
      data.push({ href: constants.HREF_GITTER, text: constants.TITLE_GITTER });
      data.push({ href: constants.HREF_BOUNTIES, text: constants.TITLE_BOUNTIES });
      data.push({ href: constants.HREF_STATS, text: constants.TITLE_STATS });
      data.push({ href: constants.HREF_EXPLORER, text: constants.TITLE_EXPLORER });
      data.push({ href: constants.HREF_CONTRIBUTE, text: constants.TITLE_CONTRIBUTE });
      data.push({ href: constants.HREF_GOERLICON, text: constants.TITLE_GOERLICON });
    }
    this.setState({ linkData: [...this.state.linkData, ...data] });
  };

  render() {
    const { linkData } = this.state;
    return (
      <div className="linkContainer">
        <p>          
          {
            linkData.length === 0 
            ? null
            : linkData.map((item, index) => {
                return <a key={index} className="pElements" href={item.href} target="_blank" rel="noopener noreferrer"> {item.text} </a> 
              })
          }
        </p>
      </div>
    );
  }
}

export default LinkScroll;
