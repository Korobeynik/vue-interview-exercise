import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tvShows: []
    },
    mutations: {
        setTvShows(state, content) {
            state.tvShows = content
        }
    },
    actions: {
        getTvShows: async (context, state) => {
            let query = state;
            await axios
                .get(`http://api.tvmaze.com/search/shows?q=${query}`)
                .then(resp => {
                    console.log(resp.data);
                    const content = resp.data;
                    context.commit('setTvShows', content);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    getters: {
        tvShows: state => {
            return state.tvShows
        }
    }
})
