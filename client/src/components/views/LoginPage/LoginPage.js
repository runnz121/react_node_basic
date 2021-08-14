import React, {useState} from 'react'
//import Axios from 'axios';
import {useDispatch} from 'react-redux'; //Action을 취하기 위해 디스패치 사용
import {loginUser} from '../../../_actions/user_action'

function LoginPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("")

    const onEmailHandler = (e) => {
        setEmail(e.target.value) //setEmail을 현재 onchange에서 받아온 입력값으로 변환함
    }

    const onPasswordHandler = (e) => {
        setPassword(e.target.value)
    }

    const onSubmitHandler =(e) => {
        e.preventDefualt(); // 버튼눌렀을시 자동새로고침이 되는것을 방지하기 위해(이게 없으면 아래 내용된
        //내용이 동작하지 않음)

        let body = {
            email :Email,
            password : Password
        }

        //dispatch가 취할 action을 넣어준다
        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    //리엑트 페이지 이동 구현 하는 방법
                    //이렇게 쓰면 다시 루트 페이지로 돌아감
                    props.history.push('/')
                } else {
                    alert('Error')
                }
            })

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

export default LoginPage
