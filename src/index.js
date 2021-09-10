import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store/store'
import App from './Components/App';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
   <BrowserRouter>
       <App />
   </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

