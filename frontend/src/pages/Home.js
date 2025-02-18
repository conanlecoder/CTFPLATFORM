import React, { useEffect, useState } from 'react';
import Navigation from "../components/Navigation";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import Cards from '../components/Cards';

const Home = () => {
  var isAuth = (localStorage.getItem('token'));
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
        .get("http://68.183.75.21:3000/api/categories/getCategories", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        })
        .then((res) => setData(res.data.data))
        .catch((err) => {
          isAuth = null;
          localStorage.removeItem('token',)
        })
  }, []);

  const renderHome = (
      <div className="columns is-multiline is-centered double-divider">
        {data.map((category) => (
            <Cards key={"Cards" + category._id} category={category} />
        ))}
      </div>
  );

  return (
      <div className="header">
        <Navigation />
        <h1 className="title double-divider">Plateforme <span className="red">CTF</span> pour
          les étudiants d'
          <a href="https://www.insa-centrevaldeloire.fr/" target="_blank" >
          <span className="red" href="https://www.insa-centrevaldeloire.fr/">
            INSACVL
          </span>
          </a>
        </h1>
        {!isAuth ? <button className="button is-link">
          <NavLink exact="true" className="button is-link" to="/register">
            Register
          </NavLink>
        </button> : renderHome}
      </div>
  );
};

export default Home;
