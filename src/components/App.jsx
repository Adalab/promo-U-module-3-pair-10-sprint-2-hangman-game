
  import { useEffect, useState } from "react"; 
  import Footer from "./Footer";
  import Header from "./Header";
  import Dummy from "./Dummy";
  import Instructions from './Instructions';
  import SolutionLetters from './SolutionLetters';
  import Options from './Options';

  // api
  import getWordFromApi from "../services/api";
  // styles
  import "../styles/components/Instructions.scss";
  import "../styles/components/Footer.scss";
  import "../styles/components/Form.scss";
  import "../styles/components/Letters.scss";
  import { Route, Routes } from "react-router-dom";
 


   
  function App() {
    const [word, setWord] = useState("");
    const [userLetters, setUserLetters] = useState([]);
    const [lastLetter, setLastLetter] = useState("");
  
    useEffect(() => {
      getWordFromApi().then((word) => {
        setWord(word);
      });
    }, []);
  
    // events
  
    const handleKeyDown = (ev) => {
      // Sabrías decir para qué es esta línea
      ev.target.setSelectionRange(0, 1);
    };
  
    const handleChange = (ev) => {
      let re = /^[a-zA-ZñÑá-úÁ-Ú´]$/; //add regular pattern
      if (re.test(ev.target.value) || ev.target.value === "") {
        handleLastLetter(ev.target.value);
      }
    };
  
    const handleSubmit = (ev) => {
      ev.preventDefault();
    };
  
    const getNumberOfErrors = () => {
      const errorLetters = userLetters.filter(
        (letter) => word.includes(letter) === false
      );
      return errorLetters.length;
    };
  
    const renderSolutionLetters = () => {
      const wordLetters = word.split("");
      return wordLetters.map((letter, index) => {
        const exists = userLetters.includes(letter.toLocaleLowerCase());
        return (
          <li key={index} className="letter">
            {exists ? letter : ""}
          </li>
        );
      });
    };
  
    const renderErrorLetters = () => {
      const errorLetters = userLetters.filter(
        (letter) =>
          word.toLocaleLowerCase().includes(letter.toLocaleLowerCase()) === false
      );
      return errorLetters.map((letter, index) => {
        return (
          <li key={index} className="letter">
            {letter}
          </li>
        );
      });
    };
  
    const handleLastLetter = (value) => {
      value = value.toLocaleLowerCase();
      setLastLetter(value);
  
      if (!userLetters.includes(value)) {
        userLetters.push(value);
        setUserLetters([...userLetters]);
      }
    };
  
    return (
      <div className="page">
        <Header title="Juego del ahorcado"/>
        <main className="main">
         
          <Dummy getNumberOfErrorsProp={getNumberOfErrors()}/>
          <Routes>
          <Route path="/" element={ 
          <section>
            <SolutionLetters 
            classCss="solution"
            title='Solución: '
            render={renderSolutionLetters()}/>
            <div className="error">
              <h2 className="title">Letras falladas:</h2>
              <ul className="letters">{renderErrorLetters()}</ul>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <label className="title" htmlFor="last-letter">
                Escribe una letra:
              </label>
              <input
                autoFocus
                autoComplete="off"
                className="form__input"
                maxLength="1"
                type="text"
                name="last-letter"
                id="last-letter"
                value={lastLetter}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
              />
            </form>
          </section>}/>
            <Route path='/Instructions' element={<Instructions/>}/>
            <Route path='/Options' element={<Options/>}/>
          </Routes>
        </main>
      <Footer/>
  
      </div>
    );
  }
  
  export default App;
