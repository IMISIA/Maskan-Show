<template>
    <div>

        <!-- label For Assignmented Estate -->
        <div class="container p-5 text-center"
            v-if=" is_exist(Single_estate) && (!!Single_estate.assignmented_at || is_exist(Single_estate.label) ) ">
            
            <img class="label-estate" :src=" !!Single_estate.assignmented_at ? '/img/assignmented.svg' : '/img/label.svg' ">

            <p class="mt-5 text-center" v-if="!!Single_estate.assignmented_at"> متاسفانه این ملک واگذار شده . </p>
            <p class="mt-5 text-center" v-else> {{ Single_estate.label.description || Single_estate.label.title }} </p>

            <p class="text-center">
                {{ `برای دیدن ملک های  جدیدتر ، به صفحه ی 
                ${ Single_estate.assignment ? Single_estate.assignment.title : '' }
                ${ Single_estate.estate_type ? Single_estate.estate_type.title : '' }
                ${ Single_estate.street && Single_estate.street.area ? 'املاک ' + Single_estate.street.area.name : '' }
                بروید` }} 
            </p>

            <v-btn :color="web_color" dark round @click="push_link">
                {{ `${ Single_estate.assignment ? Single_estate.assignment.title : '' }
                ${ Single_estate.estate_type ? Single_estate.estate_type.title : '' }
                ${ Single_estate.street && Single_estate.street.area ? 'املاک ' + Single_estate.street.area.name : '' }` }}       
            </v-btn>

        </div>

        <!-- Breadcrumb -->
        <div class="container pt-4" v-if="is_exist(Single_estate)">
            <div class="site-breadcrumb rtl as-shadow border-radius">
                <v-breadcrumbs :items="Breadcrumb">
                    <template v-slot:divider>
                        <v-icon>chevron_left</v-icon>
                    </template>
                </v-breadcrumbs>
            </div>
        </div>

        <!-- Owner Info In Pront Mode -->
        <div class="container owner-info-print">
            <div class="author-card as-shadow border-radius rtl text-center p-4">

                <p class="text-center border-bottom pb-2 mx-4"> اطلاعات مالک </p>

                <div class="d-flex">
                    <div class="w-50">
                        <span> نام مالک : </span>   
                        <span class="mr-3"> {{ Single_estate.landlord_fullname }} </span>
                    </div>

                    <div class="w-50">
                        <span> شماره تماس : </span>   
                        <span class="mr-3"> {{ Single_estate.landlord_phone_number }} </span>
                    </div>
                </div>

                <div class="mt-3">
                    <span> آدرس  کامل : </span>   
                    <span class="mr-3">
                        {{  ( Single_estate.street && Single_estate.street.area ? Single_estate.street.area.name +' ، ' : '' ) +
                            ( Single_estate.street ? Single_estate.street.name +' ، ' : '' ) +
                            ( Single_estate.plaque ? Single_estate.address +' ، '+ `پلاک ${Single_estate.plaque}` : Single_estate.address )
                        }}
                    </span>
                </div>

            </div>
        </div>

        <!-- Details -->
        <section class="page-section" v-if="is_exist(Single_estate)">
            <div class="container">
                <div class="row rtl">

                    <!-- Details -->
                    <div class="col-lg-8 single-list-page ltr">
                        <div class="single-list-content as-shadow border-radius">

                            <div class="rtl mb-5 list">

                                <div class="sl-title text-right mb-4">

                                    <h4>
                                        <span class="web-color"> {{ '#'+ Single_estate.id }} </span>
                                        {{ Single_estate.title ||
                                            (Single_estate.assignment ? Single_estate.assignment.title +' ' : '') +
                                            (Single_estate.estate_type ? Single_estate.estate_type.title +' ' : '') +
                                            `${(Single_estate.area).toLocaleString('fa-IR')} متری` }}
                                    </h4>

                                    <p>
                                        <i class="fa fa-map-marker ml-2 fs-20 bold"></i>
                                        {{  ( Single_estate.street && Single_estate.street.area ? Single_estate.street.area.name +' ، ' : '' ) +
                                            ( Single_estate.street ? Single_estate.street.name +' ، ' : '' ) +
                                            Single_estate.address
                                        }}
                                    </p>

                                </div>

                                <div class="property-price single-estate clearfix mt-2 w-100 p-0">
                                    <div class="read-more rtl">
                                        <div class="theme-btn">

                                            <div v-if="assignment.has_sales_price">
                                                {{ Single_estate.sales_price | price }}
                                                <span class="fs-12 pr-1 normal"> {{ label_price(Single_estate.sales_price) }} </span>
                                            </div>

                                            <div class="d-flex" v-else-if="assignment.has_mortgage_price && assignment.has_rental_price">
                                                <div>
                                                    {{ Single_estate.mortgage_price | price }}
                                                    <span class="fs-12 normal"> {{ label_price(Single_estate.mortgage_price) }} رهن </span>
                                                </div>
                                                <span class="mx-3 line-price"> | </span>
                                                <div>
                                                    {{ Single_estate.rental_price | price }}
                                                    <span class="fs-12 normal"> {{ label_price(Single_estate.rental_price) }} اجاره </span>
                                                </div>
                                            </div>

                                            <div v-else>
                                                {{ ( assignment.has_mortgage_price ? Single_estate.mortgage_price : Single_estate.rental_price) | price }}
                                                <span class="fs-12 pr-1 normal">
                                                    {{ label_price( assignment.has_mortgage_price ? Single_estate.mortgage_price : Single_estate.rental_price) }}
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="price rtl"> {{ Single_estate.area | num_to_fa }} متری </div>
                                </div>

                            </div>

                            <template v-if="is_exist(Single_estate.spec) && is_exist(Single_estate.spec.headers) ">
                                <div v-for="spec in Single_estate.spec.headers" :key="spec.id">
                                    <template v-if="is_exist(spec.rows)">
                                        <h3 class="sl-sp-title"> {{ spec.title }} </h3>
                                        <div class="row property-details-list rtl text-right">
                                            <div :class="[ is_exist(item.data) && is_exist(item.data.values) ?
                                                ( check_chars({ title : item.title , values : item.data.values , prefix : item.prefix , postfix : item.postfix }) ?
                                                'col-12' : 'col-md-6' ) : 'col-md-6' ]"
                                                v-for="item in spec.rows" :key="item.id">

                                                <template v-if=" is_exist(item.data) ? ( is_exist(item.data.values) || ( item.is_multiple ? is_exist(item.data.data) : false ) ) : false ">
                                                    <p>
                                                        <v-icon> {{ item.icon || 'home'  }} </v-icon>
                                                        <span class="text-secondary"> {{ item.title }} : </span>

                                                        <span v-if="is_exist(item.data.values)">
                                                            {{ join_props( item.data.values , item.prefix , item.postfix ) }}
                                                        </span>

                                                        <span v-else-if="is_exist(item.data.data) && item.is_multiple && is_json(item.data.data)">
                                                            {{ join_props( Json_parse(item.data.data) , item.prefix , item.postfix ) }}
                                                        </span>

                                                        <span v-else-if="is_exist(item.data.data) && !is_json(item.data.data) ">
                                                            {{ item.prefix +' '+ item.data.data +' '+ item.postfix }}
                                                        </span>
                                                    </p>
                                                </template>

                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </template>

                            <template v-if="is_exist(Single_estate.features)">
                                <h3 class="sl-sp-title"> امکانات ملک </h3>
                                <div class="row property-details-list rtl text-right">
                                    <div class="col-md-6" v-for="item in asc_features" :key="item.id">
                                        <p>
                                            <v-icon> {{ item.icon || 'home'  }} </v-icon>
                                            <span class="text-secondary"> {{ item.title }} </span>
                                        </p>
                                    </div>
                                </div>
                            </template>

                            <template v-if="is_exist(Single_estate.description)">
                                <h3 class="sl-sp-title text-right"> توضیحات </h3>
                                <div class="description">
                                    <p> {{ Single_estate.description }} </p>
                                </div>
                            </template>

                            <div class="row rtl">

                                <div class="col-md-6"
                                    v-if="is_exist(Single_estate.advantages) && is_exist(Single_estate.disadvantages)">
                                    <h3 class="sl-sp-title"> نکات مثبت </h3>
                                    <div class="property-details-list rtl text-right">
                                        <div class="advantages">
                                            <p v-for="(item,index) in Single_estate.advantages" :key="index">
                                                <i class="fa fa-check-circle-o"></i>
                                                {{ item }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6"
                                    v-if="is_exist(Single_estate.advantages) && is_exist(Single_estate.disadvantages)">
                                    <h3 class="sl-sp-title"> نکات منفی </h3>
                                    <div class="property-details-list rtl text-right">
                                        <div class="disadvantages">
                                            <p v-for="(item,index) in Single_estate.disadvantages" :key="index">
                                                <i class="fa fa-ban"></i>
                                                {{ item }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12"
                                    v-else-if=" is_exist(Single_estate.advantages) || is_exist(Single_estate.disadvantages)">
                                    <h3 class="sl-sp-title"> نکات
                                        {{ is_exist(Single_estate.advantages) ? 'مثبت' : 'منفی' }} </h3>
                                    <div class="property-details-list rtl text-right">
                                        <div class="advantages row" v-if="is_exist(Single_estate.advantages)">
                                            <p class="col-md-6" v-for="(item,index) in Single_estate.advantages"
                                                :key="index">
                                                <i class="fa fa-check-circle-o"></i>
                                                {{ item }}
                                            </p>
                                        </div>
                                        <div class="disadvantages row" v-if="is_exist(Single_estate.disadvantages)">
                                            <p class="col-md-6" v-for="(item,index) in Single_estate.disadvantages"
                                                :key="index">
                                                <i class="fa fa-ban"></i>
                                                {{ item }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="media-estate">

                                <template v-if="is_exist(images)">
                                    <h3 class="sl-sp-title"> عکس ها </h3>

                                    <div class="single-list-slider owl-carousel" id="sl-slider">
                                        <div class="sl-item set-bg" v-for="img in images" :key="img.id"
                                            :data-setbg="url+img.medium">
                                        </div>
                                    </div>

                                    <div class="owl-carousel sl-thumb-slider mb-5" id="sl-slider-thumb">
                                        <div class="sl-thumb set-bg" v-for="img in images" :key="img.id"
                                            :data-setbg="url+img.medium">
                                        </div>
                                    </div>
                                </template>

                                <template v-if="is_exist(Single_estate.aparat_video)">
                                    <h3 class="sl-sp-title"> فیلم ملک </h3>
                                    <div class="perview-video">
                                        <div id="81412734058">
                                            <script type="text/JavaScript"
                                                :src="`https://www.aparat.com/embed/${Single_estate.aparat_video}?data[rnddiv]=81412734058&data[responsive]=yes`">
                                            </script>
                                        </div>
                                    </div>
                                </template>

                            </div>

                            <template v-if="is_exist(estate_location)">
                                <h3 class="sl-sp-title"> محل ملک بر روی نقشه </h3>
                                <l-map ref="map" class="map" :zoom="zoom" :center="estate_location">

                                    <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>

                                    <!-- <l-circle-marker :lat-lng="estate_location" :radius="6" color="#304FFE">
                                        <l-tooltip>موقعیت مکانی شما</l-tooltip>
                                    </l-circle-marker> -->

                                    <l-marker :draggable="false" :lat-lng="estate_location">
                                        <l-icon :icon-size="[40,50]" :icon-anchor="[20,50]"
                                            icon-url="/img/location_marker.svg">
                                        </l-icon>
                                        <l-tooltip> موقعیت مکانی ملک </l-tooltip>
                                    </l-marker>

                                </l-map>
                            </template>

                        </div>
                    </div>

                    <!-- sidebar -->
                    <div class="col-lg-4 col-md-7 sidebar ltr">

                        <div class="author-card as-shadow border-radius rtl text-center p-4">

                            <div class="text-center mx-4"
                                :class="[ show_owner_info && has_owner_info ? 'border-bottom pb-2 mb-3' : 'mb-0' ]">
                                
                                <template v-if="show_owner_info && has_owner_info">
                                    اطلاعات املاک
                                </template>

                                <template v-else>
                                        
                                    <v-btn
                                        v-if=" !( !!Single_estate.assignmented_at || is_exist(Single_estate.label) ) "
                                        :color="web_color"
                                        class="white--text"
                                        round
                                        @click="show_info">
                                        <v-icon class="ml-2" dark>visibility</v-icon>
                                        <span class="fs-13"> نمایش اطلاعات مالک </span>
                                    </v-btn>

                                    <v-btn slot="reference" color="blue darken-2" fab dark small @click="print(false)">
                                        <v-icon>print</v-icon>
                                    </v-btn>

                                </template>

                            </div>

                            <template v-if="show_owner_info && has_owner_info">

                                <div class="row">
                                    <div class="col-5">
                                        <p class="text-muted fs-12 text-left mb-1"> نام مالک : </p>   
                                    </div>
                                    <div class="col-7">
                                        <p class="mb-3 text-right"> {{ Single_estate.landlord_fullname }} </p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-5">
                                        <p class="text-muted fs-12 text-left mb-1"> شماره تماس : </p>   
                                    </div>
                                    <div class="col-7">
                                        <p class="mb-3 text-right"> {{ Single_estate.landlord_phone_number }} </p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-10 mx-auto">
                                        <p class="mb-3 fs-12 text-center">
                                        {{  ( Single_estate.street && Single_estate.street.area ? Single_estate.street.area.name +' ، ' : '' ) +
                                            ( Single_estate.street ? Single_estate.street.name +' ، ' : '' ) +
                                            ( Single_estate.plaque ? Single_estate.address +' ، '+ `پلاک ${Single_estate.plaque}` : Single_estate.address )
                                        }}
                                        </p>
                                    </div>
                                </div>

                                <div>

                                    <v-btn
                                        v-if="Auth || true"
                                        :color="web_color"
                                        class="text-white"
                                        round
                                        :disabled="assignment_estate_loading"
                                        :loading="assignment_estate_loading"
                                        @click="assignment_estate">
                                        <v-icon class="ml-2" dark>flag</v-icon>
                                        <span class="fs-13"> اعلام واگذاری </span>
                                    </v-btn>

                                    <el-popover
                                        placement="top"
                                        width="190"
                                        v-model="confirm_print">
                                        <p class="text-center fs-12"> با اطلاعات مالک پرینت شود ؟ </p>
                                        <div>
                                            <el-button type="primary" size="mini" @click="print(true)"> بله </el-button>
                                            <el-button size="mini" type="text" @click="print(false)"> نه </el-button>
                                        </div>
                                        <v-btn slot="reference" color="blue darken-2" fab dark small>
                                            <v-icon>print</v-icon>
                                        </v-btn>
                                    </el-popover>

                                </div>
                                
                            </template>

                        </div>

                        <template v-if=" is_exist(Single_estate.street) &&
                                        is_exist(Single_estate.street.area) && is_exist(Single_estate.street.area.offices) ">

                            <h5 class="title-last-estate">  املاک اطراف این ملک </h5>

                            <div class="row mx-0 author-card as-shadow border-radius rtl text-center"
                                v-for="office in Single_estate.street.area.offices" :key="office.id">

                                <router-link :to="{ path : '/properties' , query : { consultant : office.username } }" class="col-12 row">
                                    <div class="col-5">
                                        <v-avatar :size="80" :color="web_color">
                                            <img :src=" office.owner.avatar ? url + office.owner.avatar.small : '/img/user.png' " alt="avatar">
                                        </v-avatar>
                                    </div>

                                    <div class="col-7 title-info">
                                        <h5> {{ office.name }} </h5>
                                        <p class="text-muted fs-12 text-center mb-0"> مشاور املاک </p>
                                    </div>

                                </router-link>

                                <div class="col-12 author-contact border-top mt-4">
                                    <p class="text-center"><i class="fa fa-phone"></i> {{ office.phone_number }} </p>
                                    <p class="text-center"><i class="fa fa-map-marker"></i> {{ office.address }} </p>
                                </div>

                            </div>
                        </template>

                    </div>

                </div>
            </div>
        </section>

        <!-- Not Found Estate -->
        <section class="pt-5" v-if="!is_exist(Single_estate)">
            <div>

                <section class="error-container">
                    <span class="four"><span class="screen-reader-text">4</span></span>
                    <span class="zero"><span class="screen-reader-text">0</span></span>
                    <span class="four"><span class="screen-reader-text">4</span></span>
                </section>

                <div class="text-center">
                    <h2>
                        !!!متاسفانه ملک مورد نظر یافت نشد
                    </h2>
                    <h4 class="mt-3">
                        برای دیدن دیگر املاک
                        <router-link to="/properties"> اینجا </router-link>
                        کلیک کنید
                    </h4>
                </div>

            </div>
        </section>

    </div>
</template>

<script>

    import {
        mapState ,
        mapMutations
    } from 'vuex';
    import mixin from '../../mixin';

    import {
        LMap ,
        LTileLayer ,
        LMarker ,
        LCircleMarker ,
        LControl ,
        LIcon ,
        LTooltip
    } from 'vue2-leaflet';
    import 'leaflet/dist/leaflet.css';

    export default {

        mixins: [mixin] ,

        components: {
            LMap ,
            LTileLayer ,
            LMarker ,
            LCircleMarker ,
            LControl ,
            LIcon ,
            LTooltip
        } ,

        created() {
            this.Req_estate();
            this.$vuetify.goTo( 0 , {
                duration : 500 ,
            })
        } ,

        data() {
            return {
                zoom: 16,
                confirm_print : false ,
                assignment_estate_loading : false ,
                show_owner_info : false
            }
        } ,

        computed: {

            ...mapState([
                'Single_estate',
                'assignments' ,
                'Auth' ,
                'url' ,
                'req_url' ,
                'me'
            ]) ,

            Breadcrumb() {
                if (this.is_exist(this.Single_estate)) {
                    return [{
                            text: 'خانه',
                            disabled: false,
                            to: '/'
                        } ,
                        {
                            text: this.Single_estate.assignment ? this.Single_estate.assignment.title : '' ,
                            disabled: false,
                            to: `/properties?assignments=${ this.Single_estate.assignment ? this.Single_estate.assignment.id : ''}`
                        } ,
                        {
                            text: this.Single_estate.title ||
                                    (this.Single_estate.assignment ? this.Single_estate.assignment.title +' ' : '') +
                                    (this.Single_estate.estate_type ? this.Single_estate.estate_type.title +' ' : '') +
                                    `${(this.Single_estate.area).toLocaleString('fa-IR')} متری` ,
                            disabled: true,
                            to: '/'
                        }
                    ]
                }
            } ,

            assignment() {
                if (this.is_exist(this.assignments) && this.is_exist(this.Single_estate)) {
                    return this.assignments.filter(el => {
                        if (el.id === this.Single_estate.assignment.id) {
                            return {
                                has_sales_price: el.has_sales_price,
                                has_rental_price: el.has_rental_price,
                                has_mortgage_price: el.has_mortgage_price,
                            }
                        }
                    })[0]
                } else {
                    return {
                        has_sales_price: false,
                        has_rental_price: false,
                        has_mortgage_price: false,
                    }
                }
            } ,

            estate_location() {
                if ( this.is_exist(this.Single_estate) && this.is_exist(this.Single_estate.coordinates) ) {
                    return [this.Single_estate.coordinates.lat, this.Single_estate.coordinates.lng]
                } else {
                    return null;
                }
            } ,

            images() {
                if(this.is_exist(this.Single_estate.photos)) {
                    return this.Single_estate.photos;
                } else {
                    return null;
                }
            } ,

            has_owner_info() {
                return  !!this.Single_estate.landlord_fullname &&
                        !!this.Single_estate.landlord_phone_number &&
                        !!this.Single_estate.plaque
            } , 

            asc_features() {
                return _.orderBy( this.Single_estate.features , 'title' , 'asc' );
            }

        } ,

        filters: {

            price(val) {
                if(val < 1000000) {
                    return (val/1000).toLocaleString('fa-IR')
                } else if(val < 1000000000) {
                    return (val/1000000).toLocaleString('fa-IR')
                } else if(val > 1000000000) {
                    return (val/1000000000).toLocaleString('fa-IR')
                }
            } ,

            filter_price(val) {
                if (val < 1000000) {
                    return (Math.ceil(val / 1000)).toLocaleString('fa-IR') + ' ت';
                } else {
                    return (Math.ceil(val / 1000000)).toLocaleString('fa-IR') + ' م';
                }
            }

        } ,

        methods: {

            ...mapMutations([
                'Req_data' ,
                'Set_state'
            ]) ,

            Req_estate() {

                this.Set_state({ prop : 'Single_estate' , val : {} })
                this.Set_state({ prop : 'loading' , val : true })

                axios({
                    method : 'POST' ,
                    url : this.req_url ,
                    data : {
                        query: `
                            {
                                estate( id : "${this.$route.params.id}" ) {
                                    id
                                    code
                                    title
                                    description
                                    landlord_fullname
                                    landlord_phone_number
                                    plaque
                                    assignmented_at
                                    label {
                                        id
                                        title
                                        description
                                        color
                                    }
                                    photos {
                                        id
                                        file_name
                                        medium
                                    }
                                    aparat_video
                                    registrar_type {
                                        id
                                        display_name
                                        description
                                    }
                                    address
                                    area
                                    rental_price
                                    mortgage_price
                                    sales_price
                                    spec {
                                        id
                                        title
                                        headers {
                                            id
                                            title
                                            description
                                            rows {
                                                id
                                                title
                                                description
                                                icon
                                                is_multiple
                                                prefix
                                                postfix
                                                data {
                                                    id
                                                    data
                                                    values {
                                                        id
                                                        value
                                                    }
                                                }
                                                help
                                            }
                                        }
                                    }
                                    features {
                                        id
                                        icon
                                        title
                                    }
                                    advantages
                                    disadvantages
                                    coordinates {
                                        lat
                                        lng
                                    }
                                    assignment {
                                        id
                                        title
                                        color
                                    }
                                    estate_type {
                                        id
                                        title
                                    }
                                    street {
                                        id
                                        name
                                        area {
                                            id
                                            name
                                            offices {
                                                id
                                                name
                                                username
                                                address
                                                phone_number
                                                owner {
                                                    avatar {
                                                        id
                                                        file_name
                                                        small
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        `
                    }
                })
                .then( ({data}) => {
                    console.log(data);
                    if( !!data.errors ) {
                        data.errors.forEach( Err => console.error(Err.message) )
                    } else {
                        this.Set_state({ prop : 'Single_estate' , val : data.data.estate })
                    }
                })
                .then( () => {
                    this.Jquery();
                    setTimeout(() => {
                        this.Set_state({ prop : 'loading' , val : false })
                    }, 500);
                })
                .catch( Err => {
                    if( Err.response && Err.response.status === 401 ) {
                        window.localStorage.removeItem('JWT');
                        location.reload();
                    } else {
                        console.log(Err);
                    }
                })

            } ,

            show_info() {
                if( !!this.has_owner_info ) {
                    this.show_owner_info = true;
                } else if( this.Single_estate.registrar_type && this.Single_estate.registrar_type.id == 2 ) {
                    this.show_owner_info = true;
                } else if(!this.Auth) {
                    this.notif( 'کاربر گرامی برای اعلام واگذازی ابتدا باید وارد سایت شوید' , 'warning' , 'error' );
                    return;
                } else if( this.Auth && !!this.has_owner_info ) {
                    if( this.me && this.me.visited_estate_count == 0 ) {
                        this.notif( 'کاربر گرامی نسبت به خرید پنل اقدام نمایید' , 'warning' , 'error' );
                    } else {
                        this.notif( 'کاربر گرامی اعتبار شما برای این اقدام کافی نیست' , 'warning' , 'error' );
                    }
                }
            } ,

            Jquery() {
                $(document).ready(function () {

                    // Background set
                    $('.set-bg').each(function () {
                        var bg = $(this).data('setbg');
                        $(this).css('background-image', 'url(' + bg + ')');
                    });

                    // Review Slider
                    var sync1 = $("#sl-slider");
                    var sync2 = $("#sl-slider-thumb");
                    var slidesPerPage = 4; //globaly define number of elements per page
                    var syncedSecondary = true;

                    sync1.owlCarousel({
                        items: 1,
                        rtl:true,
                        slideSpeed: 2000,
                        nav: false,
                        autoplay: true,
                        dots: true,
                        loop: true,
                        responsiveRefreshRate: 200,
                    }).on('changed.owl.carousel', syncPosition);

                    sync2.on('initialized.owl.carousel', function () {
                        sync2.find(".owl-item").eq(0).addClass("current");
                    }).owlCarousel({
                        items: slidesPerPage,
                        dots: true,
                        nav: true,
                        rtl:true,
                        margin: 10,
                        smartSpeed: 200,
                        slideSpeed: 500,
                        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                        slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
                        responsiveRefreshRate: 100
                    }).on('changed.owl.carousel', syncPosition2);

                    function syncPosition(el) {
                        //if you set loop to false, you have to restore this next line
                        //var current = el.item.index;
                        //if you disable loop you have to comment this block
                        var count = el.item.count - 1;
                        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

                        if (current < 0) {
                            current = count;
                        }
                        if (current > count) {
                            current = 0;
                        }

                        //end block
                        sync2.find(".owl-item").removeClass("current").eq(current).addClass("current");
                        var onscreen = sync2.find('.owl-item.active').length - 1;
                        var start = sync2.find('.owl-item.active').first().index();
                        var end = sync2.find('.owl-item.active').last().index();

                        if (current > end) {
                            sync2.data('owl.carousel').to(current, 100, true);
                        }
                        if (current < start) {
                            sync2.data('owl.carousel').to(current - onscreen, 100, true);
                        }
                    }

                    function syncPosition2(el) {
                        if (syncedSecondary) {
                            var number = el.item.index;
                            sync1.data('owl.carousel').to(number, 100, true);
                        }
                    }

                    sync2.on("click", ".owl-item", function (e) {
                        e.preventDefault();
                        var number = $(this).index();
                        sync1.data('owl.carousel').to(number, 300, true);
                    });

                })
            } ,

            print(has_owner) {

                this.confirm_print = false

                if(has_owner) {
                    $(document).ready(function() {
                        $('.owner-info-print').addClass('has-owner')
                    })
                }

                setTimeout(() => {
                    window.print()
                }, 500);

            } ,

            assignment_estate() {
                if(!this.Auth) {
                    this.notif( 'کاربر گرامی برای اعلام واگذازی ابتدا باید وارد سایت شوید' , 'warning' , 'error' );
                    return;
                } else {
                    
                    this.assignment_estate_loading = true;

                    axios({
                        method : 'POST' ,
                        url : this.req_url ,
                        data : {
                            query : `
                                mutation {
                                    assignmentEstate( estate : "${this.Single_estate.id}" ) {
                                        status
                                        message
                                    }
                                }
                            `
                        }
                    })
                    .then( ({data}) => {
                        console.log(data);
                        if( data.data.assignmentEstate.status == 200 ) {
                            this.notif( data.data.assignmentEstate.message , 'success' , 'check' )
                        } else {
                            this.notif( data.data.assignmentEstate.message , 'warning' , 'error' )
                        }

                        this.assignment_estate_loading = false;
                    })
                    .catch( Err => {
                        if( Err.response && Err.response.status === 401 ) {
                            window.localStorage.removeItem('JWT');
                            location.reload();
                        } else {
                            console.log(Err);
                        }
                    })

                }
            } ,

            check_chars( obj ) {
                let sum = obj.title.length;
                obj.values.map( el => {
                    sum +=  ( obj.prefix +' '+ el.value +' '+ obj.postfix ).length
                })
                return sum > 35
            } ,

            join_props( values , prefix , postfix ) {
                let arr = [];
                
                if(!prefix) prefix = '';
                if(!postfix) postfix = '';

                values.map( el => {
                    arr.push( prefix +' '+  el.value +' '+ postfix );
                })

                return arr.join(' ، ');
            } ,

            Json_parse(val) {
                return JSON.parse(val)
            } ,

            is_json(str) {
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            } ,

            label_price(val) {
                if(val < 1000000) {
                    return `هزار تومان`
                } else if(val < 1000000000) {
                    return `میلیون تومان`
                } else if(val > 1000000000) {
                    return `میلیارد تومان`
                }
            } ,

            push_link() {

                let query_obj = {};

                if(this.is_exist(this.Single_estate.assignment)) query_obj.assignments = this.Single_estate.assignment.id;
                if(this.is_exist(this.Single_estate.estate_type)) query_obj.estate_types = this.Single_estate.estate_type.id;
                if( this.is_exist(this.Single_estate.street) && this.is_exist(this.Single_estate.street.area) ) {
                    query_obj.areas = [[this.Single_estate.street.area.id]];
                }
                if(this.is_exist(this.Single_estate.features)) {
                    query_obj.features = [];
                    this.Single_estate.features.map( el => {
                        query_obj.features.push(el.id);
                    })
                }

                this.$router.push({ path : '/properties' , query : query_obj });

            }

        } ,

    }

</script>

<style>

    .author-card .col-7 p {
        color: #222222;
    }

    .author-card .title-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    #create .v-speed-dial {
        position: absolute;
    }

    #create .v-btn--floating {
        position: relative;
    }

    .fs-12 {
        font-size: 12px;
    }

    .fs-20 {
        font-size: 20px !important;
    }

    .owner-info-print {
        display: none;
    }

    @media only print {
        footer,
        .sidebar,
        .media-estate,
        .site-breadcrumb {
            display: none;
        }

        .owner-info-print.has-owner {
            display: block;
        }
    }

</style>

<style scoped>

    .label-estate {
        height: 120px;
        width: 120px;
    }

    .title-last-estate {
        color: #484848;
        margin-bottom: 25px;
        text-align: center;
        font-weight: 700;
    }

    .advantages i {
        color: #00E676 !important;
    }

    .disadvantages i {
        color: #F50057 !important;
    }

    .as-flex {
        display: flex;
        justify-content: space-between;
    }

    .vue2leaflet-map {
        height: 300px;
        border-radius: 7px;
        box-shadow: 0 2px 12px 0px rgba(0, 0, 0, .1);
        z-index: 1 !important;
    }

    .sl-title h4 {
        color: #222222;
        font-weight: bold;
        margin-bottom: 20px;
    }

</style>
