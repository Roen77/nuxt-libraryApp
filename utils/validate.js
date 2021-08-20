// 이메일 유효성 검사
const validEmail = (mail) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
    return (true)
  }
  return (false)
}
// 압력값의 길이 범위를 확인하는 감수(몇자 이상 이하 인지 확인)
const validLength = (value, num) => {
  const valueData = value.trim().length
  if (num.len2 && valueData < num.len2) {
    if (!num.len1) { return true }
    if (valueData >= num.len1) {
      return true
    } else { return false }
  } else { return false }
}
// 입력값 데이터(객체) 전부의 길이를 확인하는 함수
const inputLen = (value, data, len) => {
  return data.every(key => value[key].length < len)
}

export { validLength, validEmail, inputLen }
