import { useState } from "react";
import styled from "styled-components";
const useCriptomoneda = (label, stateInicial, opciones) => {
  //State de nuestro custom hook
  const [state, actualizarState] = useState(stateInicial);

  const SelectCripto = () => (
    <>
      <Label>{label}</Label>
      <Select onChange={(e) => actualizarState(e.target.value)} value={state}>
        <option value="">---Seleccione---</option>
        {opciones.map((opcion) => {
          const { Id, Name, FullName } = opcion.CoinInfo;
          return (
            <option key={Id} value={Name}>
              {FullName}
            </option>
          );
        })}
      </Select>
    </>
  );

  //Retonar state, interfaz y funcion que modifica el state
  return [state, SelectCripto, actualizarState];
};

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

export default useCriptomoneda;
