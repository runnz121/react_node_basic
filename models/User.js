const mongoose = require('mongoose'); //몽구스 가져오기
const bcrypt = require('bcrypt') //bcrypt 가져오기
const saltRounds = 10 //bcrypt에서 사용하는 SALT를 만들기 위한 saltroudns를 10자리로 지정
const jwt = require('jsonwebtoken'); //jsonwebtoken 라이브러리 가져오기 


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //스페이스바를 없에줌
        unique:1
    },
    password: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ){ //user 정보를 저장하기 전에 비밀번호를 암호화 시킨다 Index.js의 user.save()전 부분
    //npm install bcrypt --save 로 설치한 bcrypt를 여기서 불러옴
    var user = this; //위에 선언한 UserSchema부분을 가르킴
    if(user.isModified('password')) { //만일 'password'가 변경될 경우에만 bcrypt로 암호화 시켜준다 
    bcrypt.genSalt(saltRounds, function(err, salt){ //salt생성시
        if(err) return next(err) //에러나면 그냥 index.js의 User.save로 넘어간다 (next)
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err)
            user.password = hash //비밀번호가 정상적으로 암호회되면 hash값으로 바꿔주고
            next() //완료되면 Index.js의 user.save() 부분으로 넘겨준다
            })
        })
    } else { //비밀번호가 아닌 다른 것을 바꿀 경우 바로 넘어갈 수 있도록 else 구문 넣어줘야 한다
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    //plainpassword 1234567   암호화된 비밀번호 2b$10$Rfo0Yt30w0udqZwUQLPekOuRX1g/BF3M2e0FO4Ahi1xtRNpzgEZl 이 2개가 서로 같은지 체크해야됨
    // => 따라서 Plainpassword를 암호화 해서 비교한다(복호화는 불가)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err), //에러가 있으면 콜벡에 에러 담아서 리턴
            cb(null, isMatch) //맞다면 에러는 null이고 맞는 비밀번호 담아 콜벡에 전달
    })
}

userSchema.methods.generateToken = function(cb) {

    var user = this;
    //jsonwebtoken을 이요해서 Token생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken') //mongodb의 _id넣어 주는 것 => jwt문법

    // user._id + 'secretToken' = token

    user.token = token //토큰을 생성하고(user의 대한 Token)
    user.save(function(err, user) { //user 정보 저장시
        if(err) return cb(err) //에러 여부
        cb(null, user)
    })
}

userSchema.statics.findByToken = function ( token, cb) {
    var user = this;

  
    //토큰을 디코드 하는 과정

    jwt.verify(token,'secretToken', function(err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에 
        //클라이언트에서 가져온 TOKen과 db에 보관된 토큰이 일치하는지 확인

        //몽고Db 메소드 : findOne
        user.findOne({"_id" : decoded, "token": token}, function(err, user){

            if(err) return cb(err)
            cb(null, user)
        })
    })
}

const User = mongoose.model('User',userSchema) //모델이 스키마를 감쌈으로 스키마 작성후 해당 스키마로 모델을 지정해준다(모델, 스키마)

module.exports = {User} //다른곳에서도 쓸 수 있게 EXPORTS 시켜준다