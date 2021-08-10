//https://create-react-app.dev/docs/proxying-api-requests-in-development/
//cors 를 해결하기 위한 proxy이용 


// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:5000',
//       changeOrigin: true,
//     })
//   );
// };

//https://fulladdr.tistory.com/7
//구버전 프록시 문법을 써야 돌아감
const proxy = require('http-proxy-middleware');

module.exports = function(app) {

app.use(

'/api',

proxy({

target: 'http://localhost:5000',

changeOrigin: true,

})

);

};