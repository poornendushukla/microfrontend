import {createApp} from 'vue'
import Dashboard from './components/Dashboard.vue'

const mount = (el)=>{
       const app = createApp(Dashboard)
       app.mount(el)
};

// if we are running in development enviroment
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development'){
    const root = document.querySelector('#_dashboard-dev-root');
    if(root){
        mount(root)
    }
}

// if the enviroment is not development than we pass it on to container
export {mount}