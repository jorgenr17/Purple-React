import React, { useEffect, useState } from 'react'
import { Form, Dropdown } from 'react-bootstrap'
import { validateEmptyText } from '../../utils/helpers'

export default function Metas() {
  const defaultValidationObj = { error: false, message: '' }
  const defaultMetaTutoria = {
    idCurso: '',
    periodo: 'PERIDO-EJEMPLO-PREG',
    cantidadHoras: 0,
    idProfesor: JSON.parse(localStorage.getItem('@SESSION_DATA'))?.user?.id
  }

  const defaultMetaConsejeria = {
    periodo: 'PERIDO-EJEMPLO-PREG',
    cantidadHoras: 0,
    idProfesor: JSON.parse(localStorage.getItem('@SESSION_DATA'))?.user?.id
  }
  const [tiposMetas] = useState([
    { id: 1, name: 'Tutoría' },
    { id: 2, name: 'Consejería' }
  ])
  const [tipoMeta, setTipoMeta] = useState(null)
  const [meta, setMeta] = useState(null)
  const [validationIdCurso, setValidationIdCurso] = useState(defaultValidationObj)
  const [validationCantidadHoras, setValidationCantidadHoras] = useState(defaultValidationObj)
  const [courses] = useState([
    { id: '', name: 'Ningun curso seleccionado' },
    { id: '1', name: 'Curso 1' },
    { id: '2', name: 'Curso 2' },
    { id: '3', name: 'Curso 3' },
    { id: '4', name: 'Curso 4' },
    { id: '5', name: 'Curso 5' },
    { id: '6', name: 'Curso 6' },
    { id: '7', name: 'Curso 7' },
    { id: '8', name: 'Curso 8' },
    { id: '9', name: 'Curso 9' },
    { id: '10', name: 'Curso 10' }
  ])

  const validateFieldsTutoria = () => {
    const fieldValues = [validationCantidadHoras.error, validationIdCurso.error]
    const { idCurso, cantidadHoras } = meta
    const tutoriaValues = [idCurso, cantidadHoras]
    const validateBooleanValue = value => value === false
    const validateStringValue = value => value && true
    const result = fieldValues.every(validateBooleanValue) && tutoriaValues.every(validateStringValue)
    if (!result) {
      setValidationIdCurso(validateEmptyText(idCurso))
      setValidationCantidadHoras(validateEmptyText(cantidadHoras === 0 && ''))
    }
    return result
  }

  const validateFieldsConsejeria = () => {
    const fieldValues = [validationCantidadHoras.error]
    const { cantidadHoras } = meta
    const tutoriaValues = [cantidadHoras]
    const validateBooleanValue = value => value === false
    const validateStringValue = value => value && true
    const result = fieldValues.every(validateBooleanValue) && tutoriaValues.every(validateStringValue)
    if (!result) {
      setValidationCantidadHoras(validateEmptyText(cantidadHoras === 0 && ''))
    }
    return result
  }

  const handleCreateTutoria = () => {
    const isValid = validateFieldsTutoria()
    if (isValid) {
      console.log(meta)
    }
  }

  const handleCreateConsejeria = () => {
    const isValid = validateFieldsConsejeria()
    if (isValid) {
      console.log(meta)
    }
  }

  useEffect(() => {
    if (tipoMeta === 1) {
      setMeta({ ...defaultMetaTutoria })
    } else if (tipoMeta === 2) {
      setMeta({ ...defaultMetaConsejeria })
    } else {
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoMeta])

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-primary text-white mr-2">
            <i className="mdi mdi-flag"></i>
          </span>{' '}
          Metas
        </h3>
        <Dropdown>
          <Dropdown.Toggle variant="btn btn-primary">
            {tipoMeta ? tiposMetas.find(tm => tm.id === tipoMeta)?.name : 'Seleccione el tipo de meta'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {tiposMetas.map((tm, i) => {
              return (
                <Dropdown.Item key={i} onClick={() => setTipoMeta(tm.id)}>
                  {tm.name}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            {!tipoMeta && meta === null && (
              <div
                className="card-body"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#76838f'
                }}
              >
                <p>Por favor seleccione el tipo de meta para llenar el formulario</p>
              </div>
            )}
            {tipoMeta === 1 && meta !== null && (
              <div className="card-body">
                <h4 className="card-title">Inscripción de metas de tutoría</h4>
                <p className="card-description">Complete el formulario que encontrará a continuación</p>
                <form className="forms-sample">
                  <Form.Group>
                    <label htmlFor="selectCurso">Curso</label>
                    <Form.Control
                      as="select"
                      id="selectCurso"
                      aria-label="Seleccione el curso"
                      value={meta.idCurso}
                      onChange={evt => {
                        setMeta({ ...meta, idCurso: evt.target.value })
                        setValidationIdCurso(validateEmptyText(evt.target.value))
                      }}
                    >
                      {courses.map((course, i) => {
                        return (
                          <option key={i} value={course.id}>
                            {course.name}
                          </option>
                        )
                      })}
                    </Form.Control>
                  </Form.Group>
                  {validationIdCurso.error && <p className="text-danger mb-4">{validationIdCurso.message}</p>}
                  <Form.Group>
                    <label htmlFor="cantidadHoras">Cantidad de horas de tutoría por curso</label>
                    <Form.Control
                      type="number"
                      id="cantidadHoras"
                      onChange={evt => {
                        let value = evt.target.value
                        if (value !== '') {
                          value = parseInt(Math.abs(value))
                        }
                        setMeta({ ...meta, cantidadHoras: value })
                        setValidationCantidadHoras(validateEmptyText(value))
                      }}
                      value={meta.cantidadHoras}
                    />
                  </Form.Group>
                  {validationCantidadHoras.error && (
                    <p className="text-danger mb-4">{validationCantidadHoras.message}</p>
                  )}
                  <Form.Group>
                    <label htmlFor="exampleInputEmail1">Periodo académico</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      disabled
                      value={meta.periodo}
                    />
                  </Form.Group>
                  <div style={{ textAlign: 'right' }}>
                    <button
                      onClick={evt => {
                        evt.preventDefault()
                        handleCreateTutoria()
                      }}
                      className="btn btn-primary mr-2"
                    >
                      Guardar
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={evt => {
                        evt.preventDefault()
                        setTipoMeta(null)
                        setMeta(null)
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}
            {tipoMeta === 2 && meta !== null && (
              <div className="card-body">
                <h4 className="card-title">Inscripción de metas de consejería</h4>
                <p className="card-description">Complete el formulario que encontrará a continuación</p>
                <form className="forms-sample">
                  <Form.Group>
                    <label htmlFor="cantidadHoras">Cantidad de horas de consejería</label>
                    <Form.Control
                      type="number"
                      id="cantidadHoras"
                      onChange={evt => {
                        let value = evt.target.value
                        if (value !== '') {
                          value = parseInt(Math.abs(value))
                        }
                        setMeta({ ...meta, cantidadHoras: value })
                        setValidationCantidadHoras(validateEmptyText(value))
                      }}
                      value={meta.cantidadHoras}
                    />
                  </Form.Group>
                  {validationCantidadHoras.error && (
                    <p className="text-danger mb-4">{validationCantidadHoras.message}</p>
                  )}
                  <Form.Group>
                    <label htmlFor="exampleInputEmail1">Periodo académico</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      disabled
                      value={meta.periodo}
                    />
                  </Form.Group>
                  <div style={{ textAlign: 'right' }}>
                    <button
                      onClick={evt => {
                        evt.preventDefault()
                        handleCreateConsejeria()
                      }}
                      className="btn btn-primary mr-2"
                    >
                      Guardar
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={evt => {
                        evt.preventDefault()
                        setTipoMeta(null)
                        setMeta(null)
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
