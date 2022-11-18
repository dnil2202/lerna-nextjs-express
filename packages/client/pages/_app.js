import '../styles/globals.css'
import {Provider} from 'react-redux';
import {rootStore} from '../reducers'
import Script from 'next/script'

function MyApp({ Component, pageProps}) {



  return(
    <>
    <Script strategy='lazyOnload' src="https://www.googletagmanager.com/gtag/js?id=G-1X1XRNGKYY"/>
    <Script>
      {
        `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', ${process.env.DB_HOST},{
          page_path:window.location.pathname
        })
        `
      }
    </Script>
    <Provider store={rootStore}>
      <Component {...pageProps} />
    </Provider>
    </>
  ) 
}


export default MyApp
