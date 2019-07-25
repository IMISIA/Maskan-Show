<template>

    <section class="mt-xs-5" :class="{ 'pt-xs-65' : Res && is_exist($route.params) }">
        <div class="container">

            <div class="sec-title mb-xs-5" :class="{ 'justify-content-end' : Res }">

                <div class="d-flex align-items-center grid-list-btn" v-if="!Res">
                    <el-radio-group v-model="grid_list">
                        <el-radio-button :label="true">
                            <v-img
                                src="/img/gird.png"
                                height="20px"
                                width="20px">
                            </v-img>
                        </el-radio-button>
                        <el-radio-button :label="false">
                            <v-img
                                src="/img/list.png"
                                height="20px"
                                width="20px">
                            </v-img>
                        </el-radio-button>
                    </el-radio-group>
                </div>

                <div>
                    <span class="estates-title"> ... خونه جدیدت رو پیدا کن </span>
                    <h2 :class="{ 'fs-20' : Res }"> {{ title || 'ملک های مشهد' }} </h2>
                </div>

            </div>

            <div class="filter-btn row justify-content-around" v-if="Res">
                <div class="col-5">
                    <span>
                        جدید ترین
                        <i class="flaticon-stats"></i>
                    </span>
                </div>
                <div class="col-5" @click="Set_state({ prop : 'dialog_filters' , val : true })">
                    <span>
                        فیلتر ها
                        <i class="flaticon-settings"></i>
                    </span>
                </div>
            </div>

            <template v-if="is_exist(Estates)">
                <transition name="fade" mode="in-out">
                    <!-- Estates Grid -->
                    <div class="row rtl" v-if="grid_list || Res ">
                        <div class="col-lg-4 col-md-6 ltr" v-for="(estate,index) in Estates" :key="index">
                            <Estate-Grid :estate="estate"></Estate-Grid>
                        </div>
                    </div>
                </transition>

                <transition name="fade" mode="in-out">
                    <!-- Estates List -->
                    <div class="row list-estate" v-if=" !grid_list && !Res ">
                        <div class="col-lg-12" v-for="(estate,index) in Estates" :key="index">
                            <Estate-List :estate="estate"></Estate-List>
                        </div>
                    </div>
                </transition>
            </template>

            <template v-else>
                <div class="rtl p-5 pt-0 d-flex flex-column justify-content-center align-items-center">
                    <i class="lnr lnr-magnifier fs-100"></i>
                    <h3 class="mt-4"> متاسفانه ملکی پیدا نشد :( </h3>
                    <h5 class="mt-3">
                        برای دیدن ملک های بیشتر
                        <a :href="$router.resolve({path: '/properties'}).href">اینجا</a>
                        کلیک کنید
                    </h5>
                </div>
            </template>

        </div>
    </section>

</template>

<script>

    import { mapState , mapMutations } from 'vuex';
    import mixin from '../../../mixin';

    export default {

        props: ['title'] ,
        mixins: [mixin] ,

        data() {
            return {
                grid_list: false ,
            }
        } ,

        computed: {
            ...mapState([
                'Estates'
            ])
        } ,

        methods : {
            ...mapMutations([
                'Set_state'
            ])
        }

    }

</script>

<style>

    .fs-100 {
        font-size: 100px;
    }

    .pt-xs-65 {
        padding-top: 65px !important;
    }

    .grid-list-btn .v-image__image {
        border-radius: 0px !important
    }

    .grid-list-btn .el-radio-button__inner {
        padding: 10px 15px !important;
    }
    
    .grid-list-btn .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        background-color: #29b6f6 !important;
        border-color: #29b6f6 !important;
        box-shadow: 1px 3px 8px -4px #409EFF, 0px 2px 6px -6px #000 !important;
    }

    .filter-btn {
        text-align: center;
        padding: 12px 0;
        margin: 0px 0px 40px;
    }

    .filter-btn div {
        cursor: pointer;
        padding: 1rem;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,.1) !important;
        border-radius: 7px;
    }

    .filter-btn span {
        color: #484848;
        font-size: 1em;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .filter-btn span i {
        margin-left: 10px;
        font-size: 20px;
    }

    .vs-pagination--nav,
    .vs-pagination--ul {
        align-items: end;
    }

    .mb-7 {
        margin-bottom: 5rem !important;
    }

    .fs-13 {
        font-size: 13px;
    }

    .fs-15 {
        font-size: 15px;
    }

    .el-rate__icon {
        margin: 0px !important;
    }

    .el-rate__text {
        color: #6c757d !important;
        margin-right: 8px;
        font-size: 11px;
        vertical-align: middle;
    }

</style>