import { useState } from "react";
import Card from "./Card";
import "./App.css";

const defaultCards = [
  { id: '1', cardNumber: "6827468212345323", name: "Taran", expiry: "02/25", },
  { id: "2", cardNumber: "6827468212345675", name: "Manveer", expiry: "06/24", },
  { id: "3", cardNumber: "6827468212346754", name: "Anurag", expiry: "03/27", },
];

const dataclass = {cardNumber:'',name:'',expiry:''};

function App() {
  const [tap, setTap] = useState(false);
  const [cards,setCards] = useState(defaultCards)
  const [data,setData] = useState(dataclass)
  const [error,setError] = useState(null)
  
  const addCard = async (e)=>{
    e.preventDefault()
    let result = await fetch(
      'http://localhost:3000/register', {
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
      debugger;
      setData(dataclass)
      setTap(false)
    }else{
      setError("Invalid card")
    }
  }


  return (
    <div className="App">
      <h1>Payment Options</h1>
      {cards.map((item, index) => 
        <Card 
        data={item} 
        key={index} 
        removeCard={(id)=>setCards(cards.filter(item=>item.id !== id))}
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
