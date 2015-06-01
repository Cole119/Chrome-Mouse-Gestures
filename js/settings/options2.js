var module = angular.module( "gesturesApp", [] );

module.service( 'GestureService', [ '$rootScope', function( $rootScope ) {

	var service = {
		gestures: [],

		events: {
			update: 'gestures.update'
		},

		addGesture: function(gesture) {
			service.gestures.push( gesture );
			console.log('broadcasting update event');
			console.log('array length: ' + service.gestures.length);
			$rootScope.$broadcast( service.events.update );
		}

	}

	return service;

}] );

module.service( 'ActionService', [ '$rootScope', function( $rootScope ) {

	var service = {
		actions: []
	}

	return service;

}] );

module.controller( "GestureController", [ '$scope', 'GestureService', function( $scope, GestureService ) {
	var controller = this;

	$scope.count = 0;
	$scope.gestures = ['1', '2'];

	$scope.$on( GestureService.events.update, function( event ) {
		console.log('received an update event');
		$scope.gestures.push('343');
		$scope.count++;
	});

	$scope.actions = actions;
}] );

module.directive( "newGestureButton", [ 'GestureService', function( GestureService ) {
    return {
  		restrict: "A",
  		link: function( scope, element, attrs ) {
    		element.bind( "click", function() {
      			GestureService.addGesture( {} );
        	});
      	}
    }
}] );