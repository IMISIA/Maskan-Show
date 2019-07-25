import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    
    state : {

        loading : true ,

        dialog_filters : false ,

        register_modal : false ,
        login_modal : false ,

        Auth : !!window.localStorage.getItem('JWT') ,
        url : 'http://192.168.1.219' ,
        req_url : !!window.localStorage.getItem('JWT') ? 'http://192.168.1.219/graphql/auth' : 'http://192.168.1.219/graphql' ,
        
        // User Information
        me : {} ,

        office : {} ,

        // ========== Filters States ========== //
        city_areas : [] ,
        area_streets : [] ,

        // provinces : [] ,
        // cities : [] ,
        
        assignments : [] ,
        estate_types : [] ,

        dynamic_filters : {
            spec : {
                filters : []
            }
        } ,

        estate_options : [] ,
        // ========== End Of Filters States ========== //

        Estates : [] ,
        Single_estate : {} ,

        pagination : {
            total : ''
        } ,

        // ========== Articles States ========== //
        articles : [
            {
                id : '' ,
                title : '' ,
                description : '' ,
                image : {
                    meduim : ''
                } ,
                writer : {
                    id : '' ,
                    fullname : ''
                } ,
                // created_at : '' ,
                reading_time : '' ,
                comments : [] ,
                subjects : []
            }
        ] ,

        last_articles : [] ,

        subjects : [] ,

        single_article : {
            id : '' ,
            title : '' ,
            description : '' ,
            body : '' ,
            image : {
                big : ''
            } ,
            reading_time : '' ,
            created_at : ' ' ,
            subjects : [{
                id : '' ,
                title : '' ,
            }] ,
            tags : [{
                name : ''
            }] ,
            writer : {
                id : '' ,
                full_name : '' ,
                avatar : {
                    small : ''
                } ,
                social_links : [{
                    type : '' ,
                    value : ''
                }]
            } ,
            comments : [{
                id : '' ,
                title : '' ,
                message : '' ,
                writer : { full_name : '' } ,
                votes : {
                    likes : '' ,
                    dislikes : ''
                }
            }] ,
            questions: [{
                id : '' ,
                title : '' ,
                message : '' ,
                writer : { full_name : '' } ,
                votes : {
                    likes : '' ,
                    dislikes : ''
                }
            }]
        } ,
        // ========== End Of Articles States ========== //

    } ,

    mutations : {

        Set_state( state , data ) {
            state[data.prop] = data.val
        } ,

        Set_obj( state , data ) {
            state[data.prop] = { ...state[data.prop] , ...data.val }
        } ,

        // Query - Props - States
        Req_data( state , obj ) {

            state.loading = true

            axios({
                method : 'POST' ,
                url : state.req_url ,
                data : {
                    query : obj.query
                }
            })
            .then( ({data}) => {
                console.log(data);
                if( !!data.errors ) {
                    console.log(data.errors);
                    data.errors.forEach( Err => console.error(Err.message) )
                } else {
                    obj.props.forEach( ( el , index ) => {
                        if( obj.is_object ) {
                            state[obj.states[index]] = Object.assign( state[obj.states[index]] , (data.data[el].data ? data.data[el].data : data.data[el]) );
                        } else {
                            state[obj.states[index]] = data.data[el].data ? data.data[el].data : data.data[el]
                        }
    
                        if( data.data[el].total ) {
                            state.pagination.total = data.data[el].total
                        }
    
                    });
                }
            })
            .then( () => {
                setTimeout(() => {
                    state.loading = false
                }, 500);
            })
            .catch( Err => {
                if( Err.response && Err.response.status === 401 ) {
                    window.localStorage.removeItem('JWT');
                    location.reload();
                } else {
                    console.error(Err);
                }
            })

        } ,

    }

});

export default store;