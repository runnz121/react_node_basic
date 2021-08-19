/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unreachable */
import {
    LOGIN_USER, REGISTER_USER, AUTH_USER
} from '../_actions/types'; //타입만 저장해 놓은 폴더에서 임포트 받음 


//이전의 state과 액션을 리듀서가 받아 다음 state로 변경 
export default function(state = {}, action) { //전의 state와 action이 인자로 들어옴

    //다양한 타입을 받을 것 이기 때문에 switch로 처리
    switch (action.type) { //key값으로 액션 타입을 받음
        case LOGIN_USER:
            //loginsuccess 를 받으면 페이로드(리퀘스트)
                return {...state, loginSuccess: action.payload}//..state로 전의 상태를 갖고옴 ,action.payload => 서버에서 가져온 정보 (백앤드에서 지정한 유저에 대한 모든 정보가 담겨있음)
            break;
        case REGISTER_USER:
            //register 를 받으면 페이로드(리퀘스트)
                return {...state, register: action.payload}//..state로 전의 상태를 갖고옴
            break;
        case AUTH_USER:
            //userData 를 받으면 페이로드(리퀘스트) => 이 부분은 임의로 이름 지었음
                return {...state, userData: action.payload}//..state로 전의 상태를 갖고옴
            break;
        default:
            return state;
    }

}