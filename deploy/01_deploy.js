require("@nomiclabs/hardhat-waffle");
require('hardhat-deploy');
let {networkConfig} = require('../helper-hardhat-config');

const description = 'https://wfcgxtzdogxn.moralishost.com/0000000000000000000000000000000000000000000000000000000000000000.json'

module.exports = async({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()
    const chainId = await getChainId()

    log("-----------------------------")
    const NFT = await deploy("NFTContract", {
        from: deployer,
        log: true
    })

    log(`You have deployed an NFT contract to ${NFT.address}`)

    // to get the contract information after it has been deployed
    const NFTContract = await ethers.getContractFactory("NFTContract")
    // this is not part of the deployment
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]
    const NFTNew = new ethers.Contract(NFT.address, NFTContract.interface, signer)
    const networkName = networkConfig[chainId]['name'];
    log(`Verify with \n npx hardhat verify --network ${networkName} ${NFT.address}`)

    log(`You've made a NFT!`)
    log(`You can view the tokenURI here ${description}`)
}