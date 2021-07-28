if(process.env.NODE_ENV === 'production') {//노드의 환경변수 설정
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}
//노드의 환경이 production 환경이면 mongo db의 비밀번호를 ./prod에서 가져오고 dev환경이라면 ./dev에서 비밀번호를 갖고온다 