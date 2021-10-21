import React from 'react';
import BlockWithCoinBase from './BlockWithCoinBase';

const CoinBase = ({chain}) => {
    return (
        <div>
            
            {
            chain.map((item,i) => { 
                return (<BlockWithCoinBase block={item} key={i}></BlockWithCoinBase>)
            })
            }
        </div>
    );
}

export default CoinBase;
