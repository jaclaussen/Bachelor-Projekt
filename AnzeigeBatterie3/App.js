angular.module('beamng.apps')
.directive('anzeigeBatterie3', ['StreamsManager', '$interval', function (StreamsManager, $interval) {
  return {
    templateUrl: 'modules/apps/AnzeigeBatterie3/app.html',
    replace: true,
    restrict: 'EA',
    scope: true,
	controller: ['$log', '$scope', 'bngApi', 'StreamsManager', function ($log, $scope, bngApi, StreamsManager) {
			var streamsList = ['energie'];
      var con1 = 0;
      var con2 = 1;
      var con3 = 3;
			StreamsManager.add(streamsList);
      $scope.indic = "268";
      $scope.rad = "468";
      $scope.verbrauch = "0";
			$scope.$on('streamsUpdate', function (event, data) {
				$scope.$evalAsync(function () {
          con3 = con2;
          con2 = con1;
          con1 = data.energie.en;
          var mid = (con1+con2+con3)/3;
					if (data.energie.en) {
						var consumption = mid
            var energy = ((mid/18000*100)*468)
            var n = 468 - (energy/100)
						//If-Statement to catch the >0 values
						if (data.energie.en>0) {
              $scope.rad = n;
              $scope.indic = 268 - (energy*0.576/100);
              if(n < 0){
                $scope.rad = 0
                $scope.indic = 0
              }

            //Energy smaller zero, mask full
            }else if (energy < 0){
							$scope.rad = 468;
              $scope.indic = 268;
            }

						//Sends the energyusage in kW to the html

            $scope.energie =Math.round(energy/100);
            if (Math.round(consumption/1000) >= 0) {
              	$scope.verbrauch = Math.round(consumption/1000);
            }else{
              	$scope.verbrauch = 0;
            }

            //CHange battery in View
            if ((energy/100) > 0 && (energy/100)<156 ){
              $scope.displayR = "none"
              $scope.displayB = "block"
              $scope.displayY = "none"

            }else if ((energy/100) >= 156 && (energy/100)<=312 ){
              $scope.displayR = "none"
              $scope.displayY = "block"
              $scope.displayB = "none"
            }else if ((energy/100) >= 312 && (energy/100)<=600 ){
              $scope.displayY = "none"
              $scope.displayR = "block"
              $scope.displayB = "none"
            }else{
              $scope.displayR = "none"
              $scope.displayB = "block"
              $scope.displayY = "none"
            }

					}
				});
			});
			$scope.$on('$destroy', function () {
				StreamsManager.remove(streamsList);
			});
    }]
  };
}]);
