import React, { useState, useEffect } from "react";
import DiaryPage from "./DiaryPage";

function MainPage({ currentUser }) {
  const [feeling, setFeeling] = useState({
    feeling: "",
    user_id: "",
  });
  const [quote, setQuote] = useState({
    text: "",
    author: "",
  });

  console.log(feeling);

  function onChange(e) {
    const { name, value } = e.target;
    setFeeling({ ...feeling, [name]: value });
  }

  const getQuote = () =>
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        const RandomNumber = Math.floor(Math.random() * 100) + 1;
        const selectedQuote = data[RandomNumber];
        setQuote(selectedQuote);
      });

  useEffect(() => {
    fetch("/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quote),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [quote]);

  function onClick(e) {
    console.log(e);
    e.preventDefault();
    getQuote();
    fetch("/feelings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...feeling,
        user_id: currentUser.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    // currentUser ? postFeeling(feeling) : alert("Try more? Please Login");
  }

  return (
    <>
      <div className="search">
        <input
          type="text"
          name="feeling"
          className="searchTerm"
          placeholder="How are you feeling today?"
          onChange={onChange}
        />
        <button type="submit" className="searchButton" onClick={onClick}>
          <i className="fa fa-search"></i>
        </button>
        <br />
        <div>
          <h1>{quote.text}</h1>
        </div>
        <div>
          <h2>{quote.author}</h2>
        </div>
<div className="moveDiary"> 
        <DiaryPage/>
        </div>
      </div>
      <div>
        <DiaryPage />
      </div>
    </>
  );
}

export default MainPage;
