const hours = Array.from(Array(24).keys())
const meridian = hour => (hour.includes('pm') ? 'pm' : 'am')
const h = (currentTime, hourNumber) =>
  meridian(currentTime) === 'pm'
    ? hours[hourNumber] === 12
      ? 12
      : hours[hourNumber] + 12
    : hours[hourNumber] === 12
    ? 0
    : hours[hourNumber]

export const calcTotalHours = (time, time2) => {
  const hourSplit1 = time.replace(meridian(time), '').split(':')
  const hourSplit2 = time2.replace(meridian(time2), '').split(':')
  const h1 = h(time, hourSplit1[0])
  const h2 = h(time2, hourSplit2[0])
  const m1 = parseInt(hourSplit1[1])
  const m2 = parseInt(hourSplit2[1])
  let hTotal = Math.abs(h1 - h2)
  let mTotal = Math.abs(m1 - m2)
  if (mTotal > 0 && h1 === h2) {
    hTotal = hTotal === 0 ? 0 : hTotal
  }
  // console.log(hTotal, mTotal)
  const hString = hTotal === 1 ? `${hTotal} hora` : `${hTotal} horas`
  const mString = `${mTotal} minutos`
  return `${hString} con ${mString}`
}

export const validateEmptyText = text => {
  if (text === '') {
    return { error: true, message: 'Campo requerido' }
  } else {
    return { error: false }
  }
}

export const idNumberRule = idNumber => {
  const emptyText = validateEmptyText(idNumber)
  if (emptyText.error) {
    return emptyText
  } else {
    const regex = new RegExp(/^\d+$/)
    if (!regex.test(idNumber)) {
      return { error: true, message: 'El valor del campo es inválido' }
    } else {
      return { error: false }
    }
  }
}

export const validateURL = url => {
  // eslint-disable-next-line no-useless-escape
  const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  if (!regex.test(url)) {
    return { error: true, message: 'Enlace inválido' }
  } else {
    return { error: false }
  }
}

export const emailRule = email => {
  const emptyText = validateEmptyText(email)
  if (emptyText.error) {
    return emptyText
  } else {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regex.test(email.toLowerCase())) {
      return { error: true, message: 'Correo electrónico inválido' }
    } else {
      return { error: false }
    }
  }
}

export const passwordRule = password => {
  const emptyText = validateEmptyText(password)
  if (emptyText.error) {
    return emptyText
  } else {
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
    if (!regex.test(password)) {
      return { error: true, message: 'Contraseña inválida' }
    } else {
      return { error: false }
    }
  }
}

export const emptyArray = array => {
  if (array.length === 0) {
    return { error: true, message: 'Escoja almenos un estudiante' }
  } else {
    return { error: false }
  }
}

export const validateHours = (time, time2) => {
  const hourSplit1 = time.replace(meridian(time), '').split(':')
  const hourSplit2 = time2.replace(meridian(time2), '').split(':')
  const h1 = h(time, hourSplit1[0])
  const h2 = h(time2, hourSplit2[0])
  const m1 = parseInt(hourSplit1[1])
  const m2 = parseInt(hourSplit2[1])
  if (h1 > h2) {
    return { error: true, message: 'La hora de inicio no puede ser superior a la hora de finalización' }
  } else if (h1 === h2 && m1 === m2) {
    return { error: true, message: 'La hora de inicio no puede ser igual a la hora de finalización' }
  } else if (h1 === h2 && m1 > m2) {
    return { error: true, message: 'La hora de inicio no puede ser superior a la hora de finalización' }
  } else {
    return { error: false }
  }
}
