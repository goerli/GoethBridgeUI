const ethers = require('ethers');

/**
 * executeDeposit will make a request to the api to return the contract addresses.
 * You will instantiate the bridge contract & execute the deposit TX.
 * @param {*} provider 
 * @param {*} amount 
 * @param {*} network 
 * @param {*} pubKey 
 */
const executeDeposit = async (provider, amount, network, pubKey) => { 
  const data = [
    {
      id: '4',
      address: '0x00'
    },
    {
      id: '5',
      address: '0x00'
    }
  ];
  const contractAddress = getContractAddressByNetwork(data, network);
  if (contractAddress !== null) {
    const { contract, txCount } = await instantiateContract(provider, pubKey, contractAddress, network);
    const depositTx = await executeTransaction(contract, amount, txCount, pubKey, provider, network);
    return { contract, depositTx };
  }
};

/**
 * Will return the contract address based on the current network ID.
 * @param {*} data 
 * @param {*} network 
 */
const getContractAddressByNetwork = (data, network) => {
  if (data.length > 0) {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].id === network) {
        return data[i].address;
      }
    }
  }
  return null;
};

const instantiateContract = async (provider, pubKey, contractAddress, network) => {
  const txCount = await provider.getTransactionCount(pubKey);
  const abi = [{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_toChain","type":"uint256"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_owner","type":"address"}],"name":"ContractCreation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_recipient","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_toChain","type":"uint256"}],"name":"Deposit","type":"event"}];
  const signer = provider.getSigner();
  let contract = new ethers.Contract(contractAddress, abi, signer);
  return { contract, txCount, signer };
};

const executeTransaction = async (contract, amount, txCount, pubKey, provider, network) => {
  const wei = ethers.utils.parseEther(amount);
  const overrideOptions = {
    gasLimit: 250000,
    gasPrice: 9000000000,
    nonce: txCount,
    value: wei,
  };
  let tx = await contract.functions.deposit(pubKey, 6284, overrideOptions);
  return tx.hash;
};

export default executeDeposit;

