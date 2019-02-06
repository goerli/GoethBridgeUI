import * as config from '../assets/config/constants';

const ethers = require('ethers');

/**
 * executeDeposit will instantiate the deposit contract & generate the deposit tx.
 * @param {*} provider 
 * @param {*} amount 
 * @param {*} network 
 * @param {*} pubKey 
 */
const executeDeposit = async (provider, amount, network, pubKey) => { 
  const { contract, txCount } = await instantiateDepositContract(provider, pubKey, network);
  const txHash = await generateDepositTx(contract, amount, txCount, pubKey, provider, network);
  return { txHash, contract };
};

/**
 * instantiateDepositContract returns the instantiated contract, transaction count, and signer.
 * @param {*} provider 
 * @param {*} pubKey 
 * @param {*} network 
 */
const instantiateDepositContract = async (provider, pubKey, network) => {
  const txCount = await provider.getTransactionCount(pubKey);
  const signer = provider.getSigner();
  const contractAddress = getDepositContractAddress(network);
  if (contractAddress !== null) {
    let contract = new ethers.Contract(contractAddress, config.DEPOSIT_CONTRACT_ABI, signer);
    return { contract, txCount, signer };
  }
};

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
  } else {
    return null; //handle this error
  }
  return contractAddress;
}

/**
 * generateDepositTx will generate the deposit tx to deposit x amount of test net eth to the bridge contract
 * on whichever network is selected.
 * NOTE: current networks are ropsten, kovan, rinkeby.
 * @param {*} contract 
 * @param {*} amount 
 * @param {*} txCount 
 * @param {*} pubKey 
 * @param {*} provider 
 * @param {*} network 
 */
const generateDepositTx = async (contract, amount, txCount, pubKey, provider, network) => {
  const wei = ethers.utils.parseEther(amount);
  const overrideOptions = {
    gasLimit: 250000,
    gasPrice: 9000000000,
    nonce: txCount,
    value: wei,
  };
  let tx = await contract.functions.deposit(pubKey, config.GOERLI_CHAIN_ID, overrideOptions);
  return tx.hash;
};

export default executeDeposit;
