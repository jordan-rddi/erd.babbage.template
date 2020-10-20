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
    <form @submit.prevent="setStoredData">
      Change Data
      <input type="text" name="data">
      <button type="submit">Change</button>
    </form>
    <p>Owner: {{ owner }}</p>
    <form @submit.prevent="setOwner">
      Change Owner
      <input type="text" name="owner">
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
      storedData: "",
      owner: ""
    }
  },
  created() {
    /**
     * 1. Call the getStoredData method on the SimpleStorage class
     * 2. Display result on the screen
     */
    SimpleStorage.getStoredData()
      .then(_storedData => {
        this.storedData = _storedData;
      })
      .catch(error => {
        console.log(error);
      });

    /**
     * 1. Call the getOwner method on the SimpleStorage class
     * 2. Display result on the screen
     */
    SimpleStorage.getOwner()
      .then(_owner => {
        this.owner = _owner;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    setStoredData (event) {
      /**
       * 1. Retrieve input from text box
       * 2. Call setStoredData method on SimpleStorage
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
    },
    setOwner (event) {
      /**
       * 1. Retrieve input from text box
       * 2. Call setOwner method on SimpleStorage
       * 3. Display result to screen
       */
      let input = event.target.elements.owner.value;

      this.owner = "pending";

      SimpleStorage.setOwner(input)
        .then(r => {
          this.owner = input;
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
}
</script>
