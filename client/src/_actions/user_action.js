import Axios from 'axios';

//타입이 여러가지일 것이기 때문에 타입만 지정하는 파일을 만들고
//거기서 해당 타입을 불러오는 방식으로 작성
import {
    LOGIN_USER
} from './types';


//loginpage.js의 body의 내용이 datatosubmit에 담김
export function loginUser(dataToSubmit) {


    //서버에서 받은 데이터를 request에 저장
    const request = Axios.post('/api/users/login', dataToSubmit)
    
    .then(response => response.data)

    //받은 데이터를 리듀서로 보냄
    //리듀서는 previousState와 action을 받아 next state를 리턴하기 때문
    
    //타입을 정해주고, 페이로드에 전달할 값을 정해서 리턴함(리듀서로 보내ㅡㄴ 방법)
    return {
        type: LOGIN_USER,
        payload:request
    }

    
}