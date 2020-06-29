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
        page: 'map',
        homeImg: 'icons/home_green.svg',
        mapImg: 'icons/map_grey.svg',
        home_selected: true,
        map_selected: false,
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
    },
});

mapboxgl.accessToken="pk.eyJ1IjoiamFzb25waXR0cyIsImEiOiJja2J2NmNsNXowMzI2MzBvZnJ6aWEwaHpmIn0.LBsh6F1QSk4aNMBLtErYNw";
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jasonpitts/ckbv6grp516621inii9kmamh6',
    center: [-112.9867994, 37.200757], // starting position [lng, lat]
    zoom: 11 // starting zoom
});
console.log(map);