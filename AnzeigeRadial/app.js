angular.module('beamng.apps')
.directive('anzeigeRadial', ['StreamsManager', '$interval', function (StreamsManager, $interval) {
  return {
    //calls the html
    templateUrl: 'modules/apps/AnzeigeRadial/app.html',
    replace: true,
    restrict: 'EA',
    scope: true,
	controller: ['$log', '$scope', 'bngApi', 'StreamsManager', function ($log, $scope, bngApi, StreamsManager) {
      //List of used streams
      var streamsList = ['energie'];
      //The con values hold the last three values of data.energie.en, so the animation is more fluid
      var con1 = 0;
      var con2 = 1;
      var con3 = 3;
      StreamsManager.add(streamsList);
      //Initialising of the angular values at their minimum
			$scope.indic = "180";
      $scope.rad = "0";
      $scope.verbrauch = "0";

      //Triggers when values in BeamNG get updated
			$scope.$on('streamsUpdate', function (event, data) {
        //used to make sure the value is always updated
				$scope.$evalAsync(function () {
            //Update of the con values
            con3 = con2;
            con2 = con1;
            //if-statement to catch bug which caused the display of negative values
            if(data.energie.en>0){
            con1 = data.energie.en;}
            else {con1 = 0;}
            //calculation of the average of the data.energie.en value
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
          //Event-Statement if value of data.energie.en changes
					if (data.energie.en) {
            /*If-Statement to catch the >18000 values
            Sets the Values of rad, indic and verbrauch to the wanted max*/
            if (data.energie.en>180000){
              $scope.rad = 314;
              $scope.indic = 351;
              $scope.verbrauch = 180;
            //If-Statement to use the average(mid) for a better animation
            }else if(data.energie.en>=0){
              //Calculations for the values depending on the mid value
              $scope.rad = mid/180000*314;
              $scope.indic = mid/1000+180;
              $scope.verbrauch = Math.round(mid/1000);
            /*Else-Statement for Values below 0
            Sets the Values of rad, indic and verbrauch to the wanted min*/ 
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
