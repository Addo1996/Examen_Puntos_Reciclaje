
import { useState, useEffect } from "react";
import PuntoCard from "./Components/PuntoCard";
import "./App.css";

function App() {

  const [puntos, setPuntos] = useState([]);

  const [nombre, setNombre] = useState("");
  const [sector, setSector] = useState("");
  const [material, setMaterial] = useState("");
  const [capacidad, setCapacidad] = useState("");

  // Consultar los puntos al cargar la pagina
  useEffect(() => {
    consultarPuntos();
  }, []);

  // Calcular los indicadores del sistema
  const totalPuntos = puntos.length;

  const totalSectores = new Set(
    puntos.map((punto) => punto.sector)
  ).size;

  const totalMateriales = new Set(
    puntos.map((punto) => punto.material)
  ).size;

  // Obtener todos los puntos desde Spring Boot
  const consultarPuntos = async () => {
    try {
      const respuesta = await fetch("http://localhost:8080/api/puntos");
      const datos = await respuesta.json();

      setPuntos(datos);
    } catch (error) {
      console.error("Error al consultar los puntos:", error);
    }
  };

  // Registrar un nuevo punto
  const registrarPunto = async (e) => {
    e.preventDefault();

    const nuevoPunto = {
      nombre,
      sector,
      material,
      capacidad: Number(capacidad)
    };

    try {
      const respuesta = await fetch("http://localhost:8080/api/puntos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoPunto)
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo registrar el punto");
      }

      const puntoGuardado = await respuesta.json();

      setPuntos([...puntos, puntoGuardado]);

      setNombre("");
      setSector("");
      setMaterial("");
      setCapacidad("");

    } catch (error) {
      console.error("Error al registrar:", error);
      alert("No se pudo registrar el punto de reciclaje");
    }
  };

  return (
    <div className="contenedor">

      <div className="encabezado">
        <h1>♻ Sistema de Puntos de Reciclaje</h1>
        <p>Gestiona y consulta los puntos de reciclaje urbano</p>
      </div>

      <h2>Registrar punto de reciclaje</h2>

      <form onSubmit={registrarPunto}>

        <input
          type="text"
          placeholder="Nombre del punto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Sector"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Material"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Capacidad"
          value={capacidad}
          onChange={(e) => setCapacidad(e.target.value)}
          min="1"
          required
        />

        <button type="submit">
          Registrar punto
        </button>

      </form>

      {/* Indicadores del sistema */}
      <div className="indicadores">

        <div className="indicador">
          <span className="icono">♻️</span>
          <h3>{totalPuntos}</h3>
          <p>Puntos registrados</p>
        </div>

        <div className="indicador">
          <span className="icono">📍</span>
          <h3>{totalSectores}</h3>
          <p>Sectores registrados</p>
        </div>

        <div className="indicador">
          <span className="icono">🌱</span>
          <h3>{totalMateriales}</h3>
          <p>Tipos de materiales</p>
        </div>

      </div>

      <h2>Puntos de reciclaje registrados</h2>

      <div className="lista-puntos">
        {puntos.map((punto) => (
          <PuntoCard key={punto.id} punto={punto} />
        ))}
      </div>

    </div>
  );
}

export default App;
