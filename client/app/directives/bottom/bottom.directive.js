'use strict';

class BottomDirective {
  constructor() {
    this.restrict = 'E';
    this.templateUrl = 'app/directives/bottom/bottom.html';
    this.controllerAs = 'vm';
    this.scope = {};
  }

  controller() {
    let date = new Date();
    this.year = date.getFullYear();
  }

  link() {}
}

angular.module('allIsMendedApp')
  .directive('bottom', () => new BottomDirective());
