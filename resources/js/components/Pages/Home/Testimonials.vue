<template>

    <section class="testimonials_area p_120" v-if="has_opinions">
        <div class="container">
            <div class="testimonials_inner rtl">
                <div>
                    <p class="text-white text-center mb-5" :class="[ Res ? 'h5' : 'h3' ]"> دیگران درباره مسکن شو چه می گویند ؟ </p>
                </div>
                <div class="ltr">
                    <div class="testi_slider owl-carousel">
                        <div class="item height-opinion" v-for="(opinion,index) in siteSetting.opinions" :key="index">
                            <div class="testi_item">
                                <v-avatar class="mb-4" :size="80" :color="web_color">
                                    <img :src=" opinion.avatar ? url + opinion.avatar.thumb : '/img/user.png' " alt="avatar">
                                </v-avatar>
                                <p> {{ opinion.opinion | truncate(180) }} </p>
                                <h4> {{ opinion.fullname }} </h4>
                                <h6> {{ opinion.post }} </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>

    import { mapState } from 'vuex';
    import mixin from '../../../mixin';

    export default {

        mixins : [mixin] ,

        computed : {

            ...mapState([
                'siteSetting' ,
                'url'
            ]) ,

            has_opinions() {
                if(!_.isEmpty(this.siteSetting.opinions)) {
                    setTimeout(() => {
                        $('.testi_slider').owlCarousel({
                            loop:true,
                            margin: 30,
                            items: 2,
                            nav: false,
                            autoplay: false,
                            smartSpeed: 1500,
                            dots:true, 
                            responsiveClass: true,
                            responsive: {
                                0: {
                                    items: 1
                                } ,
                                576: {
                                    items: 2
                                } ,
                                1000: {
                                    items: 3
                                }
                            }
                        })
                    }, 500);
                }
                return !_.isEmpty(this.siteSetting.opinions);
            }

        } ,

    }
</script>

<style scoped>

    .height-opinion .testi_item {
        min-height: 380px !important;
        max-height: 380px !important;
    }

</style>
