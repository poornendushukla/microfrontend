import React from 'react'
import ReactDOM  from 'react-dom'
import { createMemoryHistory,createBrowserHistory } from 'history'
import App from './App'

const mount = (el,{onNavigate,defaultHistory,initialPath})=>{
        const history = defaultHistory || createMemoryHistory({
            initialEntries:[initialPath]
        })

    if(onNavigate)
        history.listen(onNavigate)
    ReactDOM.render(
        <App history={history}/>,
        el
    )

    return {
        onParentNavigate({pathname: nextPathname}){
            const { pathname } = history.location
            if(pathname !== nextPathname)
                history.push(nextPathname)
        }
    }
};

// if we are running in development enviroment
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development'){
    const root = document.querySelector('#_marketing-dev-root');
    if(root){
        mount(root,{defaultHistory:createBrowserHistory()})
    }
}

// if the enviroment is not development than we pass it on to container
export {mount}