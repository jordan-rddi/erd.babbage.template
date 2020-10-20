<template>
  <div class="home">
    <h2>SimpleStorage Example</h2>
    <h3>Code</h3>
    The contract for this example can be found in src/fudge/contracts/SimpleStorage.sol.
    <br />
    <br />
    <pre>
      // SPDX-License-Identifier: UNLICENSED
      pragma solidity >0.6.0;

      contract SimpleStorage {
          uint public storedData;
          address public owner;

          event OwnerChanged(address indexed _owner);
          
          modifier onlyOwner {
              require (msg.sender == owner, 'Only the owner can call this function');
              _;
          }
          
          constructor(uint initial) {
              storedData = initial;
              owner = msg.sender;
          }

          function changeOwner(address newOwner) public onlyOwner {
              owner = newOwner;
              emit OwnerChanged(newOwner);
          }


          function set(uint x) public onlyOwner {
              storedData = x;
          }
      }
    </pre>
    <h3>Demo</h3>
    <p>Stored Data: {{ storedData }}</p>
    <form @submit.prevent="submitData">
      <input type="text" name="data">
      <button type="submit">Change</button>
    </form>
  </div>
</template>

<script>
const SimpleStorage = require('@/lib/SimpleStorage.js');

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      storedData: ""
    }
  },
  created() {
    /**
     * 1. Get an instance of the SimpleStorage contract
     * 2. Call the storedData method
     * 3. Display that on the screen
     */
    SimpleStorage.getStoredData()
      .then(_storedData => {
        this.storedData = _storedData;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    submitData (event) {
      /**
       * 1. Retrieve input from text box
       * 2. Call set method on SimpleStorage
       * 3. Display result to screen
       */
      let input = event.target.elements.data.value;

      this.storedData = "pending";

      SimpleStorage.setStoredData(input)
        .then(r => {
          this.storedData = input;
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
}
</script>
