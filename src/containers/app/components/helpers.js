import * as config from '../../../assets/config/constants';

const ethers = require('ethers')

const validIDs = [ '3', '4', '42', '1337']

export const isValidNetworkID = (id) => {
  return validIDs.includes(id)
}

export const executeDeposit = async (address, amount, networkID) => {
  let contract = await instantiateDepositContract(address, networkID)
  const wei = ethers.utils.parseEther(amount);
  const overrideOptions = {
    value: wei,
  };
  let tx = await contract.functions.deposit(address, config.GOERLI_CHAIN_ID, overrideOptions);
  return tx.hash;
}

/**
 * getDepositContractAddress returns the contract address for the given chain id.
 * @param {*} network
 */
const getDepositContractAddress = (network) => {
  let contractAddress;
  if (network === '3') {
    contractAddress= config.DEPOSIT_CONTRACT_ADDRESS_ROPSTEN;
  } else if (network === '42') {
    contractAddress = config.DEPOSIT_CONTRACT_ADDRESS_KOVAN;
  } else if (network === '4') {
    contractAddress = config.DEPOSIT_CONTRACT_ADDRESS_RINKEBY;
  } else if (network === '1337') {
    contractAddress = config.DEPOSIT_CONTRACT_ADDRESS_TESTNET;
  }else{
    return null; //handle this error
  }
  return contractAddress;
}

/**
 * instantiateDepositContract returns the instantiated contract, transaction count, and signer.
 * @param {*} provider
 * @param {*} pubKey
 * @param {*} network
 */
const instantiateDepositContract = async (pubKey, network) => {
  const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
  const signer = provider.getSigner();
  const contractAddress = getDepositContractAddress(network);
  if (contractAddress !== null) {
    let contract = new ethers.Contract(contractAddress, config.DEPOSIT_CONTRACT_ABI, signer);
    return contract
  } else {
    console.log('Error instantiating deposit contract!')
  }
};

export const idToNetworkName = (id) => {
  if(id === '3') {
    return 'ropsten'
  } else if (id === '4') {
    return 'rinkeby'
  } else if (id === '42') {
    return 'kovan'
  } else {
    console.log(`Unrecognized id: ${id}`)
  }
}


