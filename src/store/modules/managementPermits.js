import Api  from '../../api/index.js';

const state = {
    permitsList : {}  //通行证列表
};

const mutations = {
    // 通行证列表
    setPermitsList(state, payLoad) {
        state.permitsList = payLoad;
    }
};

const actions = {
    fetchPermitsList({ commit }, params) {
        Api.managementPermits(params)
            .then((response) =>{
                if(response && response.status === 200){
                    commit("setPermitsList", response);
                }else{

                }   
            })
            .catch(function (error) {
                
        });
    }
};

const getters = {};

export default {
  state,
  getters,
  actions,
  mutations
};