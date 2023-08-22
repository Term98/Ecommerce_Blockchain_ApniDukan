/* eslint-disable no-undef */
const EthNFT = artifacts.require('EthNFT')

module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts()

  await deployer.deploy(EthNFT, 'Eth NFTs', 'ETN', 10, accounts[1])
}