# erc-20-abi

[![Build Status](https://travis-ci.com/github/bloq/erc-20.abi.svg?branch=master)](https://travis-ci.com/github/bloq/erc-20.abi)

Just the [ERC-20](https://eips.ethereum.org/EIPS/eip-20) standard token contract [ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI) in an NPM package.
As simple as that!

## Install

```sh
npm install erc-20-abi
```

## Usage

```js
const abi = require('erc-20-abi')

const token = new web3.eth.Contract(abi, address)

token.methods.symbol.call().then(console.log) // prints the token's symbol
```

## License

MIT
