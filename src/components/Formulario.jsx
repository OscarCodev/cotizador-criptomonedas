import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from "axios";
import Error from "./Error";

function Formulario({guardarMoneda, guardarCriptomoneda}) {
  //state del listado de criptomonedas
  const [listacriptomonedas, guardarCriptomonedas] = useState([]);
  const [error, guardarError] = useState(false);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];

  //utilizar nuestro propio Hook
  const [moneda, SelectMonedas] = useMoneda("Elige tu Moneda", "", MONEDAS);

  //utilizar useCriptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elige tu criptomoneda",
    "",
    listacriptomonedas
  );

  //Ejecutar llamado a la API
  useEffect(() => {
    const consultarAPI = async () => {
      const apiKEY =
        "cc48ac3f50712d2aa38adfa8403a07d6a4ed097d260a3aa36302aa0f7cb8ab13";
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=${apiKEY}`;
      const resultado = await axios.get(url);
      guardarCriptomonedas(resultado.data.Data);
    };

    consultarAPI();
  }, []);

  //Cuando el usuario hace submit
  const cotizarMoneda = (e) => {
    e.preventDefault();
    //Validar si ambos campor estan llenos
    if (moneda === "" || criptomoneda === "") {
      guardarError(true);
      return;
    }

    //Pasar los datos al componente principal
    guardarError(false);
    guardarMoneda(moneda);
    guardarCriptomoneda(criptomoneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? (
        <Error mensaje={"Todos los campos son obligatorios"}></Error>
      ) : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit"></Boton>
    </form>
  );
}

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

export default Formulario;
