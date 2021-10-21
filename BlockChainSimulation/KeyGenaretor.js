const EC = require('elliptic').ec;

// You can use any elliptic curve you want

class KeyGenaretor {
    constructor() {
        this.ec = new EC('secp256k1');
        this.key = this.ec.genKeyPair();


    }
   

    getKeyPair() {
        return this.key
    }
    genaretNewKeyPair() {
        this.key = ec.genKeyPair();
        return this.key
    }
    getPublicKey() {
        return this.key.getPublic('hex');
    }
    getPrivateKey() {
        return this.key.getPrivate('hex');
    }
}

class User {
    constructor(tokenName,coinbase = 0){
        this.token = tokenName
        let key = new KeyGenaretor()
        this.privateKey = key.getPrivateKey()
        this.publicKey = key.getPublicKey()
        this.coinbase = coinbase
        
    }
    addToCoinBase(amount){
       this.coinbase += amount
    }
}

module.exports.KeyGenaretor = KeyGenaretor;
module.exports.User = User;
