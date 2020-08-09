import React, { useContext, useState } from 'react';
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';
import 'notie/dist/notie.min.css';
import { alert } from 'notie';
const Formulario = () => {

  const [busqueda, guardarBusqueda] = useState({
    nombre: '',
    categoria: ''
  });

  const { categorias } = useContext(CategoriasContext);
  const { buscarRecetas, guardarConsultar } = useContext(RecetasContext);

  // Función para leer los contenidos
  const obtenerDatosReceta = e => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    });
  }

  const comprobarFormulario = (busqueda) => {
    if (busqueda.nombre !== '' && busqueda.categoria !== '') {
      return true;
    }
    else {
      return false;
    }
  }

  return (
    <form className="col-12"
      onSubmit={ e => {
        e.preventDefault();
        const respuesta = comprobarFormulario(busqueda);

        if (respuesta) {
          buscarRecetas(busqueda);
          guardarConsultar(true);          
        }
        else{
          alert({
            type: 'warning', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
            text: 'Por favor rellena todos los campos',
            time: 3, // optional, default = 3, minimum = 1,
            position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
          });
        }
      }}
    >

      <fieldset className="text-center">
        <legend>Busca bebidas por Categoría o  Ingredientes</legend>
      </fieldset>

      <div className="row mt-4">

        <div className="col-md-4">
          <input name="nombre" className="form-control" tyepe="text" placeholder="Buscar por Ingrediente"
            onChange={obtenerDatosReceta}
          />
        </div>

        <div className="col-md-4">
          <select name="categoria" className="form-control"
            onChange={obtenerDatosReceta}

          >
            <option value="">Selecciona Categoría</option>
            {categorias.map(categoria => (
              <option
                key={categoria.strCategory}
                value={categoria.strCategory}
              >
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input type="submit" value="Buscar Recetas" className="btn btn-block btn-primary" />
        </div>

      </div>

    </form>
  );
}

export default Formulario;