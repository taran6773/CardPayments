import { useState,useEffect } from "react";
import Card from "./Card";
import "./App.css";
import axios from "axios";

// const defaultCards = [
//   // { id: '1', cardNumber: "6827468212345323", name: "Taran", expiry: "02/25", },
//   // { id: "2", cardNumber: "6827468212345675", name: "Manveer", expiry: "06/24", },
//   // { id: "3", cardNumber: "6827468212346754", name: "Anurag", expiry: "03/27", },
// ];
// console.log(defaultCards)

const dataclass = {cardNumber:'',name:'',expiry:''};

function App() {
  const [tap, setTap] = useState(false);
  const [cards,setCards] = useState([])
  const [data,setData] = useState(dataclass)
  const [error,setError] = useState(null)
  
  const addCard = async (e)=>{
    e.preventDefault()
    let result = await fetch(
      'http://localhost:5000/register', {
          method: "post",
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      result = await result.json();
      console.warn(result);
      if (result) {
          alert("Data saved successfully");
      }
    setError(null)
    if(data.cardNumber.length===16){
      let newCard = {...data,id:(cards.length+1).toString()}
      setCards([...cards,newCard])
      setData(dataclass)
      setTap(false)
    }else{
      setError("Invalid card")
    }
  }
  const fetchCards = async()=>{
    // fetch('http://localhost:5000/')
    //   .then(res => res.json())
    //   .then(data=> {

    //   })
    await axios.get('http://localhost:5000/')
    .then(res=>{
      setCards(res.data)
      console.log(res.data)
    }).catch(e=>{
      console.log(e)
    })
  }
  useEffect(()=>{
    fetchCards()
  },[])


  return (
    <div className="App">
      <h1>Payment Options</h1>
      {cards.map((item, index) => 
        <Card 
        data={item} 
        key={index} 
        removeCard={
        //   (card)=>{axios.post('http://localhost:5000/delete',{cardNumber:card})
        //   // .then(res=>{
        //   //   console.log(res.data)
        //   // }).catch(e=>{
        //   //   console.log(e)
        //   // })
        // }
        (card)=>{
          let result =  fetch(
            'http://localhost:5000/delete', {
                method:"post",
                body:JSON.stringify({card}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
      }
        />
      )}
      <button onClick={() => setTap(!tap)}> {tap?'Close':"Add"} </button>
    {tap && 
    <form>
        <input placeholder='number' value={data.cardNumber} type='number' onChange={e=>setData({...data,cardNumber:e.target.value})}/>
        <input placeholder='name' value={data.name} type='text' onChange={e=>setData({...data,name:e.target.value})}/>
        <input placeholder='expiry' value={data.expiry} type='month' onChange={e=>setData({...data,expiry:e.target.value})}/>
        {error &&<p style={{color:'red'}}>{error}</p>}
        <button 
          disabled={!data.cardNumber || !data.name ||!data.expiry}
          onClick={addCard}
          className='addButton'
          type='submit'
        >Submit</button>
    </form>
      }
      </div>
  );
}

export default App;
