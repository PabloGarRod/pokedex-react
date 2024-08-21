import React, { useEffect, useState } from "react";
import axios from "axios";

import { URL_POKEMON, URL_ESPECIES } from "../../../api/apiRest";

import css from "./card.module.scss";

export default function Card({ card }) {
  const [itemPokemon, setItemPokemon] = useState({});
  const [speciesPokemon, setSpeciesPokemon] = useState({});

  useEffect(() => {
    const dataPokemon = async () => {
      const api = await axios.get(`${URL_POKEMON}/${card.name}`);
      setItemPokemon(api.data);
    };
    dataPokemon();
  }, []);

  useEffect(() => {
    const dataSpecies = async () => {
      const URL = card.url.split("/");

      const api = await axios.get(`${URL_ESPECIES}/${URL[6]}`);
      setSpeciesPokemon(api.data);
    };
    dataSpecies();
  }, []);

  return (
    <div className={css.card}>
      <img
        className={css.img_poke}
        src={itemPokemon.sprites?.other["official-artwork"].front_default}
        alt="pokemon"
      />
      <div className={`bg-${speciesPokemon?.color?.name} ${css.sub_card}`}>
        <strong className={css.id_card}>{itemPokemon.id}</strong>
        <strong className={css.name_card}>{card.name}</strong>
        <h4 className={css.altura_poke}>{itemPokemon.height * 10} cms</h4>
        <h4 className={css.peso_poke}>{itemPokemon.weight}</h4>
        <h4 className={css.habitat_poke}>habitat</h4>
        <div>
          {itemPokemon?.stats?.map((stat, index) => {
            console.log(stat);
            return (
              <h6 key={index}>
                <span>{stat.stat.name} </span>
                <progress max={110} value={stat.base_stat} />
                <span>{stat.base_stat} </span>
              </h6>
            );
          })}
        </div>
      </div>
    </div>
  );
}
