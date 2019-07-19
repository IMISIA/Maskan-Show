<template>
    <div>

        <section class="banner_area" v-if="!Res">
            <div class="banner_inner d-flex align-items-center">
                <div class="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0"
                    data-background=""></div>
                <div class="container text-right" style="margin-bottom: 120px;">
                    <div class="banner_content">
                        <div class="page_link rtl">
                            <a href="index.html"> صفحه اصلی  </a>
                            <i class="material-icons mx-2 fs-10"> arrow_back_ios </i>
                            <a href="properties.html"> لیست املاک </a>
                        </div>
                        <h2> لیست املاک </h2>
                    </div>
                </div>
            </div>
        </section>

        <!-- <vs-input class="mt-0 ml-auto" icon="attach_file" label-placeholder="کد ملک" v-model="input"/> -->

        <!-- <el-select class="mt-4 pt-2" v-model="value" placeholder="املاک">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select> -->

        <!-- <div class="block px-3 text-right">
            <span> محدوده قیمت خرید </span>
            <el-slider
                v-model="prices.sales_price.value"
                :mix="prices.sales_price.min"
                :max="prices.sales_price.max"
                :step="prices.sales_price.step"
                :format-tooltip="formatSlider"
                color="#222222"
                range>
            </el-slider>
        </div> -->

        <!-- <div class="col-md-6 mt-3 as-px-4 text-right">
            <span> : انتخاب کنید </span>
            <el-checkbox-group class="mt-2" v-model="checkbox" size="small">
                <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
            </el-checkbox-group>
        </div> -->

        <div class="container filter-bar" v-if="!Res">
            <div class="row rtl p-5">

                <div class="as-main-btn hvr-ripple-out" @click="Apply_filters">
                    <i class="material-icons ">search</i>
                </div>

                <!-- City Areas -->
                <div class="col-md-2">
                    <el-select v-model="area_select" multiple collapse-tags placeholder="منطقه" @change="set_streets">
                        <el-option v-for="item in city_areas" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>

                <!-- Streets -->
                <div class="col-md-2">
                    <el-select v-model="street_select" placeholder="خیابان" no-data-text="منطقه انتخاب نشده">
                        <el-option-group v-for="area in area_streets" :key="area.id" :label="area.name" :value="area.id">
                            <el-option
                                v-for="street in area.streets"
                                :key="street.id"
                                disabled
                                :label="street.name"
                                :value="street.id">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </div>

                <!-- Assignments -->
                <div class="col-md-2">
                    <el-select v-model="assignments_select" placeholder="نوع واگذاری" @change="display_ranges">
                        <el-option v-for="item in assignments" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </div>

                <!-- Estate Types -->
                <div class="col-md-2">
                    <el-select v-model="estate_types_select" @change="set_dynamic_filters"
                        placeholder="نوع ملک" no-data-text="نوع واگذاری انتخاب نشده">
                        <el-option v-for="item in estate_types" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </div>

                <!-- Area -->
                <div class="col-md-2">
                    <el-popover placement="bottom" width="295" trigger="click">
                        
                        <el-button slot="reference" class="btn-range w-100 text-right" plain>
                            {{ area.label }}
                            <i class="el-icon-arrow-down"></i>
                        </el-button>

                        <div class="input-price rtl">
                            <el-input class="text-center fs-12" placeholder="حداقل"
                                v-model="area.min.value" @focus="focus_min('area')"></el-input>
                            <span> - </span>
                            <el-input class="text-center fs-12" placeholder="حداکثر"
                                v-model="area.max.value" @focus="focus_max('area')"></el-input>
                        </div>
                        
                        <div class="default-prices input_min" v-if="area.min.active_defaults">
                            <v-list class="animated fadeInRight">
                                <v-list-tile
                                    v-for="(item,index) in area.min.defaults" :key="index"
                                    @click="set_ranges('area' , 'min' , index , item.value)" :disabled="item.disabled">
                                
                                    <v-list-tile-content>
                                        <v-list-tile-title v-text="(item.value).toLocaleString('fa-IR')"></v-list-tile-title>
                                    </v-list-tile-content>

                                </v-list-tile>
                            </v-list>
                        </div>

                        <div class="default-prices" v-if="area.max.active_defaults">
                            <v-list class="animated fadeInLeft faster">
                                <v-list-tile
                                    v-for="(item,index) in area.max.defaults" :key="index"
                                    @click="set_ranges('area' , 'max' , index , item.value)" :disabled="item.disabled">
                                
                                    <v-list-tile-content>
                                        <v-list-tile-title v-text="(item.value).toLocaleString('fa-IR')"></v-list-tile-title>
                                    </v-list-tile-content>

                                </v-list-tile>
                            </v-list>
                        </div>

                        <div class="input-price d-flex justify-content-between pt-2">
                            <v-btn class="mb-0" flat :color="web_color"
                                @click="filter_area"> اعمال </v-btn>
                            <v-btn class="mb-0" flat color="#999" @click="Cansel('area')"> بیخیال </v-btn>
                        </div>

                    </el-popover>    
                </div>

                <!-- Estate Options -->
                <div class="col-md-2">
                    <el-select
                        v-model="options_select"
                        multiple
                        collapse-tags
                        no-data-text="نوع ملک انتخاب نشده"
                        placeholder="امکانات">
                            <el-option
                            v-for="item in estate_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                    </el-select>
                </div>

                <!-- Search -->
                <div class="col-md-2 mt-3">
                    <vs-input icon="search" label-placeholder="کد ملک" v-model="code_estate"/>
                </div>

                <!-- Search -->
                <div class="col-md-2 mt-3">
                    <vs-input icon="search" label-placeholder="جستجو" v-model="search"/>
                </div>

                <!-- Owner -->
                <div class="col-md-2 mt-3">
                    <vs-input icon="person" label-placeholder="نام مالک" v-model="owner"/>
                </div>

                <!-- Phone Owner -->
                <div class="col-md-2 mt-3">
                    <vs-input icon="local_phone" label-placeholder="تلفن مالک" v-model="phone_owner" type="number"/>
                </div>

                <!-- Date -->
                <div class="col-md-2 mt-3">
                    <vs-input class="date-picker" icon="date_range" readonly label-placeholder="تاریخ ثبت" v-model="date"/>
                </div>

                <!-- Estate Types -->
                <div class="col-md-2 mt-3" v-for="filter in ( dynamic_filters.spec ? dynamic_filters.spec.filters : [] )" :key="filter.id">
                    <el-select v-model="bind_filters[filter.id]" :placeholder="filter.title" multiple collapse-tags>
                        <el-option v-for="item in filter.defaults" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                    </el-select>
                </div>

                <transition name="fade" mode="out-in">
                    <!-- Sales Price Input -->
                    <div class="col-md-2 mt-3" v-if="sales_price.is_active">
                        <el-popover placement="bottom" width="295" trigger="click">
                            
                            <el-button slot="reference" class="btn-range pr-2 w-100 text-right" plain>
                                <i class="el-icon-arrow-down"></i>
                                {{ sales_price.label }}
                            </el-button>

                            <div class="input-price rtl">
                                <el-input class="text-center fs-12" placeholder="حداقل"
                                    v-model="sales_price.min.value" @focus="focus_min('sales_price')"></el-input>
                                <span> - </span>
                                <el-input class="text-center fs-12" placeholder="حداکثر"
                                    v-model="sales_price.max.value" @focus="focus_max('sales_price')"></el-input>
                            </div>
                            
                            <div class="default-prices input_min" v-if="sales_price.min.active_defaults">
                                <v-list class="animated fadeInRight">
                                    <v-list-tile
                                        v-for="(item,index) in sales_price.min.defaults" :key="index"
                                        @click="set_ranges('sales_price' , 'min' , index , item.value)" :disabled="item.disabled">
                                    
                                        <v-list-tile-content>
                                            <v-list-tile-title v-text="(item.value).toLocaleString('fa-IR')"></v-list-tile-title>
                                        </v-list-tile-content>

                                    </v-list-tile>
                                </v-list>
                            </div>

                            <div class="default-prices" v-if="sales_price.max.active_defaults">
                                <v-list class="animated fadeInLeft faster">
                                    <v-list-tile
                                        v-for="(item,index) in sales_price.max.defaults" :key="index"
                                        @click="set_ranges('sales_price' , 'max' , index , item.value)" :disabled="item.disabled">
                                    
                                        <v-list-tile-content>
                                            <v-list-tile-title v-text="(item.value).toLocaleString('fa-IR')"></v-list-tile-title>
                                        </v-list-tile-content>

                                    </v-list-tile>
                                </v-list>
                            </div>

                            <div class="input-price d-flex justify-content-between pt-2">
                                <v-btn class="mb-0" flat :color="web_color"
                                    @click="filter_range('sales_price',sales_price.default_label)"> اعمال </v-btn>
                                <v-btn class="mb-0" flat color="#999" @click="Cansel('sales_price')"> بیخیال </v-btn>
                            </div>

                        </el-popover>
                    </div>
                </transition>

                <transition name="fade" mode="out-in">
                    <!-- Mortgage Price Input -->
                    <div class="col-md-2 mt-3" v-if="mortgage_price.is_active">
                        <el-popover placement="bottom" width="295" trigger="click">
                            
                            <el-button slot="reference" class="btn-range pr-2 w-100 text-right" plain>
                                <i class="el-icon-arrow-down"></i>
                                {{ mortgage_price.label }}
                            </el-button>

                            <div class="input-price rtl">
                                <el-input class="text-center fs-12" placeholder="حداقل"
                                    v-model="mortgage_price.min.value" @focus="focus_min('mortgage_price')"></el-input>
                                <span> - </span>
                                <el-input class="text-center fs-12" placeholder="حداکثر"
                                    v-model="mortgage_price.max.value" @focus="focus_max('mortgage_price')"></el-input>
                            </div>
                            
                            <div class="default-prices input_min" v-if="mortgage_price.min.active_defaults">
                                <v-list class="animated fadeInRight">
                                    <v-list-tile
                                        v-for="(item,index) in mortgage_price.min.defaults" :key="index"
                                        @click="set_ranges('mortgage_price' , 'min' , index , item.value)" :disabled="item.disabled">
                                    
                                        <v-list-tile-content>
                                            <v-list-tile-title v-text="(item.value).toLocaleString('fa-IR')"></v-list-tile-title>
                                        </v-list-tile-content>

                                    </v-list-tile>
                                </v-list>
                            </div>

                            <div class="default-prices" v-if="mortgage_price.max.active_defaults">
                                <v-list class="animated fadeInLeft faster">
                                    <v-list-tile
                                        v-for="(item,index) in mortgage_price.max.defaults" :key="index"
                                        @click="set_ranges('mortgage_price' , 'max' , index , item.value)" :disabled="item.disabled">
                                    
                                        <v-list-tile-content>
                                            <v-list-tile-title v-text="(item.value).toLocaleString('fa-IR')"></v-list-tile-title>
                                        </v-list-tile-content>

                                    </v-list-tile>
                                </v-list>
                            </div>

                            <div class="input-price d-flex justify-content-between pt-2">
                                <v-btn class="mb-0" flat :color="web_color"
                                    @click="filter_range('mortgage_price',mortgage_price.default_label)"> اعمال </v-btn>
                                <v-btn class="mb-0" flat color="#999" @click="Cansel('mortgage_price')"> بیخیال </v-btn>
                            </div>

                        </el-popover>
                    </div>
                </transition>

                <transition name="fade" mode="out-in">
                    <!-- Rental Price Input -->
                    <div class="col-md-2 mt-3" v-if="rental_price.is_active">
                        <el-popover placement="bottom" width="295" trigger="click">
                            
                            <el-button slot="reference" class="btn-range pr-2 w-100 text-right" plain>
                                <i class="el-icon-arrow-down"></i>
                                {{ rental_price.label }}
                            </el-button>

                            <div class="input-price rtl">
                                <el-input class="text-center fs-12" placeholder="حداقل"
                                    v-model="rental_price.min.value" @focus="focus_min('rental_price')"></el-input>
                                <span> - </span>
                                <el-input class="text-center fs-12" placeholder="حداکثر"
                                    v-model="rental_price.max.value" @focus="focus_max('rental_price')"></el-input>
                            </div>
                            
                            <div class="default-prices input_min" v-if="rental_price.min.active_defaults">
                                <v-list class="animated fadeInRight">
                                    <v-list-tile
                                        v-for="(item,index) in rental_price.min.defaults" :key="index"
                                        @click="set_ranges('rental_price' , 'min' , index , item.value)" :disabled="item.disabled">
                                    
                                        <v-list-tile-content>
                                            <v-list-tile-title v-text="(item.value).toLocaleString('fa-IR')"></v-list-tile-title>
                                        </v-list-tile-content>

                                    </v-list-tile>
                                </v-list>
                            </div>

                            <div class="default-prices" v-if="rental_price.max.active_defaults">
                                <v-list class="animated fadeInLeft faster">
                                    <v-list-tile
                                        v-for="(item,index) in rental_price.max.defaults" :key="index"
                                        @click="set_ranges('rental_price' , 'max' , index , item.value)" :disabled="item.disabled">
                                    
                                        <v-list-tile-content>
                                            <v-list-tile-title v-text="(item.value).toLocaleString('fa-IR')"></v-list-tile-title>
                                        </v-list-tile-content>

                                    </v-list-tile>
                                </v-list>
                            </div>

                            <div class="input-price d-flex justify-content-between pt-2">
                                <v-btn class="mb-0" flat :color="web_color"
                                    @click="filter_range('rental_price',rental_price.default_label)"> اعمال </v-btn>
                                <v-btn class="mb-0" flat color="#999" @click="Cansel('rental_price')"> بیخیال </v-btn>
                            </div>

                        </el-popover>
                    </div>
                </transition>

            </div>
        </div>

        <date-picker v-model="date" element="date-picker"></date-picker>

        <Estates :class="{ 'mb-5' : !(total > 1) }"></Estates>

        <div class="properties_area mt-4" v-if="total > 1">
            <vs-pagination :color="web_color" :total="total" v-model="page"></vs-pagination>
        </div>

        <Feature></Feature>

        <Cities></Cities>

        <v-app>
            <v-dialog v-model="dialog_filters" fullscreen scrollable hide-overlay transition="dialog-bottom-transition">
                <v-card class="dialog_filters">

                    <v-toolbar dark fixed :color="web_color_dark">
                        
                        <v-btn icon dark @click="Set_state({ prop : 'dialog_filters' , val : false })">
                            <v-icon>close</v-icon>
                        </v-btn>

                        <v-spacer></v-spacer>

                        <v-toolbar-title> فیلتر ها </v-toolbar-title>

                    </v-toolbar>

                    <v-card-text class="mt-5">
                        <div class="rtl p-4">

                            <!-- City Areas -->
                            <div class="mb-4">
                                    <el-select v-model="area_select" multiple collapse-tags placeholder="منطقه" @change="set_streets">
                                        <el-option v-for="item in city_areas" :key="item.id" :label="item.name" :value="item.id">
                                        </el-option>
                                    </el-select>
                            </div>

                            <!-- Streets -->
                            <div class="mb-4">
                                <el-select v-model="street_select" placeholder="خیابان" no-data-text="منطقه انتخاب نشده">
                                    <el-option-group v-for="area in area_streets" :key="area.id" :label="area.name" :value="area.id">
                                        <el-option
                                            v-for="street in area.streets"
                                            :key="street.id"
                                            disabled
                                            :label="street.name"
                                            :value="street.id">
                                        </el-option>
                                    </el-option-group>
                                </el-select>
                            </div>

                            <!-- Assignments -->
                            <div class="mb-4">
                                <el-select v-model="assignments_select" placeholder="نوع واگذاری" @change="display_ranges">
                                    <el-option v-for="item in assignments" :key="item.id" :label="item.title" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>

                            <!-- Estate Types -->
                            <div class="mb-4">
                                <el-select v-model="estate_types_select" @change="set_dynamic_filters"
                                    placeholder="نوع ملک" no-data-text="نوع واگذاری انتخاب نشده">
                                    <el-option v-for="item in estate_types" :key="item.id" :label="item.title" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>

                            <!-- Search -->
                            <div class="mb-4">
                                <el-input placeholder="جستجو" v-model="search"></el-input>
                            </div>

                            <!-- Owner -->
                            <div class="mb-4">
                                <el-input placeholder="مالک" v-model="owner"></el-input>
                            </div>

                            <!-- Phone Owner -->
                            <div class="mb-4">
                                <el-input placeholder="شماره تلفن مالک" v-model="phone_owner"></el-input>
                            </div>

                            <!-- Area -->
                            <div class="mt-4 ranges">
                                <p class="text-center"> متراژ </p>
                                <div class="d-flex align-items-center mt-2">
                                    <el-input placeholder="حداقل متراژ" type="number" v-model="area.min.value"></el-input>
                                    <span class="mx-2"> - </span>
                                    <el-input placeholder="حداکثر متراژ" type="number" v-model="area.max.value"></el-input>
                                </div>
                            </div>

                            <!-- Estate Options -->
                            <div class="mt-4">
                                <el-select
                                    v-model="options_select"
                                    multiple
                                    collapse-tags
                                    no-data-text="نوع ملک انتخاب نشده"
                                    placeholder="امکانات">
                                        <el-option
                                        v-for="item in estate_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </div>

                            <!-- Estate Types -->
                            <div class="mt-4" v-for="filter in ( dynamic_filters.spec ? dynamic_filters.spec.filters : [] )" :key="filter.id">
                                <el-select v-model="bind_filters[filter.id]" :placeholder="filter.title" multiple collapse-tags>
                                    <el-option v-for="item in filter.defaults" :key="item.id" :label="item.value" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>

                            <!-- Sales Price Input -->
                            <div class="mt-4 ranges" v-if="sales_price.is_active">
                                <p class="text-center"> قیمت ملک (تومان) </p>
                                <div class="d-flex align-items-center mt-2">
                                    <el-input placeholder="حداقل قیمت" type="number" v-model="sales_price.min.value"></el-input>
                                    <span class="mx-2"> - </span>
                                    <el-input placeholder="حداکثر قیمت" type="number" v-model="sales_price.max.value"></el-input>
                                </div>
                            </div>

                            <!-- Mortgage Price Input -->
                            <div class="mt-4 ranges" v-if="mortgage_price.is_active">
                                <p class="text-center"> قیمت رهن (تومان) </p>
                                <div class="d-flex align-items-center">
                                    <el-input placeholder="حداقل رهن" v-model="mortgage_price.min.value"></el-input>
                                    <span class="mx-2"> - </span>
                                    <el-input placeholder="حداکثر رهن" v-model="mortgage_price.max.value"></el-input>
                                </div>
                            </div>

                            <!-- Rental Price Input -->
                            <div class="mt-4 ranges" v-if="rental_price.is_active">
                                <p class="text-center"> قیمت اجاره (تومان) </p>
                                <div class="d-flex align-items-center">
                                    <el-input placeholder="حداقل اجاره" v-model="rental_price.min.value"></el-input>
                                    <span class="mx-2"> - </span>
                                    <el-input placeholder="حداکثر اجاره" v-model="rental_price.max.value"></el-input>
                                </div>
                            </div>

                        </div>
                    </v-card-text>

                    <v-btn :color="web_color_dark" dark large @click="Set_state({ prop : 'dialog_filters' , val : false })"> جستجو </v-btn>

                </v-card>
            </v-dialog>
        </v-app>

    </div>
</template>

<script>

    import { mapState , mapMutations } from 'vuex';
    import mixin from '../../mixin';
    import moment from '../../moment';
    import DatetimePicker from 'vue-persian-datetime-picker';

    export default {

        mixins : [mixin,moment] ,

        components : {
            datePicker : DatetimePicker
        } ,
        
        created() {
            this.Req_data({
                query : `
                    {

                        areas {
                            data {
                                id
                                name
                                streets {
                                id
                                name
                                }
                            }
                        }

                        estates( per_page : ${this.per_page} , page : 1 ) {
                            data {
                                id
                                code
                                title
                                photos {
                                    id
                                    file_name
                                    medium
                                }
                                address
                                area
                                rental_price
                                mortgage_price
                                sales_price
                                created_at
                                registrar_type {
                                    id
                                    display_name
                                    description
                                }
                                spec {
                                    id
                                    filters {
                                        id
                                        icon
                                        prefix
                                        postfix
                                        data {
                                            values {
                                                value
                                            }
                                        }
                                    }
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
                            }
                            total
                        }

                    }` ,
                props : [ 'areas' , 'estates' ] ,
                states : [ 'city_areas' , 'Estates' ] ,
            })
        } ,

        mounted() {
            $(document).ready(function() {
                $('.date-picker').find('input').attr( 'id', 'date-picker' );
            })
        } ,

        data() {
            return {

                bind_filters : {} ,

                area_select : [] ,
                street_select : '' ,

                assignments_select : '' ,
                estate_types_select : '' ,
                options_select : [] ,

                search : '' ,
                code_estate : '' ,
                owner : '' ,
                phone_owner : '' ,
                date : '' ,

                area : {
                    is_active : false ,
                    min : {
                        value : '' ,
                        active_defaults : true ,
                        defaults : [
                            { value : 0 , disabled : false } ,
                            { value : 50 , disabled : false } ,
                            { value : 75 , disabled : false } ,
                            { value : 100 , disabled : false } ,
                            { value : 125 , disabled : false } ,
                            { value : 150 , disabled : false } ,
                            { value : 175 , disabled : false } ,
                            { value : 200 , disabled : false } ,
                            { value : 250 , disabled : false } ,
                            { value : 300 , disabled : false } ,
                            { value : 400 , disabled : false } ,
                            { value : 500 , disabled : false } ,
                            { value : 600 , disabled : false } ,
                            { value : 700 , disabled : false } ,
                            { value : 800 , disabled : false } ,
                            { value : 900 , disabled : false } ,
                            { value : 1000 , disabled : false }
                        ]
                    } ,
                    max : {
                        value : '' ,
                        active_defaults : false ,
                        defaults : [
                            { value : 0 , disabled : false } ,
                            { value : 50 , disabled : false } ,
                            { value : 75 , disabled : false } ,
                            { value : 100 , disabled : false } ,
                            { value : 125 , disabled : false } ,
                            { value : 150 , disabled : false } ,
                            { value : 175 , disabled : false } ,
                            { value : 200 , disabled : false } ,
                            { value : 250 , disabled : false } ,
                            { value : 300 , disabled : false } ,
                            { value : 400 , disabled : false } ,
                            { value : 500 , disabled : false } ,
                            { value : 600 , disabled : false } ,
                            { value : 700 , disabled : false } ,
                            { value : 800 , disabled : false } ,
                            { value : 900 , disabled : false } ,
                            { value : 1000 , disabled : false }
                        ]
                    } ,
                    label : 'متراژ' ,
                    default_label : 'متراژ'
                } ,

                sales_price : {
                    is_active : false ,
                    min : {
                        value : '' ,
                        active_defaults : true ,
                        defaults : [
                            { value : 0 , disabled : false } ,
                            { value : 50000000 , disabled : false } ,
                            { value : 100000000 , disabled : false } ,
                            { value : 200000000 , disabled : false } ,
                            { value : 300000000 , disabled : false } ,
                            { value : 400000000 , disabled : false } ,
                            { value : 500000000 , disabled : false } ,
                            { value : 1000000000 , disabled : false } ,
                            { value : 2000000000 , disabled : false } ,
                            { value : 3000000000 , disabled : false } ,
                            { value : 4000000000 , disabled : false } ,
                            { value : 5000000000 , disabled : false }
                        ]
                    } ,
                    max : {
                        value : '' ,
                        active_defaults : false ,
                        defaults : [
                            { value : 0 , disabled : false } ,
                            { value : 50000000 , disabled : false } ,
                            { value : 100000000 , disabled : false } ,
                            { value : 200000000 , disabled : false } ,
                            { value : 300000000 , disabled : false } ,
                            { value : 400000000 , disabled : false } ,
                            { value : 500000000 , disabled : false } ,
                            { value : 1000000000 , disabled : false } ,
                            { value : 2000000000 , disabled : false } ,
                            { value : 3000000000 , disabled : false } ,
                            { value : 4000000000 , disabled : false } ,
                            { value : 5000000000 , disabled : false }
                        ]
                    } ,
                    label : 'قیمت ملک' ,
                    default_label : 'قیمت ملک'
                } ,
                
                mortgage_price : {
                    is_active : false ,
                    min : {
                        value : '' ,
                        active_defaults : true ,
                        defaults : [
                            { value : 0 , disabled : false } ,
                            { value : 50000000 , disabled : false } ,
                            { value : 100000000 , disabled : false } ,
                            { value : 200000000 , disabled : false } ,
                            { value : 300000000 , disabled : false } ,
                            { value : 400000000 , disabled : false } ,
                            { value : 500000000 , disabled : false } ,
                            { value : 1000000000 , disabled : false } ,
                            { value : 2000000000 , disabled : false } ,
                            { value : 3000000000 , disabled : false } ,
                            { value : 4000000000 , disabled : false } ,
                            { value : 5000000000 , disabled : false }
                        ]
                    } ,
                    max : {
                        value : '' ,
                        active_defaults : false ,
                        defaults : [
                            { value : 0 , disabled : false } ,
                            { value : 50000000 , disabled : false } ,
                            { value : 100000000 , disabled : false } ,
                            { value : 200000000 , disabled : false } ,
                            { value : 300000000 , disabled : false } ,
                            { value : 400000000 , disabled : false } ,
                            { value : 500000000 , disabled : false } ,
                            { value : 1000000000 , disabled : false } ,
                            { value : 2000000000 , disabled : false } ,
                            { value : 3000000000 , disabled : false } ,
                            { value : 4000000000 , disabled : false } ,
                            { value : 5000000000 , disabled : false }
                        ]
                    } ,
                    label : 'رهن' ,
                    default_label : 'رهن'
                } ,

                rental_price : {
                    is_active : false ,
                    min : {
                        value : '' ,
                        active_defaults : true ,
                        defaults : [
                            { value : 0 , disabled : false } ,
                            { value : 50000000 , disabled : false } ,
                            { value : 100000000 , disabled : false } ,
                            { value : 200000000 , disabled : false } ,
                            { value : 300000000 , disabled : false } ,
                            { value : 400000000 , disabled : false } ,
                            { value : 500000000 , disabled : false } ,
                            { value : 1000000000 , disabled : false } ,
                            { value : 2000000000 , disabled : false } ,
                            { value : 3000000000 , disabled : false } ,
                            { value : 4000000000 , disabled : false } ,
                            { value : 5000000000 , disabled : false }
                        ]
                    } ,
                    max : {
                        value : '' ,
                        active_defaults : false ,
                        defaults : [
                            { value : 0 , disabled : false } ,
                            { value : 50000000 , disabled : false } ,
                            { value : 100000000 , disabled : false } ,
                            { value : 200000000 , disabled : false } ,
                            { value : 300000000 , disabled : false } ,
                            { value : 400000000 , disabled : false } ,
                            { value : 500000000 , disabled : false } ,
                            { value : 1000000000 , disabled : false } ,
                            { value : 2000000000 , disabled : false } ,
                            { value : 3000000000 , disabled : false } ,
                            { value : 4000000000 , disabled : false } ,
                            { value : 5000000000 , disabled : false }
                        ]
                    } ,
                    label : 'اجاره' ,
                    default_label : 'اجاره'
                } ,

                page : 1 ,
                per_page : 15 ,

            }
        } ,

        computed : {

            ...mapState([
                'dynamic_filters' ,
                'estate_options' ,
                'city_areas' ,
                'area_streets' ,
                'assignments' ,
                'estate_types' ,
                'dialog_filters' ,
                'pagination'
            ]) ,

            total() {
                return Math.ceil(this.pagination.total/this.per_page)
            }

        } ,

        watch : {
            page(val) {
                this.Req_data({
                    query : `
                        {
                            estates( per_page : ${this.per_page} , page : ${val} ) {
                                data {
                                    id
                                    title
                                    photos {
                                        id
                                        file_name
                                        medium
                                    }
                                    address
                                    area
                                    rental_price
                                    mortgage_price
                                    sales_price
                                    created_at
                                    assignment {
                                        id
                                        title
                                        color
                                    }
                                    estate_type {
                                        id
                                        title
                                    }
                                }
                                total
                            }
                        }` ,
                    props : ['estates'] ,
                    states : ['Estates'] ,
                })
            } ,
        } ,

        methods : {

            ...mapMutations([
                'Req_data' ,
                'Set_state'
            ]) ,

            Apply_filters() {
                this.Req_data({
                    query : `
                        {
                            estates(
                                    page : 1 ,
                                    per_page : ${this.per_page} ,
                                    query : "${this.search}" ,
                                    code : "${this.code_estate}" ,
                                    landloard_fullname : "${this.owner}" ,
                                    landloard_phone_number : "${this.phone_owner}" ,
                                    created_at : "${this.date}" ,
                                    areas : [${this.area_select}] ,
                                    assignments : [${this.assignments_select}] ,
                                    estate_types : [${this.estate_types_select}] ,
                                    features : [${this.estate_options}] ,
                                    dynamic_filters : [${this.get_all_dynamic_filters()}] ,
                                    area : {
                                        min : "${this.area.min.value}" ,
                                        max : "${this.area.max.value}"
                                    } ,
                                    sales_price : {
                                        min : "${this.sales_price.min.value}" ,
                                        max : "${this.sales_price.max.value}"
                                    } ,
                                    mortgage_price : {
                                        min : "${this.mortgage_price.min.value}" ,
                                        max : "${this.mortgage_price.max.value}"
                                    } ,
                                    rental_price : {
                                        min : "${this.rental_price.min.value}" ,
                                        max : "${this.rental_price.max.value}"
                                    } ,
                                ) {
                                data {
                                    id
                                    code
                                    title
                                    photos {
                                        id
                                        file_name
                                        medium
                                    }
                                    address
                                    area
                                    rental_price
                                    mortgage_price
                                    sales_price
                                    created_at
                                    assignment {
                                        id
                                        title
                                        color
                                    }
                                    estate_type {
                                        id
                                        title
                                    }
                                }
                                total
                            }
                        }` ,
                    props : ['estates'] ,
                    states : ['Estates'] ,
                })
            } ,

            set_dynamic_filters() {
                this.Set_state({
                    prop : 'dynamic_filters' ,
                    val : {
                        spec : {
                            filters : []
                        }
                    }
                })
                this.Req_data({
                    query : `
                        {
                            estate_type( id : ${this.estate_types_select} ) {
                                id
                                title
                                spec {
                                    id
                                    title
                                    filters {
                                        id
                                        title
                                        defaults {
                                            id
                                            value
                                        }
                                    }
                                }
                            }
                        }` ,
                    props : ['estate_type'] ,
                    states : ['dynamic_filters'] ,
                    is_object : true
                })
            } ,

            set_streets() {
                let areas = []
                this.area_select.map( el => {
                    areas.push( _.find( this.city_areas , { id : el } ) );
                })
                this.Set_state({ prop : 'area_streets' , val : areas })
                console.log(areas);
            } ,

            display_ranges() {
                let obj = this.assignments.filter( el => el.id == this.assignments_select )[0]
                this.sales_price.is_active = obj.has_sales_price;
                this.mortgage_price.is_active = obj.has_mortgage_price;
                this.rental_price.is_active = obj.has_rental_price;
            } ,

            set_ranges( state , range , index , val ) {
                this[state][range].value = val
                if(range == 'min') {
                    this[state].max.defaults.map( el => el.disabled = false )
                    for( let i = index ; i >= 0 ; i-- ) {
                        this[state].max.defaults[i].disabled = true
                    }
                } else if(range == 'max') {
                    this[state].min.defaults.map( el => el.disabled = false )
                    for( let j = index ; j < this[state].min.defaults.length ; j++ ) {
                        this[state].min.defaults[j].disabled = true
                    }
                }
            } ,

            focus_min(state) {
                this[state].max.active_defaults = false;
                this[state].min.active_defaults = true;
            } ,

            focus_max(state) {
                this[state].min.active_defaults = false;
                this[state].max.active_defaults = true;
            } ,

            filter_range( state , label ) {

                let prices = [
                    this[state].min.value / 1000000 ,
                    this[state].max.value / 1000000
                ]
                
                if( !!prices[0] && !!prices[1] ) {
                    this[state].label = `${label} از ${prices[0].toLocaleString('fa-IR')} تا ${prices[1].toLocaleString('fa-IR')} میلیون تومان`;
                } else if( !!prices[0] ) {
                    this[state].label = `${label} از ${prices[0].toLocaleString('fa-IR')} میلیون تومان`;
                } else if( !!prices[1] ) {
                    this[state].label = `${label} تا ${prices[1].toLocaleString('fa-IR')} میلیون تومان`;
                }

            } ,

            filter_area() {

                let areas = [
                    this.area.min.value ,
                    this.area.max.value
                ]
                
                if( !!areas[0] && !!areas[1] ) {
                    this.area.label = `${this.area.default_label} از ${areas[0].toLocaleString('fa-IR')} تا ${areas[1].toLocaleString('fa-IR')} متر`;
                } else if( !!areas[0] ) {
                    this.area.label = `${this.area.default_label} از ${areas[0].toLocaleString('fa-IR')} متر`;
                } else if( !!areas[1] ) {
                    this.area.label = `${this.area.default_label} تا ${areas[1].toLocaleString('fa-IR')} متر`;
                }

            } ,

            Cansel(state) {
                this[state].label = this[state].default_label;
                this[state].min.value = '';
                this[state].min.defaults.map( el => el.disabled = false );
                this[state].max.value = ''; 
                this[state].max.defaults.map( el => el.disabled = false );
            } ,

            get_all_dynamic_filters() {
                let arr = []
                Object.keys(this.bind_filters).map( el => {
                    arr = arr.concat(this.bind_filters[el])
                })
                return arr
            }

        }

    }

</script>

<style>

    .el-select-group__title {
        padding-left: 0px !important;
        padding-right: 20px !important;
        text-align: right;
    }

    .date-picker input {
        cursor: pointer;
    }

    .el-select .el-tag__close.el-icon-close {
        right: unset !important;
        top: 1px !important;
        left: -5px !important;
    }

    .el-select .el-tag {
        margin-right: 7px;
    }

    .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
        right: unset !important;
        left: 10px !important;
    }

    /* Div Ranges In Modal Responsive */

    .ranges input {
        text-align: center
    }

    /*  Dialog Filters Styles  */

    .dialog_filters .el-input__inner {
        height: 50px;
        background: #f7f8fa;
        border: unset;
        border-radius: 7px;
    }

    .dialog_filters .btn-range {
        height: 50px;
        background: #f7f8fa;
        border: unset;
        border-radius: 7px;
    }

    .dialog_filters .btn-range {
        max-width: unset !important;
    }

    .dialog_filters .el-select {
        width: 100%;
    }

    /*  Div Default Prices  */

    .default-prices {
        overflow-y: auto;
        overflow-x: hidden !important;
        max-height: 200px;
        direction: rtl;
    }

    .default-prices .el-select .el-input__suffix {
        left: 15px;
        right: unset !important;
    }

    .default-prices .el-select .el-input .el-select__caret {
        color: #3b4144 !important;
    }

    .default-prices .v-list__tile {
        height: 30px !important;
        font-size: 13px !important;
    }

    .default-prices.input_min .v-list__tile__title {
        text-align: right !important
    }

    .default-prices .animated {
        -webkit-animation-duration: 0.3s !important;
        animation-duration : 0.3s !important;
    }

    /* Button Set Range */

    .btn-range {
        position: relative;
        padding-right: 15px !important;
        max-width: 215px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .btn-range i {
        position: absolute;
        left: 10px;
    }

    .btn-range span {
        color: #C0C4CC;
        /* font-size: 12px; */
    }

    /*  */

    .el-input--suffix .el-input__inner {
        padding-left: 30px !important;
        padding-right: 15px !important;
    }

    .el-select .el-input__suffix {
        left: 5px;
        right: unset !important;
    }


    .input-price {
        padding-bottom: 10px;
    }

    .el-select-dropdown__item {
        font-size: 13px;
    }

    .vs-con-input-label.is-label-placeholder {
        margin-top: 2px !important;
    }

    .input-price .el-input {
        width: 125px !important;
    }

    .input-price input {
        text-align: center !important;
    }

    .filter-bar .col-md-3 {
        text-align: center !important;
    }

    .el-select-dropdown__item {
        text-align: right;
    }

    .vs-input-primary .vs-input--input:focus {
        border: 1px solid #29B6F6 !important;
    }

    .vs-input-primary .vs-input--input:focus~.icon-inputx ,
    .vs-input-primary .vs-input--input:focus~.vs-placeholder-label {
        color: #222222;
    }

    .vs-input--input.hasIcon {
        padding-left: 32px;
        padding-right: 10px;
        text-align: right;
    }

    .vs-input--placeholder {
        text-align: right;
        padding-right: 10px;
    }

    .vs-con-input-label {
        width: auto !important;
    }

    .vs-input--input:focus+.vs-placeholder-label {
        /* transition: padding 200ms, 300ms transform 400; */
        transform: translate(-10px,-90%) !important;
    }

    .vs-input--input:focus+.vs-input--placeholder {
        top: 10px;
        background: #fff;
        width: fit-content;
        right: 0px;
        padding: 0px 7px !important;
    }

    .vs-input--input.hasValue+.vs-placeholder-label {
        padding-bottom: 1px !important
    }

    .vs-input--input:focus {
        box-shadow: unset !important;
    }

    .vs-con-input .material-icons {
        font-size: 19px !important;
        background: #29B6F6;
        padding: 5px 5px 5px 6px;
        border-radius: 10px;
        left: -10px;
        top: 4px;
        color: #fff !important;
        font-size: 17px;
        box-shadow: 0px 2px 10px -7px #000, 0px 4px 10px -5px #29B6F6;
    }

    .vs-switch--text .material-icons {
        font-size: .8rem !important
    }

    /* el-slider */

    .el-slider__runway {
        background-color: rgba(0,0,0,.1); 
    }
    
    .el-slider__bar {
        background-color: #29B6F6 !important;
    }

    .el-slider__button {
        border-color: #29B6F6 !important;
    }

    .black {
        color: #222222;
    }

    .el-select .el-input.is-focus .el-input__inner {
        border-color: #29B6F6;
    }

    .el-checkbox-button.is-checked .el-checkbox-button__inner {
        color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;
        z-index: 4;
    }

</style>

<style scoped>

    .as-px-4 {
        padding-right: 4rem !important;
        padding-left: 2.4rem !important;
    }

    .as-main-btn {
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        position: absolute;
        bottom: 50%;
        transform: translateY(50%);
        left: -30px;
        box-shadow: 0px -2px 20px -13px #000 !important;
        background: #29B6F6;
        border-color: #29B6F6;
        width: 70px;
        height: 65px;
        border-radius: 18px;
        cursor: pointer;
        transition: all 300ms linear 0s;
        -webkit-transition: all 300ms linear 0s;
        -o-transition: all 300ms linear 0s;
    }

    .as-main-btn i {
        transition: all 500ms;
    }

    .as-main-btn:hover i {
        transform: rotateY(180deg);
    }

    .hvr-ripple-out:before {
        border-color: #29B6F6 !important;
        border-radius: 22px;
    }


    .filter-bar {
        background: #ffffff;
        border-radius: 20px;
        position: relative;
        z-index: 1;
        box-shadow: 0px 10px 50px -35px;
        transform: translateY(-50%);
    }

</style>