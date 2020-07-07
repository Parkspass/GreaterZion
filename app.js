/*jshint esversion: 6 */
console.log('connected');

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
        .then((reg) => console.log("Service Worker Registered", reg))
        .catch((err) => console.log("Service Worker Not Registered", err));
}

var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        page: 'home', // home, entrances, parking, shuttles, trails, map
        homeImg: 'icons/home_green.svg',
        mapImg: 'icons/map_grey.svg',
        home_selected: true,
        map_selected: false,
        showInstallMessage: false,

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
        this.PWA_popup();
    },
    methods: {
        PWA_popup: function(){
            const isIos = () => {
                const userAgent = window.navigator.userAgent.toLowerCase();
                return /iphone|ipad|ipod/.test( userAgent );
            };
              // Detects if device is in standalone mode
            const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
              
              // Checks if should display install popup notification:
            if (isIos() && !isInStandaloneMode()) {
                this.showInstallMessage = true;
            }
            setTimeout(function() {
                this.showInstallMessage = false;
            }, 5000);
        },
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
            if (this.page == 'entrances'){
                axios.get("https://trailwaze.info/zion/vehicleTraffic_request.php?site=zionsouthin").then(response =>{
                    this.SouthEntranceStat = response.data.zionsouthin.rotate100;
                    if(this.SouthEntranceStat < 33){
                        this.southEntranceSvg = "icons/entrance_green.svg";
                        this.southEntranceSvgStroke = "#749D4C";
                        this.SouthEntranceBusiness = "Not busy";
                    }else if(this.SouthEntranceStat < 66){
                        this.southEntranceSvg = "icons/entrance_yellow.svg";
                        this.southEntranceSvgStroke = "#FFCD31";
                        this.SouthEntranceBusiness = "A little busy";
                    }else{
                        this.southEntranceSvg = "icons/entrance_pink.svg";
                        this.southEntranceSvgStroke = "#EF6A6E";
                        this.SouthEntranceBusiness = "As busy as it gets";
                    }
                    this.SouthEntranceStat /= 100;
                    this.setStop("southEntranceLine", 8, this.SouthEntranceStat);
                }).catch(error =>{
                    vm = "Fetch " + error;
                });
                axios.get("https://trailwaze.info/zion/vehicleTraffic_request.php?site=zioneastin").then(response =>{
                    this.EastEntranceStat = response.data.zioneastin.rotate100;
                    if(this.EastEntranceStat < 33){
                        this.eastEntranceSvg = "icons/entrance_green.svg";
                        this.eastEntranceSvgStroke = "#749D4C";
                        this.EastEntranceBusiness = "Not busy";
                    }else if(this.EastEntranceStat < 66){
                        this.eastEntranceSvg = "icons/entrance_yellow.svg";
                        this.eastEntranceSvgStroke = "#FFCD31";
                        this.EastEntranceBusiness = "A little busy";
                    }else{
                        this.eastEntranceSvg = "icons/entrance_pink.svg";
                        this.eastEntranceSvgStroke = "#EF6A6E";
                        this.EastEntranceBusiness = "As busy as it gets";
                    }
                    this.EastEntranceStat /= 100;
                    this.setStop("eastEntranceLine", 8, this.EastEntranceStat);
                }).catch(error =>{
                    vm = "Fetch " + error;
                });
            }
            if (this.page == 'parking'){
                axios.get("https://trailwaze.info/zion/request.php").then(response => {
                    //Visitor Center: Today
                    vm.vcStat = this.getAPIData_safe(response.data, ["ParkingVisitorCenter", "Today", "count"], 0);
                    //Museum: Today
                    vm.museumStat = this.getAPIData_safe(response.data, ["ParkingVisitorCenter", "Today", "count"], 0);
                    //RV: Today
                    vm.rvStat = this.getAPIData_safe(response.data, ["ParkingVisitorCenter", "Today", "count"], 0);
                    //Springdale: Today
                    vm.springdaleStat = 0;
                    //Kolob Visitor Center
                    vm.kolobVcStat = 'closed';
                    this.loadParking();
                }).catch(error => {
                    vm = "Fetch " + error;
                });
                // axios.get("kolob parking php request here").then(response => {

                // }).catch(error => {
                //     vm = "Fetch " + error;
                // });
                
            }
                
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
            this.loadTrails();
            
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
            var A = this.archeologyStat/100;
            var LE = this.lowerEmeraldStat/100;
            var G = this.grottoStat/100;
            var W = this.weepingRockStat/100;
            var R = this.riversideStat/100;
            var WL = this.watchmanStat/100;
            var SB = this.sandBenchStat/100;
            var UE = this.upperEmeraldStat/100;
            var K = this.kayentaStat/100;
            var CO = this.canyonOverlookStat/100;
            var TC = this.taylorCreekStat/100;
            var TiC = this.timberCreekStat/100;
            var AW = this.angelsLandingWestStat/100;
            var HC = this.hiddenCanyonStat/100;
            var OP = this.observationPointStat/100;
            var N = this.narrowsStat/100;
            var time = new Date().getHours();
            if (time < 9 || time > 21 ){
                P = A = LE = G = W = R = WL = SB = UE = K = CO = TC = TiC = AW = HC = OP = N = 0;
            }

            this.parusBusiness = this.loadTrailsBusiness(P)[0];
            this.parusSvg = this.loadTrailsBusiness(P)[1];
            this.parusSvgStroke = this.loadTrailsBusiness(P)[2];
            this.setStop("parusLine", 8, P);
            
            this.archeologyBusiness = this.loadTrailsBusiness(A)[0];
            this.archeologySvg = this.loadTrailsBusiness(A)[1];
            this.archeologySvgStroke = this.loadTrailsBusiness(A)[2];
            this.setStop("archeologyLine", 8, A);

            this.lowerEmeraldBusiness = this.loadTrailsBusiness(LE)[0];
            this.lowerEmeraldSvg = this.loadTrailsBusiness(LE)[1];
            this.lowerEmeraldSvgStroke = this.loadTrailsBusiness(LE)[2];
            this.setStop("lowerEmeraldLine", 8, LE);

            this.grottoBusiness = this.loadTrailsBusiness(G)[0];
            this.grottoSvg = this.loadTrailsBusiness(G)[1];
            this.grottoSvgStroke = this.loadTrailsBusiness(G)[2];
            this.setStop("grottoLine", 8, G);

            this.weepingRockBusiness = this.loadTrailsBusiness(W)[0];
            this.weepingRockSvg = this.loadTrailsBusiness(W)[1];
            this.weepingRockSvgStroke = this.loadTrailsBusiness(W)[2];
            this.setStop("weepingRockLine", 8, W);

            this.riversideBusiness = this.loadTrailsBusiness(R)[0];
            this.riversideSvg = this.loadTrailsBusiness(R)[1];
            this.riversideSvgStroke = this.loadTrailsBusiness(R)[2];
            this.setStop("riversideLine", 8, R);

            this.watchmanBusiness = this.loadTrailsBusiness(WL)[0];
            this.watchmanSvg = this.loadTrailsBusiness(WL)[1];
            this.watchmanSvgStroke = this.loadTrailsBusiness(WL)[2];
            this.setStop("watchmanLine", 8, WL);

            this.sandBenchBusiness = this.loadTrailsBusiness(SB)[0];
            this.sandBenchSvg = this.loadTrailsBusiness(SB)[1];
            this.sandBenchSvgStroke = this.loadTrailsBusiness(SB)[2];
            this.setStop("sandBenchLine", 8, SB);

            this.upperEmeraldBusiness = this.loadTrailsBusiness(UE)[0];
            this.upperEmeraldSvg = this.loadTrailsBusiness(UE)[1];
            this.upperEmeraldSvgStroke = this.loadTrailsBusiness(UE)[2];
            this.setStop("upperEmeraldLine", 8, UE);

            this.kayentaBusiness = this.loadTrailsBusiness(K)[0];
            this.kayentaSvg = this.loadTrailsBusiness(K)[1];
            this.kayentaSvgStroke = this.loadTrailsBusiness(K)[2];
            this.setStop("kayentaLine", 8, K);

            this.canyonOverlookBusiness = this.loadTrailsBusiness(CO)[0];
            this.canyonOverlookSvg = this.loadTrailsBusiness(CO)[1];
            this.canyonOverlookSvgStroke = this.loadTrailsBusiness(CO)[2];
            this.setStop("canyonOverlookLine", 8, CO);

            this.taylorCreekBusiness = this.loadTrailsBusiness(TC)[0];
            this.taylorCreekSvg = this.loadTrailsBusiness(TC)[1];
            this.taylorCreekSvgStroke = this.loadTrailsBusiness(TC)[2];
            this.setStop("taylorCreekLine", 8, TC);
            
            this.timberCreekBusiness = this.loadTrailsBusiness(TiC)[0];
            this.timberCreekSvg = this.loadTrailsBusiness(TiC)[1];
            this.timberCreekSvgStroke = this.loadTrailsBusiness(TiC)[2];
            this.setStop("timberCreekLine", 8, TiC);

            this.angelsLandingWestBusiness = this.loadTrailsBusiness(AW)[0];
            this.angelsLandingWestSvg = this.loadTrailsBusiness(AW)[1];
            this.angelsLandingWestSvgStroke = this.loadTrailsBusiness(AW)[2];
            this.setStop("angelsLandingWestLine", 8, AW);

            this.hiddenCanyonBusiness = this.loadTrailsBusiness(HC)[0];
            this.hiddenCanyonSvg = this.loadTrailsBusiness(HC)[1];
            this.hiddenCanyonSvgStroke = this.loadTrailsBusiness(HC)[2];
            this.setStop("hiddenCanyonLine", 8, HC);

            this.observationPointBusiness = this.loadTrailsBusiness(OP)[0];
            this.observationPointSvg = this.loadTrailsBusiness(OP)[1];
            this.observationPointSvgStroke = this.loadTrailsBusiness(OP)[2];
            this.setStop("observationPointLine", 8, OP);

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

