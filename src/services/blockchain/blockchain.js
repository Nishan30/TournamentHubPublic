"use client"

import { ethers, JsonRpcProvider } from 'ethers';
//import abi from 'artifacts/DonationDapp.sol/DonationDapp.json'

const contractAddress = process.env.CONTRACT_ADDRESS;
//const contractAbi = abi.abi
let tx, ethereum

  ethereum = window.ethereum

const toWei = (num) => ethers.parseEther(num.toString())
const fromWei = (num) => ethers.formatEther(num)

const unsignedEthereumContract = async () => {
  const provider = new JsonRpcProvider('http://127.0.0.1:8545/');
  const contract = new ethers.Contract(contractAddress, contractAbi, provider)
  return contract
}
const signedEthereumContract = async () => {
  const provider = new JsonRpcProvider('http://127.0.0.1:8545/');
  const signer = await provider.getSigner()
  const contract = new ethers.Contract(contractAddress, contractAbi, signer)
  return contract
}
const mainEthereumContract = async () => {
  const provider = new JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const signer = wallet.connect(provider);
  const contract = new ethers.Contract(contractAddress, contractAbi, signer)
  return contract
}

const ssrEthereumContract = async () => {
  const provider = new JsonRpcProvider(process.env.RPC_URL)
  //const wallet = ethers.Wallet.createRandom()
  //const signer = provider.getSigner()
  const contract = new ethers.Contract(contractAddress, contractAbi, provider)
  return contract
}


const monitorWalletConnection = async () => {
  try {
    if (!ethereum) return reportError('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      store.dispatch(setWallet(accounts[0]))
      await monitorWalletConnection()
    })

    if (accounts.length) {
      store.dispatch(setWallet(accounts[0]))
    } else {
      store.dispatch(setWallet(''))
      reportError('Please, connect wallet, no accounts found.')
    }
  } catch (error) {
    reportError(error)
  }
}


const donateMoney = async (id, amount) => {
  try {
    
    if (!ethereum) return reportError('Please install Metamask')
    const wallet = store.getState().globalStates.wallet
    const contract = await signedEthereumContract()

    tx = await contract.donateMoney(id, {
      from: wallet,
      value: toWei(amount),
    })
    tx.wait()
    //mongoDB data store and update
  } catch (error) {
    reportError(error)
  }
}

const structDonation = (donations) =>
    donations.map((donation) => ({
    id: Number(donation.id),
    totalAmount: fromWei(donation.totalAmount),
    moneyRaised: fromWei(donation.moneyRaised),
    donorCount: Number(donation.donorCount),
    owner: donation.owner.toLowerCase()
  }))

const reportError = (error) => {
  console.log(error.message)
}

export {
  monitorWalletConnection,
  donateMoney,
  structDonation,
  unsignedEthereumContract,
  signedEthereumContract,
  ssrEthereumContract,
  mainEthereumContract,
  toWei,
  fromWei
}