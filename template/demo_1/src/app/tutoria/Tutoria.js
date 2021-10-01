import React, { useState } from 'react'
import { Form, Badge } from 'react-bootstrap'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
import TimeKeeper from 'react-timekeeper'
import { calcTotalHours, emptyArray, validateEmptyText, validateHours, validateURL } from '../../utils/helpers'

export default function Tutorias() {
  registerLocale('es', es)
  const defaultTutoria = {
    tema: '',
    idCurso: '',
    idProfesor: JSON.parse(localStorage.getItem('@SESSION_DATA'))?.user?.id,
    idEstudiantes: [],
    link: '',
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
  const [studentsFiltered, setStudentsFiltered] = useState(students)
  const [searchStudents, setSearchStudents] = useState('')
  const [showTimePickerStart, setShowTimePickerStart] = useState(false)
  const [showTimePickerEnd, setShowTimePickerEnd] = useState(false)
  const [tutoria, setTutoria] = useState({ ...defaultTutoria })
  const [validationIdCurso, setValidationIdCurso] = useState(defaultValidationObj)
  const [validationTema, setValidationTema] = useState(defaultValidationObj)
  const [validationIdEstudiantes, setValidationIdEstudiantes] = useState(defaultValidationObj)
  const [validationLink, setValidationLink] = useState(defaultValidationObj)
  const [validationHours, setValidationHours] = useState(defaultValidationObj)
  // const [time2, setTime2] = useState('12:20pm')
  // const [totalHours, setTotalHours] = useState(calcTotalHours(time, time2))

  const handleStudents = student => {
    const index = tutoria.idEstudiantes.indexOf(student.id)
    const exist = index !== -1
    if (exist) {
      const studentsArray = [...tutoria.idEstudiantes]
      studentsArray.splice(index, 1)
      setTutoria({ ...tutoria, idEstudiantes: [...studentsArray] })
      setValidationIdEstudiantes(emptyArray(studentsArray))
    } else {
      setTutoria({ ...tutoria, idEstudiantes: [...tutoria.idEstudiantes, student.id] })
      setValidationIdEstudiantes(emptyArray([...tutoria.idEstudiantes, student.id]))
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
    const fieldValues = [
      validationTema.error,
      validationIdEstudiantes.error,
      validationHours.error,
      validationHours.error
    ]
    const { tema, horaInicio, horaFinal, idEstudiantes, idCurso } = tutoria
    const tutoriaValues = [tema, horaInicio, horaFinal]
    const tutoriaArrayValues = [idEstudiantes]
    const validateBooleanValue = value => value === false
    const validateStringValue = value => value !== ''
    const validateArrayValues = value => value.length > 0
    const result =
      fieldValues.every(validateBooleanValue) &&
      tutoriaValues.every(validateStringValue) &&
      tutoriaArrayValues.every(validateArrayValues)
    if (!result) {
      setValidationIdCurso(validateEmptyText(idCurso))
      setValidationTema(validateEmptyText(tema))
      setValidationIdEstudiantes(emptyArray(idEstudiantes))
      setValidationHours(validateHours(horaInicio, horaFinal))
    }
    return result
  }

  const handleCreateTutoria = () => {
    const isValid = validateFields()
    if (isValid) {
      console.log(tutoria)
    }
  }

  document.addEventListener('click', evt => {
    const currentDiv = evt.target
    if (currentDiv.getAttribute('name') !== 'listSearch' && searchStudents !== '') {
      setSearchStudents('')
    }
    // menuSearch
  })

  return (
    <div id="tutoriasView">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-primary text-white mr-2">
            <i className="mdi mdi-bookmark"></i>
          </span>{' '}
          Tutorías
        </h3>
      </div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Registro de tutorías</h4>
              <p className="card-description"> Complete la información requerida </p>
              <form className="forms-sample">
                <Form.Group>
                  <label htmlFor="selectCurso">Curso de la tutoría</label>
                  <Form.Control
                    as="select"
                    id="selectCurso"
                    aria-label="Seleccione el curso"
                    value={tutoria.idCurso}
                    onChange={evt => {
                      setTutoria({ ...tutoria, idCurso: evt.target.value })
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
                  <label htmlFor="exampleInputEmail1">Tema de la tutoría</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Tema central de la tutoría"
                    autoComplete="off"
                    onChange={evt => {
                      setTutoria({ ...tutoria, tema: evt.target.value })
                      setValidationTema(validateEmptyText(evt.target.value))
                    }}
                    value={tutoria.tema}
                  />
                </Form.Group>
                {validationTema.error && <p className="text-danger mb-4">{validationTema.message}</p>}
                <Form.Group>
                  <label htmlFor="searchStudents">Estudiantes que participaron de la tutoría</label>
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
                          {tutoria.idEstudiantes.indexOf(student.id) !== -1 && (
                            <i className="mdi mdi-checkbox-marked text-success" style={{ fontSize: '1.5rem' }}></i>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
                <div className="mb-4">
                  {tutoria.idEstudiantes.map((id, i) => {
                    return (
                      <span key={i}>
                        <Badge pill className="bg-secondary" style={{ fontSize: '.8rem', color: '#76838f' }}>
                          {students.find(s => s.id === id).name}{' '}
                          <i className="mdi mdi-close" onClick={() => handleStudents({ id })}></i>
                          {/* <CloseButton variant="white" onClick={() => console.log(i)} /> */}
                        </Badge>{' '}
                      </span>
                    )
                  })}
                </div>
                <Form.Group>
                  <label htmlFor="urlTutoria">Enlace de la reunión (si la tutoría se realizó de forma virtual)</label>
                  <Form.Control
                    type="url"
                    id="urlTutoria"
                    placeholder="http://enlace.tutoria.com"
                    autoComplete="off"
                    size="lg"
                    onChange={evt => {
                      setTutoria({ ...tutoria, link: evt.target.value })
                      setValidationLink(validateURL(evt.target.value))
                    }}
                    value={tutoria.link}
                  />
                </Form.Group>
                {validationLink.error && <p className="text-danger mb-4">{validationLink.message}</p>}
                <Form.Group className="row">
                  <div className="col-sm-4 col-form-label">
                    <label htmlFor="date">Fecha de la tutoría</label>
                    <div>
                      <DatePicker
                        className="form-control w-100"
                        id="date"
                        selected={new Date(tutoria.fecha)}
                        locale="es"
                        maxDate={new Date()}
                        // minDate={new Date(tutoria.fecha)}
                        onChange={date => {
                          setTutoria({ ...tutoria, fecha: new Date(date).toISOString() })
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4 col-form-label">
                    <label htmlFor="startTime">Hora inicio</label>
                    <Form.Control
                      type="text"
                      id="startTime"
                      value={tutoria.horaInicio}
                      onChange={() => true}
                      onFocus={() => setShowTimePickerStart(!showTimePickerStart)}
                    />
                    {showTimePickerStart && (
                      <div style={{ position: 'absolute', top: '-5rem' }}>
                        <TimeKeeper
                          time={tutoria.horaInicio}
                          onChange={data => {
                            setTutoria({
                              ...tutoria,
                              horaInicio: data.formatted12,
                              totalHoras: calcTotalHours(data.formatted12, tutoria.horaFinal)
                            })
                            setValidationHours(validateHours(data.formatted12, tutoria.horaFinal))
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
                      value={tutoria.horaFinal}
                      onChange={() => true}
                      onFocus={() => setShowTimePickerEnd(!showTimePickerEnd)}
                    />
                    {showTimePickerEnd && (
                      <div style={{ position: 'absolute', top: '-5rem' }}>
                        <TimeKeeper
                          time={tutoria.horaFinal}
                          onChange={data => {
                            setTutoria({
                              ...tutoria,
                              horaFinal: data.formatted12,
                              totalHoras: calcTotalHours(tutoria.horaInicio, data.formatted12)
                            })
                            setValidationHours(validateHours(tutoria.horaInicio, data.formatted12))
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
                  <label htmlFor="exampleTextarea1">Cantidad de horas de tutoría</label>
                  <Form.Control
                    placeholder="Cantidad de horas de tutoría"
                    disabled
                    id="exampleTextarea1"
                    value={tutoria.totalHoras}
                  />
                </Form.Group>
                <div style={{ textAlign: 'right' }}>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={evt => {
                      evt.preventDefault()
                      handleCreateTutoria()
                    }}
                  >
                    Guardar
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={evt => {
                      evt.preventDefault()
                      setTutoria(defaultTutoria)
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
