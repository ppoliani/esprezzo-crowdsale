module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 7545,
        network_id: "*" // Match any network id
      },
      kovan: {
        host: "127.0.0.1",
        port: 8545,
        network_id: 42,
        gasPrice: 200000000000,
        gas: 7982189,
        from: "0x6d5b9d59f6c2f06f8f32919613c1bb5e173878ab"
        },
    },
    solc: {
       optimizer: {
         enabled: true,
         runs: 600
       }
    }
  };
