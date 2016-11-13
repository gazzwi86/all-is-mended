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
      this.clients = [
        {
          title: 'Content creation for <i>The Grand Tourists</i> travel blog',
          date: '2016',
          image: '/assets/images/thegrandtourists.jpg',
          url: 'http://thegrandtourists.net/',
          description: 'Ongoing personal project including regular article writing and content creation for' +
            ' social media channels'
        },
        {
          title: 'Content writing and copyediting for <i>Intelligence report on company meetings' +
            '</i> for Computershare Limited',
          date: '2016',
          image: '/assets/images/intelligence_report.jpg',
          url: 'http://www.computershare.com/au/Documents/Intelligence%20Report%20-%20Insights%20from' +
            '%20company%20meetings%20held%20in%202015.pdf',
          description: 'Included research and project management of publication'
        },
        {
          title: 'Copyediting of various articles in <i>Upper Yarra Mail</i>',
          date: '2016',
          image: '/assets/images/insects.jpg',
          url: 'https://issuu.com/starnewsgroup/docs/2016-07-26_mv_632',
          description: '<i>"Shelley has assisted with my language, tweaking my academic writing style to better' +
            ' suit the <i>Upper Yarra Mail</i> audience and make complex scientific information more clear." </i>' +
            '<br/> <strong>Michael Smith, environmental scientist and columnist</strong>'
        },
        {
          title: 'Content writing for Iron Movement active wear line',
          date: '2016',
          image: '/assets/images/iron.jpg',
          url: 'http://ironmovement.com.au/',
          description: '<i>"Wonderful work, highly professional, could not recommend enough. ' +
            'Look forward to lots more work with you in the future."</i> ' +
            '<br/><strong>Nicole Stark, Founder of Iron Movement<strong/>'
        },
        {
          title: 'Copyedit of <i>Australian Multicultural Community Services Summer Newsletter<i>',
          date: '2015 - present',
          image: '/assets/images/acms.jpg',
          description: '<i>"Thank you Shelley! This is great! I really like how you rewrote the story, much ' +
            'more engaging. Thanks for the thoughtful suggestions. I really appreciate your help."</i> ' +
            '<br/><strong>Lizbeth Gonzalez, Marketing and Communications Manager<strong/>'
        },
        {
          title: 'Copyedit of Fishtank Solutions industry report',
          date: 'July - September 2014',
          image: '/assets/images/fishtank.png',
          description: '<i>"Great work Shelley, you really helped us clarify the insights within our data and ' +
            'communicate this clearly to our audience."</i> <br/><strong>Eben Hocking, Marketing Manager</strong>'
        },
        {
          title: 'Copyedit of Computershare 2014 and 2015 Annual Reports',
          date: '1970 - present',
          image: '/assets/images/annual-report-2015.jpg',
          description: '<i>"Shelley has an exceptional eye for detail and always provides constructive ' +
            'suggestions for improvement."</i> <br/><strong>Genevieve Neumann, Corporate Communications Manager</strong>'
        },
        {
          title: 'Proofread of <i>Beautiful Ugly, Architectural Photography of John Gollings</i> <br/>Thames & Hudson',
          date: '2011',
          image: '/assets/images/beautifulugly.jpg',
          description: ''
        },
        {
          title: 'Edit of <i>Owl Know How</i> Cat Rabbit and Isobel Knowles, <br/>Thames & Hudson',
          date: '2012',
          image: '/assets/images/owlknowhow.jpg',
          description: ''
        },
        {
          title: 'Proofread of <i>46 Square metres of land doesn’t normally become a house</i> ' +
            'Stuart Harrison, <br/>Thames & Hudson',
          date: '2011',
          image: '/assets/images/fortysixsquaremeteres.jpg',
          description: ''
        },
        {
          title: 'Proofread of <i>Characters: Cultural stories revealed through typography</i> Stephen Banham, ' +
            '<br/>Thames & Hudson',
          date: '2011',
          image: '/assets/images/characters.jpg',
          description: ''
        },
        {
          title: 'Proofread and writing for <i>Interiors: Australia and New Zealand,</i> Mitchell Oakley Smith, ' +
            '<br/>Thames & Hudson',
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
  }

  angular.module('allIsMendedApp')
    .controller('MainController', MainController);

})();
