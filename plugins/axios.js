import ischk from 'is-iexplorer';

// ie get 메서드 호출시 캐시문제로 재호출이 되지 않는 문제롤 추가
export default function ({ $axios }) {
  $axios.onRequest(config => {
    if(ischk){
      config.headers['Cache-Control']= 'no-cache';
      config.headers['Pragma']= 'no-cache';
    }
    // if(iechk){
    //   config.headers["Cache-Control"] ='no-cache'
    //   config.headers["Pragma"] ='no-cache'
    // }
    return config;
})

// $axios.onError(error => {
//   const code = parseInt(error.response && error.response.status)
//   if (code === 400) {
//     redirect('/400')
//   }
// })
}