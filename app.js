/*jshint esversion: 6 */
console.log('connected');

// if('serviceWorker' in navigator){
//     navigator.serviceWorker.register('sw.js')
//         .then((reg) => console.log("Service Worker Registered", reg))
//         .catch((err) => console.log("Service Worker Not Registered", err));
// }

const app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        page: 'home',
        homeImg: 'icons/home_green.svg',
        mapImg: 'icons/map_grey.svg',
        home_selected: true,
        map_selected: false,

        SouthEntranceBusiness: 'As busy as it gets',
        EastEntranceBusiness: 'Busy',
        RiverEntranceBusiness: 'Not Busy',
        KolobEntranceBusiness: 'Not Busy',
    },
    created: function(){
        this.loadEntrances();
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
        setStop: function(id, radius, stop){
            var c = document.getElementById(id);
            c.className = "background";
            var stopVal = Math.PI * radius * 2 * (stop);
            c.setAttribute("stroke-dasharray", stopVal + ", 3000");
            c.setAttribute("stroke-dashoffset", stopVal);
            c.className = "overlayLine";
        },
        entrancesClicked: function(){
            this.page = 'entrances';
        },
        loadEntrances: function(){
            this.setStop("line0", 8, 0.5);
            this.setStop("line1", 8, 0.5);
            this.setStop("line2", 8, 0.5);
            this.setStop("line3", 8, 0.5);
        }
    }
});