webpackJsonp([2,0],{0:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var r=n(128),a=i(r),o=n(113),s=(i(o),n(112)),u=i(s),c=n(109),l=(i(c),n(108)),d=(i(l),n(107)),f=(i(d),n(63)),g=i(f),h=n(122),p=i(h);a.default.use(u.default),new a.default({el:"#app",template:"<app/>",framework7:{root:"#app",routes:g.default},components:{app:p.default}})},59:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(){l.learn(d)}function a(t){var e=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];0===f.length&&(f=s()),t.categories.forEach(function(t){for(var n=0;n<f.length;n++){var i=f[n].indexOf(t.id);i>-1&&(e[n]=1)}});var n=5*l.predict(e);return n=Math.round(n)}function o(t,e){var n=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];0===f.length&&(f=s()),t.categories.forEach(function(t){for(var e=0;e<f.length;e++){var i=f[e].indexOf(t.id);i>-1&&(n[e]=1)}});var i={input:n,output:[e/5]};d.push(i)}function s(){return f=window.localStorage.getItem("wtet_categories"),null!==f?JSON.parse(f):[]}Object.defineProperty(e,"__esModule",{value:!0});var u=n(117),c=i(u),l=(0,c.default)({learningRate:.3,activator:"sigmoid"}),d=[],f=s(),g={learn:r,predict:a,rate:o};e.default=g},60:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={materials:[{id:51761,name:"烘焙"},{id:20135,name:"甜品"},{id:20136,name:"饮品"},{id:5399,name:"猪"},{id:104,name:"鸡"},{id:5443,name:"牛"},{id:5418,name:"羊"},{id:275,name:"鸭"},{id:605,name:"牛蛙"},{id:20133,name:"面"},{id:20148,name:"饺子"},{id:957,name:"鱼"},{id:4553,name:"贝"},{id:469,name:"虾"},{id:1183,name:"螃蟹"}]}},61:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(29),a=i(r),o=n(41),s=i(o),u=s.default.create({baseURL:""}),c=function(t){var e=function(t){return t.data},n=function(t){return console.error("Request Failed:",t.config),t.response?(console.error("Status:",t.response.status),console.error("Data:",t.response.data),console.error("Headers:",t.response.headers)):console.error("Error Message:",t.message),a.default.reject(t.response||t.message)};return u(t).then(e).catch(n)};e.default=c},62:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(){var t=window.localStorage.getItem("wtet_categories");null===t&&!function(){t=[];for(var e=f.default.materials,n=[],i=function(t){var i=new l.default(function(n,i){(0,h.default)({url:"/api/fetchAllByPid/"+e[t].id,method:"GET"}).then(function(t){n(t)}).catch(function(t){i(t)})});n.push(i)},r=0;r<e.length;r++)i(r);l.default.all(n).then(function(n){n.forEach(function(n,i){var r=n.map(function(t){return t.id});t.push(n.length?[e[i].id].concat(r):[e[i].id])}),window.localStorage.setItem("wtet_categories",(0,u.default)(t))}).catch(function(t){console.log(t)})}()}function a(){var t=window.localStorage.getItem("wtet_categories"),e=1;if(null==t)e=f.default.materials[o(f.default.materials.length)].id;else{t=JSON.parse(t);var n=o(t.length),i=o(t[n].length);e=t[n][i]}return(0,h.default)({url:"/api/fetchRandomRecipe/"+e,method:"GET",timeout:1e3})}function o(t){return Math.floor(Math.random()*t)}Object.defineProperty(e,"__esModule",{value:!0});var s=n(67),u=i(s),c=n(29),l=i(c),d=n(60),f=i(d),g=n(61),h=i(g),p={getAllCategories:r,generateARecipe:a};r(),e.default=p},63:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=[]},64:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(69),a=i(r),o=n(123),s=i(o),u=n(62),c=i(u),l=n(59),d=i(l);e.default={data:function(){return(0,a.default)({recipe:{},description:"",numRated:0,resetableRating:0,predictRating:0},"description","")},mounted:function(){this.description="别着急，先让我了解你一下（10）",this.fetchRandomRecipe()},methods:{fetchRandomRecipe:function(){var t=this;c.default.generateARecipe().then(function(e){t.recipe=e,t.resetRating(),t.numRated>=10&&(d.default.learn(),t.description="如果我说错了,请告诉我,我会越来越懂你",t.predictRating=d.default.predict(e))}).catch(function(e){console.log(e),t.fetchRandomRecipe()})},skip:function(){this.fetchRandomRecipe()},setRating:function(t){this.resetableRating=t,this.numRated++,this.numRated<=10&&(this.description="别着急，先让我了解你一下（"+(10-this.numRated)+"）"),d.default.rate(this.recipe,t),this.fetchRandomRecipe()},resetRating:function(){this.resetableRating=0}},components:{StarRating:s.default}}},65:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(124),a=i(r);e.default={components:{star:a.default},props:{increment:{type:Number,default:1},rating:{type:Number,default:0},activeColor:{type:String,default:"#ffd055"},inactiveColor:{type:String,default:"#d8d8d8"},maxRating:{type:Number,default:5},starSize:{type:Number,default:50},showRating:{type:Boolean,default:!0},readOnly:{type:Boolean,default:!1},textClass:{type:String,default:""},inline:{type:Boolean,default:!1},borderColor:{type:String,default:"#999"},borderWidth:{type:Number,default:0},padding:{type:Number,default:0}},created:function(){this.step=100*this.increment,this.currentRating=this.rating,this.selectedRating=this.rating,this.createStars()},methods:{setRating:function(t,e){if(!this.readOnly){var n=t.position/100;this.currentRating=(t.id+n-1).toFixed(2),this.currentRating=this.currentRating>this.maxRating?this.maxRating:this.currentRating,this.createStars(),e?(this.selectedRating=this.currentRating,this.$emit("rating-selected",this.selectedRating)):this.$emit("current-rating",this.currentRating)}},resetRating:function(){this.readOnly||(this.currentRating=this.selectedRating,this.createStars())},createStars:function(){this.round();for(var t=0;t<this.maxRating;t++){var e=0;t<this.currentRating&&(e=this.currentRating-t>1?100:100*(this.currentRating-t)),this.$set(this.fillLevel,t,Math.round(e))}},round:function(){var t=1/this.increment;this.currentRating=Math.ceil(this.currentRating*t)/t}},watch:{rating:function(t){this.currentRating=t,this.selectedRating=t,this.createStars()}},data:function(){return{step:0,fillLevel:[],currentRating:0,selectedRating:0}}}},66:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{fill:{type:Number,default:0},size:{type:Number,default:50},starId:{type:Number,required:!0},activeColor:{type:String,required:!0},inactiveColor:{type:String,required:!0},borderColor:{type:String,default:"#000"},borderWidth:{type:Number,default:0},padding:{type:Number,default:0}},created:function(){this.calculatePoints,this.grad=Math.random().toString(36).substring(7)},computed:{calculatePoints:function(){var t=this;this.starPoints=this.starPoints.map(function(e){return t.size/43*e+1.5*t.borderWidth})},starPointsToString:function(){return this.starPoints.join(",")},getGradId:function(){return"url(#"+this.grad+")"},getSize:function(){return parseInt(this.size)+parseInt(3*this.borderWidth)+this.padding},getFill:function(){return this.fill+"%"}},methods:{mouseMoving:function(t){this.$emit("star-mouse-move",{event:t,position:this.getPosition(t),id:this.starId})},getPosition:function(t){var e=.92*this.size,n=Math.round(100/e*t.offsetX);return n>100?100:n},selected:function(t){this.$emit("star-selected",{id:this.starId,position:this.getPosition(t)})}},data:function(){return{starPoints:[19.8,2.2,6.6,43.56,39.6,17.16,0,17.16,33,43.56],grad:""}}}},107:function(t,e){},108:function(t,e){},109:function(t,e){},110:function(t,e){},111:function(t,e){},122:function(t,e,n){n(110);var i=n(23)(n(64),n(126),null,null);t.exports=i.exports},123:function(t,e,n){n(111);var i=n(23)(n(65),n(127),"data-v-5d7117b8",null);t.exports=i.exports},124:function(t,e,n){var i=n(23)(n(66),n(125),null,null);t.exports=i.exports},125:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("svg",{attrs:{height:t.getSize,width:t.getSize},on:{mousemove:t.mouseMoving,click:t.selected}},[n("linearGradient",{attrs:{id:t.grad,x1:"0",x2:"100%",y1:"0",y2:"0"}},[n("stop",{attrs:{offset:t.getFill,"stop-color":t.activeColor}}),t._v(" "),n("stop",{attrs:{offset:t.getFill,"stop-color":t.inactiveColor}})],1),t._v(" "),n("polygon",{attrs:{points:t.starPointsToString,fill:t.getGradId,stroke:t.borderColor,"stroke-width":t.borderWidth}}),t._v(" "),n("polygon",{attrs:{points:t.starPointsToString,fill:t.getGradId}})],1)},staticRenderFns:[]}},126:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("f7-views",[n("f7-view",{attrs:{id:"main-view",main:""}},[n("f7-pages",[n("f7-page",[n("f7-card",{attrs:{title:t.recipe.name,content:t.description}},[n("div",{staticClass:"recipe-block"},[n("img",{attrs:{src:t.recipe.lImage}})])]),t._v(" "),n("f7-block",[n("f7-grid",[n("f7-col",{attrs:{width:"30"}},[n("a",{staticClass:"button color-yellow button-fill button-big",attrs:{href:"#"},on:{click:t.skip}},[t._v("跳过")])]),t._v(" "),n("f7-col",{attrs:{width:"70"}},[n("star-rating",{attrs:{"inactive-color":"#000","active-color":"#f00","star-size":40,"show-rating":!1,rating:t.resetableRating},on:{"rating-selected":t.setRating}})],1)],1)],1),t._v(" "),t.numRated>=10?n("f7-block",{staticClass:"prediction"},[n("f7-grid",[n("f7-col",{staticClass:"prediction-note",attrs:{width:"30"}},[t._v("\n                                猜你多喜欢:\n                            ")]),t._v(" "),n("f7-col",{attrs:{width:"70"}},[n("star-rating",{attrs:{"inactive-color":"#000","active-color":"#f00","star-size":40,"show-rating":!1,"read-only":!0,rating:t.predictRating}})],1)],1)],1):t._e()],1)],1)],1)],1)],1)},staticRenderFns:[]}},127:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:["star-rating",{inline:t.inline}]},[n("div",{staticClass:"star-rating",on:{mouseleave:t.resetRating}},[t._l(t.maxRating,function(e){return n("span",{class:[{pointer:!t.readOnly},"star"]},[n("star",{attrs:{fill:t.fillLevel[e-1],size:t.starSize,"star-id":e,step:t.step,"active-color":t.activeColor,"inactive-color":t.inactiveColor,"border-color":t.borderColor,"border-width":t.borderWidth,padding:t.padding},on:{"star-selected":function(e){t.setRating(e,!0)},"star-mouse-move":t.setRating}})],1)}),t._v(" "),t.showRating?n("span",{class:["rating-text",t.textClass]},[t._v(" "+t._s(t.currentRating))]):t._e()],2)])},staticRenderFns:[]}}});
//# sourceMappingURL=app.2d386dd194a232883868.js.map