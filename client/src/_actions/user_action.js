import axios from 'axios';

//타입이 여러가지일 것이기 때문에 타입만 지정하는 파일을 만들고
//거기서 해당 타입을 불러오는 방식으로 작성
import {
    LOGIN_USER, REGISTER_USER, AUTH_USER
} from './types';


//loginpage.js의 body의 내용이 datatosubmit에 담김
export function loginUser(dataToSubmit) {


    //서버에 request를 보냄
    const request = axios.post('/api/users/login', dataToSubmit) //노드 서버의 엔드포인트와 같아야 진입할 수 있다.
    
    .then(response => response.data) //response는 서버로부터 받은 응답

    //받은 데이터를 리듀서로 보냄
    //리듀서는 previousState와 action을 받아 next state를 리턴하기 때문
    
    //타입을 정해주고, 페이로드에 전달할 값을 정해서 리턴함(리듀서로 보내ㅡㄴ 방법)
    return {
        type: LOGIN_USER,
        payload:request
    }

    
}

export function registerUser(dataToSubmit) {


    //서버에 request를 보냄
    const request = axios.post('/api/users/register', dataToSubmit) //노드 서버의 엔드포인트와 같아야 진입할 수 있다.
    
    .then(response => response.data) //response는 서버로부터 받은 응답

    return {
        type: REGISTER_USER,
        payload:request
    }

}

export function auth() { //getmethod로 받아오기 때문에 body 부분은 필요 없다 


    //서버에 request를 보냄
    const request = axios.get('/api/users/auth') //노드 서버의 엔드포인트와 같아야 진입할 수 있다.
    
    .then(response => response.data) //response는 서버로부터 받은 응답

    return {
        type: AUTH_USER,
        payload:request
    }

}