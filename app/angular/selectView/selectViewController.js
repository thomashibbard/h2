var app = angular.module('h2App');
app.controller('selectViewCtrl', function($scope, $location){

	$scope.selectView  = function(view){
		$location.path( '/view' + view );
	};

});
