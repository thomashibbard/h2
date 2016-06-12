angular.module('h2App', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {
			templateUrl : '/app/angular/selectView/selectView.html',
			controller	: 'selectViewCtrl'
		})
    .when('/viewA', {
			templateUrl : '/app/angular/viewA/viewA.html',
			controller	: 'viewACtrl'
		})
    .when('/viewB', {
			templateUrl : '/app/angular/viewB/viewB.html',
			controller	: 'viewBCtrl'
		})
    .otherwise({redirectTo:'/'});

}]);