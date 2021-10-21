import React from 'react';

const CoinBaseMarkerKeys = ({coin}) => {
    return (
        <div>
          
            <div className="input-group">
                <div className="input-group-addon">$</div>
                <input className="form-control"  type="text" value={coin.amount} disabled></input>
                <div className="input-group-addon">-&gt;</div>
                <input className="form-control"  type="text" value={coin.toAddress.publicKey}  disabled></input>

            </div>
        </div>
    
    );
}

export default CoinBaseMarkerKeys;
