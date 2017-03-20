<template>
    <!-- App -->
    <div id="app">

        <!-- Main Views -->
        <f7-views>
            <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
                <!-- iOS Theme Navbar -->
                <f7-navbar v-if="$theme.ios">

                    <f7-nav-center sliding>今天吃什么</f7-nav-center>

                </f7-navbar>
                <!-- Pages -->
                <f7-pages>
                    <f7-page>
                        <!-- Page Content -->
                        <f7-card :title="recipe.name">
                            <div class="recipe-block">
                                <img :src="recipe.lImage"/>
                            </div>
                        </f7-card>
                        <f7-block>
                            <f7-grid>
                                <f7-col width="30">
                                    <a href="#" @click="skip" class="button color-yellow button-fill button-big">跳过</a>
                                </f7-col>
                                <f7-col width="70">
                                    <star-rating inactive-color="#000"
                                                 active-color="#f00"
                                                 v-bind:star-size="40"
                                                 v-bind:show-rating=false
                                                 :rating="resetableRating"
                                                 @rating-selected="setRating"/>
                                </f7-col>
                            </f7-grid>
                        </f7-block>
                    </f7-page>
                </f7-pages>
            </f7-view>
        </f7-views>


    </div>
</template>
<style>
    .recipe-block {
        display: flex;
        justify-content: center;
        height: 300px;
        padding: 10px;
        padding-top: 0;
    }

    .recipe-block img {
        width: 100%;
    }
</style>
<script>
    import axios from "axios"
    import StarRating from 'vue-star-rating'
    export default{
        data() {
            return {
                recipe: {},
                resetableRating: 0
            }
        },
        created: function () {
            this.fetchRandomRecipe()
        },
        methods: {
            fetchRandomRecipe: function () {
                this.resetRating();
                let self = this;
                axios.get('/api/fetchRandomRecipe/104/鸡')
                        .then(function (response) {
                            self.recipe = response.data;
                            console.log(self.recipe);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            skip: function () {
                this.fetchRandomRecipe();
            },
            setRating: function(rating){
                this.resetableRating = rating;

                let self = this;
                setTimeout(function () {
                    self.fetchRandomRecipe()
                },1000)
            },
            resetRating() {
                this.resetableRating = 0;
            }
        },
        components: {
            StarRating
        }
    }
</script>