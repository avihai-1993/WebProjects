import React ,{useRef}from 'react';
import { makeSingnatuer } from './clientIndex';
const TranKeysSig = ({tran}) => {
    const inputSig = useRef(null);
    
    const getSig=()=>{
        makeSingnatuer(JSON.stringify(tran),tran.fromAddress.privateKey).then(sig => {
            inputSig.current.value = sig
        }).catch(err => "0000000")
    }
    return (
        <div>
        <div className="input-group">
        <div className="input-group-addon">$</div>
        <input className="form-control" disabled type="text" value={tran.amount}></input>
        <div className="input-group-addon">From:</div>
        <input className="form-control"  type="text" value={tran.fromAddress.publicKey} disabled></input>
        <div className="input-group-addon">-&gt;</div>
        <input className="form-control"  type="text" value={tran.toAddress.publicKey} disabled></input>
        </div>
        <div className="input-group">
        <div className="input-group-addon">Sig:</div>
        <input className="form-control" ref={inputSig}  type="text" value={getSig()} disabled></input>
        </div>
        </div>
    );
}

export default TranKeysSig;
