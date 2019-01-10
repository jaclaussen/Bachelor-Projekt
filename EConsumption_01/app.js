angular.module('beamng.apps')
.directive('econsumption01', ['logger', 'bngApi', 'StreamsManager', 'UiUnits', function (logger, bngApi, StreamsManager, UiUnits) {
  return {
    template: 
        '<object id="cool_id_20119" style="width:100%; height:100%; box-sizing:border-box; pointer-events: none" type="image/svg+xml" data="modules/apps/EConsumption_01/econsumption.svg?t=' + Date.now() + '"/>',
    replace: true,
    restrict: 'EA',
    link: function (scope, element, attrs) {

      element.on('load', function () {
        'use strict';
        var svg = element[0].contentDocument;
        var streams = ['electrics'];

        // scope.$on('VechicleChange', svg.vechicleChanged);
        
        // scope.$on('VehicleFocusChanged', function (event, data) {
          // if(data.mode == 1 && svg && svg.vehicleChanged) {

            //  svg.vehicleChanged();
          // }
        // });

        //console.log(svg);
        
        let consumptionRecords = [];
        const calculateAverageConsumption = () => {
          if(consumptionRecords.length < 1) {
            return 0;
          }
          let sum = 0;
          for (let i = 0; i < consumptionRecords.length; i++) {
            sum += consumptionRecords[i];
          }
          return sum/consumptionRecords.length;
        };

        const resetAverageConsumption = () => {
          consumptionRecords = [];
        }
        
        let throttlePrev, speedPrev;
        let accelerationStarted = false;
        let speedThreshold = 1;

        const isAccelerating = (throttle, speed) => {
          if(accelerationStarted) {
            if(speed < speedPrev) {
              accelerationStarted = false;
            }
          } else {            
            if(throttle > throttlePrev || speed > speedPrev) {
              accelerationStarted = true;
            }
          }

          throttlePrev = throttle;
          speedPrev = speed;

          return accelerationStarted;
        };

        // let avg = 0;

        scope.$on('streamsUpdate', (ev, streams) => {
          
          let speed = streams.electrics.wheelspeed;
			if (streams.electrics.currentSeqNumber ==-1){
				document.getElementById('cool_id_20119').style.display = "none";
			} else if((streams.electrics.currentCounter==4 && streams.electrics.aFirst) || (streams.electrics.currentCounter==5 && !streams.electrics.aFirst)) {
				document.getElementById('cool_id_20119').style.display = "block";
			} else {
				document.getElementById('cool_id_20119').style.display = "none";
			}
          // if(isAccelerating(streams.electrics.throttle, streams.electrics.wheelspeed)) {
          //   consumptionRecords.push(streams.energie.en/1000);
          //   avg = calculateAverageConsumption();
          // } else {
          //   //avg = 0;
          //   resetAverageConsumption();
          // }

          svg.update(streams);
        });

        // svg.wireThroughUnitSystem((val, func) => UiUnits[func](val));


        StreamsManager.add([streams]);
        scope.$on('$destroy', function () {
          StreamsManager.remove(streams);
        });
      });
    }
  };
}]);