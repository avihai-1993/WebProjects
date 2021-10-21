const endpoint = "http://localhost:5002/"

function mineVer2(o, action) {
    fetch(`${endpoint}mine`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(o)
    }).then(res => {
        res.json().then(data => {
            action(data)
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))


}

function calcHashVer2(o, action) {


    let jsondata = JSON.stringify({
        data: o
    })

    fetch(`${endpoint}HashCalc`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: jsondata
    }).then(res => {
        res.json().then(data => {
            action(data.hash)
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))


}

async function calcHashVer2Sync(o, action) {

    console.log(o)
    let jsondata = JSON.stringify({
        data: o
    })

    const res = await fetch(`${endpoint}HashCalc`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: jsondata
    })
    const data = await res.json()

    return data.hash



}


async function getKeys() {
    let res = await fetch(`${endpoint}getKeys`)
    let data = await res.json()
    return data
}

async function makeSingnatuer(dataTosign, key) {
    let jsondata = JSON.stringify({
        data: dataTosign,
        private: key
    }).toString()

    let res = await fetch(`${endpoint}sign`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: jsondata
    })
    let data = await res.json()
    return data.sign
}


async function tryVerify(signature, mes, key) {
    let jsondata = JSON.stringify({
        data: mes,
        public: key,
        sign: signature
    }).toString()

    let res = await fetch(`${endpoint}verify`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: jsondata
    })
    let data = await res.json()

    return data.ver
}