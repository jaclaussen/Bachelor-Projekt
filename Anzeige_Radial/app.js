angular.module('beamng.apps')
.directive('anzeigeDos', ['StreamsManager', '$interval', function (StreamsManager, $interval) {
  return {
    templateUrl: 'modules/apps/AnzeigeDos/app.html',
    replace: true,
    restrict: 'EA',
    scope: true,
	controller: ['$log', '$scope', 'bngApi', 'StreamsManager', function ($log, $scope, bngApi, StreamsManager) {
			var streamsList = ['energie'];
			StreamsManager.add(streamsList);
			var old_en = 0;
			$scope.$on('streamsUpdate', function (event, data) {
				$scope.$evalAsync(function () {
					if (data.energie.en) {
						$scope.width_rect = data.energie.en/4000*100;
						$scope.verbrauch = data.energie.en;
					}
				});
			});

			$scope.$on('$destroy', function () {
				StreamsManager.remove(streamsList);
			});

    }]
    /*link: function (scope, element, attrs) {
		scope.width_rect = 50;
		
		$interval(() => {
			//mainBattery
			scope.width_rect = scope.width_rect+0.5;
		}, 16)
		
		gui.send('n2oInfo', {

		
		
    }*/
  };
}]);


