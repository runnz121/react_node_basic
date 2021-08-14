import {
    LOGIN_USER
} from '../_actions/types';


export default function(state = {}, action) {

    //다양한 타입을 받을 것 이기 때문에 switch로 처리
    switch (action.type) {
        case LOGIN_USER:
            //loginsuccess 를 받으면 페이로드(리퀘스트)
                return {...state, loginSuccess: action.payload}
            break;
    
        default:
            return state;
    }

}