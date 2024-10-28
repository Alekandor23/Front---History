import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Inicio.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <div className="header" style={{ backgroundColor: '#001745' }}>
        <div className="dropdown">
          <button onClick={toggleSidebar}>
            <i className="bi bi-list"></i>
          </button>
        </div>
        <div className="logo-nombre">
          <button className="logo-button" onClick={() => navigate('/')}>
            <div className="logo">
              <h3>logo</h3>
            </div>
          </button>
          <div className="nombre-app">
            <h3>HistoryHouse</h3>
          </div>
        </div>
        <div className="contenedor-buscador">
          <div className="form-search">
            <form role="search">
              <div className="input-wrapper">
                <input type="text" className="form-control" placeholder="Titulo del libro" />
                <i className="bi bi-search"></i>
              </div>
            </form>
          </div>
        </div>
        <div className="contenedor-usuario">
          <div class="dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-person"></i>
              Usuario
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#" onClick={() => navigate('/Login')}>Iniciar sesion</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`sidebar ${sidebarVisible ? "show-sidebar" : ""}`}>
        <span className="close-btn" onClick={toggleSidebar}>&times;</span>
        <h2>FILTROS</h2>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="categoriaDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Categoria
          </button>
          <div className="dropdown-menu" aria-labelledby="categoriaDropdown">
            <a className="dropdown-item" href="#">Categoria 1</a>
            <a className="dropdown-item" href="#">Categoria 2</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="paisDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            País
          </button>
          <div className="dropdown-menu" aria-labelledby="paisDropdown">
            <a className="dropdown-item" href="#">País 1</a>
            <a className="dropdown-item" href="#">País 2</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;