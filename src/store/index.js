import Vue from 'vue';
import Vuex from 'vuex';
import managementPermits from "./modules/managementPermits";
Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        token: '',
        userName: '',
        NewMsg:{
            Msgs:[
                {
                    title:'暂无消息',
                    content:'暂无消息！',
                    url:'#no_msg',
                    id:'no_msg'
                }
            ]
        },
    },
    mutations:{
        modifyMsg (state,Obj){
            // if(state.NewMsg.Msgs[0].id === 'no_msg'){
            //     state.NewMsg.Msgs.shift();
            // }
            // var obj = {
            //     title:Obj.title,
            //     content:Obj.content
            // };
            // obj.id = 'Msg_' + Obj.id;
            // obj.url = '#' + obj.id;
            // state.NewMsg.Msgs.push(obj);
        },
        setToken (state,Obj){
            // state.
        },
        SETUSER (state, payload ){
            console.log('payload',payload)
            state.userName = payload;
        }
    },
    actions:{
        setUser(context, payload ){
            context.commit( 'SETUSER', payload );
        },
        fetchMsg (context){
            // $.ajax({
            //         url:'PHP/GetMsgs.php',
            //         type:'GET',
            //         data:{},
            //         dataType:'json',

            //         success:function(response){
            //             if ( typeof response === 'string') {
            //                 response = JSON.parse(response);
            //             }
            //             console.log(response);
            //             $(response).each(function(k,v){
            //                 // console.log(v.id+v.title+v.content);
            //                 context.commit('modifyMsg',v);
            //             });
            //         }
            //     });
        }
    },
    modules: {
        managementPermits,  //通行证审批
    }
});
export default store;