class ChainBlockView {
    constructor(block, chainChangelistener, root, peerNum = null) {
        this.block = block
        this.chainlistener = chainChangelistener
        this.CBV = document.createElement('div');
        this.CBV.className = "well well-success";
        this.block["peerNum"] = peerNum
        this.render()
        root.appendChild(this.CBV)
    }

    render() {


        while (this.CBV.firstChild) {
            this.CBV.removeChild(this.CBV.firstChild)
        }
        const blockNumberInput = document.createElement('input');
        const nonceInput = document.createElement('input');
        const dataInput = document.createElement('textarea');

        const mine = () => {
            this.CBV.className = "well well-success";
            this.chainlistener(2, this.block)
            this.render()
        }
        const chageBlockHandler = () => {
            this.CBV.className = "well well-error";
            this.block.data = dataInput.value;
            this.block.previousHash = prevInput.value;
            this.block.hash = hashInput.value
            this.chainlistener(1, this.block)

        }

        const blockLabel = document.createElement('label');
        blockLabel.innerText = "Block : "
        this.CBV.appendChild(blockLabel)

        blockNumberInput.onkeyup = chageBlockHandler
        blockNumberInput.onchange = chageBlockHandler
        blockNumberInput.type = "number"
        blockNumberInput.disabled = true;
        this.CBV.appendChild(blockNumberInput)

        const nonceLabel = document.createElement('label');
        nonceLabel.innerText = "nonce : "
        this.CBV.appendChild(nonceLabel)
        nonceInput.disabled = true;
        nonceInput.onkeyup = chageBlockHandler
        this.CBV.appendChild(nonceInput)


        const dataLabel = document.createElement('label');
        dataLabel.innerText = "data : "
        this.CBV.appendChild(dataLabel)

        dataInput.onkeyup = chageBlockHandler
        this.CBV.appendChild(dataInput)

        const prevLabel = document.createElement('label');
        prevLabel.innerText = "prev : "
        this.CBV.appendChild(prevLabel)
        const prevInput = document.createElement('input');
        prevInput.disabled = true;
        this.CBV.appendChild(prevInput)

        const hashLabel = document.createElement('label');
        hashLabel.innerText = "hash : "
        this.CBV.appendChild(hashLabel)
        const hashInput = document.createElement('input');
        hashInput.disabled = true;
        this.CBV.appendChild(hashInput)

        const mineBtn = document.createElement('button');
        mineBtn.innerText = "mine"
        mineBtn.className = "btn btn-primary ladda-button"
        mineBtn.onclick = mine;
        this.CBV.appendChild(mineBtn)

        blockNumberInput.value = this.block.index;
        nonceInput.value = this.block.nonce;
        dataInput.value = this.block.data;
        prevInput.value = this.block.previousHash;
        hashInput.value = this.block.hash;


    }


}