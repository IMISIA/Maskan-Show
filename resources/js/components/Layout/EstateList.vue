<template>
    <el-card class="mb-3" shadow="hover" body-style="padding: 0px !important">
        <div class="feature-item row rtl list">

            <router-link class="col-md-4" :to=" 'estate/' + estate.id ">
                <div class="feature-pic js-tilt ltr bg-estate"
                    :class="{ 'placeholder' : !img.has_img }"
                    :style="{ backgroundImage : `url('${img.src}')` }">

                    <div class="sale-notic" :style="{ background : estate.assignment.color + ' !important' }">
                        {{ estate.assignment.title +' '+ estate.estate_type.title }}
                    </div>

                    <div class="room-info text-left d-flex as-info pt-0">
                        <div class="w-50" v-if="!!estate.registrar_type">
                            <el-tooltip
                                class="item"
                                effect="dark"
                                placement="top-start"
                                :disabled="!estate.registrar_type.description"
                                :content="estate.registrar_type.description">
                                <p class="text-left">
                                    <i class="fa fa-user ml-0 ml-1"></i>
                                    {{ 'توسط ' + estate.registrar_type.display_name }}
                                </p>
                            </el-tooltip>
                        </div>
                        <div class="w-50 text-right mr-0 ml-1 rtl">
                            <p><i class="fa fa-clock-o"></i> {{ estate.created_at | ago }} </p>
                        </div>	
                    </div>

                </div>
            </router-link>

            <div class="col-md-8 feature-text">

                <div class="text-center feature-title row">

                    <div class="col-md-7">
                        <router-link :to=" 'estate/' + estate.id ">
                            <h5 class="bold"> 
                                <span class="normal"> {{ '#'+ ( estate.code || estate.id ) }} </span>
                                {{ ( estate.title ||
                                    estate.assignment.title +' '+
                                    estate.estate_type.title +' '+
                                    `${(estate.area).toLocaleString('fa-IR')} متری` )
                                    | truncate( 41 - ( estate.code.length || estate.id.length ) ) }}
                            </h5>
                        </router-link>
                        <p class="text-muted fs-12 rtl mt-2">
                            <i class="fa fa-map-marker fs-15 ml-1"></i>
                            {{ estate.address | truncate(45) }}
                        </p>
                    </div>

                    <div class="col-md-5 border-right d-flex">
                        <div>
                            <div class="author-img set-bg" data-setbg="/img/author.jpg"></div>
                        </div>
                        <div class="px-3">
                            <p class="author-p"> املاک مسکن شو (امیر خدنگی) </p>

                            <el-rate
                                :value="4"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="2 رای">
                            </el-rate>

                        </div>
                    </div>

                </div>

                <div class="room-info-warp rtl text-right">
                    <div class="row room-info d-flex rtl">
                        <template v-if="!!estate.spec">
                            <template v-for="spec in estate.spec.filters.slice(0,6)">
                                <div class="col-md-4" v-if=" !!spec.data && !!spec.data.values && !!spec.data.values.length " :key="spec.id">
                                    <p class="hvr-icon-back">
                                        <i class="fa fa-building-o hvr-icon"></i>
                                        {{ join_props( spec.data.values , spec.prefix , spec.postfix ) | truncate(25) }}
                                    </p>
                                </div>
                            </template>
                        </template>
                    </div>
                </div>

                <div class="property-price clearfix mt-4">
                    <div class="read-more rtl">
                    <div class="theme-btn">
                            <div v-if="assignment.has_sales_price">
                                {{ estate.sales_price | price }}
                                <span class="fs-12 pr-1 normal"> {{ label_price(estate.sales_price) }} </span>
                            </div>
                            <div class="d-flex" v-else-if="assignment.has_mortgage_price && assignment.has_rental_price">
                                <div>
                                    {{ estate.mortgage_price | price }}
                                    <span class="fs-12 normal"> {{ label_price(estate.mortgage_price) }} رهن </span>
                                </div>
                                <span class="mx-3"> | </span>
                                <div>
                                    {{ estate.rental_price | price }}
                                    <span class="fs-12 normal"> {{ label_price(estate.rental_price) }} اجاره </span>
                                </div>
                            </div>
                            <div v-else>
                                {{ (estate.mortgage_price || estate.rental_price) | price }}
                                <span class="fs-12 pr-1 normal"> {{ label_price(estate.mortgage_price || estate.rental_price) }} </span>
                            </div>
                        </div>
                    </div>
                    <div class="price rtl"> {{ (estate.area).toLocaleString('fa-IR') }} متری </div>
                </div>

            </div>

        </div>
    </el-card>
</template>

<script>

    import moment from '../../moment';
    import { mapState } from 'vuex';

    export default {

        props : ['estate'] ,
        mixins : [moment] ,

        mounted() {
                
            // $('.js-tilt').tilt({
            //     maxTilt: 1.2,
            //     scale : 1.01
            // })

        } ,

        computed : {

            ...mapState([
                'assignments'
            ]) ,

            assignment() {
                if( !(_.isEmpty(this.assignments) && !(_.isEmpty(this.estate.assignment.id)) ) ) {
                    return this.assignments.filter( el => {
                        if( el.id === this.estate.assignment.id ) {
                            return {
                                has_sales_price : el.has_sales_price ,
                                has_rental_price : el.has_rental_price ,
                                has_mortgage_price : el.has_mortgage_price ,
                            }
                        }
                    })[0]
                } else {
                    return {
                        id : '' ,
                        title : '' ,
                        has_sales_price : false ,
                        has_rental_price : false ,
                        has_mortgage_price : false
                    }
                }
            } ,

            img() {
                return !(_.isEmpty(this.estate.photos)) ?
                    { src : this.estate.photos[0].medium , has_img : true } : { src : '/img/default.jpg' , has_img : false }
            }
            
        } ,

        filters : {
            price(val) {
                if(val < 1000000) {
                    return (val/1000).toLocaleString('fa-IR')
                } else if(val < 1000000000) {
                    return (val/1000000).toLocaleString('fa-IR')
                } else if(val > 1000000000) {
                    return (val/1000000000).toLocaleString('fa-IR')
                }
            }
        } ,

        methods : {
            join_props( values , prefix , postfix ) {
                let arr = [];
                
                if(!prefix) prefix = '';
                if(!postfix) postfix = '';

                values.map( el => {
                    arr.push( prefix +' '+  el.value +' '+ postfix );
                })

                return arr.join(' ، ');
            } ,

            label_price(val) {
                if(val < 1000000) {
                    return `هزار تومان`
                } else if(val < 1000000000) {
                    return `میلیون تومان`
                } else if(val > 1000000000) {
                    return `میلیارد تومان`
                }
            }
        }

    }
    
</script>

<style>

    .el-tooltip__popper {
        font-size: 10px;
    }

    .bg-estate {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top center;
    }

</style>

<style scoped>

    .el-card {
        overflow: visible;
        border-color: #e4e7ed;
        border-radius: 13px;
    }

    .el-card.is-hover-shadow:hover {
        transform: scale(1.005);
    }

    .author-img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .author-p {
        font-size: 11px;
        font-weight: 600;
    }

    .as-info {
        margin: auto auto 10px auto;
        z-index: 1;
        border: unset !important;
        width: 90%;
    }

    .as-info div p {
        display: inline-block;
        color: #ffffff;
        font-size: 12px;
        margin: 0px !important;
    }

    .as-info div p i {
        margin-left: 5px;
    }

    .feature-pic {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        margin-right: -30px !important;
        border-radius: 20px;
        margin: 15px;
        box-shadow: 0px 6px 20px -14px #000, 0px 3px 25px -23px #28b5f6;
    }

    .feature-pic:before {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 40%;
        width: 100%;
        background: linear-gradient(to bottom, rgba(34,34,34,0) 0%,rgba(34,34,34,0.99) 99%,rgba(34,34,34,1) 100%);
        background: -moz-linear-gradient(top, rgba(34,34,34,0) 0%, rgba(34,34,34,0.99) 99%, rgba(34,34,34,1) 100%);
        background: -webkit-linear-gradient(top, rgba(34,34,34,0) 0%,rgba(34,34,34,0.99) 99%,rgba(34,34,34,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00222222', endColorstr='#222222',GradientType=0 );
        content: "";
        z-index: 1;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .feature-title {
        padding: 20px 25px 0px 25px !important;
        text-align: right !important;
    }

    .feature-pic.placeholder:before {
        background: linear-gradient(to bottom, rgba(34, 34, 34, 0) 0%,rgba(34, 34, 34, 0.3) 150%,rgba(34, 34, 34, 0.3) 100%);
        background: -moz-linear-gradient(top, rgba(34,34,34,0) 0%, rgba(34,34,34,0.3) 150%, rgba(34,34,34,0.3) 100%);
        background: -webkit-linear-gradient(top, rgba(34,34,34,0) 0%,rgba(34,34,34,0.3) 150%,rgba(34,34,34,0.3) 100%);
    }

</style>
