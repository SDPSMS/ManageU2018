import moment from 'moment'

export default (date, time) => {
  let dateTime = date + ' ' + time
  if (isNaN(time)) {
    dateTime = date
  }
  return moment(dateTime).valueOf()
}
