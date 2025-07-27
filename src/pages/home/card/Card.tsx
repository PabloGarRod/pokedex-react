import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  URL_POKEMON,
  URL_ESPECIES,
  URL_EVOLUCIONES,
} from "../../../api/apiRest";

import css from "./card.module.scss";
import { Pokemon } from "../../../types/pokemon";

type CardProps = {
  card: Pokemon;
};

export default function Card({ card }: CardProps) {
  const [itemPokemon, setItemPokemon] = useState<any>({});
  const [speciesPokemon, setSpeciesPokemon] = useState<any>({});
  const [evolutions, setEvolutions] = useState<any>([]);

  useEffect(() => {
    const dataPokemon = async () => {
      const api = await axios.get(`${URL_POKEMON}/${card.name}`);
      setItemPokemon(api.data);
    };
    dataPokemon();
  }, [card.name]);

  useEffect(() => {
    const getDataSpecies = async () => {
      const URL = card.url.split("/");

      const api = await axios.get(`${URL_ESPECIES}/${URL[6]}`);
      setSpeciesPokemon({
        url_specie: api?.data?.evolution_chain,
        data: api.data,
      });
    };
    getDataSpecies();
  }, [card.name]);

  useEffect(() => {
    async function getPokemonImage(id: string) {
      const response = await axios.get(`${URL_POKEMON}/${id}`);
      return response?.data?.sprites?.other["official-artwork"]?.front_default;
    }

    if (speciesPokemon?.url_specie) {
      // TODO: Cambiar tipado any
      const arrayEvolutions: any = [];
      const getEvolutions = async () => {
        const URL = speciesPokemon?.url_specie?.url.split("/");

        const api = await axios.get(`${URL_EVOLUCIONES}/${URL[6]}`);

        const url2 = api?.data?.chain?.species?.url?.split("/");

        const img1 = await getPokemonImage(url2[6]);

        arrayEvolutions.push({
          img: img1,
          name: api?.data?.chain?.species?.name,
        });

        if (api?.data?.chain?.evolves_to?.lenght !== 0) {
          const data2 = api?.data?.chain?.evolves_to[0]?.species;
          const id = data2?.url?.split("/")[6];
          const img2 = await getPokemonImage(id);
          arrayEvolutions.push({
            img: img2,
            name: data2.name,
          });
        }

        if (api?.data?.chain?.evolves_to[0].evolves_to.lenght !== 0) {
          const data3 = api?.data?.chain?.evolves_to[0]?.evolves_to[0]?.species;
          const id = data3?.url?.split("/")[6];
          if (id) {
            const img3 = await getPokemonImage(id);
            arrayEvolutions.push({
              img: img3,
              name: data3.name,
            });
          }
        }

        setEvolutions(arrayEvolutions);
      };
      getEvolutions();
    }
  }, [speciesPokemon]);

  let pokeId = itemPokemon?.id?.toString();

  pokeId = "0".repeat(3 - pokeId?.length) + pokeId;

  return (
    <div className={css.card}>
      <img
        className={css.img_poke}
        src={itemPokemon.sprites?.other["official-artwork"].front_default}
        alt="pokemon"
      />
      <div
        className={`bg-${speciesPokemon?.data?.color?.name} ${css.sub_card}`}
      >
        <strong className={css.id_card}>#{pokeId}</strong>
        <strong className={css.name_card}>{card.name}</strong>
        <h4 className={css.altura_poke}>
          Altura: {itemPokemon.height * 10} cms
        </h4>
        <h4 className={css.peso_poke}>Peso: {itemPokemon.weight / 10} kgs</h4>
        <h4 className={css.habitat_poke}>
          Habitat: {speciesPokemon?.data?.habitat?.name}
        </h4>
        <div className={css.div_stats}>
          {/* TODO: Cambiar tipado any */}
          {itemPokemon?.stats?.map(({ stat, index }: any) => {
            console.log(stat);
            return (
              <h6 key={index} className={css.item_stats}>
                <span className={css.name}>{stat.name} </span>
                {/* TODO: Arreglar stats de los pokemon */}
                <progress max={110} value={Math.floor(Math.random() * 110)} />
                <span className={css.numero}>{stat.base_stat} </span>
              </h6>
            );
          })}
        </div>
        <div className={css.div_type_color}>
          {/* TODO: Cambiar tipado any */}
          {itemPokemon?.types?.map(({ type, index }: any) => {
            return (
              <h6
                key={index}
                className={`${css.color_type} color-${type.name}`}
              >
                {type.name}
              </h6>
            );
          })}
        </div>
        <div className={css.div_evolution}>
          {/* TODO: Cambiar tipado any */}
          {/* {evolutions.map(({ evol, index }: any) => {
            return (
              <div key={index} className={css.item_evol}>
                <img src={evol.img} alt="evolution" className={css.img_evol} />
                <h6>{evol.name}</h6>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
}
