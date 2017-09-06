import React from 'react'
import ReactDOM from 'react-dom'
import {Router,hashHistory,IndexRoute,Route} from 'react-router'
import MediaQuery from 'react-responsive'

import App from './commponents/app'
import NewsContainer from './commponents/news_container'
import NewsDetail from './commponents/news_detail'
import UserCenter from './commponents/user_center'


//import MobileApp from './commponents/mobile_app'
//import MobileNewsContainer from './commponents/moblie_news_cnontainer'
//import MobileNewsDetail from './commponents/moblie_news_detail'
//import MobileUserCenter from './commponents/moblie_news_user_center'


ReactDOM.render(
    (
    <div>
        <MediaQuery query='(min-device-width: 1224px)'>
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute  component={NewsContainer}/>
                    <Route path='/detail/:uniquekey' component={NewsDetail}></Route>
                    <Route path='/usercenter' component={UserCenter}></Route>
                </Route>
            </Router>
        </MediaQuery>
       {/*<MediaQuery query='(max-device-width: 1224px)'>
        <Router history={hashHistory}>
        <Route path='/' component={MobileApp}>
        <IndexRoute component={MobileNewsContainer}/>
        <Route path='/detail/:uniquekey' component={MobileNewsDetail}></Route>
        <Route path='/usercenter' component={MobileUserCenter}></Route>
        </Route>
        </Router>
        </MediaQuery>*/}
    </div>

    ),
    document.getElementById('root')
)