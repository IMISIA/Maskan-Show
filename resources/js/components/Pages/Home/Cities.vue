<template>

	<!-- Gallery section -->
	<section class="gallery-section spad">
		<div class="container">
			<div class="main_title">
				<h2> مکان های پرطرفدار </h2>
				<p>. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
			</div>
			<div class="gallery">
				<div class="grid-sizer"></div>

                <div class="row rtl">

                    <div class="col-md-6">
                        <a href="#" class="gallery-item grid-wide set-bg w-100" :class="{ 'height' : !Res }" data-setbg="img/cities/shiraz.jpg">
                            <div class="gi-info">
                                <h3> شیراز </h3>
                                <p> 112 ملک </p>
                            </div>
                        </a>
                    </div>

                    <div class="col-md-6">

                        <div>
                            <a href="#" class="gallery-item grid-long set-bg w-100" data-setbg="img/cities/mashhad.jpg">
                                <div class="gi-info">
                                    <h3> مشهد </h3>
                                    <p> 155 ملک </p>
                                </div>
                            </a>
                        </div>

                        <div>
                            <a href="#" class="gallery-item set-bg w-48" data-setbg="img/cities/tehran.jpg">
                                <div class="gi-info">
                                    <h3> تهران </h3>
                                    <p> 72 ملک </p>
                                </div>
                            </a>
                            <a href="#" class="gallery-item set-bg w-48 float-right" data-setbg="img/cities/isfahan.jpg">
                                <div class="gi-info">
                                    <h3> اصفهان </h3>
                                    <p> 50 ملک </p>
                                </div>
                            </a>
                        </div>

                    </div>

                </div>

				
			</div>
		</div>
	</section>
	<!-- Gallery section end -->

</template>

<script>

    import mixin from '../../../mixin'

    export default {

        mixins : [mixin] ,

        mounted() {

            $(document).ready( () => {

                // Background set
                $('.set-bg').each(function() {
                    var bg = $(this).data('setbg');
                    $(this).css('background-image', 'url(' + bg + ')');
                });

            })

        } ,

    }
</script>

<style scoped>

    .height {
        height: calc(100% - 20px);
    }

    .w-48 {
        width: 48% !important
    }

</style>
