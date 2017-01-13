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
            views: {
                '': {
                    templateUrl: require('../views/home-page.template.html'),
                    controller: 'homePageController',
                    controllerAs: 'home'
                },
                'typography@home': {
                    templateUrl: require('../views/typography.template.html')
                },
                'colors@home': {
                    templateUrl: require('../views/colors.template.html'),
                    controller: 'colorsController',
                    controllerAs: 'colors'
                },
                'buttons@home': {
                    templateUrl: require('../views/buttons.template.html')
                },
                'dropdown@home': {
                    templateUrl: require('../views/dropdown.template.html'),
                    controller: 'dropdownController',
                    controllerAs: 'dropdown'
                },
                'toggle-radio-buttons@home': {
                    templateUrl: require('../views/toggle-radio-buttons.template.html'),
                    controller: 'toggleRadioButtonsController',
                    controllerAs: 'toggle'
                },
                'form-elements@home': {
                    templateUrl: require('../views/form-elements.template.html'),
                    controller: 'formElementsController',
                    controllerAs: 'form'
                }
            }
        });
}