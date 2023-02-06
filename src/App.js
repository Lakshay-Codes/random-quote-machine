import React,{useState,useEffect} from "react";
import './App.scss';
import colorsArray from "./colorsArray";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faTwitter} from '@fortawesome/free-brands-svg-icons';

let quoteDBUrl="https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";


function App() {
  const [quote,setQuote]=useState("If you want to lift yourself up, lift up someone else.");
  const [author,setAuthor]=useState("Booker T. Washington");
  
  const [quotesArray,setQuotesArray] = useState(null);

  const [accentColor,setAccentColor] = useState('#282c34');

  const generateRandomNumber=()=>{
    let randomInteger=Math.floor(quotesArray.length*Math.random());
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
    setAccentColor(colorsArray[randomInteger]);
  }

  const fetchQuotes = async (url) =>{
    const response = await fetch(url);
    const parsedJSON =await response.json();
    setQuotesArray(parsedJSON.quotes);
  }

  useEffect(() =>{
    fetchQuotes(quoteDBUrl);
  },[quoteDBUrl])

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor:accentColor}}>
        <div id="quote-box" style={{color :accentColor}}>
          <h1 id="text">
            <span><FontAwesomeIcon icon={faQuoteLeft} /></span>{quote}"
          </h1>
          <p id="author">- {author}</p>
          <div className="buttons">
            <a style={{backgroundColor:accentColor}}  id="tweet-quote" href={encodeURI(`https://twitter.com/intent/tweet?text=${quote} -${author}`)}><FontAwesomeIcon icon={faTwitter} /></a>
            <button style={{backgroundColor:accentColor}} onClick={()=>{generateRandomNumber()}} id="new-quote" >New Quote</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
