import VueRouter from 'vue-router';

let routes = [
    
    {
        path : '/' ,
        component : require('./components/Pages/Home.vue').default
    } ,
    {
        path : '/about' ,
        component : require('./components/Pages/about.vue').default
    } ,
    {
        path : '/Properties' ,
        component : require('./components/Pages/Properties.vue').default
    } ,
    {
        path : '/estate/:id?' ,
        component : require('./components/Pages/Estate.vue').default
    } ,
    {
        path : '/blog/:slug?' ,
        component : require('./components/Pages/blog.vue').default
    } ,
    {
        path : '/single-blog/:slug' ,
        component : require('./components/Pages/single-blog.vue').default
    } ,
    {
        path : '*' ,
        component : require('./components/Pages/404.vue').default
    } ,
    {
        path : '/:username' ,
        component : require('./components/Pages/Properties.vue').default
    } ,

]

export default new VueRouter({
    // fallback: true ,
    // base : '/' ,
    mode: 'history' ,
    routes
})