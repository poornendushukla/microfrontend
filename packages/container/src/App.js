import React,{lazy,Suspense, useEffect, useState} from 'react'
import { BrowserRouter,Switch,Route,Router, Redirect } from 'react-router-dom'
import {createBrowserHistory} from 'history'
import { StylesProvider,createGenerateClassName} from '@material-ui/core'
import Progress from './components/Progress'
import Header from './components/Header'
const MarketingAppLazy  = lazy(()=> import('./components/MarketingApp'))
const AuthAppLazy  = lazy(()=> import('./components/AuthApp'))
const DashboardLazy = lazy(()=> import('./components/DashboardApp'))
const generateClassName = createGenerateClassName({
    productionPrefix:'co'
})
const history = createBrowserHistory()
export default ()=>{
    const [isSignedIn,setIsSignedIn] = useState(false);
    useEffect(()=>{
        if(isSignedIn){
            history.push('/dashboard')
        }
    },[isSignedIn])
    return(
            <Router history={history}>
                <StylesProvider generateClassName={generateClassName}>
                    <div>
                        <Header onSignOut={()=>setIsSignedIn(false)} isSignedIn={isSignedIn} />
                        <Suspense fallback={<Progress/>}>
                            <Switch>
                                <Route path="/auth" >
                                    <AuthAppLazy onSignIn={()=>setIsSignedIn(true)}/>
                                </Route>
                                <Route path="/dashboard" >
                                    {!isSignedIn && <Redirect to="/" />}
                                    <DashboardLazy />
                                </Route>
                                <Route path="/" component={MarketingAppLazy} />
                            </Switch>
                        </Suspense>
                    </div>
                </StylesProvider>
            </Router>
        
    )
}