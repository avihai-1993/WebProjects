const SHA256 = require("crypto-js/sha256");



class Block {

    constructor(index, timestamp, data, previousHash = '',coinBase = null) {

        this.index = index;

        this.previousHash = previousHash;

        this.timestamp = timestamp;

        this.data = data;

        this.nonce = 0;

        this.hash = this.calculateHash();

        if(coinBase !== null || coinBase !== undefined){
            this.coinBase = coinBase
        }

    }



    calculateHash() {

        return SHA256(this.index + this.nonce + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();

    }


    mineBlock(difficulty) {

        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }


}

class Transaction {
    constructor(fromAddress, toAddress, amount) {
       
        if(fromAddress.coinbase > amount && amount >= 0){
            this.fromAddress = fromAddress;
            this.toAddress = toAddress;
            this.amount = amount;
            this.fromAddress.addToCoinBase(-amount)
            this.toAddress.addToCoinBase(amount)
            this.validate = true
        }
        else{
            
            this.validate = false
        }
      
    }
    
}

class CoinBase {
    constructor(amount, toAddress ) {
       
        this.toAddress = toAddress;
        this.amount = amount;
        this.toAddress.addToCoinBase(amount)
    }
}


class Blockchain {
    constructor(GenesisBlock) {
        this.chain = [GenesisBlock];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    //createGenesisBlock() { return new Block(0, "01/01/2018", "Genesis", "0"); }
    getLatestBlock() { return this.chain[this.chain.length - 1]; }
      

    addBlock(newBlock) {
        newBlock.index = this.chain.length;
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    minePendingTransactions(miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
        console.log('Block successfully mined!');
        this.chain.push(block);
        this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)]; //In reality  limit block   memPool
        this.pendingTransactions = [];
    }
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

}
module.exports.Blockchain = Blockchain;
module.exports.Block = Block;
module.exports.Trasaction = Transaction;
module.exports.CoinBase = CoinBase;