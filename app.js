/*jshint esversion: 6 */
console.log('connected');

// if('serviceWorker' in navigator){
//     navigator.serviceWorker.register('sw.js')
//         .then((reg) => console.log("Service Worker Registered", reg))
//         .catch((err) => console.log("Service Worker Not Registered", err));
// }
mapboxgl.accessToken="pk.eyJ1IjoiamFzb25waXR0cyIsImEiOiJja2J2NmNsNXowMzI2MzBvZnJ6aWEwaHpmIn0.LBsh6F1QSk4aNMBLtErYNw";
var map = new mapboxgl.Map({
    container: 'mapbox',
    style: 'mapbox://styles/jasonpitts/ckbv6grp516621inii9kmamh6',
    center: [-112.9867994, 37.200757], // starting position [lng, lat]
    zoom: 11 // starting zoom
});
console.log(map);
var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        page: 'home', // home, entrances, parking, shuttles, trails, map
        homeImg: 'icons/home_green.svg',
        mapImg: 'icons/map_grey.svg',
        home_selected: true,
        map_selected: false,

        // ENTRANCES
        SouthEntranceStat: '',
        EastEntranceStat: '',
        RiverEntranceStat: '',
        KolobEntranceStat: '',

        SouthEntranceBusiness: '',
        EastEntranceBusiness: '',
        RiverEntranceBusiness: '',
        KolobEntranceBusiness: '',

        southEntranceSvg: 'icons/entrance_grey.svg',
        southEntranceSvgStroke: '',
        eastEntranceSvg: 'icons/entrance_grey.svg',
        eastEntranceSvgStroke: '',
        riverEntranceSvg: 'icons/entrance_grey.svg',
        riverEntranceSvgStroke: '',
        kolobEntranceSvg: 'icons/entrance_grey.svg',
        kolobEntranceSvgStroke: '',

        // PARKING
        vcStat: '',
        museumStat: '',
        rvStat: '',
        springdaleStat: '',
        kolobVcStat: '',
        
        vcBusiness: '',
        museumBusiness: '',
        rvBusiness: '',
        springdaleBusiness: '',
        kolobVcBusiness: '',

        vcParkingSvg: 'icons/parking_grey.svg',
        vcParkingSvgStroke: '',
        museumParkingSvg: 'icons/parking_grey.svg',
        museumParkingSvgStroke: '',
        rvParkingSvg: 'icons/parking_grey.svg',
        rvParkingSvgStroke: '',
        springdaleParkingSvg: 'icons/parking_grey.svg',
        springdaleParkingSvgStroke: '',
        kolobVcParkingSvg: 'icons/parking_grey.svg',
        kolobVcParkingSvgStroke: '',

        // TRAILS
        parusBusiness: 'Busy', 
        archeologyBusiness: 'Busy', 
        lowerEmeraldBusiness: 'Busy', 
        grottoBusiness: 'Busy', 
        weepingRockBusiness: 'Closed', 
        riversideBusiness: 'Busy', 
        watchmanBusiness: 'Busy', 
        sandBenchBusiness: 'Busy', 
        upperEmeraldBusiness: 'Busy', 
        kayentaBusiness: 'Busy', 
        canyonOverlookBusiness: 'Busy', 
        taylorCreekBusiness: 'Busy', 
        timberCreekBusiness: 'Busy', 
        angelsLandingWestBusiness: 'Closed', 
        hiddenCanyonBusiness: 'Closed', 
        observationPointBusiness: 'Closed', 
        narrowsBusiness: 'Busy', 

        parusSvg: 'fill: #B5B5B5',
        parusSvgStroke: '#B5B5B5',
        archeologySvg: 'fill: #B5B5B5',
        archeologySvgStroke: '#B5B5B5',
        lowerEmeraldSvg: 'fill: #B5B5B5',
        lowerEmeraldSvgStroke: '#B5B5B5',
        grottoSvg: 'fill: #B5B5B5',
        grottoSvgStroke: '#B5B5B5',
        weepingRockSvg: 'fill: #B5B5B5',
        weepingRockSvgStroke: '#B5B5B5',
        riversideSvg: 'fill: #B5B5B5',
        riversideSvgStroke: '#B5B5B5',
        watchmanSvg: 'fill: #B5B5B5',
        watchmanSvgStroke: '#B5B5B5',
        sandBenchSvg: 'fill: #B5B5B5',
        sandBenchSvgStroke: '#B5B5B5',
        upperEmeraldSvg: 'fill: #B5B5B5',
        upperEmeraldSvgStroke: '#B5B5B5',
        kayentaSvg: 'fill: #B5B5B5',
        kayentaSvgStroke: '#B5B5B5',
        canyonOverlookSvg: 'fill: #B5B5B5',
        canyonOverlookSvgStroke: '#B5B5B5',
        taylorCreekSvg: 'fill: #B5B5B5',
        taylorCreekSvgStroke: '#B5B5B5',
        timberCreekSvg: 'fill: #B5B5B5',
        timberCreekSvgStroke: '#B5B5B5',
        angelsLandingWestSvg: 'fill: #B5B5B5',
        angelsLandingWestSvgStroke: '#B5B5B5',
        hiddenCanyonSvg: 'fill: #B5B5B5',
        hiddenCanyonSvgStroke: '#B5B5B5',
        observationPointSvg: 'fill: #B5B5B5',
        observationPointSvgStroke: '#B5B5B5',
        narrowsSvg: 'fill: #B5B5B5',
        narrowsSvgStroke: '#B5B5B5',
    },
    created: function(){
        this.loadStats();
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
        parkingClicked: function(){
            this.page = 'parking';
        },
        shuttlesClicked: function(){
            this.page = 'shuttles';
        },
        trailsClicked: function(){
            this.page = 'trails';
        },
        getAPIData_safe: function (data, fields, def){
			//data = json object api return data
			//fields = array of data fields tree
			//def = default return value if nothing is found
			var ret = def;
			var multiEntrance = false;
			try{
				if(i == 0 && tdata.hasOwnProperty(f + "1")){multiEntrance = true;}
				var tdata = data;
				for(var i = 0; i < fields.length; i++){
					let f = fields[i];
					if(tdata.hasOwnProperty(f)){
						if(i == fields.length - 1){
							ret = tdata[f];
						}else{
							tdata = tdata[f];
						}
					}
				}
			}catch(err){
				console.log(err);
			}
			return ret;
		},
        loadStats: function(){
            var vm = this;
            axios.get("https://trailwaze.info/zion/request.php").then(response => {
                //South Entrance: Today
				vm.SouthEntranceStat = this.getAPIData_safe(response.data, ["ZionSouthEntrance2", "Today", "count"], 0);
                vm.SouthEntranceStat += this.getAPIData_safe(response.data, ["ZionSouthEntrance3", "Today", "count"], 0);
                //East Entrance: Today
                vm.EastEntranceStat = this.getAPIData_safe(response.data, ["ZionEastEntrance1", "Today", "count"], 0);
                //River Entrance: Today
                vm.RiverEntranceStat = 0;
                //Kolob Entrance: Today
                vm.KolobEntranceStat = 0;

                //Visitor Center: Today
                vm.vcStat = this.getAPIData_safe(response.data, ["ParkingVisitorCenter", "Today", "count"], 0);
                //Museum: Today
                vm.museumStat = 0;
                //RV: Today
                vm.rvStat = 0;
                //Springdale: Today
                vm.springdaleStat = 0;
                //Kolob Visitor Center
                vm.kolobVcStat = 0;

                if (this.page == 'entrances'){
                    this.loadEntrances();
                }
                if (this.page == 'parking'){
                    this.loadParking();
                }
                if (this.page == 'trails'){
                    this.loadParking();
                }
            }).catch(error => {
                vm = "Fetch " + error;
            });
        },
        loadEntrances: function(){
            var S = this.SouthEntranceStat / 3000;
            this.SouthEntranceBusiness = this.loadEntranceBusiness(S)[0];
            this.southEntranceSvg = this.loadEntranceBusiness(S)[1];
            this.southEntranceSvgStroke = this.loadEntranceBusiness(S)[2];
 
            var E = this.EastEntranceStat / 1000;
            this.EastEntranceBusiness = this.loadEntranceBusiness(E)[0];
            this.eastEntranceSvg = this.loadEntranceBusiness(E)[1];
            this.eastEntranceSvgStroke = this.loadEntranceBusiness(E)[2];

            var R = this.RiverEntranceStat / 100;
            this.RiverEntranceBusiness = this.loadEntranceBusiness(R)[0];
            this.riverEntranceSvg = this.loadEntranceBusiness(R)[1];
            this.riverEntranceSvgStroke = this.loadEntranceBusiness(R)[2];

            var K = this.KolobEntranceStat / 100;
            this.KolobEntranceBusiness = this.loadEntranceBusiness(K)[0];
            this.kolobEntranceSvg = this.loadEntranceBusiness(K)[1];
            this.kolobEntranceSvgStroke = this.loadEntranceBusiness(K)[2];

            this.setStop("southEntranceLine", 8, S);
            this.setStop("eastEntranceLine", 8, E);
            this.setStop("riverEntranceLine", 8, R);
            this.setStop("kolobEntranceLine", 8, K);
        },
        loadEntranceBusiness: function(entrance){
            if (entrance == 0){
                return ['Closed', 'icons/entrance_grey.svg', '#B5B5B5'];
            }else if(entrance < 0.33){
                return ['Not busy', 'icons/entrance_green.svg', '#749D4C'];
            }else if(entrance < 0.66){
                return ['A little busy', 'icons/entrance_yellow.svg', '#FFCD31'];
            }else{
                return ['As busy as it gets', 'icons/entrance_pink.svg', '#EF6A6E'];
            }
        },
        loadParking: function(){
            var VC = this.vcStat / 100;
            this.vcBusiness = this.loadParkingBusiness(VC)[0];
            this.vcParkingSvg = this.loadParkingBusiness(VC)[1];
            this.vcParkingSvgStroke = this.loadParkingBusiness(VC)[2];

            var M = this.museumStat / 100;
            this.museumBusiness = this.loadParkingBusiness(M)[0];
            this.museumParkingSvg = this.loadParkingBusiness(M)[1];
            this.museumParkingSvgStroke = this.loadParkingBusiness(M)[2];

            var RV = this.rvStat / 100;
            this.rvBusiness = this.loadParkingBusiness(RV)[0];
            this.rvParkingSvg = this.loadParkingBusiness(RV)[1];
            this.rvParkingSvgStroke = this.loadParkingBusiness(RV)[2];

            var SD = this.springdaleStat / 100;
            this.springdaleBusiness = this.loadParkingBusiness(SD)[0];
            this.springdaleParkingSvg = this.loadParkingBusiness(SD)[1];
            this.springdaleParkingSvgStroke = this.loadParkingBusiness(SD)[2];

            var KVC = this.kolobVcStat / 100;
            this.kolobVcBusiness = this.loadParkingBusiness(KVC)[0];
            this.kolobVcParkingSvg = this.loadParkingBusiness(KVC)[1];
            this.kolobVcParkingSvgStroke = this.loadParkingBusiness(KVC)[2];

            this.setStop("vcLine", 8, VC);
            this.setStop("museumLine", 8, M);
            this.setStop("rvLine", 8, RV);
            this.setStop("springdaleLine", 8, SD);
            this.setStop("kolobVcLine", 8, KVC);
        },
        loadParkingBusiness: function(lot){
            if (lot == 0){
                return ['Closed', 'icons/parking_grey.svg', '#B5B5B5'];
            }else if(lot < 0.33){
                return ['Not busy', 'icons/parking_green.svg', '#749D4C'];
            }else if(lot < 0.66){
                return ['A little busy', 'icons/parking_yellow.svg', '#FFCD31'];
            }else{
                return ['As busy as it gets', 'icons/parking_pink.svg', '#EF6A6E'];
            }
        },
        loadTrails: function(){
            this.setStop("parusLine", 8, 0.5);
            this.setStop("archeologyLine", 8, 0.5);
            this.setStop("lowerEmeraldLine", 8, 0.5);
            this.setStop("grottoLine", 8, 0.5);
            this.setStop("weepingRockLine", 8, 0.5);
            this.setStop("riversideLine", 8, 0.5);
            this.setStop("watchmanLine", 8, 0.5);
            this.setStop("sandBenchLine", 8, 0.5);
            this.setStop("upperEmeraldLine", 8, 0.5);
            this.setStop("kayentaLine", 8, 0.5);
            this.setStop("canyonOverlookLine", 8, 0.5);
            this.setStop("taylorCreekLine", 8, 0.5);
            this.setStop("timberCreekLine", 8, 0.5);
            this.setStop("angelsLandingWestLine", 8, 0.5);
            this.setStop("hiddenCanyonLine", 8, 0.5);
            this.setStop("observationPointLine", 8, 0.5);
            this.setStop("narrowsLine", 8, 0.5);
        },
    },
    watch:{
        // page: function() {
        //     if(this.page == 'map'){
        //         mapboxgl.accessToken="pk.eyJ1IjoiamFzb25waXR0cyIsImEiOiJja2J2NmNsNXowMzI2MzBvZnJ6aWEwaHpmIn0.LBsh6F1QSk4aNMBLtErYNw";
        //         var map = new mapboxgl.Map({
        //             container: 'map',
        //             style: 'mapbox://styles/jasonpitts/ckbv6grp516621inii9kmamh6',
        //             center: [-112.9867994, 37.200757], // starting position [lng, lat]
        //             zoom: 11 // starting zoom
        //         });
        //         console.log(map);
        //     }
        // }
    }
});

