const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload');
const uuid4 = require('uuid4')
const fs = require('fs')
const SHA256 = require("crypto-js/sha256");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const PORT = 5002
const { Blockchain, Block, Trasaction ,CoinBase} = require('./BlockChainLib.js')
const { KeyGenaretor ,User } = require('./KeyGenaretor.js');
const { randomInt } = require('crypto');
const pages = ['/Hash.html', '/Block.html', '/BlockChain.html', '/Tokens.html', '/Distributed.html', '/CoinBase.html', '/Keys.html',
        '/Transactions.html', '/VerifySignatuer.html', '/SuperBlockChain.html'
    ]
    //for distrabution simoulation
const DistBlockChain = new Blockchain(new Block(0, Date.now(), "", ""));
DistBlockChain.addBlock(new Block(0, Date.now(), "", ""))
DistBlockChain.addBlock(new Block(0, Date.now(), "", ""))
DistBlockChain.addBlock(new Block(0, Date.now(), "", ""))
DistBlockChain.addBlock(new Block(0, Date.now(), "", ""))

///for working with mongo db
const transctions = []
const NUM_OF_TRANS = 100
const AmountLimit = 55
const AmountLimitToGive = 10
const genesisUser = new User("Avihai",100)
const users = [genesisUser,new User("Moti",Math.floor(Math.random() *AmountLimit ))
,new User("David",Math.floor(Math.random() *AmountLimit ))
,new User("Inbar",Math.floor(Math.random() *AmountLimit ))
,new User("Moshe",Math.floor(Math.random() *AmountLimit ))]
for (let index = 0; index < NUM_OF_TRANS; index++) {
    let ix = 0
    let iy = 0
    let amount = Math.floor(Math.random() *AmountLimitToGive ) + 1
    while(ix === iy && users[ix].coinbase > amount){
        
        ix = Math.floor(Math.random() * users.length);
        iy = Math.floor(Math.random() * users.length);
    }
    let tran = new Trasaction(users[ix],users[iy],amount)
    
    if(tran.validate){
      
        transctions.push(tran)
    }
    
}
console.log("finish make users and trans")
const genBlock = new Block(0, Date.now(),[], "",new CoinBase(100,genesisUser))
genBlock.mineBlock(3)
const blockChain = new Blockchain(genBlock);
blockChain.addBlock(new Block(0, Date.now(),transctions.slice(0,5), "",new CoinBase(100,genesisUser)))
blockChain.addBlock(new Block(0, Date.now(),transctions.slice(5,11), "",new CoinBase(100,genesisUser)))
blockChain.addBlock(new Block(0, Date.now(),transctions.slice(11,16), "",new CoinBase(100,genesisUser)))
blockChain.addBlock(new Block(0, Date.now(),transctions.slice(16,20), "",new CoinBase(100,genesisUser)))
blockChain.addBlock(new Block(0, Date.now(),transctions.slice(21,26), "",new CoinBase(100,genesisUser)))
console.log("finish craeting block chain")

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload());
app.use(express.static('public')); //public accses to directory
for (let index = 0; index < pages.length; index++) {
    app.get(pages[index], function(req, res) { res.sendFile(__dirname + "/" + pages[index]) })
}
app.get('/Pages', function(req, res) { res.send({ pages }) })
app.post('/HashCalc', function(req, res) { res.send({ hash: SHA256(req.body.data).toString() }) })
app.post('/mine', function(req, res) {
    let blockobjData = req.body
    let block = new Block(blockobjData.index, blockobjData.timestamp, blockobjData.data)
    block.mineBlock(4)
    res.send({ hash: block.hash, nonce: block.nonce, index: block.index, data: block.data })
})
app.get('/getChainSimoleter', function(req, res) {
    let bc = new Blockchain(new Block(0, Date.now(), "", ""));
    bc.addBlock(new Block(0, Date.now(), "", ""))
    bc.addBlock(new Block(0, Date.now(), "", ""))
    bc.addBlock(new Block(0, Date.now(), "", ""))
    bc.addBlock(new Block(0, Date.now(), "", ""))
    res.send({ chain: [...bc.chain] })
})
app.get('/getChainSimoleterD', function(req, res) {

    res.send({ chain: [...DistBlockChain.chain] })
})

app.get('/getKeys', function(req, res) {
    let kg = new KeyGenaretor()
    res.send({ private: kg.getPrivateKey(), public: kg.getPublicKey() })
})

app.post('/sign', function(req, res) {

    let pk = ec.keyFromPrivate(req.body.private, 'hex')
    let sig = pk.sign(SHA256(req.body.data).toString(), 'base64').toDER('hex')
    res.send({ sign: sig })
})
app.post('/verify', function(req, res) {
    try {

        let key = ec.keyFromPublic(req.body.public, 'hex')
        let verified = key.verify(SHA256(req.body.data).toString(), req.body.sign)
        res.send({ ver: verified })
    } catch (e) {
        res.send({ ver: false })
    }



})

//connecting to mongoDb and saveing simulation data
const collactionName = "BlockChain"
const modelName = 'BLock'
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/projBlockChain",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
// define Schema
 const BlockSchema = mongoose.Schema({blockjson:String});
// compile schema to model
const BlockMongoModel = mongoose.model(modelName,BlockSchema,collactionName);
db.on('error', console.error.bind(console, 'connection error:'));

const uploadDataToMongo = () => {
    for (let index = 0; index < blockChain.chain.length; index++) {
        BlockMongoModel({blockjson:JSON.stringify(blockChain.chain[index])}).save().then(newblock=>{
            console.log("saved")
        }).catch(err => {
            console.log("opppps no data could been saved")
            console.log(err)
        })
        
    }
}

db.dropCollection(collactionName).then(res => {
    console.log("block chain deleted successfully")
    uploadDataToMongo()
}).catch(err => {
    console.log("no block chain to deleted successfully")
    uploadDataToMongo()
})

db.on('error', console.error.bind(console, 'connection error:'));


app.get("/getSuperBlockChain",(req,res)=>{
    let superblockChain = []
    BlockMongoModel.find({}).then(docs => {
       docs.forEach(doc => {
        superblockChain.push(JSON.parse(doc.blockjson))
       })
       res.send(superblockChain)
    }).catch(err => {
        console.log("could not find Blocks")
        console.log(err)
    })
    
})

app.listen(PORT)