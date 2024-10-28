import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login">
      <div className="login-screen">
        <div className="contenedor-logo">
          <h3>Logo</h3>
        </div>
        <div className="app-title">
          <h1>History House</h1>
        </div>
        <div className="login-form">
          <div className="control-group">
            <input type="text" className="login-field" placeholder="Usuario" id="login-name" />
          </div>
          <div className="control-group">
            <input type="password" className="login-field" placeholder="Contraseña" id="login-pass" />
          </div>
          <div className="button-container">
            <button className="login-button">Iniciar Sesión</button>
            <button className="signup-button" onClick={() => navigate('/Registro')}>
              Crear Usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

  