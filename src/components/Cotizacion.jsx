import React from "react";
import styled from "styled-components";

function Cotizacion({ resultado }) {
  //Si el objeto llega vacio no va renderizar el componente
  if (Object.keys(resultado).length === 0) return null;
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = resultado;

  return (
    <ResultadoDiv>
      <Precio>
        El precio es: <span>{PRICE}</span>{" "}
      </Precio>
      <Info>
        El precio más alto del dia: <span>{HIGHDAY}</span>{" "}
      </Info>
      <Info>
        El precio más bajo del dia es: <span>{LOWDAY}</span>{" "}
      </Info>
      <Info>
        Variacion ultimas 24 horas: <span>{CHANGEPCT24HOUR}</span>{" "}
      </Info>
      <Info>
        Última actualización: <span>{LASTUPDATE}</span>{" "}
      </Info>
    </ResultadoDiv>
  );
}

const ResultadoDiv = styled.div`
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;
    span {
        font-weight:bold;
    }
`;
const Precio = styled.p`
    font-size: 30px;
    span {
        font-weight:bold;
    }
`

export default Cotizacion;
