const ethers = require('ethers');

const instantiateGoerliContract = async () => {
   const provider = new ethers.providers.JsonRpcProvider("https://node.goerli.com/", "unspecified");
   const abi = [{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_value","type":"uint256"},{"name":"_fromChain","type":"uint256"},{"name":"_txHash","type":"bytes32"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"setBridge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"bridge","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_owner","type":"address"}],"name":"ContractCreation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_addr","type":"address"}],"name":"BridgeSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_addr","type":"address"}],"name":"BridgeFunded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_recipient","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_fromChain","type":"uint256"}],"name":"Withdraw","type":"event"}];
   let goerliContract = new ethers.Contract('0xa8485dc30d88296010a5b06f28bfbb7e22071023', abi, provider);
   return goerliContract;
}

export default instantiateGoerliContract;

