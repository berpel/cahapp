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

angular.module('cah').run(function(){
  console.log('hello')
});

function GameCtrl($scope) {
  $scope.join = function() {
    peer.init($scope.name);
    peer.subscribe();
    peer.publish({peer: {playerNew:$scope.name}});
    $scope.joined = true;
  }
}

function PlayersCtrl($scope, dialogService) {
  $scope.round = 1;
  $scope.players = [{name:'brett', status: 0, score: 1}];


  $scope.select = function(index) {
    peer.getPlayers();

    selected = index;
    var options = {
      bodyText: index.name + ' has won round ' + $scope.round,
      actionButtonText: 'Okie Dokie',
      templateUrl:'/templates/player-won-round.html'
      //callback: submit
    }
    //dialogService.showModalDialog(options);
  };

}

function CardsCtrl($scope, $timeout, dialogService) {
  $scope.cardsWhite = czar.drawWhiteCards(10);
  $scope.cardBlack = czar.drawBlackCard();

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
    var newCard = czar.drawWhiteCards(1);
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
