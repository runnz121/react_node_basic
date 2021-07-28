//서버 시작시점

const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser'); //통신을 위해 설치한 body-parser를 가져옴(request body로 클라이언트에게 전달할 정보를 받아줌)
const {User} = require("./models/User");// 몽고 db로 설정한 값을 가져옴
const config = require('./config/key'); //몽고db 비밀번호를 저장해 놓은 위치에서 가져옴


//application/x-www-form-urlencoded => 형태의 신호를 분석해서 가져오는 부분
app.use(bodyParser.urlencoded({extended: true}));
//application/json = >형태의 신호를 분석해서 가져오는 부분
app.use(bodyParser.json());


const mongoose = require('mongoose')//mongoose 객체 생성
mongoose.connect(config.mongoURI, { //mongoose를 통해 mongodb와의 연결 
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex: true, useFindAndModify: false //Mongoose설정 값 
}).then(() => console.log('MongoDB Connected...')) //연결 완료시 보여줄 값
.catch(err=> console.log(err))//에러시 출력될 값 //몽고 디비 화이트 리스트에 커렌트 IP 추가

// mongodb+srv://jongbin:<password>@pack1.gac6y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.get('/', (req, res) => {
  res.send('Hello World! ㅎㅎㅎdggㅎ')
})

app.post('/register', (req, res) => {
  //회원가입할 떄 필요한 정보들을 client에서 가져오면 그것들을 DB에 넣어 준다

  const user = new User(req.body)
  user.save((err,userInfo) => {//몽고db에 저장하는 부분
    if(err) return res.json({success: false, err}) //전달 오류 시 에러 실행 부분 
    return res.status(200).json({ // 정상 저상시 성공(200) json 형태로 전달해줌
      success: true //json 형태 부분
    })
  }) 
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})