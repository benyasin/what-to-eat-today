<template>
    <!-- App -->
    <div id="app">

        <!-- Main Views -->
        <f7-views>
            <f7-view id="main-view" main>
                <!-- Pages -->
                <f7-pages>
                    <f7-page>
                        <!-- Page Content -->
                        <f7-card :title="recipe.name" :content="description">
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

                        <f7-block class="prediction" v-if="numRated > 10">
                            <f7-grid>
                                <f7-col class="prediction-note" width="30">
                                    猜你多喜欢:
                                </f7-col>
                                <f7-col width="70">
                                    <star-rating inactive-color="#000"
                                                 active-color="#f00"
                                                 v-bind:star-size="40"
                                                 v-bind:show-rating=false
                                                 v-bind:read-only=true
                                                 :rating="predictRating"/>
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

    .prediction {
        margin: 0 0 35px 0;
    }

    .content-block{
        margin: 15px 0;
    }

    .prediction-note {
        text-align: center;
        display: inline-block;
        height: 45px;
        padding: 10px 0;
        font-size: 16px;
    }
</style>
<script>
    import StarRating from 'vue-star-rating'
    import Service from './core/service'
    import brain from './core/brain'


    export default{
        data() {
            return {
                recipe: {},
                description: '',
                numRated: 0,
                resetableRating: 0,
                predictRating: 0
            }
        },
        created: function () {
            this.description = '先看看你的口味,10次之后,我会作出预测';
            this.fetchRandomRecipe()
        },
        methods: {
            fetchRandomRecipe: function () {
                let self = this;
                Service.generateARecipe()
                        .then(function (res) {
                            self.recipe = res;
                            self.resetRating();

                            if (self.numRated > 10) {
                                brain.learn();
                                self.description = '如果我说错了,请告诉我,我会越来越懂你';
                                self.predictRating = brain.predict(res);
                            }

                        });
            },
            skip: function () {
                this.fetchRandomRecipe();
            },
            setRating: function (rating) {
                let self = this;
                self.resetableRating = rating;
                self.numRated++;
                brain.rate(self.recipe, rating);


                setTimeout(function () {
                    self.fetchRandomRecipe()
                }, 0)
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