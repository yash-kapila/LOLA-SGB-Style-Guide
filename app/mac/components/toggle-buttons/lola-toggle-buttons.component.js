(function () {
    'use strict';
    angular.module('macApp').component('lolaToggleButtons', {
        templateUrl: require('./lola-toggle-buttons.template.html'),
        bindings: {
            name: '@',
            options: '<',
            default: '<',
            onSelect: '&'
        },
        controller: 'lolaToggleButtons'    
    });

    /**
     *
     */

    angular.module('macApp').controller('lolaToggleButtons', LolaToggleButtons);

    function LolaToggleButtons() {
        var vm = this;

        vm.$onInit = function() {
            vm.selectedButton = vm.default ? vm.default : {};
        };

        vm.optionSelected = function(selectedButton) {
            vm.onSelect({id: selectedButton.id});
        };
    }
})();