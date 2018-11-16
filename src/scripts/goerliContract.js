const ethers = require('ethers');

const instantiateGoerliContract = async () => {
   const provider = new ethers.providers.JsonRpcProvider("http://142.93.146.160");
   const abi = [{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_value","type":"uint256"},{"name":"_fromChain","type":"uint256"},{"name":"_txHash","type":"bytes32"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"setBridge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"bridge","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_owner","type":"address"}],"name":"ContractCreation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_addr","type":"address"}],"name":"BridgeSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_addr","type":"address"}],"name":"BridgeFunded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_recipient","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_fromChain","type":"uint256"}],"name":"Withdraw","type":"event"}];
    let goerliContract = new ethers.Contract('0xa8485dc30d88296010a5b06f28bfbb7e22071023', abi, provider);
    console.log({goerliContract});
    return goerliContract;
    
}

// const executeDeposit = async (provider, amount, network, pubKey) => {
//   const { contract, txCount, signer } = await instantiateContract(provider, pubKey, network);
//   await executeTransaction(contract, amount, txCount, pubKey, provider, network);
//   return contract;
// };

// const instantiateContract = async (provider, pubKey, network) => {
//   const txCount = await provider.getTransactionCount(pubKey[0]);
//   const abi = [{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_toChain","type":"uint256"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_owner","type":"address"}],"name":"ContractCreation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_recipient","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_toChain","type":"uint256"}],"name":"Deposit","type":"event"}];
//   const signer = provider.getSigner();
//   let contract = new ethers.Contract('0x17e59beDE7FeB4DfA0CDCb61601D3efBa7d074c8', abi, signer);
//   return { contract, txCount, signer };
// };


export default instantiateGoerliContract;

