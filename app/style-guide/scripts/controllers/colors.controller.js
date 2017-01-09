(function() {
    'use strict';
    angular.module('macApp').controller('colorsController', ColorsController);

    ColorsController.$inject = ['$scope', '$state'];

    function ColorsController($scope, $state) {
        var vm = this;

        vm.colorCodeSelected = function(event, code) {
            event.preventDefault();
            vm.selectedColor = code;
        };

        vm.initialize = function () {
            vm.selectedColor = 'primary';
        };

        vm.initialize();

    }
    
})();