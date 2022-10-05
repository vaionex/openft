const checkEmailIsValid = () => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  return emailRegex.test(emailRegex)
}

export default checkEmailIsValid
