angular.module('cah', ['angular-carousel']);

function GameCtrl($scope) {
  $scope.round = 1;
  $scope.players = [
    {name: 'Breet', wins: 3},
    {name: 'Mattkins', wins: 1},
    {name: 'Kristin', wins: 0}
  ];
}

function PlayerCtrl($scope) {
  $scope.cardsWhite = getWhiteCards(10);

  $scope.submit = function() {

  }
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