import { Link, useNavigate } from "react-router-dom"

import './Inicio.css'
import { useState, useEffect } from "react";
import { getBooks } from "../service/api";

const Home = () => {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  console.log("Estos son los libros", books)

  useEffect(() => {
    obtenerLibros();
  }, [])

  const obtenerLibros = async () => {
    try {
      const response = await getBooks();
      if (response.status !== 200) {
        throw new Error('Error en la carga de datos');
      }
      console.log(response.data)
      setBooks(response.data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Finalizar carga
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="contenedor-logo container">
        <h1 style={{ textAlign: "center" }}>LOGO</h1>
      </div>
      <div className="contenedor-conciertos container">
        {
          books.map((book) => (
            <Link
              className="card menu-link"
              key={book.id}
              to={`/Libro/${book.id}`}
              onClick={() => irADetalles(book.id)}
              style={{ textDecoration: 'none', color: 'inherit' }} 
            >
              <img
                className="img"
                src={book.portada}
                alt={book.titulo}
              />
              <div className="textos">
                <h3>{book.titulo}</h3>

              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home
