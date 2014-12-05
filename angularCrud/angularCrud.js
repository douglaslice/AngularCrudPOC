(function (angular) {

	var defaultOptions = {
		crudName : 'Define Crud Name',
		fields : [
		[{
			label:'Label',
			property: 'propertyName',
			size: 7,
			labelSize:5,
			notNull: true
		}]
		], // filds in screen
		beforeFind:   function(){},
		afterFind:    function(){},
		beforeSave:   function(){},
		afterSave :   function(){},
		beforeDelete: function(){},
		afterDelete:  function(){},
		validadeFields: true,
		validadeFieldsOnFind: false,
		rootServiceCrud: '',
		servicesSave: {
			name: 'save',
			protocol: 'post'
		},
		serviceFind:  {
			name: 'find',
			protocol: 'post'
		},
		serviceDelete:  {
			name: 'delete',
			protocol: 'post'
		},

		buttons:{
			save:{
				visible: true,
				name: "Salvar"
			},
			find:{
				visible: true,
				name : "Pesquisar"
			},
			'delete': {
				visible : true,
				name : "Excluir"
			}
		},
		//utils
		getFieldClass: function(field){
			if(field.size){
				return  "col-xs-" + field.size;
			}else{
				return  "col-xs-8";
			}
		},
		getLabelClass: function(field){
			if(field.labelSize){
				return  "col-xs-" + field.labelSize;
			}else{
				return  "col-xs-4";
			}
		},
		getNotNull: function(field){
			return field.notNull ? '*' : '';
		}
	}

	angular.module('angular.crud', [])
	.directive('ngCrud', function (){
		return {
			scope: {
				options: '='
			},
			templateUrl: 'scripts/directives/angularCrud/angularCrud.html',
			compile : function(element, attrs){
				return {
					pre: function preLink(scope, iElement, iAttrs, controller) {
						scope.options = angular.extend(defaultOptions, scope.options);
					}
				}
			}
		}
	});

})(angular);