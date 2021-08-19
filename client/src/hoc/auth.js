/* eslint-disable import/no-anonymous-default-export */
//hoc => higher order component => 다른 컴포넌트를 받아 리턴함
// 1. 백앤드에 request를 날려 상태를 받아옴
// 2. 다른 컴포넌트를 hoc에 넣어줌 => APP.js에 작성
//로그인, 비로그인시 접근 할수 있는 페이지를 구분하기 위해 사용 

import Axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {auth} from '../_actions/user_action';


//이 부분은 APP.js에서 {Auth(component, option, adminRoute)} 로 작성되는 부분이다
//option의 종류는 다음과 같다
// null => 아무나 출입이 가능한 페이지
// false => 로그인한 유저는 출입 불가능한 페잊
// true => 로그인한 유저만 출임 가능한 페이지

export default function (SpecificComponent, option, adminRoute = null) { //adminRoute = null => 이라는 뜻은 아무것도 안쓰면 디폴트 값이 null이다

    //1번부분
    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {

                //hoc 분기 처리
            dispatch(auth()).then(response => {
                //로그인하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login') //로그인 안했음으로 로그인 페이지로 이동 
                    }

                } else {
                    //로그인한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }else{
                        if(option === false){
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent/>
        )
    }

    return AuthenticationCheck
}
