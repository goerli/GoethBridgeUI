const Web3 = require('web3');
const ethers = require('ethers');

const provider = async () => {
  let provider
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
        const acc = await window.ethereum.enable();
        console.log(acc)
        provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
        console.log({provider});
        const signer = provider.getSigner()
        console.log({signer});
    } catch (error) {
        console.log("oops we caught an error", error)
    }
  }
  else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        console.log("Legacy")
        console.log(window.web3.eth.accounts)
  } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
  return provider;
}

export default provider;

