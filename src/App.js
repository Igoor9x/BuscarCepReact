import { FiSearch } from "react-icons/fi"
import "./main.css"
import { useState } from "react";
import api from "./api";

function App() {
  const [input, setInput] = useState();
  const [cep, setCep] = useState({});

  async function clicked() {
    
    if(input === ''){
      alert("Insira um CEP VÁLIDO!!!");
    };
    try{
      const responseAPI = await api.get(`${input}/json/`);
      setCep(responseAPI.data);
       setInput("");
    }
    catch{
      if(input === ''){
      
      }else{
        alert("CEP INEXISTENTE... Tente Novamente!");
        setInput("");
      };
    };
  };

  function enter(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Evitar comportamento padrão do Enter
      clicked(); // Chamamos a função 'clicked' ao pressionar Enter
    }
  }


  return (
    <div className="container">

      <h1 className="title">Procure sua cidade</h1>
      <div className="containerInput">
        <input className="text"
        type="text"
        placeholder="Insira sua cidade"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={enter}
        />

        <button className="buttonSearch" onClick={clicked}>
          <FiSearch
          size={25}
          />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">

          <h2>Seu CEP: {cep.cep}</h2>
          <span  className="rua">Rua: {cep.logradouro}</span>
          <span className="complemento">Complemento: {cep.complemento}</span>
          <span  className="bairro">Bairro: {cep.bairro}</span>
          <span  className="estado">{cep.localidade} - {cep.uf}</span>
          
      </main>
      )}
      

    </div>
  );
}

export default App;
