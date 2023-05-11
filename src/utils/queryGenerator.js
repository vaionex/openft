const isEmpty = obj => Object.keys(obj).length === 0;

export default (param) => {
  if (!isEmpty(param))
    return "?" + new URLSearchParams(param).toString();
  else
    return ""
}