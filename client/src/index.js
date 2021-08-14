import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise'; //redux스토어 에서 프로미스 인식을 위한 프로미스 임포트
import ReduxThunk from 'redux-thunk' //리덕스 스토어에서 함수 인식을 위한 함수 임포트
import Reducer from './_reducers'; //리듀서 폴더에서 가져온 리듀서


const creatStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
  <React.StrictMode>

{/* Provider로 감싸줘야 redux 사용 가능 */}

  <Provider

    // 생성한 리덕스 스토어에 우리가 만든 리듀서 폴더에서 작성한 리듀서를 넣어준다
    store = {creatStoreWithMiddleware(Reducer,
    //redux_devtools 를 사용하기 위해 extenstion추가
      window.__REDUX_DEVTOOLS_EXTENSION__&&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
    >
   <App />
   </Provider>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
