import React from 'react'
import { Form, Button, Dropdown } from 'react-bootstrap'

export default function Programas() {
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-primary text-white mr-2">
            <i className="mdi mdi-book"></i>
          </span>{' '}
          Programas
        </h3>
        {/* <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={event => event.preventDefault()}>
                UI Elements
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Buttons
            </li>
          </ol>
        </nav> */}
      </div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Nuevo programa</h4>
              <p className="card-description"> Diligencie el formulario para agregar un programa</p>
              <form className="forms-sample">
                <Form.Group>
                  <label htmlFor="exampleInputUsername1">Nombre</label>
                  <Form.Control type="text" id="exampleInputUsername1" placeholder="Nombre del programa" size="lg" />
                </Form.Group>
                <div className="row">
                  <div className="col-md-9 grid-margin">
                    <Form.Group>
                      <label htmlFor="exampleInputEmail1">Código</label>
                      <Form.Control
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Código único del programa"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-3 grid-margin">
                    <Form.Group>
                      <label htmlFor="dropdownMenuButtonFacultad">Facultad</label>
                      <Dropdown>
                        <Dropdown.Toggle variant="btn btn-primary" id="dropdownMenuButtonFacultad">
                          Seleccione...
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Ingenierías</Dropdown.Item>
                          <Dropdown.Item>Ciencias de la salud</Dropdown.Item>
                          <Dropdown.Item>Humanidades</Dropdown.Item>
                          {/* <Dropdown.Divider></Dropdown.Divider>
                          <Dropdown.Item>Separated link</Dropdown.Item> */}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Group>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button className="btn btn-secondary mr-2">Cancelar</button>
                  <button type="submit" className="btn btn-primary">
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
            <h4 className="card-title">Lista de programa</h4>
            <p className="card-description">
              {' '}
              Listado de <code>programas disponibles</code>. En esta sección puede revisar editar y eliminar la
              imformación de cada uno de las programas creados.
            </p>
            <div className="table-responsive">
              <table className="table table-bordered" style={{ textAlign: 'center' }}>
                <thead>
                  <tr>
                    <th> # </th>
                    <th> ID </th>
                    <th> Nombre del programa </th>
                    <th> Código </th>
                    <th> Acciones </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> 1 </td>
                    <td> 1 </td>
                    <td> Ciencias de la Salud </td>
                    <td>campus-mtr-cs</td>
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
                    <td> 2 </td>
                    <td> Ingenierías </td>
                    <td>campus-ctg-ing</td>
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
