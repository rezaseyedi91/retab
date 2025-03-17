import router from './router'
import store from './store'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import ContextMenu from './store/modules/ui/ContextMenu'
import 'vuestic-ui/styles/essential.css';
import 'vuestic-ui/styles/typography.css';
import { createVuestic } from 'vuestic-ui'
import axios from 'axios'
Object.assign(axios.defaults, { withCredentials: true });
createApp(App).use(store).use(createVuestic({

    config: {
        colors: {
            variables: {
                white: '#fff',
            }
        }
    }
})).use(router).mount('#app');


// document.addEventListener('contextmenu', ContextMenu.initialize)