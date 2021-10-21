const { Blockchain, Block, Trasaction ,CoinBase} = require('./BlockChainLib.js')
const { KeyGenaretor ,User } = require('./KeyGenaretor.js');
const uuid4 = require('uuid4')
const fs = require('fs')
const NUM_OF_PEERS = 3
const dataBase = []
const transctions = []
const NUM_OF_TRANS = 100
const AmountLimit = 55
const genesisUser = new User("Avihai",100)
const users = [genesisUser,new User("Moti",Math.floor(Math.random() *AmountLimit ))
,new User("David",Math.floor(Math.random() *AmountLimit ))
,new User("Inbar",Math.floor(Math.random() *AmountLimit ))
,new User("Moshe",Math.floor(Math.random() *AmountLimit ))]


for (let index = 0; index < NUM_OF_TRANS; index++) {
    let ix = 0
    let iy = 0
    while(ix === iy){
        ix = Math.floor(Math.random() * users.length);
        iy = Math.floor(Math.random() * users.length);
    }
    let amount = Math.floor(Math.random() *AmountLimit )
    let tran = new Trasaction(users[ix],users[iy],amount)
    if(tran.validate){
        transctions.push(tran)
    }
   
    
}


console.log("finish make user and trans")

const blockChain = new Blockchain(new Block(0, Date.now(),[], "",new CoinBase(100,genesisUser)));

blockChain.addBlock(new Block(0, Date.now(),transctions.slice(0,5), "",new CoinBase(100,genesisUser)))
blockChain.addBlock(new Block(0, Date.now(),transctions.slice(5,11), "",new CoinBase(100,genesisUser)))
blockChain.addBlock(new Block(0, Date.now(),transctions.slice(11,16), "",new CoinBase(100,genesisUser)))
blockChain.addBlock(new Block(0, Date.now(),transctions.slice(16,20), "",new CoinBase(100,genesisUser)))
blockChain.addBlock(new Block(0, Date.now(),transctions.slice(21,26), "",new CoinBase(100,genesisUser)))

console.log("finish craeting block chain")

/*
dataBase.push(blockChain)
let jsonToSave = JSON.stringify(dataBase)
fs.writeFileSync("starterInfo.json",jsonToSave)
console.log(" block chain saved as json")
*/

const collactionName = "BlockChain"
const modelName = 'BLock'
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/projBlockChain",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.dropCollection(collactionName).then(res => {
    console.log("block chain deleted successfully")
}).catch(err => {
    console.log("no block chain to deleted successfully")
    console.log(err)
})
db.on('error', console.error.bind(console, 'connection error:'));

// define Schema
 const BlockSchema = mongoose.Schema({blockjson:String});
// compile schema to model
const BlockMongoModel = mongoose.model(modelName,BlockSchema,collactionName);

for (let index = 0; index < blockChain.chain.length; index++) {
    BlockMongoModel({blockjson:JSON.stringify(blockChain.chain[0])}).save().then(newblock=>{
        console.log(newblock,"saved")
    }).catch(err => {
        console.log("opppps")
        console.log(err)
    })
    
}

/*
var blockTosave = new BlockMongoModel({blockjson:JSON.stringify(new Block(0, Date.now(),transctions.slice(0,2), ""))})
blockTosave.save().then(newblock=>{
    console.log(newblock,"saved")
}).catch(err => {
    console.log("opppps")
    console.log(err)
})

*/

