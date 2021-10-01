import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function Campus() {
  const defaultCampus = { nombre: '', codigo: '' }
  const [campus, setCampus] = useState(defaultCampus)
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-primary text-white mr-2">
            <i className="mdi mdi-city-variant"></i>
          </span>{' '}
          Campus
        </h3>
      </div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Nuevo campus</h4>
              <p className="card-description"> Diligencie el formulario para agregar un nuevo campus </p>
              <form className="forms-sample">
                <Form.Group>
                  <label htmlFor="exampleInputUsername1">Nombre</label>
                  <Form.Control
                    type="text"
                    id="exampleInputUsername1"
                    placeholder="Nombre del campus"
                    size="lg"
                    onChange={event => setCampus({ ...campus, nombre: event.target.value })}
                    value={campus.nombre}
                  />
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputEmail1">Código</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Código único del campus"
                    onChange={event => setCampus({ ...campus, codigo: event.target.value.toUpperCase() })}
                    value={campus.codigo}
                  />
                </Form.Group>
                <div style={{ textAlign: 'right' }}>
                  <button
                    className="btn btn-secondary mr-2"
                    onClick={evt => {
                      evt.preventDefault()
                      setCampus(defaultCampus)
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={evt => {
                      evt.preventDefault()
                      console.log(campus)
                    }}
                  >
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Lista de campus</h4>
            <p className="card-description">
              {' '}
              Listado de <code>campus disponibles</code>. En esta sección puede revisar editar y eliminar la imformación
              de cada uno de los campus.
            </p>
            <div className="table-responsive">
              <table className="table table-bordered" style={{ textAlign: 'center' }}>
                <thead>
                  <tr>
                    <th> # </th>
                    <th> ID </th>
                    <th> Nombre </th>
                    <th> Código </th>
                    <th> Acciones </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> 1 </td>
                    <td> 5 </td>
                    <td> Unisinú Montería </td>
                    <td>campus-mtr</td>
                    <td>
                      <Button type="submit" className="btn btn-danger mr-2" size="sm">
                        <i className="mdi mdi-delete"></i>
                      </Button>
                      <Button className="btn btn-warning" size="sm">
                        <i className="mdi mdi-pencil"></i>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td> 2 </td>
                    <td> 1 </td>
                    <td> Unisinú Cartagena </td>
                    <td>campus-ctg</td>
                    <td>
                      <Button type="submit" className="btn btn-danger mr-2" size="sm">
                        <i className="mdi mdi-delete"></i>
                      </Button>
                      <Button className="btn btn-warning" size="sm">
                        <i className="mdi mdi-pencil"></i>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
