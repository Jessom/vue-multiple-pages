import Vue from 'vue'
import App from './App'


const application = new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})

export { application }