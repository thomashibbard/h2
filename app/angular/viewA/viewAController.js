var app = angular.module('h2App');
app.controller('viewACtrl', function($scope, FoodInspectionDataService){
	FoodInspectionDataService.getAPIData().then(function(data){
		console.log('got data', data)
	});
});
