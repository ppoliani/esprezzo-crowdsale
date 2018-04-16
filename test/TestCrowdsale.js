var EsprezzoCrowdsale = artifacts.require("EsprezzoCrowdsale");
var EsprezzoToken = artifacts.require("EsprezzoToken");

contract('EsprezzoCrowdsale', function(accounts) {
    it('should deploy the token and store the address', function(done){
        EsprezzoCrowdsale.deployed().then(async function(instance) {
            const token = await instance.token.call();
            assert(token, 'Token address couldn\'t be stored');
            done();
       });
    });

    it('should set stage to PreICO', function(done){
        EsprezzoCrowdsale.deployed().then(async function(instance) {
          await instance.setCrowdsaleStage(0);
          const stage = await instance.stage.call();
          assert.equal(stage.toNumber(), 0, 'The stage couldn\'t be set to PreICO');
          done();
       });
    });

    it('one ETH should buy 5330 Esprezzo Tokens in PreICO', function(done){
        EsprezzoCrowdsale.deployed().then(async function(instance) {
            const data = await instance.sendTransaction({ from: accounts[7], value: web3.toWei(1, "ether")});
            const tokenAddress = await instance.token.call();
            const esprezzoToken = EsprezzoToken.at(tokenAddress);
            const tokenAmount = await esprezzoToken.balanceOf(accounts[7]);
            assert.equal(tokenAmount.toNumber(), 5330, 'The sender didn\'t receive the tokens as per PreICO rate');
            done();
       });
    });

    it('should transfer the ETH to wallet immediately in Pre ICO', function(done){
        EsprezzoCrowdsale.deployed().then(async function(instance) {
            let balanceOfBeneficiary = await web3.eth.getBalance(accounts[9]);
            balanceOfBeneficiary = Number(balanceOfBeneficiary.toString(10));

            await instance.sendTransaction({ from: accounts[1], value: web3.toWei(2, "ether")});

            let newBalanceOfBeneficiary = await web3.eth.getBalance(accounts[9]);
            newBalanceOfBeneficiary = Number(newBalanceOfBeneficiary.toString(10));

            assert.equal(newBalanceOfBeneficiary, balanceOfBeneficiary + 2000000000000000000, 'ETH couldn\'t be transferred to the beneficiary');
            done();
       });
    });

    it('should set variable `totalWeiRaisedDuringPreICO` correctly', function(done){
        EsprezzoCrowdsale.deployed().then(async function(instance) {
            var amount = await instance.totalWeiRaisedDuringPreICO.call();
            assert.equal(amount.toNumber(), web3.toWei(3, "ether"), 'Total ETH raised in PreICO was not calculated correctly');
            done();
       });
    });

    it('should set stage to ICO', function(done){
        EsprezzoCrowdsale.deployed().then(async function(instance) {
          await instance.setCrowdsaleStage(1);
          const stage = await instance.stage.call();
          assert.equal(stage.toNumber(), 1, 'The stage couldn\'t be set to ICO');
          done();
       });
    });

    it('one ETH should buy 4635 EZP Tokens in ICO', function(done){
        EsprezzoCrowdsale.deployed().then(async function(instance) {
            const data = await instance.sendTransaction({ from: accounts[2], value: web3.toWei(1, "ether")});
            const tokenAddress = await instance.token.call();
            const esprezzoToken = EsprezzoToken.at(tokenAddress);
            const tokenAmount = await esprezzoToken.balanceOf(accounts[2]);
            assert.equal(tokenAmount.toNumber(), 4635, 'The sender didn\'t receive the tokens as per ICO rate');
            done();
       });
    });

    it('should transfer the raised ETH to RefundVault during ICO', function(done){
        EsprezzoCrowdsale.deployed().then(async function(instance) {
            var vaultAddress = await instance.vault.call();

            let balance = await web3.eth.getBalance(vaultAddress);

            assert.equal(balance.toNumber(), 1000000000000000000, 'ETH couldn\'t be transferred to the vault');
            done();
       });
    });

    it('Vault balance should be added to our wallet once ICO is over', function(done){
        EsprezzoCrowdsale.deployed().then(async function(instance) {
            let balanceOfBeneficiary = await web3.eth.getBalance(accounts[9]);
            balanceOfBeneficiary = balanceOfBeneficiary.toNumber();

            var vaultAddress = await instance.vault.call();
            let vaultBalance = await web3.eth.getBalance(vaultAddress);

            await instance.finish(accounts[0], accounts[1], accounts[2]);

            let newBalanceOfBeneficiary = await web3.eth.getBalance(accounts[9]);
            newBalanceOfBeneficiary = newBalanceOfBeneficiary.toNumber();

            assert.equal(newBalanceOfBeneficiary, balanceOfBeneficiary + vaultBalance.toNumber(), 'Vault balance couldn\'t be sent to the wallet');
            done();
       });
    });
});