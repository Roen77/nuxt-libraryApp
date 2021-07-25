// 이메일 유효성 검사
const validEmail = (mail) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
    return (true)
  }
  return (false)
}
// 압력값의 길이를 확인하는 감수
const validLength = (value, num) => {
  let data
  const valueData = value.trim().length
  if (num.len2 && valueData < num.len2) {
    if (valueData > num.len1) {
      data = true
    } else { data = false }
  } else if (valueData <= num.len1) { return true } else { return false }
  return data
  // if (value && value.length >= num.len1 && value.length <= num.len2) {
  //   return true
  // } else {
  //   return false
  // }
}

export { validLength, validEmail }
