require('dotenv').config();
const token = process.env.mainnet;
const W3 = require('web3');


const main = async() => {
    const w3 = new W3('https://data-seed-prebsc-1-s1.binance.org:8545/')
    const priv = '0xef256dee066fa4b3564566585d5535cb5b830fa1a146df29d16a11451cd2d632'; // Private Key
    const recipt = '0x05355FA1B61A53C4b266Ef2b459CB4FFfB6134B2';
    const account = w3.eth.accounts.privateKeyToAccount(priv);
    const balance = w3.utils.fromWei(await w3.eth.getBalance(account.address), 'ether')
    //console.log(balance)
    const gasPrice = await w3.eth.getGasPrice();
    const gasLimit = 21000;
    const f = gasPrice *gasLimit;
    const fee = w3.utils.fromWei(f.toString(), 'ether');
    const v = balance - fee;
    const tx = {}
          tx.from = account.address;
          tx.to = recipt;
          tx.gasPrice = w3.utils.numberToHex(gasPrice)
          tx.gasLimit = w3.utils.numberToHex(gasLimit)
          tx.value = w3.utils.toWei(v.toString(), 'ether');
    if(v > balance){
        console.error('balance mu gak ada')
    } else if(v < 0 ) {
        console.error('balance mu gak ada')
    } else {
        const sign = await account.signTransaction(tx).then(err => {})
        const send = await w3.eth.sendSignedTransaction(sign.rawTransaction).then(err => {})
        console.log(send.transactionHash)
    }
}
setInterval(function() {
    main()
}, 6000);