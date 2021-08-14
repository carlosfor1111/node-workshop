
const brand = '星巴克'
const product = '咖啡'
const size = 'tall'
const price = 'NT30'

function getBrand () {
  return brand
}
function getName () {
  return product
} function getSize () {
  return size
} function getPrice () {
  return price
}
// 偷偷預設空物件
// exports = module.exports = {}

module.exports = {
  getBrand,
  getName,
  getSize
}

// return module.exports;
// 雖然是exports 但return是module.exports
