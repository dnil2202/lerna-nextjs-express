import '../styles/globals.css'
import {Provider} from 'react-redux';
import {rootStore} from '../reducers'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../helper';

function MyApp({ Component, pageProps}) {



  return(
    <>
    <Provider store={rootStore}>
      <Component {...pageProps} />
    </Provider>
    </>
  ) 
}


export default MyApp
