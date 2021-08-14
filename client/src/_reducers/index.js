//reducer 는 store에서 state 변화된 값을 감지하고 마지막변화된것을 리턴해준다 
//그런데 그러한 리듀서는 여러개가 있을 수 있다(state에 따라)
//그래서 combineReducer를 이용해서 rootreducer에서 하나로 합쳐준다

import { combineReducers } from "redux";
import user from './user_reducer';


//리듀서를 합치는 부분
const rootReducer = combineReducers({
    user
})

export default rootReducer;