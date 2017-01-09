(function() {
    'use strict';
    angular.module('macApp').controller('homePageController', HomePageController);

    HomePageController.$inject = ['$scope', '$state'];

    function HomePageController($scope, $state) {
        var vm = this;

        vm.initialize = function () {
            vm.userForm = {
                username: "",
                address: "",
                textArea: ""
            };
        };

        vm.initialize();

    }
    
})();