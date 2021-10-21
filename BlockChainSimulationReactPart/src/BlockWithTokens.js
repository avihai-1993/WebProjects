import React ,{  } from 'react';
import TranToken from './TranToken';



const BlockWithTokens = ({block}) => {
   
    return (
        <div>
            
            <div className="well well-success" id="block1chain1well">
            <div className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-2 control-label" >Block:</label>
                    <div className="col-sm-10">
                        <div className="input-group">
                            <span className="input-group-addon">#</span>
                            <input className="form-control" value={block.index}  type="number" disabled ></input>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label" >Nonce:</label>
                    <div className="col-sm-10">
                        <input className="form-control" value={block.nonce}  type="text" disabled ></input>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label" >TX:</label>
                    <div className="col-sm-10">
                        {
                            block.data.map((tranToken,i)=> {
                                return (<TranToken tran={tranToken} key={i}></TranToken>)
                            })
                        }
                       
                    </div>
                </div>
                <div className="form-group" id="state">
                    <label className="col-sm-2 control-label" >prev:</label>
                    <div className="col-sm-10">
                        <input className="form-control"  type="text" disabled value={block.previousHash}></input>
                    </div>
                </div>
                <div className="form-group" id="state">
                    <label className="col-sm-2 control-label" >Hash:</label>
                    <div className="col-sm-10">
                        <input className="form-control" value={block.hash} type="text" disabled></input>
                    </div>
                </div>
                
            </div>
        </div>
            
        </div>
    );
}

export default BlockWithTokens;
