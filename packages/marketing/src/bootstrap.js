import React from 'react'
import ReactDOM  from 'react-dom'
import App from './App'
const mount = (el)=>{
    ReactDOM.render(
        <App/>,
        el
    )
};

// if we are running in development enviroment
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development'){
    const root = document.querySelector('#_marketing-dev-root');
    if(root){
        mount(root)
    }
}

// if the enviroment is not development than we pass it on to container
export {mount}