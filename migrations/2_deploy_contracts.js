var EsprezzoCrowdsale = artifacts.require("./EsprezzoCrowdsale.sol");

module.exports = function(deployer) {
  const startTime = Math.round((new Date(Date.now() - 86400000).getTime())/1000); // Yesterday
  const endTime = Math.round((new Date().getTime() + (86400000 * 20))/1000); // Today + 20 days
  deployer.deploy(EsprezzoCrowdsale, 
    startTime, 
    endTime,
    6257, 
    "0xe14dfcee0e56224d86ad35359b1f0e4a15453453", // Kovan test
    web3.toWei(2, 'ether'),
    web3.toWei(55000, 'ether') // 55000 ETH
  );
};
