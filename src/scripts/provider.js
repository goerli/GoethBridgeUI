const Web3 = require('web3');
const ethers = require('ethers');

const provider = async () => {
  let providerObj;
  let pubKey;
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      pubKey = await window.ethereum.enable()[0];
      providerObj = new ethers.providers.Web3Provider(window.web3.currentProvider)
    } catch (error) {
      console.log("oops we caught an error", error)
    }
  }
  else if (window.web3) {
    providerObj = new ethers.providers.Web3Provider(window.web3.currentProvider);
	  pubKey = await window.web3.eth.defaultAccount;
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
  return { providerObj, pubKey };
}

export default provider;

