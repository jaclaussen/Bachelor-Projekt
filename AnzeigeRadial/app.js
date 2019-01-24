angular.module('beamng.apps')
.directive('anzeigeRadial', ['StreamsManager', '$interval', function (StreamsManager, $interval) {
  return {
    templateUrl: 'modules/apps/AnzeigeRadial/app.html',
    replace: true,
    restrict: 'EA',
    scope: true,
	controller: ['$log', '$scope', 'bngApi', 'StreamsManager', function ($log, $scope, bngApi, StreamsManager) {
			var streamsList = ['energie'];
			StreamsManager.add(streamsList);
			$scope.indic = "180";
      $scope.rad = "0";
      $scope.verbrauch = "0";
			$scope.$on('streamsUpdate', function (event, data) {
				$scope.$evalAsync(function () {
          if (data.energie.en > 15426) {
            $scope.first = "#1A79FF"
            $scope.second = "#1A79FF"
            $scope.third = "#FFFF1E"
            $scope.fourth = "#FFFF1E"
            $scope.fifth = "#FFFF1E"
            $scope.sixth = "#FF1215"
            $scope.seventh = "#FF1215"
          }else
          if (data.energie.en > 12855) {
            $scope.first = "#1A79FF"
            $scope.second = "#1A79FF"
            $scope.third = "#FFFF1E"
            $scope.fourth = "#FFFF1E"
            $scope.fifth = "#FFFF1E"
            $scope.sixth = "#FF1215"
            $scope.seventh = "#800000"
          }else
          if (data.energie.en > 10284) {
            $scope.first = "#1A79FF"
            $scope.second = "#1A79FF"
            $scope.third = "#FFFF1E"
            $scope.fourth = "#FFFF1E"
            $scope.fifth = "#FFFF1E"
            $scope.sixth = "#800000"
            $scope.seventh = "#800000"
          }else
          if (data.energie.en > 7713) {
            $scope.first = "#1A79FF"
            $scope.second = "#1A79FF"
            $scope.third = "#FFFF1E"
            $scope.fourth = "#FFFF1E"
            $scope.fifth = "#7B8000"
            $scope.sixth = "#800000"
            $scope.seventh = "#800000"
          }else
          if (data.energie.en > 5142) {
            $scope.first = "#1A79FF"
            $scope.second = "#1A79FF"
            $scope.third = "#FFFF1E"
            $scope.fourth = "#7B8000"
            $scope.fifth = "#7B8000"
            $scope.sixth = "#800000"
            $scope.seventh = "#800000"
          }else
          if (data.energie.en > 2571) {
            $scope.first = "#1A79FF"
            $scope.second = "#1A79FF"
            $scope.third = "#7B8000"
            $scope.fourth = "#7B8000"
            $scope.fifth = "#7B8000"
            $scope.sixth = "#800000"
            $scope.seventh = "#800000"
          }else
          if (data.energie.en > 1) {
            $scope.first = "#1A79FF"
            $scope.second = "#000066"
            $scope.third = "#7B8000"
            $scope.fourth = "#7B8000"
            $scope.fifth = "#7B8000"
            $scope.sixth = "#800000"
            $scope.seventh = "#800000"
          }else
          if (data.energie.en <= 1) {
            $scope.first = "#000066"
            $scope.second = "#000066"
            $scope.third = "#7B8000"
            $scope.fourth = "#7B8000"
            $scope.fifth = "#7B8000"
            $scope.sixth = "#800000"
            $scope.seventh = "#800000"
          }
					if (data.energie.en) {
						var consumption = data.energie.en
						//If-Statement to catch the >0 values
						if (data.energie.en>0) {
						  $scope.rad = data.energie.en/18000*314
              $scope.indic = data.energie.en/100+180
              //Sends the energyusage in kW to the html
						  $scope.verbrauch = Math.round(consumption/1000);}
						else if (data.energie.en>18000){
              $scope.rad = 314;
              $scope.indic = 351;
              $scope.verbrauch = 18;
            } else {
							$scope.rad = 0;
              $scope.indic = 180;
              $scope.verbrauch = 0;
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
