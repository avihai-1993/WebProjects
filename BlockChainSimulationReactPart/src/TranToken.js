import React from 'react';

const TranToken = ({tran}) => {

    
    return (
        <div>
        <div className="input-group">
        <div className="input-group-addon">$</div>
        <input className="form-control"  type="text" value={tran.amount} disabled></input>
        <div className="input-group-addon">From:</div>
        <input className="form-control"  type="text" value={tran.fromAddress.token} disabled></input>
        <div className="input-group-addon">-&gt;</div>
        <input className="form-control"  type="text" value={tran.toAddress.token} disabled></input>

        </div>
        </div>
    );
}

export default TranToken;
