import React, { useState, useEffect} from "react";
import '../assets/css/Generator.css';

function GeneratorCurp() {
  const [nombre, setNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [entidadNacimiento, setEntidadNacimiento] = useState("");
  const [curpGenerada, setCurpGenerada] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaValido, setCaptchaValido] = useState(true);

  useEffect(() => {
    generarCaptcha(); // Genera el captcha al montar el componente
  }, []);


  const generarCaptcha = () => {
    const randomCaptcha = Math.floor(Math.random() * 9000) + 1000;
    setCaptcha(randomCaptcha.toString());
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaInput) {
      alert("Por favor, ingrese el captcha.");
      return;
    }
    // Verificar el captcha
    if (captchaInput !== captcha) {
      setCaptchaValido(false);
      return;
    }
    // Si el captcha es correcto, generar la CURP
    const curp = generarCurp();
    setCurpGenerada(curp);
    // Limpiar el campo de entrada del captcha
    setCaptchaInput("");
  };


  const generarCurp = () => {
    let primerNombreGenerar = nombre.toUpperCase();
    if (primerNombreGenerar === 'MARIA' || primerNombreGenerar === 'JOSE') {
      primerNombreGenerar = segundoNombre.toUpperCase();
    }
  
    const primerLetraApellidoPaterno = primerApellido.charAt(0).toUpperCase();
    const primerVocalApellidoPaterno = obtenerPrimeraVocal(primerApellido).toUpperCase();
    const primerLetraApellidoMaterno = segundoApellido.charAt(0).toUpperCase();
    const primerLetraNombre = primerNombreGenerar.charAt(0).toUpperCase();
  
    const [ano, mes, dia] = fechaNacimiento.split("-");
  
    const sexoCurp = (sexo === "Hombre") ? "H" : "M";
  
    const siguienteConsonanteApellidoPaterno = obtenerSiguienteConsonante(primerApellido, 1).toUpperCase();
    const siguienteConsonanteApellidoMaterno = obtenerSiguienteConsonante(segundoApellido, 0).toUpperCase();
    const siguienteConsonanteNombre = obtenerSiguienteConsonante(primerNombreGenerar, 1).toUpperCase();
  
    const curp = `${primerLetraApellidoPaterno}${primerVocalApellidoPaterno}${primerLetraApellidoMaterno}${primerLetraNombre}${ano.slice(-2)}${mes}${dia}${sexoCurp}CS${siguienteConsonanteApellidoPaterno}${siguienteConsonanteApellidoMaterno}${siguienteConsonanteNombre}XX`;
    return curp;
  };


  
const obtenerPrimeraVocal = (cadena) => {
  const vocales = cadena.match(/[aeiouAEIOUáéíóúÁÉÍÓÚ]/g);
  if (vocales && vocales.length > 0) {
    if ("aeiouAEIOUáéíóúÁÉÍÓÚ".includes(cadena[0])) {
      return vocales[1] ? vocales[1].toUpperCase() : '';
    } else {
      return vocales[0].toUpperCase();
    }
  }
  return '';
};
  
  const obtenerSiguienteConsonante = (cadena) => {
    const primeraLetra = cadena.charAt(0).toUpperCase();
    const consonantes = cadena.substring(1).match(/[^aeiouAEIOUáéíóúÁÉÍÓÚ]/g);
    if (consonantes && consonantes.length > 0) {
        return consonantes[0].toUpperCase();
    } else {
        return primeraLetra;
    }
};


  return (
    <div id="clasepadre">
      <div className="clasehijo">
      <form onSubmit={handleSubmit} className="formulario">
        <div className="formulario-div">
        <div className="title">GENERADOR DE CURP</div>
        <div className="nombre">
          <label>
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="segundo-nombre">
        <label>
          Segundo Nombre:
          <input
            type="text"
            value={segundoNombre}
            onChange={(e) => setSegundoNombre(e.target.value)}
            />
        </label>
        </div>
        <div className="primer-apellido">
        <label>
          Primer apellido:
          <input
            type="text"
            value={primerApellido}
            onChange={(e) => setPrimerApellido(e.target.value)}
            required
            />
        </label>
        </div>
        <div className="segundo-apellido">
        <label>
          Segundo apellido:
          <input
            type="text"
            value={segundoApellido}
            onChange={(e) => setSegundoApellido(e.target.value)}
            required
            />
        </label>
        </div>
        <div className="fecha">
        <label>
          Fecha de nacimiento:
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
            />
        </label>
        </div>
        <div className="sexo">
        <label>
          Sexo:
          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            required
            >
            <option value="">Selecciona</option>
            <option value="Mujer">Mujer</option>
            <option value="Hombre">Hombre</option>
          </select>
        </label>
        </div>
        <div className="entidad">
        <label>
          Entidad de Nacimiento:
          <select
            value={entidadNacimiento}
            onChange={(e) => setEntidadNacimiento(e.target.value)}
            required
            >
            <option value="Chiapas">Chiapas</option>
          </select>
        </label>
        </div>
        <div className="captcha">
          <div className="captchalabel">
           <label>Captcha: {captcha}</label>
          </div>
          <div className="boton">
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Ingresa el captcha"
                required
              />
              {!captchaValido && (
                <span className="error">Captcha incorrecto</span>
              )}
          </div>
        </div>
        <button type="submit">Generar CURP</button>
        </div>
      </form>
      </div>

      {curpGenerada && (
        <div class="curp">
          <div className="infoCurp">
            <h3>CURP Generada:</h3>
            <p>{curpGenerada}</p>
          </div>
        </div>
      )}
      </div>
  );
}

export default GeneratorCurp;
