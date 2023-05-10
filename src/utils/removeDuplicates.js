export default function removeDuplicates(array, key) {
  let hashmap = {};
  array.forEach(obj => hashmap[obj[key]] = obj);
  return Object.values(hashmap);
}