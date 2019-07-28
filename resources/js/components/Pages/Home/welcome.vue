<template>

    <section class="welcome_area p_120 col-xs-6">
        <div class="container">
            <div class="row welcome_inner rtl">
                <div class="col-lg-6">
                    <div class="welcome_img float-right">
                        <img class="img-fluid" src="img/welcome-1.jpg" alt="">
                    </div>
                </div>
                <div class="col-lg-6 text-right">
                    <div class="welcome_text">
                        <h4> به <span class="web-color"> "مسکن شو" </span> خوش آمدید </h4>
                        <p> لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. </p>
                        <div class="row" v-if="false">
                            <div class="col-sm-4">
                                <div class="wel_item">
                                    <i class="lnr lnr-database web-color"></i>
                                    <h4> {{ (920).toLocaleString('fa-IR') }} </h4>
                                    <p> معامله </p>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="wel_item">
                                    <i class="lnr lnr-book web-color"></i>
                                    <h4> {{ (740).toLocaleString('fa-IR') }} </h4>
                                    <p> پروژه </p>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="wel_item">
                                    <i class="lnr lnr-users web-color"></i>
                                    <h4> {{ (12000).toLocaleString('fa-IR') }} </h4>
                                    <p> کاربر </p>
                                </div>
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

            // $('.wel_item').tilt({
            //     maxTilt: 5,
            //     scale : 1.04
            // })

        }

    }
</script>
