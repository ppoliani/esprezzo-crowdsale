var EsprezzoCrowdsale = artifacts.require("./EsprezzoCrowdsale.sol");

module.exports = function(deployer, _, accounts) {
  const startTime = Math.round((new Date(Date.now() + 86400000).getTime())/1000); // Tomorrow
  const endTime = Math.round((new Date().getTime() + (86400000 * 20))/1000); // Today + 20 days

  deployer.deploy(EsprezzoCrowdsale, 
    startTime, 
    endTime,
    6257, 
    accounts[9], // Kovan test
    web3.toWei(2, 'ether'),
    web3.toWei(55000, 'ether') // 55000 ETH
  );
};
