<template>
    <div>
        <div class="widget-header mb-4 d-flex align-items-center justify-content-between">
            <h1 class="text-light font24 m-0">Top Movies</h1>
            <button class="custom-button"><img @click="reload" class="refresh" :src="require('@/assets/reload.png')"></button>
        </div>
        <router-link class="pr-widget" :to="{ name:'movie', params:{ id: item.id }}" v-for="item in dividedMovies" >
            <div class="bg-grey mt-4 d-flex justify-content-between">
                <div class="d-flex align-items-start ">
                    <img :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`" class="img-fluid w-30">
                    <div class="ms-2 mt-2 sideInfo">                        
                        <p class="font-weight-bold m-0 text-light"> {{ item.title }}</p>
                        <small class="text-light d-block">
                            <span>Year:</span>
                            <strong>{{ item.release_date }}</strong>
                        </small>
                        <small class="text-light d-block">
                            <span>Total votes:</span>
                            <strong>{{item.vote_count}}</strong>
                        </small>
                    </div>
                </div>
                <div class="d-flex align-items-end text-light m-2">
                    <span class="circle font-weight-bold">{{ item.vote_average }}</span>
                </div>      
            </div>
        </router-link>
    </div>
</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex';
import { mapGetters } from 'vuex';
export default {
    name: 'topMovies',

    components: {
        useStore,
        mapGetters},

    data() {  
        return {
            topMovies:[],
            dividedMovies : [],
            topPage : 1,
        }
    },

    computed: {
        ...mapGetters(['getLang']),
    },

    mounted(){
        this.fetchData()
    },

    watch: {
        $route() {
            this.fetchData()
        },

        getLang() {
            this.fetchData();
        }, 
    },
    
    methods : {
        divideMovies() { 
            this.dividedMovies = []
            this.topMovies.results.forEach(element => {
                this.dividedMovies.length < 10 ? this.dividedMovies.push(element) :[]
            });
        },

        fetchData(){ 
            axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=a348e7136197bd5186dd097b93931f79&language=${this.getLang}&page=${this.topPage}`)
            .then(response => {
                this.topMovies = response.data;
                this.divideMovies()
            })
            .catch(error => {
            console.log(error);
            })
        }, 

        reload() {
            this.topPage += 1;
            console.log(this.topPage)
            this.fetchData()
        }
    }
}

</script>


<style>
.pr-widget {
    transition: all .3s ease;
} 

.pr-widget :hover{
    transition: all .4s ease;
    transform: scale(1.02);
} 

.font24{
    font-size: 24px !important;
}

.bg-grey {
    background-color: #242526;
}

.circle {
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fe7900 !important;
    border-radius: 50%!important;
}

.refresh {
    width: 20px;
}

.custom-button {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
}
</style>