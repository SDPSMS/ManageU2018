export default (object) => {
  const dataObj = []
  object.forEach((element) => {
    dataObj.push(JSON.parse(JSON.stringify({ value: element })))
  })
  return dataObj
}
