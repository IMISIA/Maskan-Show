import Vue from 'vue';

Vuetify
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
Vue.use(Vuetify);

// Element UI
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/fa'
Vue.use(ElementUI , { locale });
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

// Vuesax
import Vuesax from 'vuesax';
Vue.use(Vuesax);
import 'vuesax/dist/vuesax.css';

// Vue 2 Filters
import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);

// Loading
import { RadarSpinner } from 'epic-spinners';
Vue.component( 'RadarSpinner' , RadarSpinner );

// Material Design Icons
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import 'hover.css';

// Fontawesome
// import '@fortawesome/fontawesome-free/css/all.css';

// Animate
// import 'animate.css';

// Tilt
import 'tilt.js';

// ===================================================================================

// Layout
import header from './components/Layout/header.vue';
import footer from './components/Layout/footer.vue';
import EstateGrid from './components/Layout/EstateGrid.vue';
import EstateList from './components/Layout/EstateList.vue';

Vue.component( 'as-header' , header );
Vue.component( 'as-footer' , footer );
Vue.component( 'Estate-Grid' , EstateGrid );
Vue.component( 'Estate-List' , EstateList );

// Pages
import home_banner from './components/Pages/Home/home_banner.vue';
import welcome from './components/Pages/Home/welcome.vue';
import Testimonials from './components/Pages/Home/Testimonials.vue';
import Cities from './components/Pages/Home/Cities.vue';
import Feature from './components/Pages/Home/Feature.vue';
import Clients from './components/Pages/Home/Clients.vue';

Vue.component( 'home-banner' , home_banner );
Vue.component( 'welcome' , welcome );
Vue.component( 'Testimonials' , Testimonials );
Vue.component( 'Cities' , Cities );
Vue.component( 'Feature' , Feature );
Vue.component( 'Clients' , Clients );

// Estates
import Estates from './components/Pages/Properties/Estates.vue';
Vue.component( 'Estates' , Estates );

// Blog
import BlogCategory from './components/Pages/Blog/Blog-Category.vue';
import BlogArea from './components/Pages/Blog/Blog-Area.vue';
import BlogSidebar from './components/Pages/Blog/Blog_Sidebar.vue';

Vue.component( 'Blog-Category' , BlogCategory );
Vue.component( 'Blog-Area' , BlogArea );
Vue.component( 'Blog-Sidebar' , BlogSidebar );

