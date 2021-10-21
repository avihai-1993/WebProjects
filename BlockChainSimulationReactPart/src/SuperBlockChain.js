

import React from 'react';
import SuperBlock from './SuperBlock';

const SuperBlockChain = ({chain}) => {
    return (
        <div>
            
              {
            chain.map((item,i) => { 
                return (<SuperBlock block={item} key={i}></SuperBlock>)
            })
            }
        </div>
    );
}

export default SuperBlockChain;
