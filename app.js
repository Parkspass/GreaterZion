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
        parusStat: '', 
        archeologyStat: '', 
        lowerEmeraldStat: '', 
        grottoStat: '', 
        weepingRockStat: '', 
        riversideStat: '', 
        watchmanStat: '', 
        sandBenchStat: '', 
        upperEmeraldStat: '', 
        kayentaStat: '', 
        canyonOverlookStat: '', 
        taylorCreekStat: '', 
        timberCreekStat: '', 
        angelsLandingWestStat: '', 
        hiddenCanyonStat: '', 
        observationPointStat: '', 
        narrowsStat: '', 

        parusBusiness: '', 
        archeologyBusiness: '', 
        lowerEmeraldBusiness: '', 
        grottoBusiness: '', 
        weepingRockBusiness: '', 
        riversideBusiness: '', 
        watchmanBusiness: '', 
        sandBenchBusiness: '', 
        upperEmeraldBusiness: '', 
        kayentaBusiness: '', 
        canyonOverlookBusiness: '', 
        taylorCreekBusiness: '', 
        timberCreekBusiness: '', 
        angelsLandingWestBusiness: '', 
        hiddenCanyonBusiness: '', 
        observationPointBusiness: '', 
        narrowsBusiness: '', 

        parusSvg: '',
        parusSvgStroke: '',
        archeologySvg: '',
        archeologySvgStroke: '',
        lowerEmeraldSvg: '',
        lowerEmeraldSvgStroke: '',
        grottoSvg: '',
        grottoSvgStroke: '',
        weepingRockSvg: '',
        weepingRockSvgStroke: '',
        riversideSvg: '',
        riversideSvgStroke: '',
        watchmanSvg: '',
        watchmanSvgStroke: '',
        sandBenchSvg: '',
        sandBenchSvgStroke: '',
        upperEmeraldSvg: '',
        upperEmeraldSvgStroke: '',
        kayentaSvg: '',
        kayentaSvgStroke: '',
        canyonOverlookSvg: '',
        canyonOverlookSvgStroke: '',
        taylorCreekSvg: '',
        taylorCreekSvgStroke: '',
        timberCreekSvg: '',
        timberCreekSvgStroke: '',
        angelsLandingWestSvg: '',
        angelsLandingWestSvgStroke: '',
        hiddenCanyonSvg: '',
        hiddenCanyonSvgStroke: '',
        observationPointSvg: '',
        observationPointSvgStroke: '',
        narrowsSvg: '',
        narrowsSvgStroke: '',
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
                vm.KolobEntranceStat = 'closed';

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

                // ALL TRAILS
                vm.parusStat = 50;
                vm.archeologyStat = 20;
                vm.lowerEmeraldStat = 50;
                vm.grottoStat = 90;
                vm.weepingRockStat = 'closed';
                vm.riversideStat = 90;
                vm.watchmanStat = 20;
                vm.sandBenchStat = 20;
                vm.upperEmeraldStat = 50;
                vm.kayentaStat = 50;
                vm.canyonOverlookStat = 90;
                vm.taylorCreekStat = 20;
                vm.timberCreekStat = 20;
                vm.angelsLandingWestStat = 'closed';
                vm.hiddenCanyonStat = 'closed';
                vm.observationPointStat = 'closed';
                vm.narrowsStat = 90; 

                if (this.page == 'entrances'){
                    this.loadEntrances();
                }
                if (this.page == 'parking'){
                    this.loadParking();
                }
                if (this.page == 'trails'){
                    this.loadTrails();
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
            if (isNaN(entrance) ){
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
            if (isNaN(lot)){
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
            var P = this.parusStat/100;
            this.parusBusiness = this.loadTrailsBusiness(P)[0];
            this.parusSvg = this.loadTrailsBusiness(P)[1];
            this.parusSvgStroke = this.loadTrailsBusiness(P)[2];
            this.setStop("parusLine", 8, P);

            var A = this.archeologyStat/100;
            this.archeologyBusiness = this.loadTrailsBusiness(A)[0];
            this.archeologySvg = this.loadTrailsBusiness(A)[1];
            this.archeologySvgStroke = this.loadTrailsBusiness(A)[2];
            this.setStop("archeologyLine", 8, A);

            var LE = this.lowerEmeraldStat/100;
            this.lowerEmeraldBusiness = this.loadTrailsBusiness(LE)[0];
            this.lowerEmeraldSvg = this.loadTrailsBusiness(LE)[1];
            this.lowerEmeraldSvgStroke = this.loadTrailsBusiness(LE)[2];
            this.setStop("lowerEmeraldLine", 8, LE);

            var G = this.grottoStat/100;
            this.grottoBusiness = this.loadTrailsBusiness(G)[0];
            this.grottoSvg = this.loadTrailsBusiness(G)[1];
            this.grottoSvgStroke = this.loadTrailsBusiness(G)[2];
            this.setStop("grottoLine", 8, G);

            var W = this.weepingRockStat/100;
            this.weepingRockBusiness = this.loadTrailsBusiness(W)[0];
            this.weepingRockSvg = this.loadTrailsBusiness(W)[1];
            this.weepingRockSvgStroke = this.loadTrailsBusiness(W)[2];
            this.setStop("weepingRockLine", 8, W);

            var R = this.riversideStat/100;
            this.riversideBusiness = this.loadTrailsBusiness(R)[0];
            this.riversideSvg = this.loadTrailsBusiness(R)[1];
            this.riversideSvgStroke = this.loadTrailsBusiness(R)[2];
            this.setStop("riversideLine", 8, R);

            var WL = this.watchmanStat/100;
            this.watchmanBusiness = this.loadTrailsBusiness(WL)[0];
            this.watchmanSvg = this.loadTrailsBusiness(WL)[1];
            this.watchmanSvgStroke = this.loadTrailsBusiness(WL)[2];
            this.setStop("watchmanLine", 8, WL);

            var SB = this.sandBenchStat/100;
            this.sandBenchBusiness = this.loadTrailsBusiness(SB)[0];
            this.sandBenchSvg = this.loadTrailsBusiness(SB)[1];
            this.sandBenchSvgStroke = this.loadTrailsBusiness(SB)[2];
            this.setStop("sandBenchLine", 8, SB);

            var UE = this.upperEmeraldStat/100;
            this.upperEmeraldBusiness = this.loadTrailsBusiness(UE)[0];
            this.upperEmeraldSvg = this.loadTrailsBusiness(UE)[1];
            this.upperEmeraldSvgStroke = this.loadTrailsBusiness(UE)[2];
            this.setStop("upperEmeraldLine", 8, UE);

            var K = this.kayentaStat/100;
            this.kayentaBusiness = this.loadTrailsBusiness(K)[0];
            this.kayentaSvg = this.loadTrailsBusiness(K)[1];
            this.kayentaSvgStroke = this.loadTrailsBusiness(K)[2];
            this.setStop("kayentaLine", 8, K);

            var CO = this.canyonOverlookStat/100;
            this.canyonOverlookBusiness = this.loadTrailsBusiness(CO)[0];
            this.canyonOverlookSvg = this.loadTrailsBusiness(CO)[1];
            this.canyonOverlookSvgStroke = this.loadTrailsBusiness(CO)[2];
            this.setStop("canyonOverlookLine", 8, CO);

            var TC = this.taylorCreekStat/100;
            this.taylorCreekBusiness = this.loadTrailsBusiness(TC)[0];
            this.taylorCreekSvg = this.loadTrailsBusiness(TC)[1];
            this.taylorCreekSvgStroke = this.loadTrailsBusiness(TC)[2];
            this.setStop("taylorCreekLine", 8, TC);

            var TiC = this.timberCreekStat/100;
            this.timberCreekBusiness = this.loadTrailsBusiness(TiC)[0];
            this.timberCreekSvg = this.loadTrailsBusiness(TiC)[1];
            this.timberCreekSvgStroke = this.loadTrailsBusiness(TiC)[2];
            this.setStop("timberCreekLine", 8, TiC);

            var AW = this.angelsLandingWestStat/100;
            this.angelsLandingWestBusiness = this.loadTrailsBusiness(AW)[0];
            this.angelsLandingWestSvg = this.loadTrailsBusiness(AW)[1];
            this.angelsLandingWestSvgStroke = this.loadTrailsBusiness(AW)[2];
            this.setStop("angelsLandingWestLine", 8, AW);

            var HC = this.hiddenCanyonStat/100;
            this.hiddenCanyonBusiness = this.loadTrailsBusiness(HC)[0];
            this.hiddenCanyonSvg = this.loadTrailsBusiness(HC)[1];
            this.hiddenCanyonSvgStroke = this.loadTrailsBusiness(HC)[2];
            this.setStop("hiddenCanyonLine", 8, HC);

            var OP = this.observationPointStat/100;
            this.observationPointBusiness = this.loadTrailsBusiness(OP)[0];
            this.observationPointSvg = this.loadTrailsBusiness(OP)[1];
            this.observationPointSvgStroke = this.loadTrailsBusiness(OP)[2];
            this.setStop("observationPointLine", 8, OP);

            var N = this.narrowsStat/100;
            this.narrowsBusiness = this.loadTrailsBusiness(N)[0];
            this.narrowsSvg = this.loadTrailsBusiness(N)[1];
            this.narrowsSvgStroke = this.loadTrailsBusiness(N)[2];
            this.setStop("narrowsLine", 8, N);
        },
        loadTrailsBusiness: function(trail){
            if (isNaN(trail)){
                return ['Closed', 'fill: #B5B5B5', '#B5B5B5'];
            }else if(trail < 0.33){
                return ['Not busy', 'fill: #749D4C', '#749D4C'];
            }else if(trail < 0.66){
                return ['A little busy', 'fill: #FFCD31', '#FFCD31'];
            }else{
                return ['As busy as it gets', 'fill: #EF6A6E', '#EF6A6E'];
            }
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

