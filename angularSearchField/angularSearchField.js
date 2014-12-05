(function (angular) {


	var postHeaders = {
        'Content-Type' : 'application/json; charset=UTF-8'
    };

	angular.module('angular.searchField', ['ui.bootstrap'])
	.factory("ModalSearchFieldFactory", function($http){

		var properties = {};

		function excuteFind(_filter, callbackSucess){
			 $http.post(properties.service, _filter, { headers : postHeaders }).success(function(_ret){

			 	properties.setValue(_ret.returnObject[0]);//TODO
			 	if(callbackSucess){
			 		callbackSucess(_ret.returnObject[0]);//TODO
			 	}
			 }).error(function(error){
			 	alert(error);
			 });
		}

		return {
			setProperties: function(_prop){
				properties = _prop;
			},
			getProperties: function(){
				return properties;
			},
			excuteFind: excuteFind
		}
	})
	.controller("ModalSearchFieldCtrl", function($scope, ModalSearchFieldFactory, $modalInstance){

		$scope.properties = ModalSearchFieldFactory.getProperties();

		$scope.id = null;
		$scope.description = null;

		$scope.find = function(){
			var _filter = {};

			_filter[$scope.properties.fieldId] = $scope.id;
			_filter[$scope.properties.fieldDescription] = $scope.description;

			ModalSearchFieldFactory.excuteFind(_filter, function(selected){
				$modalInstance.close();
			});
		}

	})
	.directive('ngSearchField', function (){
		return {
			scope: {
				label: '@',
				service: '@',
				labelId: '@',
				labelDescription: '@',
				title: '@',
				fieldId: '@',
				fieldDescription: '@',

				value: '='
			},
			controller: function($scope, ModalSearchFieldFactory, $modal){

				$scope.id = null;
				$scope.description = null;

				$scope.search = function(){
					openModal();
				}

				$scope.clean = function(){
					$scope.value = null;
					$scope.id = null;
					$scope.description = null;
				}

				function openModal(){
					ModalSearchFieldFactory.setProperties(buildProperties());
					
					$modal.open({
					    templateUrl: 'angular_serch_field_modal.html',
					    controller: 'ModalSearchFieldCtrl',
					    size: 'lg'
					  }); 
				}



				function buildProperties(){
					return {
						service: $scope.service,
						title: $scope.title,
						labelId: $scope.labelId,
						labelDescription: $scope.labelDescription,
						fieldId: $scope.fieldId,
						fieldDescription: $scope.fieldDescription,

						setValue: function(value){
							$scope.value = value;
							$scope.id = value[$scope.fieldId];
							$scope.description = value[$scope.fieldDescription];
						}
					}
				}

			},
			templateUrl: 'scripts/directives/angularSearchField/angularSearchField.html'
			// compile : function(element, attrs){

			// 	// return {
			// 	// 	pre: function preLink(scope, iElement, iAttrs, controller) {
			// 	// 		scope.options = angular.extend(defaultOptions, scope.options);
			// 	// 	}
			// 	// }
			// }
		}
	});

})(angular);