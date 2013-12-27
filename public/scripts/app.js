angular.module('cah', ['angular-carousel']);
angular.module('cah').service('dialogService', ['$document', '$rootScope', '$compile', '$timeout', function($document, $rootScope, $compile, $timeout) {
  
  var body = $document.find('body');
  var dialogOptions = {
      closeButtonText: 'Close',
      actionButtonText: 'OK',
      headerText: 'Proceed?',
      bodyText: 'Perform this action?'
      //close: closeModalDialog
  };
  
  this.showModalDialog = function(customDialogOptions) {
    var tempDialogOptions = {};
    var scope = customDialogOptions.scope || $rootScope.$new();
    
    var closeModalDialog = function() {
      var modal = $document.find('.modal');
      var dialog = $document.find('.dialog');
      modal.remove();
      dialog.removeClass('show');
      $timeout(function(){
        dialog.remove();
      }, 1000);
    };

    dialogOptions.close = closeModalDialog;

    angular.extend(tempDialogOptions, dialogOptions, customDialogOptions);
    
    tempDialogOptions.callback = function() {
      closeModalDialog();
      customDialogOptions.callback();
    }
    
    var modalEl = angular.element('<div class="modal"></div><div class="dialog"><div class="wrap"><div ng-include="\'' + tempDialogOptions.templateUrl + '\'"></div></div></div>');

    //console.log(tempDialogOptions)

    scope.dialogOptions = tempDialogOptions;

    $compile(modalEl)(scope);
    //console.log(modalEl);

    body.append(modalEl);
    setTimeout(function() {
      modalEl.addClass('animate show');
    }, 0);

    //return modalEl
  };
}]);

function GameCtrl($scope, dialogService) {
  $scope.round = 1;
  $scope.players = [
    {name: 'Breet', score: 3, status: 'czar'},
    {name: 'Mattkins', score: 1, status: 0},
    {name: 'Kristin', score: 0, status: 1},
    {name: 'Glass', score: 1, status: 2},
    {name: 'Glenn', score: 1, status: 0},
    {name: 'Baer', score: 1, status: 3},
    {name: 'Kleyla', score: 1, status: 0},
    {name: 'Kevin', score: 1, status: 0}
  ];

  $scope.select = function(index) {
    selected = index;
    var options = {
      bodyText: index.name + ' has won round ' + $scope.round,
      actionButtonText: 'Okie Dokie',
      templateUrl:'/templates/player-won-round.html'
      //callback: submit
    }
    dialogService.showModalDialog(options);
  };

}

function PlayerCtrl($scope, $timeout, dialogService) {
  $scope.cardsWhite = getWhiteCards(10);
  $scope.cardBlack = getBlackCard();

  var selected = null;

  $scope.select = function(index) {
    selected = index;
    var options = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Submit',
      templateUrl:'/templates/card-submit.html',
      callback: submit
    }
    dialogService.showModalDialog(options);
  };

  var submit = function() {
    var newCard = getWhiteCards(1);
    newCard[0].effect = 'new';

    $scope.cardsWhite[selected].effect = 'animate fadeOutUp';
    $scope.cardBlack.effect = 'animate fadeOut'
    
    $timeout(function() {
      $scope.cardsWhite[selected] = newCard[0];
      //$scope.cardsWhite[selected].effect = 'fadeIn';
      $scope.cardBlack.effect = 'hidden';
    }, 1000);
  };
}

getBlackCard = function() {
  var card = Math.floor(Math.random() * cardsBlack.length);

  return cardsBlack[card]
}

getWhiteCards = function(quantity) {
  var cards = [];

  for (var i = 1; i <= quantity; i++) {
    var card = Math.floor(Math.random() * cardsWhite.length);
    
    // get card
    cards.push(cardsWhite[card]);

    // remove card
    cardsWhite.splice(card, 1)
  }

  return cards;
}