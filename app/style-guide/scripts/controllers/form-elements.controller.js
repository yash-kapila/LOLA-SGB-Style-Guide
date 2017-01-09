(function() {
    'use strict';
    angular.module('macApp').controller('formElementsController', FormElementsController);

    FormElementsController.$inject = ['$scope', '$state'];

    function FormElementsController($scope, $state) {
        var vm = this;

        vm.initialize = function () {

        };

        vm.initialize();

    }
    
})();