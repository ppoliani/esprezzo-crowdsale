const RATE = 6257;

const calculateTokens = contrib => RATE * contrib * (10 ** 18)

const expectVMException = prom => new Promise((resolve, reject) => {
  prom
    .then(result => reject(result))
    .catch((e) => {
      expect(e.message).to.include('VM Exception');
      resolve(e);
    });
});

module.exports = {
  calculateTokens,
  expectVMException
}
