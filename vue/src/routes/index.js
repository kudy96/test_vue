import Vue from 'vue';
import Router from 'vue-router';
import Editor from '@/components/Editor';
import Show from '@/components/Sub'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes:[
        {
            path : '/editor',
            name : 'Editor',
            component : Editor
        },
        {
            path : '/show',
            name : 'Show',
            component : Show
        }
    ]
})