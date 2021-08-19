import React, {useState} from 'react'
//import axios from 'axios';
import {useDispatch} from 'react-redux'; //Action을 취하기 위해 디스패치 사용
import {loginUser} from '../../../_actions/user_action'
import { withRouter} from 'react-router-dom';

function LoginPage(props) {//페이지 이동시 props가 필요한데 그 부분을 여기다 넣어줌 

    const dispatch = useDispatch();//디스패치 선언

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("")

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value) //setEmail을 현재 onchange에서 받아온 입력값으로 변환함
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onSubmitHandler =(e) => {
        e.preventDefualt(); // 버튼눌렀을시 자동새로고침이 되는것을 방지하기 위해(이게 없으면 아래 내용된
        //내용이 동작하지 않음)

        let body = {
            email :Email,
            password : Password
        }

        //dispatch가 취할 action을 넣어준다(디스패치는 액션을 인자로 받음)
        dispatch(loginUser(body))//=> loginUser는 _acetions 폴더 user_action.js에 있다.
            .then(response => {
                if(response.payload.loginSuccess) {
                    //리엑트 페이지 이동 구현 하는 방법 => props.history.push
                    //이렇게 쓰면 다시 루트 페이지로 돌아감(로그인 완료시)
                    props.history.push('/')
                } else {
                    alert('Error')
                }
            })


        //일반적으로 axios를 이용해서 백앤드로 보냄 
        //리덕스를 사용하지 않으면 여기에 axios를 써야하지만 리덕스를 씀으로
        //action부분에 해당 요청부분을 작성해야한다
        // Axios.post('/api/users/login', body)
        //     .then(response => {

        //     })




    }



    return (
        <div style={{
            display :'flex', justifyContent: 'center', alignItems:'center'
            ,width : '100%', height : '100vh'
        }}>
            <form style={{ display :'flex', flexDirection :'column'}}
            // form에 입력한 내용을버튼을 눌렀을시 동작시키기 위해 onsubmit 사용 
               onSubmit = {onSubmitHandler} > 
                <label>Email</label>
                {/* value 에 state를 넣어준다 */}
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}
                    />

                <br/>
                <button type ="submit">
                    Login
                </button>

            </form>
        </div>
    )
}

export default withRouter(LoginPage)
