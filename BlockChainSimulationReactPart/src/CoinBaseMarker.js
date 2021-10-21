import React from 'react';

const CoinBaseMarker = ({coin}) => {
    return (
        <div>
            <div className="input-group">
                <div className="input-group-addon">$</div>
                <input className="form-control"  type="text" value={coin.amount} disabled></input>
                <div className="input-group-addon">-&gt;</div>
                <input className="form-control"  type="text" value={coin.toAddress.token}  disabled></input>

            </div>
        </div>
    );
}

export default CoinBaseMarker;
