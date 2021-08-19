//서버 시작시점

const express = require('express')
const app = express()

const bodyParser = require('body-parser'); //통신을 위해 설치한 body-parser를 가져옴(request body로 클라이언트에게 전달할 정보를 받아줌)
const cookieParser = require('cookie-parser') //쿠키에 토큰을 저장하기 위해 Cookie-parser 라이브러리 설치후 가져옴 

const {auth} = require('./middleware/auth') //auth를 가져옴
const {User} = require("./models/User");// 몽고 db로 설정한 값을 가져옴
const config = require('./config/key'); //몽고db 비밀번호를 저장해 놓은 위치에서 가져옴


//application/x-www-form-urlencoded => 형태의 신호를 분석해서 가져오는 부분
app.use(bodyParser.urlencoded({extended: true}));
//application/json = >형태의 신호를 분석해서 가져오는 부분
app.use(bodyParser.json());
app.use(cookieParser()); //쿠키파서 사용을 위한 선언 


const mongoose = require('mongoose')//mongoose 객체 생성
mongoose.connect(config.mongoURI, { //mongoose를 통해 mongodb와의 연결 
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex: true, useFindAndModify: false //Mongoose설정 값 
}).then(() => console.log('MongoDB Connected...')) //연결 완료시 보여줄 값
.catch(err=> console.log(err))//에러시 출력될 값 //몽고 디비 화이트 리스트에 커렌트 IP 추가

// mongodb+srv://jongbin:<password>@pack1.gac6y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.get('/', (req, res) => res.send('Hello World!~~ '))

// app.get('/api/hello', (req, res) => {
//   res.send('Hello World! ㅎㅎㅎdggㅎ')
// })

app.get('/api/hello', (req, res) => 
  res.send("안녕하세요")
)



app.post('/api/users/register', (req, res) => {
  //회원가입할 떄 필요한 정보들을 client에서 가져오면 그것들을 DB에 넣어 준다

  const user = new User(req.body)


  //비밀번호 암호화를 위해 User.js에서 이부분에서 암호화 시켜준다

  user.save((err,userInfo) => {//몽고db에 저장하는 부분
    if(err) return res.json({success: false, err}) //전달 오류 시 에러 실행 부분 
    return res.status(200).json({ // 정상 저상시 성공(200) json 형태로 전달해줌
      success: true //json 형태 부분
    })
  }) 
})

app.post('/api/users/login', (req, res) => { //login 구현
  //요청된 이메일을 데이터 베이스 에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => { //findOne에서 몽고DB에서 제공하는 메소드 이용 
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

      //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인한다.
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch)
          return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})

     //비밀번호 까지 맞다면 토큰을 생성하기.
     //npm install jsonwebtoken --save
        user.generateToken((err, user) => { //두번째 인자 USer는 토큰이 저장되어있는 상태
          if(err) return res.status(400).send(err); //400 코드이면 에러메세지 보내기

          // 토큰을 저장한다. 어디에? => 쿠키, 로컬 스토리지 등이 있지만 여기서는 쿠키에 저장한다
          // npm install jsonwebtoken --save 쿠키 파서 라이브러리를 깔아야된다 
            res.cookie("x_auth", user.token)  
            .status(200) //정상 작동 코드시
            .json({loginSuccess: true, userId : user._id }) //로그인 성공, 아이디 보냄 

        })
      })
    }) 
  })

  app.get('/api/users/auth', auth, (req, res) => { //auth라는 미들웨어 추가 미들웨어는 /auth에서 온 정보를 콜백함수로 전달하기전에
    //처리 과정이 필요할 경우 여기서 처리 시킨다 

    //미들웨어를 통과해 왔다는 것은 Authentication이 True라는 말


    //role 1 이면 어드민, role 2이면 특정 부서 어드민
    //role 0 이면 일반유저, 0이 아니면 관리자 
    res.status(200).json({
      _id:req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth:true,
      email :req.user.email,
      name: req.user.name,
      lastname:req.user.lastname,
      role: req.user.role,
      image:req.user.image
    })
  })

  //로그아웃 구현 => 해당 유저의 토큰을 지워준다
  app.get('/api/users/logout', auth, (req,res) => {
    //user를 찾아서 업데이트 
    User.findOneAndUpdate({_id: req.user._id},
      {token:""} //토큰을 지워주는 부분 
    ,(err, user)=> {
      if(err) return res.json({ success:false, err});
      return res.status(200).send({
        success: true
      })
    })
  })




  const port = 5000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}!`)
})