<template>
    <div class="parent_header_area"> 

        <header class="header_area">
            <div class="main_menu as-shadow">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <div class="container box_1620">

                        <!-- Brand and toggle get grouped for better mobile display -->
                        <router-link class="navbar-brand logo_h" to="/" v-if="Res">
                            <img src="http://maskanshow.com/ProductImage/44.png" style="filter: hue-rotate(175deg);transform: scale(.7);" alt="">
                        </router-link>

                        <div v-if="!Res">
                            <v-btn class="px-4" :color="web_color" dark round> ورود / ثبت نام </v-btn>
                        </div>

                        <div id="nav-icon3" :class="{ 'open' : drawer }" v-show="Res" @click="drawer = !drawer">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <!-- Collect the nav links, forms, and other content for toggling -->
                        <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                            <ul class="nav navbar-nav menu_nav ml-auto rtl pr-0">
                                <li class="nav-item" v-for="item in header_links" :key="item.title">
                                    <router-link class="nav-link" :to="item.link"> {{ item.title }} </router-link>
                                </li> 
                            </ul>
                        </div> 

                        <!-- Brand and toggle get grouped for better mobile display -->
                        <router-link class="navbar-brand logo_h" to="/" v-if="!Res">
                            <img src="http://maskanshow.com/ProductImage/44.png" style="filter: hue-rotate(175deg);transform: scale(.85);" alt="">
                        </router-link>

                    </div>
                </nav>
            </div>
        </header>

        <!-- Navigation Drawer -->
        <v-app>
            <v-navigation-drawer class="drawer-res" :dark="false" v-model="drawer" fixed temporary>

                <div class="p-2 text-center">
                    <img src="http://maskanshow.com/ProductImage/44.png" style="filter: hue-rotate(175deg);transform: scale(.85);" alt="">
                </div>

                <v-list dense>

                    <v-divider></v-divider>

                    <v-list-tile v-for="item in header_links" :key="item.title" @click="$router.push(item.link)">

                        <v-list-tile-content>
                            <v-list-tile-title class="text-right">{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <i :class="[ 'fs-20 mr-2 lnr' , item.icon ]"></i>
                        </v-list-tile-action>

                    </v-list-tile>

                </v-list>

                <div class="login-drawer">
                    <v-btn large :color="web_color" dark round> ورود / ثبت نام </v-btn>
                </div>

            </v-navigation-drawer>
        </v-app>

    </div>
</template>

<script>

    import mixin from '../../mixin';

    export default {

        mixins : [mixin] ,
    
        mounted() {
            $(document).ready(function() {

                var nav_offset_top = $('.header_area').height()+50; 
                function navbarFixed(){
                    if ( $('.header_area').length ){ 
                        $(window).scroll(function() {
                            var scroll = $(window).scrollTop();   
                            if (scroll >= nav_offset_top ) {
                                $(".header_area").addClass("navbar_fixed");
                            } else {
                                $(".header_area").removeClass("navbar_fixed");
                            }
                        });
                    };
                };
                navbarFixed();

            })
        } ,

        data() {
            return {
                drawer : false ,
                header_links : [
                    { title : 'خرید' , link : '/properties' , icon : 'lnr-home' } ,
                    { title : 'رهن و اجاره' , link : '/properties' , icon : 'lnr-apartment' } ,
                    { title : 'مشاوربن املاک' , link : '/team' , icon : 'lnr-users' } ,
                    { title : 'وبلاگ' , link : '/blog' , icon : 'lnr-book' } ,
                    { title : 'تماس باما' , link : '/contact' , icon : 'lnr-phone-handset' } ,
                ]
            }
        }

    }
</script>

<style scoped>

    .login-drawer {
        position: absolute;
        bottom: 5px;
        width: 100%;
        text-align: center;
    }

    #nav-icon3 {
        width: 30px;
        height: 35px;
        position: relative;
        /* margin: 50px auto; */
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: .5s ease-in-out;
        -moz-transition: .5s ease-in-out;
        -o-transition: .5s ease-in-out;
        transition: .5s ease-in-out;
        cursor: pointer;
    }

    #nav-icon3 span {
        display: block;
        position: absolute;
        height: 4px;
        width: 100%;
        background: navy;
        border-radius: 9px;
        opacity: 1;
        left: 0;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    }

    #nav-icon3 span:nth-child(1) {
        top: 7px;
    }

    #nav-icon3 span:nth-child(2),#nav-icon3 span:nth-child(3) {
        top: 15px;
    }

    #nav-icon3 span:nth-child(4) {
    top: 23.5px;
    }

    #nav-icon3.open span:nth-child(1) {
        top: 18px;
        width: 0%;
        left: 50%;
    }

    #nav-icon3.open span:nth-child(2) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    #nav-icon3.open span:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    #nav-icon3.open span:nth-child(4) {
        top: 18px;
        width: 0%;
        left: 50%;
    }


</style>
