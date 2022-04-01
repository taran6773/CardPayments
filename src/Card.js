import axios from "axios";
import React, { useState } from "react";
import "./Card.css";

export default function Card({data,removeCard}) {
  let cardNumber=data.cardNumber
  let name=data.name
  let expiry=data.expiry
  const [showEdit, setShowEdit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  const handleChange = async() => {
    let nameval = document.getElementById("editname").value;
    let dateval = document.getElementById("editdate").value;
    // name=nameval;
    // expiry=dateval;
    // let result =  fetch(
    //   'http://localhost:5000/update', {
    //       method:"post",
    //       // body:JSON.stringify({nameval,dateval}),
    //       body:JSON.stringify({nameval}),
    //       headers: {
    //           'Content-Type': 'application/json'
    //       }
    //   })
    let body={
      name:nameval,
      expiry:dateval
    }
    await axios.post('http://localhost:5000/update',body)
    .then(res=>{
      console.log(res.data)
    }).catch(e=>{
      console.log(e)
    })
  };

  return (
      <>
    <div className="container">
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id={`heading${data._id}`}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${data._id}`}
              aria-expanded="true"
              aria-controls={`collapse${data._id}`}>
              {`Card ending in ${cardNumber.toString().slice(12, 16)}`}
            </button>
          </h2>
          <div
            id={`collapse${data._id}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading${data._id}`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="cardDetails">
                {/* Div 1 */}
                <div className="innerCard">
                  <h6>Card number</h6>
                  {/* <p>{cardHide(cardNumber)}</p> */}
                  <p>{cardNumber.toString().match(/\d{4}/g).join("-").replace(/\d.(?=.{4})/g, "#")}</p>
                  <h6>Name of Card Holder</h6>
                  <p>{name}</p>
                </div>
                {/* Div 2 */}
                <div className="innerCard">
                  <h6>Expiry Date</h6>
                  <p>{expiry.toString().slice(0,7)}</p>
                  <div style={{ display: "flex" }}>
                    <button
                      onClick={() => {
                        setShowEdit(!showEdit);
                      }}
                    >
                      edit
                    </button>
                    <button
                      onClick={() => {
                        setShowAlert(!showAlert);
                      }}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
              {/* Edit section */}
              {showEdit && (
                <div className="edit">
                  <div className="innerEdit">
                    <h6>Name of Card Holder</h6>
                    <input placeholder={name} id="editname"></input>
                  </div>
                  <div className="innerEdit">
                    <h6>Expiry Date</h6>
                    <input
                      placeholder={expiry}
                      type="month"
                      id="editdate"
                    ></input>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                      onClick={() => {
                        handleChange();
                        setShowEdit(false);
                      }}
                    >
                      Submit
                    </button>
                    <button onClick={() => setShowEdit(false)}>Cancel</button>
                  </div>
                </div>
              )}
              {/* {Alert Section} */}
              {showAlert && (
                <div className="alert alert-success" role="alert">
                  <h4 className="alert-heading">Are you sure?</h4>
                  <p>
                    Your Card will be removed and can't be accessed again!.
                    Click Yes to confirm!
                  </p>
                  <hr />
                  <button onClick={()=>{
                      removeCard(data.cardNumber)
                      setShowAlert(!showAlert)
                      }}>yes</button>
                  <button
                    onClick={() => {
                      setShowAlert(!showAlert);
                    }}
                  >
                    No
                  </button>
                </div>
              )}
              {/* {Adding New element} */}
              
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
