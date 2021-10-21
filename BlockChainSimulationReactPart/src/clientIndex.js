const endpoint = "http://localhost:5002/"


export async function makeSingnatuer(dataTosign, key) {
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

