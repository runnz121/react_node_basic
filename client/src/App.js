
import './App.css';

// /https://reactrouter.com/web/example/basic/ react-router-dom을  참고하는 사이트 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'; //hoc저거용 시키기 위해 import 함

function App() {
  return (
      <Router>
      <div>
      
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
        {/* 이와 같이 path를 작성할 수 도 있다(아래 작성한 login페이지 변환과 비교해보면 차이점은 컴포넌트를 직접 지정한다는 것 */}

        {/* hoc 적용시키기 위해 컴포넌트를 Auth(컴포넌트) 로 감싸준다 */}
          <Route exact path="/" component ={Auth(LandingPage, null, true)} />  
          <Route exact path="/login" component ={Auth(LoginPage,false)} />  

          {/* <Route path="/login">
            <LoginPage />
          </Route> */}

          <Route path="/register" component={Auth(RegisterPage,false)}/>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
