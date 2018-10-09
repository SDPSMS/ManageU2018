import moment from 'moment'

export default (date, time) => {
  const dateTime = date + ' ' + time
  return moment(dateTime).valueOf()
}
