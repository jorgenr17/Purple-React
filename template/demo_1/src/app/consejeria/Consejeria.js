import React, { useState } from 'react'
import { Form, Badge } from 'react-bootstrap'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
import TimeKeeper from 'react-timekeeper'
import { calcTotalHours, emptyArray, validateEmptyText, validateHours } from '../../utils/helpers'

export default function Consejerias() {
  registerLocale('es', es)
  const defaulConsejeria = {
    razon: '',
    idRemitente: JSON.parse(localStorage.getItem('@SESSION_DATA'))?.user?.id,
    idEstudiantes: [],
    fecha: new Date(),
    horaInicio: '12:00pm',
    horaFinal: '12:20pm',
    totalHoras: calcTotalHours('12:00pm', '12:20pm')
  }
  const defaultValidationObj = { error: false, message: '' }
  const [students] = useState([
    { name: 'José Álvarez', id: 1 },
    { name: 'Pedro Martínez', id: 2 },
    { name: 'Alejandra Villareal', id: 3 },
    { name: 'Juan de la Ossa', id: 4 },
    { name: 'Estephany Argumedo', id: 5 },
    { name: 'Diana Pérez', id: 6 },
    { name: 'Jorge Narváez', id: 7 },
    { name: 'Alexander Fernández', id: 8 },
    { name: 'Rodrigo García', id: 9 },
    { name: 'Laura Atencia', id: 10 },
    { name: 'Lorena Reyes', id: 11 },
    { name: 'Paula Betacourt', id: 12 },
    { name: 'Manuel Espitia', id: 13 },
    { name: 'Elsa Zapata', id: 14 },
    { name: 'Andrés Ramos', id: 15 },
    { name: 'Enrique Mena', id: 16 },
    { name: 'Pablo Zabaleta', id: 17 },
    { name: 'José Murillo', id: 18 }
  ])
  const [studentsFiltered, setStudentsFiltered] = useState(students)
  const [searchStudents, setSearchStudents] = useState('')
  const [showTimePickerStart, setShowTimePickerStart] = useState(false)
  const [showTimePickerEnd, setShowTimePickerEnd] = useState(false)
  const [consejeria, setConsejeria] = useState({ ...defaulConsejeria })
  const [validationRazon, setValidationRazon] = useState(defaultValidationObj)
  const [validationIdEstudiantes, setValidationIdEstudiantes] = useState(defaultValidationObj)
  const [validationHours, setValidationHours] = useState(defaultValidationObj)

  const handleStudents = student => {
    const index = consejeria.idEstudiantes.indexOf(student.id)
    const exist = index !== -1
    if (exist) {
      const studentsArray = [...consejeria.idEstudiantes]
      studentsArray.splice(index, 1)
      setConsejeria({ ...consejeria, idEstudiantes: [...studentsArray] })
      setValidationIdEstudiantes(emptyArray(studentsArray))
    } else {
      setConsejeria({ ...consejeria, idEstudiantes: [...consejeria.idEstudiantes, student.id] })
      setValidationIdEstudiantes(emptyArray([...consejeria.idEstudiantes, student.id]))
    }
  }

  const handleSearch = text => {
    if (text) {
      const filtered = students.filter(s => s.name.toLowerCase().includes(text.toLowerCase()))
      setStudentsFiltered([...filtered])
    } else {
      setStudentsFiltered([...students])
    }
    setSearchStudents(text)
  }

  const validateFields = () => {
    const fieldValues = [validationRazon.error, validationIdEstudiantes.error, validationHours.error]
    const { razon, horaInicio, horaFinal, idEstudiantes } = consejeria
    const consejeriaValues = [razon, horaInicio, horaFinal]
    const consejeriaArrayValues = [idEstudiantes]
    const validateBooleanValue = value => value === false
    const validateStringValue = value => value !== ''
    const validateArrayValues = value => value.length > 0
    const result =
      fieldValues.every(validateBooleanValue) &&
      consejeriaValues.every(validateStringValue) &&
      consejeriaArrayValues.every(validateArrayValues)
    if (!result) {
      setValidationRazon(validateEmptyText(razon))
      setValidationIdEstudiantes(emptyArray(idEstudiantes))
      setValidationHours(validateHours(horaInicio, horaFinal))
    }
    return result
  }

  const handleCreateconsejeria = () => {
    const isValid = validateFields()
    if (isValid) {
      console.log(consejeria)
    }
  }

  document.addEventListener('click', evt => {
    const currentDiv = evt.target
    if (currentDiv.getAttribute('name') !== 'listSearch' && searchStudents !== '') {
      setSearchStudents('')
    }
  })

  return (
    <div id="consejeriasView">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-primary text-white mr-2">
            <i className="mdi mdi-chart-bubble"></i>
          </span>{' '}
          Consejerías
        </h3>
      </div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Registro de consejerías</h4>
              <p className="card-description"> Complete la información requerida </p>
              <form className="forms-sample">
                <Form.Group>
                  <label htmlFor="exampleInputEmail1">Razón de la consejería</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Tema central de la tutoría"
                    autoComplete="off"
                    onChange={evt => {
                      setConsejeria({ ...consejeria, razon: evt.target.value })
                      setValidationRazon(validateEmptyText(evt.target.value))
                    }}
                    value={consejeria.razon}
                  />
                </Form.Group>
                {validationRazon.error && <p className="text-danger mb-4">{validationRazon.message}</p>}
                <Form.Group>
                  <label htmlFor="searchStudents">Estudiantes que participaron de la consejería</label>
                  <Form.Control
                    autoComplete="off"
                    type="search"
                    className="form-control"
                    id="searchStudents"
                    placeholder="Buscar estudiantes..."
                    onChange={evt => {
                      handleSearch(evt.target.value)
                    }}
                    value={searchStudents}
                  />
                </Form.Group>
                {validationIdEstudiantes.error && <p className="text-danger mb-4">{validationIdEstudiantes.message}</p>}
                {searchStudents !== '' && (
                  <div
                    id="menuSearch"
                    style={{
                      position: 'absolute',
                      zIndex: 3,
                      maxHeight: 200,
                      width: '50%',
                      background: '#FFFFFF',
                      borderColor: '#ebedf2',
                      borderWidth: 0.5,
                      borderStyle: 'solid',
                      overflowY: 'auto'
                    }}
                  >
                    {studentsFiltered.map((student, i) => {
                      return (
                        <div
                          key={i}
                          name="listSearch"
                          style={{
                            height: 50,
                            width: '100%',
                            borderBottomColor: '#ebedf2',
                            borderBottomWidth: 0.5,
                            borderBottomStyle: 'solid',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingLeft: 10,
                            paddingRight: 10,
                            cursor: 'pointer'
                          }}
                          onClick={() => handleStudents(student)}
                        >
                          <span style={{ color: '#76838f' }}>{student.name}</span>
                          {consejeria.idEstudiantes.indexOf(student.id) !== -1 && (
                            <i className="mdi mdi-checkbox-marked text-success" style={{ fontSize: '1.5rem' }}></i>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
                <div className="mb-4">
                  {consejeria.idEstudiantes.map((id, i) => {
                    return (
                      <span key={i}>
                        <Badge pill className="bg-secondary" style={{ fontSize: '.8rem', color: '#76838f' }}>
                          {students.find(s => s.id === id).name}{' '}
                          <i className="mdi mdi-close" onClick={() => handleStudents({ id })}></i>
                        </Badge>{' '}
                      </span>
                    )
                  })}
                </div>
                <Form.Group className="row">
                  <div className="col-sm-4 col-form-label">
                    <label htmlFor="date">Fecha de la consejería</label>
                    <div>
                      <DatePicker
                        className="form-control w-100"
                        id="date"
                        selected={new Date(consejeria.fecha)}
                        locale="es"
                        maxDate={new Date()}
                        // minDate={new Date(consejeria.fecha)}
                        onChange={date => {
                          setConsejeria({ ...consejeria, fecha: new Date(date).toISOString() })
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4 col-form-label">
                    <label htmlFor="startTime">Hora inicio</label>
                    <Form.Control
                      type="text"
                      id="startTime"
                      value={consejeria.horaInicio}
                      onChange={() => true}
                      onFocus={() => setShowTimePickerStart(!showTimePickerStart)}
                    />
                    {showTimePickerStart && (
                      <div style={{ position: 'absolute', top: '-5rem' }}>
                        <TimeKeeper
                          time={consejeria.horaInicio}
                          onChange={data => {
                            setConsejeria({
                              ...consejeria,
                              horaInicio: data.formatted12,
                              totalHoras: calcTotalHours(data.formatted12, consejeria.horaFinal)
                            })
                            setValidationHours(validateHours(data.formatted12, consejeria.horaFinal))
                          }}
                          doneButton={() => (
                            <div
                              className="text-secondary bg-primary"
                              style={{ textAlign: 'center', padding: 10 }}
                              onClick={() => setShowTimePickerStart(!showTimePickerStart)}
                            >
                              Listo
                            </div>
                          )}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-sm-4 col-form-label">
                    <label htmlFor="endTime">Hora final</label>
                    <Form.Control
                      type="text"
                      id="endTime"
                      value={consejeria.horaFinal}
                      onChange={() => true}
                      onFocus={() => setShowTimePickerEnd(!showTimePickerEnd)}
                    />
                    {showTimePickerEnd && (
                      <div style={{ position: 'absolute', top: '-5rem' }}>
                        <TimeKeeper
                          time={consejeria.horaFinal}
                          onChange={data => {
                            setConsejeria({
                              ...consejeria,
                              horaFinal: data.formatted12,
                              totalHoras: calcTotalHours(consejeria.horaInicio, data.formatted12)
                            })
                            setValidationHours(validateHours(consejeria.horaInicio, data.formatted12))
                          }}
                          doneButton={() => (
                            <div
                              className="text-secondary bg-primary"
                              style={{ textAlign: 'center', padding: 10 }}
                              onClick={() => setShowTimePickerEnd(!showTimePickerEnd)}
                            >
                              Listo
                            </div>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </Form.Group>
                {validationHours.error && <p className="text-danger mb-4">{validationHours.message}</p>}
                <Form.Group>
                  <label htmlFor="exampleTextarea1">Cantidad de horas de la consejería</label>
                  <Form.Control
                    placeholder="Cantidad de horas de la consejería"
                    disabled
                    id="exampleTextarea1"
                    value={consejeria.totalHoras}
                  />
                </Form.Group>
                <div style={{ textAlign: 'right' }}>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={evt => {
                      evt.preventDefault()
                      handleCreateconsejeria()
                    }}
                  >
                    Guardar
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={evt => {
                      evt.preventDefault()
                      setConsejeria(defaulConsejeria)
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
