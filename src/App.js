import { useState,useEffect } from "react";
import Card from "./Card";
import "./App.css";
import axios from "axios";
import Button from '@mui/material/Button';


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
      <Button variant="contained"
        style={{backgroundColor:"maroon", margin:"5px"}} 
        className='addButton1' onClick={() => setTap(!tap)}> {tap?'Close':"Add"} </Button>
    {tap && 
    <form>
        <input placeholder='number' value={data.cardNumber} type='number' onChange={e=>setData({...data,cardNumber:e.target.value})}/>
        <input placeholder='name' value={data.name} type='text' onChange={e=>setData({...data,name:e.target.value})}/>
        <input placeholder='expiry' value={data.expiry} type='month' onChange={e=>setData({...data,expiry:e.target.value})}/>
        {error &&<p style={{color:'red'}}>{error}</p>}
        <Button 
        variant="contained"
        style={{backgroundColor:"maroon", margin:"5px", color:"white"}}
          disabled={!data.cardNumber || !data.name ||!data.expiry}
          onClick={addCard}
          className='addButton'
          type='submit'
        >Submit</Button>
    </form>
      }
      </div>
  );
}

export default App;
