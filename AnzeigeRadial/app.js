angular.module('beamng.apps')
.directive('anzeigeRadial', ['StreamsManager', '$interval', function (StreamsManager, $interval) {
  return {
    templateUrl: 'modules/apps/AnzeigeRadial/app.html',
    replace: true,
    restrict: 'EA',
    scope: true,
	controller: ['$log', '$scope', 'bngApi', 'StreamsManager', function ($log, $scope, bngApi, StreamsManager) {
      var streamsList = ['energie'];
      var con1 = 0;
      var con2 = 1;
      var con3 = 3;
			StreamsManager.add(streamsList);
			$scope.indic = "180";
      $scope.rad = "0";
      $scope.verbrauch = "0";
			$scope.$on('streamsUpdate', function (event, data) {
				$scope.$evalAsync(function () {
            con3 = con2;
            con2 = con1;
            if(data.energie.en>0){
            con1 = data.energie.en;}
            else {con1 = 0;}
            var mid = (con1+con2+con3)/3;
          if (mid > 154260) {
            $scope.first = "#1A79FF"
            $scope.second = "#1A79FF"
            $scope.third = "#FFFF1E"
            $scope.fourth = "#FFFF1E"
            $scope.fifth = "#FFFF1E"
            $scope.sixth = "#FF1215"
            $scope.seventh = "#FF1215"
          }else
          if (mid > 128550) {
            $scope.first = "#1A79FF"
            $scope.second = "#1A79FF"
            $scope.third = "#FFFF1E"
            $scope.fourth = "#FFFF1E"
            $scope.fifth = "#FFFF1E"
            $scope.sixth = "#FF1215"
            $scope.seventh = "#800000"
          }else
          if (mid > 102840) {
            $scope.first = "#1A79FF"
            $scope.second = "#1A79FF"
            $scope.third = "#FFFF1E"
            $scope.fourth = "#FFFF1E"
            $scope.fifth = "#FFFF1E"
            $scope.sixth = "#800000"
            $scope.seventh = "#800000"
          }else
          if (mid > 77130) {
            $scope.first = "#1A79FF"
            $scope.second = "#1A79FF"
            $scope.third = "#FFFF1E"
            $scope.fourth = "#FFFF1E"
            $scope.fifth = "#7B8000"
            $scope.sixth = "#800000"
            $scope.seventh = "#800000"
          }else
          if (mid > 51420) {
            $scope.first = "#1A79FF"
            $scope.second = "#1A79FF"
            $scope.third = "#FFFF1E"
            $scope.fourth = "#7B8000"
            $scope.fifth = "#7B8000"
            $scope.sixth = "#800000"
            $scope.seventh = "#800000"
          }else
          if (data.energie.en > 25710) {
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
            //If-Statement to catch the >18000 values
            if (data.energie.en>180000){
              $scope.rad = 314;
              $scope.indic = 351;
              $scope.verbrauch = 180;
            //If-Statement to use the average for a better animation
            }else if(data.energie.en>=0){
              $scope.rad = mid/180000*314;
              $scope.indic = mid/1000+180;
              $scope.verbrauch = Math.round(mid/1000);
            //Else-Statement for Values below 0
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
