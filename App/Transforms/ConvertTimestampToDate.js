import moment from 'moment'

export default (timestamp, format) => {
  return moment(timestamp).format(format)
}
