<template>

    <section class="clients_logo_area p_120">
        <div class="container">
            <div class="main_title">
                <h2> املاک های قابل اعتماد </h2>
                <p>. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
            </div>
            <div class="clients_slider owl-carousel">
                <div class="item">
                    <img src="img/clients-logo/c-logo-1.png" alt="">
                </div>
                <div class="item">
                    <img src="img/clients-logo/c-logo-2.png" alt="">
                </div>
                <div class="item">
                    <img src="img/clients-logo/c-logo-3.png" alt="">
                </div>
                <div class="item">
                    <img src="img/clients-logo/c-logo-4.png" alt="">
                </div>
                <div class="item">
                    <img src="img/clients-logo/c-logo-5.png" alt="">
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    export default {

        mounted() {
            $(document).ready(function() {

                if( $('.clients_slider').length ){
                    $('.clients_slider').owlCarousel({
                        loop:true,
                        margin: 30,
                        items: 5,
                        nav: false,
                        autoplay: false,
                        smartSpeed: 1500,
                        dots:false, 
                        responsiveClass: true,
                        responsive: {
                            0: {
                                items: 1,
                            },
                            400: {
                                items: 2,
                            },
                            575: {
                                items: 3,
                            },
                            768: {
                                items: 4,
                            },
                            992: {
                                items: 5,
                            }
                        }
                    })
                }

            })
        }

    }
</script>