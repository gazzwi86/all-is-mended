'use strict';

angular.module('allIsMendedApp', [
  'allIsMendedApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ngAnimate',
  'ngProgress',
  'ngDialog',
  'toaster'
])
.config(function($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
})
.run(function($document, $rootScope, $location, $window, $state, ngProgressFactory) {

  $rootScope.baseTitle = 'All Is Mended';
  $rootScope.currentPage = false;
  $rootScope.globalLoading = false;
  $rootScope.progressbar = ngProgressFactory.createInstance();

  // add ie class
  if (
    $window.navigator.userAgent.indexOf('MSIE') !== -1 ||
    $window.navigator.appVersion.indexOf('Trident/') > 0
  ) {
    angular.element($document[0].body).addClass('ie');
  }

  // scroll to top of page
  function scrollTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  // show loader
  function showLoader() {
    $rootScope.globalLoading = true;
    $rootScope.progressbar.start();
  }

  // hide loader
  function hideLoader() {
    $rootScope.globalLoading = false;
    $rootScope.progressbar.complete();
  }

  console.log(document.getElementById('bg'));
  // jQuery('#bg').css('height', $window.height());
  // $window.onScroll = function() {
  //   console.log('here');
  //   jQuery('#bg').css('height', $window.height());
  // };

  // on page change start
  $rootScope.$on('$stateChangeStart', function() {
    showLoader();
  });

  // on page change success
  $rootScope.$on('$stateChangeSuccess', function() {
    hideLoader();
    $rootScope.pageTitle = $rootScope.baseTitle + ' | ' + $state.current.title;
  });

  // on page change error
  $rootScope.$on('$stateChangeError', function() {
    hideLoader();
  });

  // on view loaded
  $rootScope.$on('$viewContentLoaded', function() {
    scrollTop();
    $window.ga('send', 'pageview', { page: $location.url() });
  });
});
