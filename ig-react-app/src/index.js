import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './context/firebase';
import { firebase, fieldValue } from './lib/firebase';
import './styles/App.css';

ReactDOM.render( <FirebaseContext.Provider value={{ firebase, fieldValue }}>
    <App />
  </FirebaseContext.Provider>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

