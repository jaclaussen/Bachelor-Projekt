angular.module('beamng.apps')
.directive('compass', ['StreamsManager', function (StreamsManager) {
  return {
    template:  
    '<div style="width:100%; height:100%;" class="bngApp">' +
    '<svg style="width:100%; height:100%;" id="radial">'	+

    //Background of RadialGauge
    '<circle id="radBG" r="100" cx="50%" cy="50%" stroke="grey"' + 
    'stroke-width="40" stroke-dasharray="469 628" transform="rotate(135,150,150)" fill="none"></circle>' +
    
    //RadialGauge optical Value
    '<circle id="radVG" r="100" cx="50%" cy="50%" stroke="green" stroke-width="40" ' +
    'stroke-dasharray={{radGauge}} fill="none" transform="rotate(135,150,150)" ></circle>' +

    '</svg>' +
    '</div>',
    replace: true,
    restrict: 'EA',
    link: function (scope, element, attrs) {      
      // An optional list of streams that will be used in the app
      var streamsList = ['electrics'];
 
      // Make the needed streams available.
      StreamsManager.add(streamsList);
 
      // Make sure we clean up after closing the app.
      scope.$on('$destroy', function () {
        StreamsManager.remove(streamsList);
      });

      scope.$on('streamsUpdate', function (event, streams) {
        /* Some code that uses the streams' values */
          //Enables the sync with the RadialGauge
          scope.$evalAsync(function () {
            //Updates the Radial Gauge
            scope.radGauge = (streams.electrics.rpm/12000)*469 + " 628"
        });
      });
    }
  };
}])