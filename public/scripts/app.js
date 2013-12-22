function SettingsCtrl($scope) {
  $scope.right = false;
}

function CardsCtrl($scope) {
  $scope.cardsWhite = getWhiteCards(10);

  $scope.cardsBlack = [
    {text: 'What did the US airdrop to the children of Afghanistan?'}
  ]
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