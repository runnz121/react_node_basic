const { User } = require("../models/User");

let auth = (req, res, next) => {

    //인증 처리를 하는 곳

    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth; //x_auth라는 이름으로 쿠키를 넣었음으로 index.js참조


    // 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err)throw err;
        if(!user) return res.json({isAuth:false, error: true}) //유저가 없다면

        //req에 토큰과 유저를 넣어준다 
        req.token = token; 
        req.user = user;
        next(); //미들웨어에서 성공적으로 통과시 콜벡으로 전달 
    })


    // 유저가 있으면 인증 O
    //유저가 없으면 인증 X
}

module.exports= {auth};