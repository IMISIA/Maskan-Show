var Color = require('color');

export default {

    created() {

        this.window.width = window.innerWidth;

        this.$nextTick(() => {
            window.addEventListener('resize', () => {
                this.window.width = window.innerWidth;
            });
        })

    } ,

    data() {
        return {
            
            web_color : '#29B6F6' ,

            window: {
                width: 0
            }

        }
    } ,

    computed : {

        Res() {
            return this.window.width < 770 ? true : false;
        } ,

        isLight() {
            return Color(this.web_color).isLight();
        } ,

        web_color_light() {
            return Color(this.web_color).lighten(0.4).rotate(10).rgb().string();
        } ,

        web_color_dark() {
            return Color(this.web_color).darken(0.2).rgb().string();
        } ,

        web_color_fade() {
            return Color(this.web_color).fade(0.4).rgb().string();
        } ,

        web_color_ultra_fade() {
            return Color(this.web_color).fade(0.97).rgb().string();
        } ,

    } ,

    filters : {

        num_to_fa(val){
            return val ? val.toLocaleString('fa-IR') : 0 ;
        }

    } ,

    methods: {

        is_exist(val) {
            return !(_.isEmpty(val))
        } ,

        notif( msg , color ,  icon )  {
            this.$vs.notify({
                text: `${msg}` ,
                color: color ,
                icon: icon ,
                position: 'bottom-left',
                time: 3000
            })
        } ,

        random( min , max , floating = false ) {
            return _.random( min , max , floating );
        }

    } ,


}