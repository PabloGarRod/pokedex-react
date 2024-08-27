import axios from "axios";
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { useEffect } from "react";
import { URL_POKEMON } from "../../../api/apiRest";
import Header from "../header/Header";
import Card from "../card/Card.jsx";
import css from "./layout.module.scss";

export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState([]);
  const [page, setPage] = useState(1);
  const [globalPokemon, setGlobalPokemon] = useState();

  const limit = 15;

  const lastPage = Math.round(globalPokemon?.length / 15);

  const initPage = (page - 1) * limit;

  useEffect(() => {
    const api = async () => {
      const apiPoke = await axios.get(
        `${URL_POKEMON}/?offset=${initPage}}&limit=${limit}`
      );

      setArrayPokemon(apiPoke.data.results);
    };

    api();
    getGlobalPokemons();
  }, [page]);

  const getGlobalPokemons = async () => {
    const res = await axios.get(`${URL_POKEMON}?offset=0&limit=1500`);

    const promises = res.data.results.map((pokemon) => {
      return pokemon;
    });

    const results = await Promise.all(promises);
    setGlobalPokemon(results);
  };

  const nextPage = () => {
    if (page < lastPage) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div style={css.layout}>
      <Header />
      <section className={css.section_pagination}>
        <div className={css.div_pagination}>
          <span className={css.item_izquierdo} onClick={previousPage}>
            <FaIcons.FaAngleLeft />
          </span>
          <span className={css.item}> {page} </span>
          <span className={css.item}> DE </span>
          <span className={css.item}> {lastPage} </span>
          <span className={css.item_derecho} onClick={nextPage}>
            <FaIcons.FaAngleRight />
          </span>
        </div>
      </section>
      <div className={css.card_content}>
        {arrayPokemon.map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>
    </div>
  );
}
