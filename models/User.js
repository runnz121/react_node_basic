const mongoose = require('monngose'); //몽구스 가져오기

const userSchema = mongoose.Schema({
    name : {
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

const User = mongoose.model('User',userSchema) //모델이 스키마를 감쌈으로 스키마 작성후 해당 스키마로 모델을 지정해준다(모델, 스키마)

module.exports = {User} //다른곳에서도 쓸 수 있게 EXPORTS 시켜준다