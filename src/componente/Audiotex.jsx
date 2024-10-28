import { useNavigate, useParams } from "react-router-dom";
import Resumen from "./Resumen";
import { getSummaryByID, getBookByID } from "../service/api";
import { useEffect, useState } from "react";
import Reproductor from "./Reproductor"; // Importa el componente Reproductor

const Audiotex = () => {
  const navegacion = useNavigate();
  const { id } = useParams();
  const [summary, setSummary] = useState(null);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [txt, setTxt] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // Para el índice de palabras actuales

  useEffect(() => {
    const obtenerDatos = async () => {
      setLoading(true);
      try {
        const [summaryResponse, bookResponse] = await Promise.all([
          getSummaryByID(id),
          getBookByID(id),
        ]);
        if (summaryResponse.status !== 200 || bookResponse.status !== 200) {
          throw new Error("Error al obtener los datos");
        }
        setSummary(summaryResponse.data);
        setBook(bookResponse.data);
        setTxt(summaryResponse.data.resumen); // Asigna el resumen a txt
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    obtenerDatos();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  // Divide el texto en palabras y resalta la palabra en el índice actual
  const renderTextoKaraoke = () => {
    if (!txt) return null;
    const palabras = txt.split(' ');
    return palabras.map((palabra, index) => (
      <span key={index} className={index === currentIndex ? 'active' : ''}>
        {palabra}{' '}
      </span>
    ));
  };

  return (
    <div className="contenedor-audiotex">
      <div className="contenedor-flecha">
        <div className="row">
          <i className="bi bi-arrow-left" id="otro" onClick={() => navegacion(-1)}></i>
        </div>
      </div>
      <div className="contenedor-textoaudio">
        {book && (
          <div className='titulo-del-audiolibro'>
            <h1>{book.titulo}</h1>
          </div>
        )}
        <div
          data-bs-spy="scroll"
          data-bs-target="#navbar-example2"
          data-bs-root-margin="0px 0px -40%"
          data-bs-smooth-scroll="true"
          className="scrollspy-textoaudio bg-body-tertiary p-3 rounded-2 texto-bonito"
          tabIndex="0"
        >
          <p>{renderTextoKaraoke()}</p>
        </div>
      </div>
      <Reproductor txt={txt} setCurrentIndex={setCurrentIndex} onClose={() => {}} /> {/* Pasa txt y setCurrentIndex */}
      <style jsx>{`
        .active {
          color: red;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Audiotex;
