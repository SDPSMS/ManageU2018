import moment from 'moment'

export default (date, time) => {
  let dateTime = date + ' ' + time
  if (time == null) {
    dateTime = date
  }
  return moment(dateTime).valueOf()
}
