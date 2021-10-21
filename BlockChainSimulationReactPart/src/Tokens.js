import React from 'react';
import BlockWithTokens from './BlockWithTokens';
const Toknes = ({chain}) => {
    return (
        <div>
            
            {
            chain.map((item,i) => { 
                return (<BlockWithTokens block={item} key={i}></BlockWithTokens>)
            })
            }
        </div>
    );
}

export default Toknes;
