'use strict';

class NavbarDirective {
  constructor() {
    this.restrict = 'E';
    this.templateUrl = 'app/directives/navbar/navbar.html';
    this.controllerAs = 'vm';
    this.scope = {};
  }

  controller() {
    this.navActive = false;
    this.showNav = false;
    this.menu = [
      {
        title: 'Home',
        link: '#home'
      },
      {
        title: 'About',
        link: '#about'
      },
      {
        title: 'Experience',
        link: '#experience'
      },
      {
        title: 'Quote',
        link: '#quote'
      },
      {
        title: 'Contact',
        link: '#contact'
      }
    ];

    this.toggleNav = () => {
      if (this.navActive) {
        this.navActive = false;
      } else {
        this.navActive = true;
      }
    };
  }

  link() {}
}

angular.module('allIsMendedApp')
  .directive('navbar', () => new NavbarDirective());
