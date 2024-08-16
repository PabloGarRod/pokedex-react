import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { URL_POKEMON } from "../../../api/apiRest";
import Header from "../header/Header";
import css from "./layout.module.scss";

export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState();

  useEffect(() => {
    const api = async () => {
      const apiPoke = await axios.get(`${URL_POKEMON}`);
      console.log(apiPoke.data);
      setArrayPokemon(apiPoke.data.results);
    };

    api();
  }, []);

  return (
    <div style={css.layout}>
      <Header />
    </div>
  );
}
