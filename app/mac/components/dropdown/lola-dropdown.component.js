(function () {
    'use strict';
    angular.module('macApp').component('lolaDropdown', {
        templateUrl: require('./lola-dropdown.template.html'),
        bindings: {
            title: '@',
            default: '<',
            menuItems: '<',
            onSelect: '&',
            size: '@'
        },
        controller: 'lolaDropdown'    
    });

    /**
     *
     */

    angular.module('macApp').controller('lolaDropdown', LolaDropdown);

    function LolaDropdown() {
        var vm = this;

        vm.$onInit = function() {
            if(vm.default){
                vm.heading = vm.default.name;
                vm.onSelect({id: vm.default.id});
            }
            else{
                vm.heading = vm.title ? vm.title : "Select";
            }
        };

        vm.itemSelected = function(option) { 
            vm.heading = option.name;
            vm.onSelect({id: option.id});
        };
    }
})();