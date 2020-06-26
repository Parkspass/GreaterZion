/*jshint esversion: 6 */
console.log('connected');

// if('serviceWorker' in navigator){
//     navigator.serviceWorker.register('sw.js')
//         .then((reg) => console.log("Service Worker Registered", reg))
//         .catch((err) => console.log("Service Worker Not Registered", err));
// }

var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        page: 'home',
        homeImg: 'icons/home_green.svg',
        mapImg: 'icons/map_grey.svg',
        home_selected: true,
        map_selected: false
    },
    methods: {
        bottomNavImg: function(NewTab) {
            switch(NewTab) {
                case 'home':
                    this.homeImg = 'icons/home_green.svg'; this.mapImg = 'icons/map_grey.svg'; 
                    this.home_selected=true;  this.map_selected=false; 
                    break;
                case 'map':
                    this.homeImg = 'icons/home_grey.svg'; this.mapImg = 'icons/map_green.svg'; 
                    this.home_selected=false;  this.map_selected=true; 
                    break;
            }
        },
    }
});