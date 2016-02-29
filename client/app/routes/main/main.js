'use strict';

angular.module('allIsMendedApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        title: 'Content Creation, Editing and Rroofing Services',
        url: '/',
        templateUrl: 'app/routes/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      });
  });
