import styled from "styled-components";
import imagen from "./cryptomonedas.png";
import Formulario from "./components/Formulario";
import { useEffect, useState } from "react";
import axios from "axios";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spiner";

function App() {
  const [moneda, guardarMoneda] = useState("");
  const [criptomoneda, guardarCriptomoneda] = useState("");
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  //Escucha los cambios de:
  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      //Evitamos la ejecucion la primera vez
      if (moneda === "") return;
      //una vez que ya tenemos una moneda ya podemos hacer una cotizacion
      //consulta la api
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);

      //Mostra el spinner
      guardarCargando(true);

      //Ocultar el spinner y mosntra el resultado
      setTimeout(() => {
        guardarCargando(false);

        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    };

    cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  //Mostrar spinner o resultado

  const componente = cargando ? (
    <Spinner />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="Imagen crypto" />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        ></Formulario>
        {componente}
      </div>
    </Contenedor>
  );
}

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

export default App;
