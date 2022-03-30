import React, { useState, useEffect } from "react";
import "./Card.css";

export default function Card({data,removeCard}) {
  let cardNumber=data.cardNumber
  let name=data.name
  let expiry=data.expiry
  const [showEdit, setShowEdit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    var results = data.cardNumber.match(/\d{4}/g);
    var final = results.join("-");
    cardNumber = final
  }, [data]);

  function cardHide(number) {
    return number.replace(/\d.(?=.{4})/g, "#")
  }

  const handleChange = () => {
    let nameval = document.getElementById("editname").value;
    let dateval = document.getElementById("editdate").value;
    name=nameval;
    expiry=dateval;
  };


  return (
      <>

    <div className="container">
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id={`heading${data.id}`}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${data.id}`}
              aria-expanded="true"
              aria-controls={`collapse${data.id}`}>
              {`Card ending in ${cardNumber.toString().slice(12, 16)}`}
            </button>
          </h2>
          <div
            id={`collapse${data.id}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading${data.id}`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="cardDetails">
                {/* Div 1 */}
                <div className="innerCard">
                  <h6>Card number</h6>
                  <p>{cardHide(cardNumber)}</p>
                  <h6>Name of Card Holder</h6>
                  <p>{name}</p>
                </div>
                {/* Div 2 */}
                <div className="innerCard">
                  <h6>Expiry Date</h6>
                  <p>{expiry}</p>
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
                      removeCard(data.id)
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
