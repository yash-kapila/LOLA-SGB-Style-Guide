(function() {
    'use strict';
    angular.module('macApp').controller('formElementsController', FormElementsController);

    FormElementsController.$inject = ['$scope', '$state'];

    function FormElementsController($scope, $state) {
        var vm = this;

        vm.dropdownOptionSelected = function(id) {
            console.log(id);
        };

        vm.initialize = function () {
            vm.dropdown = [
                {
                    id: 'borrowing-entity',
                    name: 'Add Borrowing Entity'
                },
                {
                    id: 'facility',
                    name: 'Add Facility'
                },
                {
                    id: 'security',
                    name: 'Add Security'
                },
                {
                    id: 'guarantee',
                    name: 'Add Guarantee'
                }
            ];
        };

        vm.initialize();

    }
    
})();