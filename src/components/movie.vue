<template>
    <navbar></navbar>   
    <navpanel></navpanel>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12 col-md-8">
                <div class="row">
                    <div class="col-8 col-md-4">
                        <img class="img-responsive" :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie?.poster_path}`">
                    </div>
                    <div class="col-12 col-md-8">
                        <div class="list-group size14">
                            <div class="list-group-item pr-layer-widget text-light">
                                <span >Title: </span>
                                <strong> {{movie.title }}</strong>
                            </div>
                            <div class="list-group-item bg-transparent text-white">
                                <span>Original name: </span>
                                <strong>{{ movie.original_title }}</strong>
                            </div>
                            <div class="list-group-item pr-layer-widget text-white">
                                <span>Year: </span>
                                <strong>{{ movie.release_date }}</strong>
                            </div>
                            <div class="list-group-item bg-transparent text-white">
                                <span> Genre: </span>
                                <strong v-for="genre in movie.genres"> {{genre?.name}}, </strong>
                            </div>
                            <div class="list-group-item pr-layer-widget text-white">
                                <span>Duration: </span>
                                <strong>{{ movie.runtime }}m.</strong>
                            </div>
                            <div class="list-group-item bg-transparent text-white">
                                <span>Country: </span>
                                <strong v-for="country in movie.production_countries"> {{country?.name}}, </strong>
                            </div>
                            <div class="list-group-item pr-layer-widget text-white">
                                <span>Budget: </span>
                                <strong>{{ movie.budget }}$</strong>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-4">
                        <div class="pr-layer-widget p-3">
                            <h5>About film</h5>
                            <p class="font-light">{{ movie.overview }}</p>
                        </div>
                    </div>
                    <div class="col-12 col-md-8 mt-2">
                        <div class="stars d-sm-inline-block">
                            <rating :rating='`${movie.vote_average}`' :max-rating="10" />
                        </div>
                    </div>
                    <div class="col-12 col-md-4 mt-2">
                        <p class="font20 text-right">Movie Rating: <strong>{{ movie.vote_average }} </strong></p>
                        <p class="m-0 text-right">Total votes: {{ movie.vote_count }}</p>
                    </div>
                    <div class="col-12 mt-2 overflow-hidden" style="min-height: 370px;">
                        <video style="border-style: solid; border-color: #fe7900;" class="w-100"></video>
                    </div>
                    <div class="col-12 mt-3 text-center">
                        <section class="position-relative text-white top-banner pr-layer-widget">
                            <h5 class="text-start pt-3 ps-3 pr-3">Similar Movies</h5>
                            <Carousel v-bind="settings" :breakpoints="breakpoints">
                                <Slide v-for="item in similarMovies?.results" :key="item" class="mt-4 pb-4 pt-0">
                                    <router-link :to="{ name:'movie', params:{ id: item.id }}" class="filmSim m-1 ms-2 text-light ps-3">
                                        <img :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`" class="img-fluid mb-2">
                                        <h2 class="size14 p-1">{{item.title}}</h2>
                                    </router-link>  
                                </Slide>

                                <template #addons>
                                    <Navigation />
                                </template>
                            </Carousel>
                        </section>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4 mt-5 mt-md-0">
                <topMovies></topMovies>
            </div>
        </div>
    </div>
    <foooter></foooter>
</template>
<script>
import axios from 'axios';
import { useStore } from 'vuex';
import { mapGetters } from 'vuex';
import navbar from './navbar.vue'
import navpanel from './navpanel.vue'
import topMovies from './topMovies.vue'
import rating from './rating.vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import foooter from './footer.vue'
export default {
    name : 'movie',

    components : {
        navbar,
        navpanel,
        topMovies,
        Carousel,
        useStore,
        mapGetters,
        rating,
        Slide,
        Navigation,
        foooter},

    data() {  
        return {
            movie : [],
            similarMovies : [],
        }
    },

    settings: {
        itemsToShow: 4,
        snapAlign: 'center',
    },

    breakpoints : {
        700: {
            itemsToShow: 3,
            snapAlign: 'center',
        },
        1024: {
            itemsToShow: 5,
            snapAlign: 'start',
        },
    },

    computed: {
        ...mapGetters(['getLang']),
    },

    watch: {
        $route() {
            this.fetchData()
        },

        getLang() {
            this.fetchData();
        }, 
    },

    methods: {
        fetchData() {
            axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=a348e7136197bd5186dd097b93931f79&language=${this.getLang}`)
            .then(response => {
                this.movie = response.data;
                console.log(this.movie.title, this.movie)
            })
            .catch(error => {
            console.log(error);
            });

            axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/similar?api_key=a348e7136197bd5186dd097b93931f79&language=${this.getLang}`)
            .then(response => {
                this.similarMovies = response.data;
                console.log(this.similarMovies.results[0].title)
           })
            .catch(error => {
            console.log(error)
            })
        }
    },

    mounted(){
       this.fetchData()
    },
    // beforeCreate() {
    //     console.log(this.$route)
    // },
}
</script>

<style>
.stars > div > .star-rating > span {
    font-size: 44px !important;
}

.img-responsive {
    width: 100%;
    height: auto;
}

.list-group {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
}

.list-group-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
}

.size14 {
    font-size: 14px;
}

.pr-layer-widget {
    background-color: #242526 !important;
}

.list-group-item > span {
    font-family: MonserratLight;
}

.font20 {
    font-size: 20px;
}

.text-right {
    text-align: right!important;
} 

.w-100 {
    width: 100%;
}

.filmSim {
    width: 166px;
    height: 240px;
}

ul > li  {
    background-color: unset !important;
}

ul > li > button:hover {
    background-color: #fe7900 !important;
}



</style>