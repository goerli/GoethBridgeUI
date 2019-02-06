import * as config from '../assets/config/constants';

const ethers = require('ethers');

const instantiateGoerliContract = async () => {    
  const provider = new ethers.providers.JsonRpcProvider(config.GOERLI_HTTPS_ENDPOINT);   
  let goerliContract = new ethers.Contract(
    config.WITHDRAW_CONTRACT_ADDRESS_GOERLI, 
    config.WITHDRAW_CONTRACT_ABI_GOERLI,
    provider,
  );
  return goerliContract;
}

export default instantiateGoerliContract;
