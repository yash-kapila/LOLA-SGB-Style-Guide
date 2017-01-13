(function() {
    'use strict';
    angular.module('macApp').controller('toggleRadioButtonsController', ToggleRadioButtonsController);

    ToggleRadioButtonsController.$inject = ['$scope', '$state'];

    function ToggleRadioButtonsController($scope, $state) {
        var vm = this;

        vm.toggleOptionsCallback = function(id) {
            console.log(id);
        };

        vm.initialize = function () {
            vm.toggleOptions = [
                {
                    id: 'ALL',
                    name: 'All'
                },
                {
                    id: 'YES',
                    name: 'Yes'
                },
                {
                    id: 'NO',
                    name: 'No'
                }
            ];
        };

        vm.initialize();

    }
    
})();