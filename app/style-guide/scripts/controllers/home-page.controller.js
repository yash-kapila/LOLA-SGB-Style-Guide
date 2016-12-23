(function() {
    'use strict';
    angular.module('macApp').controller('homePageController', HomePageController);

    HomePageController.$inject = ['$scope', '$state'];

    function HomePageController($scope, $state) {
        var vm = this;

        vm.colorCodeSelected = function(event, code) {
            event.preventDefault();
            vm.selectedColor = code;
        };

        vm.dropdownOptionSelected = function(id) {
            vm.selectedDropdown = vm.dropdown.filter(function(val){
                return val.id === id;
            })
            vm.selectedDropdown = vm.selectedDropdown.length ? vm.selectedDropdown[0] : null; 
        };

        vm.toggleOptionsCallback = function(id) {
            console.log(id);
        };

        vm.initialize = function () {
            vm.selectedColor = 'primary';

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

            vm.userForm = {
                username: "",
                address: "",
                textArea: ""
            }
        };

        vm.initialize();

    }
    
})();