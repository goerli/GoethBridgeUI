const ethers = require('ethers');

const executeDeposit = async (provider, amount, network) => {
    console.log('in execute deposit');
    const contract = await instantiateContract(provider);
    console.log({contract});
}

const instantiateContract = (provider) => {
  const abi = [{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_toChain","type":"uint256"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_owner","type":"address"}],"name":"ContractCreation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_recipient","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_toChain","type":"uint256"}],"name":"Deposit","type":"event"}];
  const signer = provider.getSigner()
  let contract = new ethers.Contract('0x17e59beDE7FeB4DfA0CDCb61601D3efBa7d074c8', abi, signer);
  return contract;
}

export default executeDeposit;

