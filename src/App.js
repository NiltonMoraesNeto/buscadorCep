import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "./services/api";

function App() {
  const [inputCep, setInputCep] = useState("");
  const [cep, setCep] = useState({});

  async function handlePesquisar() {
    if (inputCep === "") {
      toast.error("Preencha o campo CEP!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    try {
      const response = await api.get(`${inputCep}/json`);

      console.log("🚀 response:", response);
      if (response.data.erro === true) {
        toast.error("CEP não encontrado!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setCep({});
        setInputCep("");
      } else {
        setCep(response.data);
        setInputCep("");
      }
    } catch {
      toast.error("CEP inválido!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setInputCep("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          maxLength={8}
          value={inputCep}
          onChange={(e) => setInputCep(e.target.value.replace(/\D/g, ''))}
          //onBlur={handlePesquisar}
        />

        <button className="buttonPesquisar" onClick={handlePesquisar}>
          <FiSearch size={25} color="#FFF" />
        </button>
        <ToastContainer />
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>Estado: {cep.uf}</span>
          <span>IBGE: {cep.ibge}</span>
          <span>DDD: {cep.ddd}</span>
        </main>
      )}
    </div>
  );
}

export default App;
