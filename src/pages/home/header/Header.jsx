import React from "react";
import * as FaIcons from "react-icons/fa";
import css from "./header.module.scss";
import logo from "../../../assets/pokemon.png";

function Header({ getSearch }) {
  return (
    <nav className={css.header}>
      <div className={css.div_header}>
        <div className={css.div_logo}>
          <img src={logo} alt="logo-pokemon" />
        </div>
        <div className={css.div_search}>
          <div>
            <FaIcons.FaSearch />
          </div>
          <input type="search" onChange={(e) => getSearch(e.target.value)} />
        </div>
      </div>
    </nav>
  );
}

export default Header;
