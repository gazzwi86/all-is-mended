'use strict';

(() => {

  class MainController {
    constructor($http, ngDialog, toaster) {
      this.$http = $http;
      this.toaster = toaster;
      this.ngDialog = ngDialog;
      this.quote = {
        type: 'content',
        countType: 'pages',
        number: '',
        total: {
          aud: 0,
          gbp: 0,
          usd: 0
        }
      };
      this.email = {
        to: 'shelley.allismended@gmail.com',
        name: '',
        email: '',
        message: ''
      };
      this.clients = [
        {
          title: 'Content writing for Iron Movement active wear line',
          date: '2016',
          image: '/assets/images/iron.jpg',
          // url: 'http://ironmovement.com.au/',
          description: '"Wonderful work, highly professional, could not recommend enough. Look forward to lots more work with you in the future."'
        },
        {
          title: 'Copyedit of Australian Multicultural Community Services Summer newsletter',
          date: '2015 - present',
          image: '/assets/images/acms.jpg',
          description: '"Thank you Shelley! This is great! I really like how you rewrote the story, much ' +
            'more engaging. Thanks for the thoughtful suggestions. I really appreciate your help."'
        },
        {
          title: 'Copyedit of Fishtank Solutions industry report',
          date: 'July - September 2014',
          image: '/assets/images/fishtank.png',
          description: '"Great work Shelley, you really helped us clarify the insights within our data and ' +
            'communicate this clearly to our audience."'
        },
        {
          title: 'Copyedit of Computershare 2014 and 2015 Annual Reports',
          date: '1970 - present',
          image: '/assets/images/annual-report-2015.jpg',
          description: ''
        },
        {
          title: 'Proofread of Beautiful Ugly, Architectural Photography of John Gollings, Thames & Hudson',
          date: '2011',
          image: '/assets/images/beautifulugly.jpg',
          description: ''
        },
        {
          title: 'Edit of Owl Know How, Cat Rabbit and Isobel Knowles, Thames & Hudson',
          date: '2012',
          image: '/assets/images/owlknowhow.jpg',
          description: ''
        },
        {
          title: 'Proofread of 46 Square metres of land doesn’t normally become a house, ' +
            'Stuart Harrison, Thames & Hudson',
          date: '2011',
          image: '/assets/images/fortysixsquaremeteres.jpg',
          description: ''
        },
        {
          title: 'Proofread of Characters: Cultural stories revealed through typography, Stephen Banham, ' +
            'Thames & Hudson',
          date: '2011',
          image: '/assets/images/characters.jpg',
          description: ''
        },
        {
          title: 'Proofread and writing for Interiors: Australia and New Zealand, Mitchell Oakley Smith, ' +
            'Thames & Hudon',
          date: '2011',
          image: '/assets/images/interiors.jpg',
          description: ''
        }
      ];
    }

    total() {
      let type;
      let countType;
      let wpp = 450;
      let aud = 1;
      let gbp = 0.51;
      let usd = 0.71;

      switch (this.quote.type) {
        case 'content':
          type = 3;
          break;

        case 'editing':
          type = 1.4;
          break;

        case 'proofing':
          type = 1;
          break;
      }

      // amount in dollars to multiply
      switch (this.quote.countType) {
        case 'pages':
          countType = 2;
          break;

        case 'words':
          countType = 2 / wpp;
          break;
      }

      this.quote.total.aud = ((this.quote.number * (countType * type)) * aud).toFixed(2);
      this.quote.total.gbp = ((this.quote.number * (countType * type)) * gbp).toFixed(2);
      this.quote.total.usd = ((this.quote.number * (countType * type)) * usd).toFixed(2);
    }

    clientClick(id) {
      let popupTemplate = '<img src="' +
        this.clients[id].image + '" alt="' +
        this.clients[id].title + '" class="dialogImg" />';
      popupTemplate += '<div>';
      popupTemplate += '<h3>' + this.clients[id].title + '</h3>';
      popupTemplate += '<h4>' + this.clients[id].date + '</h4>';
      popupTemplate += this.clients[id].description;
      popupTemplate += '</div>';

      this.ngDialog.open({
        template: popupTemplate,
        plain: true
      });
    }

    sendEmail() {
      let success = false;
      let toaster = this.toaster;
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line

      if (
        this.email.name === '' ||
        this.email.email === '' ||
        !re.test(this.email.email) ||
        this.email.message === ''
      ) {
        this.toaster.pop({
          type: 'error',
          title: 'Error',
          body: 'Sorry, the is a problem with the content of your message.  Please check and try again.',
          showCloseButton: true
        });
      } else {
        this.$http({
          method: 'POST',
          url: '/email',
          data: {
            from: this.email.email,
            name: this.email.name,
            message: this.email.message
          },
          header: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(() => {
          success = true;
          toaster.pop({
            type: 'success',
            title: 'Superb!',
            body: 'Your email has been sent.  I will get back to you as soon as possible',
            showCloseButton: true
          });
        }).error(() => {
          success = false;
          toaster.pop({
            type: 'error',
            title: 'Sorry!',
            body: 'The message could not be sent.  We have an issue with the site.',
            showCloseButton: true
          });
        }).then(() => {
          if (success) {
            this.email.name = '';
            this.email.email = '';
            this.email.message = '';
            success = false;
          }
        });
      }
    }
  }

  angular.module('allIsMendedApp')
    .controller('MainController', MainController);

})();
