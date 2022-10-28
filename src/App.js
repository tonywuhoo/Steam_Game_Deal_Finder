import './App.css';
import React from "react";
import { useState } from "react"
import gameData from "./data.js"

function App() {
  const [lowerprice, setlowerPrice] = useState(0)
  const [steamRating, setRating] = useState(0)
  const [higherprice, sethighPrice] = useState(0)
  const [gameInfo, setgameInfo] = useState(gameData)

  let URL = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=' + lowerprice + "&steamRating=" + steamRating + "&lowerPrice=" + higherprice
  const handleChange = event => {
    if (event.target.id === "lowerthan") {
      setlowerPrice(event.target.value)
    }
    if (event.target.id === "steamrating") {
      setRating(event.target.value)
    }
    if (event.target.id === "greaterthan") {
      sethighPrice(event.target.value)
    }
  }

  const fetchData = event => {
    event.preventDefault()
    fetch(URL)
      .then(response => response.json())
      .catch(error => console.error(error))
      .then(data => {
        setgameInfo(data)
      })
  }

  function showModal(event) {
    console.log(event.target.classList.value)
    document.querySelector(".modal").classList.toggle("show-modal")
    gameInfo.map((game) => {
      if (game.title === event.target.classList.value) {
        var br = document.createElement("br")
        var br1 = document.createElement("br")
        var br2 = document.createElement("br")
        document.querySelector(".content-here").append("Price: $" + game.salePrice)
        document.querySelector(".content-here").append(br)
        document.querySelector(".content-here").append("Rating: " + game.steamRatingText)
        document.querySelector(".content-here").append(br1)
        document.querySelector(".content-here").append("Savings: $" + Math.floor(parseInt(game.savings)))
      }
    })
  }

  const closeButton = event => {
    document.querySelector(".modal").classList.toggle("show-modal")
    document.querySelector(".content-here").innerHTML = ""
  }
  return (
    <div >
      <form class="form" onSubmit={fetchData}>
        <h>Steam Games Deal Finder</h>
        <br></br>
        <br></br>
        <label htmlFor="lowerthan">Price Lower Than: </label>
        <input type="text" id="lowerthan" onChange={handleChange}></input>
        <br></br>
        <label htmlFor="greaterthan">Price Greater Than: </label>
        <input type="text" id="greaterthan" onChange={handleChange}></input>
        <br></br>
        <label htmlFor="steamrating">Steam Rating Above: </label>
        <input type="text" id="steamrating" onChange={handleChange}></input>
        <br></br>
        <input type="submit"/>
      </form>
      <br></br>
      <div class="modal">
      <div class="modal-content">
      <button class="close-button" onClick={closeButton}>x</button>
          <span class="content-here">
          </span>
      </div>
      </div>
      <div class="boxes">
        
      {
        gameInfo.map((product, index) => { 
          return (<div class="innerboxes" key={index}>
          <h>{product.title}</h>
          <br></br>
            <img src={product.thumb} />
            <br></br>
            <button  onClick = {showModal} class = {product.title} >More Info</button>
        </div>
      )
      })
      }

      </div>
    </div>
    
  )
}

export default App;
