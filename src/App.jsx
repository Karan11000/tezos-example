import React, {useState, useEffectf, useEffect} from "react";
import "./index.css"
import { TezosToolkit, MichelsonMap } from '@taquito/taquito';
import { InMemorySigner} from '@taquito/signer';


const App =  () => {
   
  const [value, setValue] = useState(0);

  const [addText, setAddText] = useState("");
  const [subText, setSubText] = useState("");
  const [multiText, setMultiText] = useState("");

   const rpcnode = "https://hangzhounet.smartpy.io";
   const contractAdress = "KT1Byo6HSn9pRdR5dWRFHVHzbaxEwDRZYKpT"
  const tezos = new TezosToolkit(rpcnode)
  tezos.setProvider({signer: new InMemorySigner('edskRm7Nwra78VzR9kdKfUCeF7MrgCv2npcHceRFtavrAtsKnu6si1aqrdMcrZVGNSsAjhP34R74X7MnG6WBvVgwcqbQjRH2fH')});
  
  const initialise =  async ()=>{
    const contract = await tezos.contract.at(contractAdress);
    const storage = await contract.storage();
    console.log(storage.c[0]);
    setValue(storage.c[0]);
  } 
  initialise();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    let val = +addText;
    tezos.contract.at(contractAdress)
    .then((contract)=>{
      return contract.methods.add(value,val).send();
    })
    .then((op)=>{
      return op.confirmation(4).then(()=>op.hash);
    })
    .then((hash)=>{
      console.log("hello", hash);
    })
    .catch((err)=>{
      console.log(err);
    })
    // window.location.reload();
  }
  const handleSubmit2 = async (e)=>{
    e.preventDefault();
    let val = +multiText;
    tezos.contract.at(contractAdress)
    .then((contract)=>{
      return contract.methods.multiply(value,val).send();
    })
    .then((op)=>{
      return op.confirmation(4).then(()=>op.hash);
    })
    .then((hash)=>{
      console.log("hello", hash);
    })
    .catch((err)=>{
      console.log(err);
    })
    // window.location.reload();
  }

  tezos.tz.getBalance("tz1Uw8dyR5JwCbEEsPaFCZLCyjptiByT7gK3")
  .then((balance)=>{console.log(`Balance is : ${balance.toNumber() / 1000000} ꜩ`)})
  return (
    <div className="container1">
    <h1 className="mg">Current Value : {value}</h1>
    <form action="" className="container" onSubmit={handleSubmit}>
    <input type="text" value={addText} onChange={(e)=>{setAddText(e.target.value);}} />
    <button className="mg" >Add</button>
    </form>
    <form action="" className="container" onSubmit={handleSubmit2}>
    <input type="text" value={multiText} onChange={(e)=>{setMultiText(e.target.value);}} />
    <button className="mg">Multiply</button>
    </form>
    </div>
  );
}
export default App