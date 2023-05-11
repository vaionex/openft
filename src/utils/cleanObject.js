export default function cleanObject(obj) {
  return Object.keys(obj)
    .filter(key => obj[key] && obj[key].length !== 0)
    .reduce((cleanObj, key) => {
      cleanObj[key] = obj[key];
      return cleanObj;
    }, {});
}