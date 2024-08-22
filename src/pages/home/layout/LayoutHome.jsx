import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { URL_POKEMON } from "../../../api/apiRest";
import Header from "../header/Header";
import Card from "../card/Card.jsx";
import css from "./layout.module.scss";

export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState([]);

  useEffect(() => {
    const api = async () => {
      const apiPoke = await axios.get(`${URL_POKEMON}/?limit=151`);

      setArrayPokemon(apiPoke.data.results);
    };

    api();
  }, []);

  return (
    <div style={css.layout}>
      <Header />
      <div className={css.card_content}>
        {arrayPokemon.map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>
    </div>
  );
}
