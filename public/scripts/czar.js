var czar = {
  drawWhiteCards: function(quantity) {
    var cards = [];

    for (var i = 1; i <= quantity; i++) {
      var card = Math.floor(Math.random() * cardsWhite.length);
      
      // get card
      cards.push(cardsWhite[card]);

      // remove card
      cardsWhite.splice(card, 1)
    }

    return cards;
  },
  
  drawBlackCard: function() {
    var card = Math.floor(Math.random() * cardsBlack.length);

    return cardsBlack[card]
  }
}