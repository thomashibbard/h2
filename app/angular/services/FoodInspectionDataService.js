var app = angular.module('h2App');

app.service('FoodInspectionDataService', function($http, $log){

	return {
		constants: {
			apiURL: 'https://data.cityofchicago.org/resource/cwig-ma7x.json'
		},
		getAPIData: function(){
			var self = this;
      var promise = $http.get(self.constants.apiURL).then(function (response) {
        //$log.debug(response);
        return response.data;
      });
      return promise;
    }
	};
});