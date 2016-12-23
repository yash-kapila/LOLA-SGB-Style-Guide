angular.module('macApp', ['ui.router']);

angular.module('macApp').config(StateConfig);

StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

/**
 * State Configuration. This is the base configuration. Each module should have its own configuration
 * @param $stateProvider
 * @constructor
 */
function StateConfig($stateProvider, $urlRouterProvider , ChartJsProvider) {

    $urlRouterProvider.when("", "/home");
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: require('../views/home-page.template.html'),
            controller: 'homePageController',
            controllerAs: 'home'
        })             
}