<template>
    <div>

        <transition name="fade" mode="in-out">
            <div class="as-loading" v-if="loading">
                <radar-spinner
                    :animation-duration="2000"
                    :size="130"
                    :color="web_color"
                />
            </div>
        </transition>

        <as-header></as-header>

        <transition name="fade" mode="in-out">
            <router-view></router-view>
        </transition>

        <as-footer></as-footer>

    </div>
</template>

<script>
    import mixin from '../mixin';
    import { mapState , mapMutations } from 'vuex';

    export default {

        mixins: [mixin],

        created() {
            this.Req_data({
                query: `
                {
                    assignments {
                        data {
                            id
                            title
                            description
                            has_sales_price
                            has_rental_price
                            has_mortgage_price
                        }
                    }

                    estate_types {
                        data {
                            id
                            title
                            description
                            icon
                        }
                    }
                }`,
                props: ['assignments', 'estate_types'],
                states: ['assignments', 'estate_types']
            })
            this.Dynamic_Color()
        } ,

        computed : {
            ...mapState([
                'loading'
            ])
        } ,

        methods: {

            ...mapMutations([
                'Req_data'
            ]),

            Dynamic_Color() {

                // Web Color
                var style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = `

                    /* =============== Colors =============== */

                    .web-color {
                        color : ${this.web_color} !important;
                    }

                    .web-color-light {
                        color : ${this.web_color_light} !important;
                    }

                    .web-color-dark {
                        color : ${this.web_color_dark} !important;
                    }

                    .web-color-fade {
                        color : ${this.web_color_fade} !important;
                    }

                    /* =============== Backgrounds =============== */

                    .web-bg {
                        background: ${this.web_color} !important;
                    }

                    .web-bg-light {
                        background: ${this.web_color_light} !important;
                    }

                    .web-bg-dark {
                        background: ${this.web_color_dark} !important;
                    }

                    .web-bg-fade {
                        background: ${this.web_color_fade} !important;
                    }

                    .web-bg-ultra-fade {
                        background: ${this.web_color_ultra_fade} !important;
                    }

                    /* =============== Gradients =============== */

                    .web-grd-to-light {
                        background: -webkit-linear-gradient(90deg, ${this.web_color_light} 10%, ${this.web_color} 90%) !important;
                        background: -moz-linear-gradient(90deg, ${this.web_color_light} 10%, ${this.web_color} 90%) !important;
                        background: -o-linear-gradient(90deg, ${this.web_color_light} 10%, ${this.web_color} 90%) !important;
                        background: linear-gradient(90deg, ${this.web_color_light} 10%, ${this.web_color} 90%) !important;
                    }

                    .web-grd-form-dark {
                        background: -webkit-linear-gradient(90deg, ${this.web_color} 10%, ${this.web_color_dark} 90%) !important;
                        background: -moz-linear-gradient(90deg, ${this.web_color} 10%, ${this.web_color_dark} 90%) !important;
                        background: -o-linear-gradient(90deg, ${this.web_color} 10%, ${this.web_color_dark} 90%) !important;
                        background: linear-gradient(90deg, ${this.web_color} 10%, ${this.web_color_dark} 90%) !important;
                    }

                    /* =============== Borders =============== */

                    .web-border {
                        border : 1px solid ${this.web_color} !important;
                    }

                    /* =============== Other =============== */

                    .comming-soon {
                        background: ${this.web_color};
                    }

                    .items:hover {
                        background: ${this.web_color} !important;
                    }

                    .items:hover .comming-soon {
                        color: ${this.web_color} !important;
                    }

                    .feature_item:hover {
                        background: ${this.web_color} !important;
                        color: #fff;
                    }

                `;
                document.getElementsByTagName('head')[0].appendChild(style);

            }

        }

    }

</script>

<style>
    
    .as-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        z-index: 9999999999;
        height: 100%;
        width: 100%;
        background: #fffffff0;
        top: 0px;
        bottom: 0;
        right: 0;
        left: 0;
    }

    .v-navigation-drawer {
        z-index: 2000;
    }

    .v-overlay {
        z-index: 1000;
    }

    .site-drawer .v-list__tile__title {
        font-size: 12px;
        transform: scaleX(-1);
        text-align: right;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 180px;
        direction: rtl;

    }

    .site-drawer .v-list {
        transform: scaleX(-1);
    }

    .site-drawer .material-icons {
        transform: scaleX(-1);
    }

    .vs-notifications p {
        font-size: 12px !important;
    }

</style>
