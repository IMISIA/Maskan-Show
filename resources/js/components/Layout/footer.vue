<template>

    <footer>

        <svg class="defs-only position-fixed" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <symbol id="wave">
                <svg viewBox="0 0 100 50" preserveAspectRatio="none">
                    <g>
                        <path class="path-footer" d="M100,30 Q70,40 50,30 T0,30 v20 h100Z" stroke-width="0" />
                    </g>
                </svg>
            </symbol>
        </svg>

        <div class="svg_wrapper">

            <svg class="w-100 svg-wave" width="50" height="50">
                <use xlink:href="#wave"/>
            </svg>

            <div class="div-svg row rtl text-right m-0 text-white h-auto pb-5 px-3">

                <div class="col-lg-1"></div>

                <div class="col-lg-2">

                    <h4 class="web-color bold"> دیگر صفحات </h4>

                    <div class="other-pages d-flex justify-content-around mb-xs-4 mt-xs-3" :class="{ 'flex-column' : !Res }">
                        <router-link to="">
                            <span> خرید </span>
                        </router-link>

                        <router-link to="">
                            <span> رهن و اجاره </span>
                        </router-link>

                        <router-link to="">
                            <span> بلاگ </span>
                        </router-link>

                        <router-link to="">
                            <span> تماس با ما </span>
                        </router-link>
                    </div>

                </div>

                <div class="col-lg-3">
                    <h4 class="web-color bold"> درباره ما </h4>
                    <p>
                        «مسکن شو» سامانه هوشمندی است که در حوزه «املاک و مستغلات» و
                         «مشاغل ساختمانی» و «اشتغال زایی» وخدمات وابسته به آن، فعالیت می‌کند.
                         مسکن شو به شما امکان فروش، اجاره و خرید ملک مورد نظرتان را می‌دهد.
                    </p>
                </div>

                <div class="col-lg-4"></div>

                <div class="col-lg-1 d-flex justify-content-around mt-xs-3 text-center" :class="{ 'flex-column' : !Res }">

                    <a href="#">
                        <img class="mx-1" src="/img/social-icons/telegram.svg" height="25px" width="25px" alt="linkedin">
                    </a>
                    <a href="#">
                        <img class="mx-1" src="/img/social-icons/instagram.svg" height="25px" width="25px" alt="instagram">
                    </a>
                    <a href="#">
                        <img class="mx-1" src="/img/social-icons/twitter.svg" height="25px" width="25px" alt="facebook">
                    </a>
                    <a href="#">
                        <img class="mx-1" src="/img/social-icons/facebook.svg" height="25px" width="25px" alt="facebook">
                    </a>

                </div>

                <div class="col-lg-1"></div>

            </div>

        </div>

    </footer>


</template>

<script>
    import mixin from '../../mixin'
    export default {
        mixins : [mixin]
    }
</script>


<style>

    .btm {
        bottom: 230px;
    }

    @media (max-width: 700px) {
        .btm {
            bottom: 450px;
        }
    }

    .path-footer {
        fill: #222222;
        stroke-linejoin:round; stroke:#ffffff
    }

    .svg_wrapper {
        width: 100%;
    }

    .svg_wrapper svg {
        margin-bottom: -1px;
    }

    .svg-wave {
        height: 250px;
        transform: scaleX(-1);
    }

    .div-svg {
        width: 100%;
        min-height:220px;
        background: #222222;
    }

    .social-footer a {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .other-pages a {
        color: #fff;
        margin-top: 10px;
    }

</style>
