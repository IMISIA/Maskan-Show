<template>
    <div>

        <transition name="fade" mode="in-out">
            <div class="as-loading" v-if="loading">
                <radar-spinner :animation-duration="2000" :size="130" :color="web_color" />
            </div>
        </transition>

        <as-header></as-header>

        <transition name="fade" mode="in-out">
            <router-view></router-view>
        </transition>

        <as-footer></as-footer>

        <vs-popup class="login-modal" title="ورود" :active.sync="$store.state.login_modal">
                <v-form v-model="valid_login">
                    <div class="register rtl p-4 pb-2">

                        <div>
                            <h6 class="rtl bold required"> ایمیل یا نام کاربری </h6>
                            <v-text-field
                                class="small-text-field"
                                v-model="login.email"
                                label="ایمیل یا نام کاربری خود را  وارد کنید"
                                reverse
                                outline
                                single-line
                                :rules="[rules.required]"
                            ></v-text-field>
                        </div>

                        <div>
                            <h6 class="rtl bold required"> رمز عبور </h6>
                            <v-text-field
                                class="small-text-field"
                                v-model="login.password.value"
                                label="رمز عبور را وارد کنید"
                                reverse
                                outline
                                single-line
                                :prepend-inner-icon="login.password.show ? 'visibility' : 'visibility_off'"
                                :type="login.password.show ? 'text' : 'password'"
                                @click:prepend-inner="login.password.show = !login.password.show"
                                :rules="[rules.required]"
                            ></v-text-field>
                        </div>

                        <v-btn class="text-white"
                            :color="web_color"
                            :disabled=" !valid_login || login.loading "
                            :loading="login.loading"
                            block
                            round
                            @click="user_login">
                            ورود
                        </v-btn>

                        <div class="text-center mt-3">
                            <span class="fs-12"> کاربر جدید هستید؟ </span>
                            <el-link class="fs-12 mr-1" type="primary"
                                @click="change_modal">
                                ثبت نام
                            </el-link>
                        </div>

                    </div>
                </v-form>
        </vs-popup>

        <vs-popup title="ثبت نام" :active.sync="$store.state.register_modal">
            <v-stepper v-model="stepper">

                <v-stepper-header class="rtl">
                    
                    <v-stepper-step :complete="valid_steps.step_1" step="1"
                        :color=" valid_steps.step_1 ? '#00E676' : web_color "> مشخصات فردی </v-stepper-step>

                    <transition name="fade" mode="out-in">
                        <v-divider v-if="is_consultant"></v-divider>
                    </transition>

                    <transition name="fade" mode="out-in">
                        <template v-if="is_consultant">
                            <v-stepper-step :complete="valid_steps.step_2" step="2"
                                :color=" valid_steps.step_2 ? '#00E676' : web_color "> مشخصات املاک </v-stepper-step>
                        </template>
                    </transition>

                </v-stepper-header>

                <v-stepper-items>

                    <v-stepper-content step="1">

                        <v-checkbox class="checkbox" :color="web_color" v-model="is_consultant" label="مشاور املاک هستم"></v-checkbox>

                        <v-form v-model="valid_steps.step_1">

                            <div class="row rtl register">

                                <div class="col-sm-6">
                                    <h6 class="rtl bold required"> نام کاربری </h6>
                                    <v-text-field
                                        class="small-text-field"
                                        v-model="register.username"
                                        label=" برای مثال imisia"
                                        reverse
                                        outline
                                        single-line
                                        :rules="[rules.required]"
                                    ></v-text-field>
                                </div>

                                <div class="col-sm-6">
                                    <h6 class="rtl bold required"> تلفن تماس </h6>
                                    <v-text-field
                                        class="small-text-field"
                                        v-model="register.phone_number"
                                        label="شماره تماس خود را وارد کنید"
                                        reverse
                                        outline
                                        single-line
                                        type="number"
                                        :rules="[rules.required]"
                                    ></v-text-field>
                                </div>

                                <div class="col-sm-6">
                                    <h6 class="rtl bold required"> نام </h6>
                                    <v-text-field
                                        class="small-text-field"
                                        v-model="register.first_name"
                                        label="نام خود را وارد کنید"
                                        reverse
                                        outline
                                        single-line
                                        :rules="[rules.required]"
                                    ></v-text-field>
                                </div>

                                <div class="col-sm-6">
                                    <h6 class="rtl bold required"> نام خانوادگی </h6>
                                    <v-text-field
                                        class="small-text-field"
                                        v-model="register.last_name"
                                        label="نام خانوادگی خود را وارد کنید"
                                        reverse
                                        outline
                                        single-line
                                        :rules="[rules.required]"
                                    ></v-text-field>
                                </div>

                                <div class="col-sm-12">
                                    <h6 class="rtl bold required"> پست الکترونیک </h6>
                                    <v-text-field
                                        class="small-text-field"
                                        v-model="register.email"
                                        label="ایمیل خود را وارد کنید"
                                        reverse
                                        outline
                                        single-line
                                        type="email"
                                        :rules="[rules.required,rules.email]"
                                    ></v-text-field>
                                </div>

                                <div class="col-sm-6">
                                    <h6 class="rtl bold required"> رمز عبور </h6>
                                    <v-text-field
                                        class="small-text-field"
                                        v-model="register.password.value"
                                        label="رمز عبور را وارد کنید"
                                        reverse
                                        outline
                                        single-line
                                        :prepend-inner-icon="register.password.show ? 'visibility' : 'visibility_off'"
                                        :type="register.password.show ? 'text' : 'password'"
                                        @click:prepend-inner="register.password.show = !register.password.show"
                                        :rules="[rules.required]"
                                    ></v-text-field>
                                </div>

                                <div class="col-sm-6">
                                    <h6 class="rtl bold required"> تکرار رمز عبور </h6>
                                    <v-text-field
                                        class="small-text-field"
                                        v-model="register.confirm_password.value"
                                        label="رمز عبور خود را تکرار کنید"
                                        reverse
                                        outline
                                        single-line
                                        type="password"
                                        :rules="[rules.required,match_pass]"
                                    ></v-text-field>
                                </div>

                            </div>

                            <transition name="fade" mode="out-in">
                                <v-btn class="text-white" color="#00E676" v-if="!is_consultant" :loading="register.loading"
                                    :disabled="!valid_steps.step_1 || register.loading" @click="user_register"> ثبت نام </v-btn>
                                <v-btn color="info" v-if="is_consultant"
                                    :disabled="!valid_steps.step_1" @click="stepper = 2"> بعدی </v-btn>
                            </transition>

                        </v-form>

                    </v-stepper-content>

                    <v-stepper-content step="2" v-if="is_consultant">
                        <v-form v-model="valid_steps.step_2">

                            <div class="row rtl register">

                                <div class="col-sm-6">
                                    <h6 class="rtl bold required"> نام املاک </h6>
                                    <v-text-field
                                        class="small-text-field"
                                        v-model="register.estate_info.name"
                                        label="نام املاک خود را وارد کنید"
                                        reverse
                                        outline
                                        single-line
                                        :rules="[rules.required]"
                                    ></v-text-field>
                                </div>

                                <div class="col-sm-6">
                                    <h6 class="rtl bold"> شماره تلفن املاک </h6>
                                    <v-text-field
                                        class="small-text-field"
                                        v-model="register.estate_info.phone_number"
                                        label="شماره تماس املاک را وارد کنید"
                                        reverse
                                        type="number"
                                        outline
                                        single-line
                                    ></v-text-field>
                                </div>

                                <div class="col-sm-6 mb-4">
                                    <h6 class="rtl bold required"> منطقه </h6>
                                    <el-select class="w-100" v-model="register.estate_info.area" placeholder="منطقه">
                                        <el-option v-for="item in city_areas" :key="item.id" :label="item.name" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>

                                <div class="col-sm-6">
                                    <h6 class="rtl bold required"> نام کاربری ملک </h6>
                                    <v-text-field
                                        class="small-text-field"
                                        v-model="register.estate_info.username"
                                        label="نام املاک خود را وارد کنید"
                                        :hint="`لینک صفحه شما : 
                                        www.MaskanShow.ir/<b>${register.estate_info.username}</b>`"
                                        persistent-hint
                                        reverse
                                        outline
                                        single-line
                                        :rules="[rules.required]"
                                    ></v-text-field>
                                </div>

                                <div class="col-md-12">
                                    <h6 class="rtl bold required"> آدرس </h6>
                                    <v-textarea
                                        v-model="register.estate_info.address"
                                        label="آدرس خود را  وارد کنید "
                                        outline
                                        reverse
                                        :rows="3"
                                        name="input-7-4"
                                        :rules="[rules.required]"
                                    ></v-textarea>
                                </div>

                                <div class="col-md-12">
                                    <h6 class="rtl bold"> توضیحات </h6>
                                    <v-textarea
                                        v-model="register.estate_info.description"
                                        label="توضیحات خود را  وارد کنید "
                                        outline
                                        reverse
                                        :rows="1"
                                        name="input-7-4"
                                    ></v-textarea>
                                </div>

                            </div>

                            <v-btn class="text-white" color="#00E676" :loading="register.loading"
                                :disabled="!valid_steps.step_2 || register.loading" @click="user_register"> ثبت نام </v-btn>
                            <v-btn @click="stepper = 1"> قبلی </v-btn>

                            <v-text-field
                                class="small-text-field w-50 d-inline-block"
                                v-model="register.estate_info.reagent_code"
                                label="کد معرف  دارید ؟"
                                reverse
                                hide-details
                                outline
                                single-line
                            ></v-text-field>

                        </v-form>
                    </v-stepper-content>

                </v-stepper-items>

            </v-stepper>
        </vs-popup>

        <div id="back-to-top">
            <v-btn :color="web_color" fab dark @click="back_to_top">
                <v-icon>expand_less</v-icon>
            </v-btn>
        </div>

    </div>
</template>

<script>

    import mixin from '../mixin';
    import {
        mapState ,
        mapMutations
    } from 'vuex';

    export default {

        mixins: [mixin] ,

        created() {

            var $vm = this
            window.onscroll = function () {
                if ( document.documentElement.scrollTop > 150 ) {
                    $vm.btn_scroll = true;
                } else {
                    $vm.btn_scroll = false;
                }
            };

            this.App();
        } ,

        data() {
            return {

                btn_scroll : false ,
                stepper : 1 ,

                valid_login : false ,
                valid_steps : {
                    step_1 : false ,
                    step_2 : false
                } ,

                is_consultant : false ,

                login : {
                    email : 'imisia99@owner.com' ,
                    password : {
                        value : '123456' ,
                        show : false
                    } ,
                    loading : false
                } ,

                register : {
                    username : 'aaaaa' ,
                    first_name : '2' ,
                    last_name : '2' ,
                    email : 'aaa@aaa.com' ,
                    password : {
                        show : false ,
                        value : '2' ,
                    } ,
                    confirm_password : {
                        show : false ,
                        value : '2' ,
                    } ,
                    phone_number : '09154188517' ,
                    estate_info : {
                        name : 'a' ,
                        phone_number : '09154188517' ,
                        reagent_code : '' ,
                        username : 'aaaaa' ,    
                        area : '' ,
                        address : 'asdf' ,
                        description : 'asd'
                    } ,
                    loading : false
                } ,

                rules : {
                    required: value => !!value || 'این فیلد الزامی است',
                    counter: value => value.length <= 20 || 'Max 20 characters',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'پست الکترونیک نامعتبر است'
                    }
                }

            }
        } ,

        computed: {
            
            ...mapState([
                'loading',
                'register_modal' ,
                'city_areas' ,
                'Auth' ,
                'req_url'
            ]) ,

            match_pass() {
                if(this.register.password.value) {
                    return v => (!!v && v) === this.register.password.value || 'رمز عبور با تاییدیه آن مطابقت ندارد'
                } else {
                    return true
                }
            }
            
        } ,

        watch : {
            btn_scroll(val) {
                val ? this.anime_btn(true) : this.anime_btn(false)
            }
        } ,

        methods: {

            ...mapMutations([
                'Req_data' ,
                'Set_state'
            ]) ,

            App() {

                let props = [ 'siteSetting' , 'assignments', 'estate_types' , 'offices' ]

                let me_query = `
                    me {
                        id
                        username
                        first_name
                        last_name
                        full_name
                        email
                        remaining_hits_count
                        validity_end_at
                        visited_estate_count
                    }        
                `

                let query = `
                    {
                        ${ this.Auth ? me_query : '' }

                        siteSetting {
                            title
                            description
                            phone
                            address
                            banner_link
                            banner {
                                id
                                file_name
                                large
                            }
                            header_banner {
                                id
                                file_name
                                large
                            }
                            theme_color
                            is_enabled
                            opinions {
                                avatar {
                                    id
                                    file_name
                                    thumb
                                }
                                fullname
                                post
                                opinion
                            }
                            posters {
                                title
                                description
                                link
                                image {
                                    id
                                    file_name
                                    large
                                }
                            }
                        }

                        assignments {
                            data {
                                id
                                title
                                description
                                has_sales_price
                                has_rental_price
                                has_mortgage_price
                            }
                        }

                        estate_types {
                            data {
                                id
                                title
                                description
                                icon
                            }
                        }

                        offices {
                            data {
                                id
                                name
                                username
                                owner {
                                    id
                                    first_name
                                    last_name
                                    full_name
                                    avatar {
                                        id
                                        file_name
                                        small
                                    }
                                }
                            }
                        }

                    }
                `

                if(this.Auth) props.unshift('me')

                this.Req_data({
                    query: query ,
                    props: props ,
                    states: props
                })
                this.Dynamic_Color()

            } ,

            Dynamic_Color() {

                // Web Color
                var style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = `

                    /* =============== Colors =============== */

                    .web-color {
                        color : ${this.web_color} !important;
                    }

                    .web-color-light {
                        color : ${this.web_color_light} !important;
                    }

                    .web-color-dark {
                        color : ${this.web_color_dark} !important;
                    }

                    .web-color-fade {
                        color : ${this.web_color_fade} !important;
                    }

                    /* =============== Backgrounds =============== */

                    .web-bg {
                        background: ${this.web_color} !important;
                    }

                    .web-bg-light {
                        background: ${this.web_color_light} !important;
                    }

                    .web-bg-dark {
                        background: ${this.web_color_dark} !important;
                    }

                    .web-bg-fade {
                        background: ${this.web_color_fade} !important;
                    }

                    .web-bg-ultra-fade {
                        background: ${this.web_color_ultra_fade} !important;
                    }

                    /* =============== Gradients =============== */

                    .web-grd-to-light {
                        background: -webkit-linear-gradient(90deg, ${this.web_color_light} 10%, ${this.web_color} 90%) !important;
                        background: -moz-linear-gradient(90deg, ${this.web_color_light} 10%, ${this.web_color} 90%) !important;
                        background: -o-linear-gradient(90deg, ${this.web_color_light} 10%, ${this.web_color} 90%) !important;
                        background: linear-gradient(90deg, ${this.web_color_light} 10%, ${this.web_color} 90%) !important;
                    }

                    .web-grd-form-dark {
                        background: -webkit-linear-gradient(90deg, ${this.web_color} 10%, ${this.web_color_dark} 90%) !important;
                        background: -moz-linear-gradient(90deg, ${this.web_color} 10%, ${this.web_color_dark} 90%) !important;
                        background: -o-linear-gradient(90deg, ${this.web_color} 10%, ${this.web_color_dark} 90%) !important;
                        background: linear-gradient(90deg, ${this.web_color} 10%, ${this.web_color_dark} 90%) !important;
                    }

                    /* =============== Borders =============== */

                    .web-border {
                        border : 1px solid ${this.web_color} !important;
                    }

                    /* =============== Other =============== */

                    .comming-soon {
                        background: ${this.web_color};
                    }

                    .items:hover {
                        background: ${this.web_color} !important;
                    }

                    .items:hover .comming-soon {
                        color: ${this.web_color} !important;
                    }

                    .feature_item:hover {
                        background: ${this.web_color} !important;
                        color: #fff;
                    }

                `;
                document.getElementsByTagName('head')[0].appendChild(style);

            } ,

            change_modal() {
                this.Set_state({ prop : 'login_modal' , val : false })
                setTimeout(() => {
                    this.Set_state({ prop : 'register_modal' , val : true })
                }, 300);
            } ,

            user_register() {

                this.register.loading = true;

                let query_consultant = `
                    office_name : "${this.register.estate_info.name}" ,
                    office_phone_number : "${this.register.estate_info.phone_number}" ,
                    ${ !!this.register.estate_info.area ? `office_area_id : ${this.register.estate_info.area} ,` : '' }
                    office_username : "${this.register.estate_info.username}" ,
                    office_address : "${this.register.estate_info.address}" ,
                    office_description : "${this.register.estate_info.description}" ,
                    reagent_code : "${this.register.estate_info.reagent_code}" ,
                `

                axios({
                    method : 'POST' ,
                    url : this.req_url ,
                    data : {
                        query : `
                            mutation {
                                ${ this.is_consultant ? 'registerConsultant' : 'register' } (
                                    username : "${this.register.username}" ,
                                    phone_number : "${this.register.phone_number}" ,
                                    first_name : "${this.register.first_name}" ,
                                    last_name : "${this.register.last_name}" ,
                                    email : "${this.register.email}" ,
                                    password : "${this.register.password.value}" ,
                                    password_confirmation : "${this.register.confirm_password.value}" ,
                                    ${ this.is_consultant ? query_consultant : '' }
                                ) {
                                    id
                                    token
                                    system_authentication_code
                                }
                            }                            
                        `
                    }
                })
                .then( ({data}) => {
                    if( this.is_exist(data) &&
                        this.is_exist(data.data) &&
                        ( this.is_exist(data.data.register) || this.is_exist(data.data.registerConsultant) ) &&
                        ( this.is_exist(data.data.register.token) || this.is_exist(data.data.registerConsultant.token) )
                    ) {
                        window.localStorage.setItem( 'JWT' , data.data.register.token );
                        window.localStorage.setItem( 'SAC' , data.data.register.system_authentication_code );
                        location.reload();
                    } else if(
                        this.is_exist(data) &&
                        this.is_exist(data.errors) &&
                        this.is_exist(data.errors[0].validation)
                    ) {
                        Object.keys(data.errors[0].validation).map( el => {
                            this.notif( data.errors[0].validation[el].join(' ، ') , 'warning' , 'error' , 5000 )
                        })
                        this.register.loading = false;
                    }
                })
                .catch( Err => {
                    window.localStorage.removeItem('JWT');
                    location.reload();
                    console.log(Err);
                })

            } ,

            user_login() {

                this.login.loading = true;

                axios({
                    method : 'POST' ,
                    url : this.req_url ,
                    data : {
                        query : `
                            mutation {
                                login
                                (
                                    email : "${this.login.email}" ,
                                    password : "${this.login.password.value}"
                                )
                                {
                                    token
                                    
                                }
                            }                            
                        `
                    } ,
                    headers : {
                        'SystemAuthenticationCode' : localStorage.getItem('SAC') ,
                    }
                })
                .then( ({data}) => {
                    if( this.is_exist(data) &&
                        this.is_exist(data.data) &&
                        this.is_exist(data.data.login) &&
                        this.is_exist(data.data.login.token) &&
                        this.is_exist(data.data.login.system_authentication_code)
                    ) {
                        window.localStorage.setItem( 'JWT' , data.data.login.token );
                        window.localStorage.setItem( 'SAC' , data.data.login.system_authentication_code );
                        location.reload();
                    } else if(data.status == 403) {
                        let message = `
                            این حساب بر روی دستگاه شما قابل دسترس نیست ،
                             در صورتی که این حساب متعلق به شماست برای فعال کردن آن با پشتیبانی سایت در ارتباط باشید
                        `
                        this.notif( message , 'warning' , 'error' , 20000 )
                    } else {
                        this.notif( 'نام کاربری یا رمز عبور اشتباه است' , 'warning' , 'error' )
                        this.login.loading = false;
                    }
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

            back_to_top() {
                this.$vuetify.goTo( 0 , {
                    duration : 1000 ,
                })
            } ,

            anime_btn(enter) {
                anime({
                    targets : '#back-to-top' ,
                    translateX: enter ? -100 : 100 ,
                    duration : 500 ,
                    easing: 'easeInOutBack'
                })
            } ,

        }

    }

</script>

<style>

    #back-to-top {
        z-index: 999999;
        position: fixed;
        bottom: 20px;
        right: -80px;
    }

    #back-to-top .v-btn--floating {
        height: 50px !important;
        width: 50px !important;
    }

    .el-link.el-link--primary {
        color: #409EFF !important;
    }

    .login-modal .vs-popup {
        width: 380px !important;
        text-align: right;
    }

    .con-vs-popup {
        z-index: 1000 !important;
    }

    .v-stepper__step__step {
        margin-right: 0px !important;
        margin-left: 8px;
    }

    .v-textarea label {
        right: 15px !important;
    }

    .v-text-field .v-input__prepend-inner {
        margin: auto !important;
    }

    .v-text-field .v-input__prepend-inner i {
        font-size: 20px !important;
    }

    .v-input__slot {
        margin-bottom: 3px !important;
    }

    .v-messages__message {
        font-size: 10px;
    }

    .v-text-field.v-text-field--enclosed .v-text-field__details {
        min-height: 20px !important;
    }

    .v-stepper , .v-stepper__header {
        box-shadow: unset !important;
    }
    
    .register h6 {
        text-align: right;
        color: #484848;
        padding-right: 5px;
    }

    .register h6.required:after {
        color: #ff0000 !important;
        /* content: ' / اجباری ';
        font-size: 10px; */
        content: '*';
        font-size: 15px;
    }

    .register .el-input__inner {
        border: 1px solid rgba(0,0,0,0.54);
        height: 45px !important;
    }

    .register .el-input__inner::placeholder {
        color: rgba(0,0,0,0.54);
    }

    .v-input input {
        font-size: 14px;
        margin: auto !important;
    }

    .v-text-field .v-label {
        font-size: 13px;
        margin: 0px !important;
        top: 11px;
    }

    .small-text-field.v-text-field--outline > .v-input__control > .v-input__slot {
        min-height: 45px !important;    
        max-height: 45px !important;    
    }

    .v-input__slot {
        border: 1px solid !important;
    }

    .checkbox {
        direction: rtl !important;
        margin: 0px !important;
    }    

    .checkbox .v-input__slot {
        border: unset !important;
    }

    .checkbox label {
        color: #484848 !important;
        margin: 0px !important;
    }

    .checkbox .v-input--selection-controls__input {
        margin-right: 0px !important;
        margin-left: 10px !important;
    }

    .vs-popup--title h3 {
        text-align: center;
        font-weight: bold;
        margin: 5px;
    }

    .as-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        z-index: 9999999999;
        height: 100%;
        width: 100%;
        background: #fffffff0;
        top: 0px;
        bottom: 0;
        right: 0;
        left: 0;
    }

    .v-navigation-drawer {
        z-index: 2000;
    }

    .v-overlay {
        z-index: 1000;
    }

    .site-drawer .v-list__tile__title {
        font-size: 12px;
        transform: scaleX(-1);
        text-align: right;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 180px;
        direction: rtl;

    }

    .site-drawer .v-list {
        transform: scaleX(-1);
    }

    .site-drawer .material-icons {
        transform: scaleX(-1);
    }

    .vs-notifications p {
        font-size: 12px !important;
    }

</style>
