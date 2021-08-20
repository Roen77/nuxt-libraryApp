// 카카오 api 호출시 가져오는 썸네일 이미지 크기 수정
const resizeImage = (url, size = 800) => {
  const src = url.replace('/thumb/R120x174', `/thumb/R${size}x${size}`)
  return src
}
export { resizeImage }
