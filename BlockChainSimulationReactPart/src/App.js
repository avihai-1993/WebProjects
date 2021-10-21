import {React,useEffect,useState} from 'react'
import {BrowserRouter as Router , Route,/*Switch ,*/Link} from 'react-router-dom'
import './App.css'
import SuperBlockChain from './SuperBlockChain'
import Toknes from './Tokens'
import CoinBase from './CoinBase'

const URL = "http://localhost:5002/getSuperBlockChain"
//const URL1 = "http://localhost:5002/getChainSimoleter"
//const URL2 = "http://localhost:5002/getChainSimoleter"

function SuperBlockChainWraper() {
  const [chain, setchain] = useState([]);

  useEffect(() => {
   
    fetch(URL).then(res => {
      res.json().then(data => {
       
          setchain([...data])
         
      }).catch(err => console.log(err))
  }).catch(err => console.log(err))
  }, []);

  return (
    <div style={{ paddingLeft: '7px'}}>
    <h1>Super Block Chain</h1>
    <h1>Peer1</h1>
    <SuperBlockChain chain={chain}></SuperBlockChain>
    <h1>Peer2</h1>
    <SuperBlockChain chain={chain}></SuperBlockChain>
    <h1>Peer3</h1>
    <SuperBlockChain chain={chain}></SuperBlockChain>
    </div>
    )
}




function TokensWraper() {
   
  const [chain, setchain] = useState([]);

  useEffect(() => {
   
    fetch(URL).then(res => {
      res.json().then(data => {
       
          setchain([...data])
         
      }).catch(err => console.log(err))
  }).catch(err => console.log(err))
  }, []);

  return (
    <div style={{ paddingLeft: '7px'}}>
    <h1>Toknes</h1>
    <h1>Peer1</h1>
    <Toknes chain={chain}></Toknes>
    <h1>Peer2</h1>
    <Toknes chain={chain}></Toknes>
    <h1>Peer3</h1>
    <Toknes chain={chain}></Toknes>
    </div>
  )
}
function CoinBaseWraper() {

  const [chain, setchain] = useState([]);

  useEffect(() => {
   
    fetch(URL).then(res => {
      res.json().then(data => {
       
          setchain([...data])
         
      }).catch(err => console.log(err))
  }).catch(err => console.log(err))
  }, []);

  return (
    <div style={{ paddingLeft: '7px'}}>
    <h1>Coin Base</h1>
    <h1>Peer1</h1>
    <CoinBase chain={chain}></CoinBase>
    <h1>Peer2</h1>
    <CoinBase chain={chain}></CoinBase>
    <h1>Peer3</h1>
    <CoinBase chain={chain}></CoinBase>
    </div>
  )
  
}





 function RouteNavBar({e,s,baseRoute}) {
   if(s === undefined || s === null ){
    s = {textDecoration : 'none' , color : 'white'}
   }

  
  return (
    <div>
     <Router>
      <div>
      <nav className="RNavBar">
          { 
          e.map((item,index) => { 
          return <div key={index} className="routeItem">
                <Link key={JSON.stringify(item)} to={item.pathName} style={s}>{item.title}</Link>
          </div>
          })
          }     
        
      </nav>
        
        {
          
        e.map((item,index) => {
        
           return <Route exact key ={index} path={item.pathName}  component={item.comp} />
          })
          
        }

      </div>
    </Router>
  </div>
  )
}



function App() {

  const arrNavPaths = [{comp : TokensWraper, pathName:'/',title:"Tokens"},{comp : CoinBaseWraper, pathName:'/CoinBase',title:"CoinBase"},{comp : SuperBlockChainWraper, pathName:'/SuperBlockChain',title:"SuperBlockChain"}]
 
  return (
    <div className="App">
    <RouteNavBar e={arrNavPaths} baseRoute={TokensWraper}/>
    </div>
  );
}

export default App;
