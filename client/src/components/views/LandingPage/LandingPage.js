import React,{ useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router' //history.push를 쓰기 위해서는 withrotuer가 필요하다

function LandingPage(props) {

    //브라우저 API를 이용하여 업데이트합니다.
    //리액트에게 컴포넌트가 렌더링 이후에 어떤 일을 수행해야하는 지를 말합니다. 리액트는 우리가 넘긴 함수를 기억했다가(이 함수를 ‘effect’라고 부릅니다) DOM 업데이트를 수행한 이후에 불러낼 것입니다. 
   
   
    //CORS : origin (각각 서버, 클라이언트) 사이에 api를 주고받을때 쓰는 정책(일반적으로 의도되지 않은 통신을 방지하기 위해 사용 )
    // => 여기에는 프록시 사용 
    useEffect(() => {
        axios.get('api/hello') //index.js의 app.get('/api/hello', (req, res) => {  res.send("안녕하세요");  }) 에 응답한다
        //axios를 통해서 서버에 /api/hello라는 엔드포인트에 request보낸 것을 응답 받아서
        .then(response => {console.log(response.data)})   // 답변한다 
    }, [])


    const onClickHandler = () => {
        axios.get(`/api/users/logout`)
        .then(response => {
            if(response.data.success){
                props.history.push("/login")
            } else {
                alert('로그아웃 하는데 실패했습니다.')
            }
        })
    }



    return (
        <div style={{
            display :'flex', justifyContent: 'center', alignItems:'center'
            ,width : '100%', height : '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default withRouter(LandingPage)
