<template>

    <section class="testimonials_area p_120">
        <div class="container">
            <div class="row testimonials_inner rtl">
                <div class="col-lg-4 text-right">
                    <div class="testi_left_text">
                        <h4> پشتیبانی </h4>
                        <p class="text-justify">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</p>
                    </div>
                </div>
                <div class="col-lg-8 ltr">
                    <div class="testi_slider owl-carousel">
                        <div class="item" v-for="n in 6" :key="n">
                            <div class="testi_item">
                                <img src="img/testimonials/testi-1.png" alt="">
                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه مجله در ستون و سطر آنچنان که لازم است.</p>
                                <h4> امیر خدنگی </h4>
                                <h6> کاربر سایت </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    export default {

        mounted() {

            if ( $('.testi_slider').length ){
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
                            items: 1,
                        },
                        576: {
                            items: 2,
                        }
                    }
                })
            }

        }

    }
</script>