
import React, {useState} from 'react'
//import Axios from 'axios';
import {useDispatch} from 'react-redux'; //Action을 취하기 위해 디스패치 사용
import {registerUser} from '../../../_actions/user_action'
import { withRouter} from 'react-router-dom';

function RegisterPage(props) {

    const dispatch = useDispatch();//디스패치 선언

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("")




    const onEmailHandler = (e) => {
        setEmail(e.target.value) //setEmail을 현재 onchange에서 받아온 입력값으로 변환함
    }

    const onPasswordHandler = (e) => {
        setPassword(e.target.value)
    }

    const onNameHandler = (e) => {
        setName(e.target.value) 
    }

    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value)
    }

    const onSubmitHandler =(e) => {
        e.preventDefualt(); // 버튼눌렀을시 자동새로고침이 되는것을 방지하기 위해(이게 없으면 아래 내용된
        //내용이 동작하지 않음)


        //비밀번호 검증 구현
        if(Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다')
        }

        let body = {
            email :Email,
            password : Password,
            name : Name
        }

        //dispatch가 취할 action을 넣어준다(디스패치는 액션을 인자로 받음)
        dispatch(registerUser(body))
            .then(response => {        
                if(response.payload.success){
                    props.history.push("/login");
                }else {
                    alert("Failed to sign up")
                }
            })
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

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}
                    />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}
                    />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}
                    />

                <br/>
                <button type ="submit">
                    Login
                </button>

            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
