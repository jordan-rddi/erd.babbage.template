const MetaMask = require('@/lib/MetaMask');

class simpleStorage {
  constructor() {
    const simpleStorageData = require('@/fudge/build/contracts/SimpleStorage.json');

    this.abi = simpleStorageData.abi;
    this.address = simpleStorageData.deployment.address;
    this.web3 = MetaMask.web3;

    this.contract = new this.web3.eth.Contract(this.abi, this.address);
  }

  getStoredData() {
    return this.contract.methods.storedData().call();
  }

  setStoredData(data) {
    let accounts = [];

    return new Promise((resolve, reject) => {
      MetaMask.getAccounts()
        .then(_accounts => {
          accounts = _accounts;

          return this.contract.methods.set(data).estimateGas({ from: accounts[0] })
        })
        .then(gasEstimate => {
          console.log(`Gas estimation: ${gasEstimate}`);
          
          return this.contract.methods.set(data).send({ from: accounts[0], gas: gasEstimate });
        })
        .then(receipt => {
          console.log(receipt);

          resolve(receipt);
        })
        .catch(error => {
          reject(error);
        })  
    });
  }

  getOwner() {
    return this.contract.methods.owner().call();
  }

  setOwner(address) {
    let accounts = [];

    return new Promise((resolve, reject) => {
      MetaMask.getAccounts()
        .then(_accounts => {
          accounts = _accounts;

          return this.contract.methods.changeOwner(address).estimateGas({ from: accounts[0] })
        })
        .then(gasEstimate => {
          console.log(`Gas estimation: ${gasEstimate}`);
          
          return this.contract.methods.changeOwner(address).send({ from: accounts[0], gas: gasEstimate });
        })
        .then(receipt => {
          console.log(receipt);

          resolve(receipt);
        })
        .catch(error => {
          reject(error);
        })  
    });
  }
}

const SimpleStorage = new simpleStorage();
module.exports = SimpleStorage;