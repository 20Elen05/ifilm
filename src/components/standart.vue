<template>
    <navbar  @toggle-night-mode="toggleNightMode"></navbar>
    <navpanel class="pt-0 mb-0"></navpanel> 
    <div class="container pt-4 mt-4">
        <div class="row">
            <div class="col-12 col-md-8">
                <movies></movies>
            </div>
            <div class="col-12 col-md-4"> 
                <div>
                    <topMovies></topMovies>
                    <nowPlaying></nowPlaying>
                </div>
            </div>
        </div>
    </div>
    <foooter></foooter>  
</template>

<script>
import NightMode from './nightMode.vue'
import navbar from './navbar.vue'
import navpanel from './navpanel.vue'
import movies from './movies.vue'
import topMovies from './topMovies.vue'
import nowPlaying from './nowPlaying.vue'
import rating from './rating.vue'
import foooter from './footer'

export default {
    name: 'standart',
    components : {
            NightMode,
            navbar,
            navpanel,
            movies,
            topMovies,
            nowPlaying,
            rating,
            foooter},

    data() {
        return {
            isNightMode: false,
        }
    },

    methods: {
        toggleNightMode() {
            this.isNightMode = !this.isNightMode;
        },
    },
}
</script>

<style>
.carousel__slide {
    flex-shrink:inherit;
} 

.container {
    max-width: 1130px !important;
}

.font60 {
    font-size: 60px;
}
</style>