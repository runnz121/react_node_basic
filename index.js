//서버 시작시점

const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')//mongoose 객체 생성
mongoose.connect('mongodb+srv://jongbin:jongbin@pack1.gac6y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { //mongoose를 통해 mongodb와의 연결
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex: true, useFindAndModify: false //Mongoose설정 값 
}).then(() => console.log('MongoDB Connected...')) //연결 완료시 보여줄 값
.catch(err=> console.log(err))//에러시 출력될 값 //몽고 디비 화이트 리스트에 커렌트 IP 추가

// mongodb+srv://jongbin:<password>@pack1.gac6y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})