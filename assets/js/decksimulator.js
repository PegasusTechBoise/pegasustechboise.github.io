var researchCards = ["Alligator.png", "BigDipper.png", "BirdsOfAFeather.jpg", "Cassiopeia.png", "Corkscrew.png", "Crisscross.jpg", "Duckfoot.png", "Ducklings.png", "Egg.png", "FlockParty.png", "FlyingV.png", "FlyingZ.png", "FullHouse.png", "Gooseneck.png", "Hatchlings.png", "MatingDance.png", "Nesting.png", "OrionsBelt.png", "Paddling.png", "PairBond.png", "PondCorners.png", "Reflections.png", "Scorpius.png", "Turtle.jpg"]
var advancedResearchCards = ["AstralProjection.png", "BeaverDam.png", "BigMouth.png", "BigRip.png", "Checkmark.png", "CondorNest.png", "CrabNebula.png", "DarkMatter.png", "DodoFoot.png", "Exoplanet.png", "FlockArmy.png", "Galaxy.png", "GiantDipper.png", "Gridlock.png", "Hypotenuse.png", "Proton.png", "SteppingStones.png", "Towers.png", "TripleStack.png", "Twinkle.png"]
var currentDeck = []
var currentRevealedCards = []
var claimedCards = []
var lastIndex = []

$(document).ready(function(){
    setup_cards();
    $('#cardSlot0').on('click', function(){
        claim_card(0);
    });
    $('#cardSlot1').on('click', function(){
        claim_card(1);
    });
    $('#cardSlot2').on('click', function(){
        claim_card(2);
    });
    $('#newGameButton').click(function(){
        location.reload();
    });
    $('#undoButton').click(function(){
        undo_claim_card();
    });
});

function setup_cards(){
    console.log("Research Card Count: " + researchCards.length);
    console.log("Advanced Research Card Count: " + advancedResearchCards.length);
    shuffle(researchCards);
    shuffle(advancedResearchCards);
    for (let i = 0; i < 6; i++)
    {
        currentDeck.push("./images/ResearchCards/" + researchCards.at(i));
    }
    for (let i = 0; i < 6; i++)
    {
        currentDeck.push("./images/AdvancedResearchCards/" + advancedResearchCards.at(i));
    }
    shuffle(currentDeck);
    $('#cardSlot0').attr("src", currentDeck.at(0));
    currentRevealedCards.push(currentDeck.at(0));
    currentDeck.shift();
    $('#cardSlot1').attr("src", currentDeck.at(0));
    currentRevealedCards.push(currentDeck.at(0));
    currentDeck.shift();
    $('#cardSlot2').attr("src", currentDeck.at(0));
    currentRevealedCards.push(currentDeck.at(0));
    currentDeck.shift();
}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

function claim_card(cardIndex) {
    lastIndex.push(cardIndex)
    if(currentDeck.length > 0)
    {        
        let newCard = currentDeck[0];
        let claimedCard = currentRevealedCards[cardIndex];
        console.log("Claimed: " + claimedCard);
        claimedCards.push(claimedCard);
        currentRevealedCards[cardIndex] = newCard;
        currentDeck.shift();
        switch(cardIndex)
        {
            case 0:
                $('#cardSlot0').attr("src", currentRevealedCards.at(0));
                break;
            case 1:
                $('#cardSlot1').attr("src", currentRevealedCards.at(1));
                break;
            case 2:
                $('#cardSlot2').attr("src", currentRevealedCards.at(2));
                break;
        }
    }
    else
    {
        let claimedCard = currentRevealedCards[cardIndex];
        claimedCards.push(claimedCard);
        currentRevealedCards[cardIndex] = "nothing";
        switch(cardIndex)
        {
            case 0:
                $('#cardSlot0').hide();
                break;
            case 1:
                $('#cardSlot1').hide();
                break;
            case 2:
                $('#cardSlot2').hide();
                break;
        }
        if(claimedCards.length == 12)
        {
            alert("Game Over");
        }
    }
}

function undo_claim_card()
{
    if(lastIndex.length > 0)
    {
        var indexToReturnTo = lastIndex.pop();
        var cardToReturn = claimedCards.pop();
        console.log("Returned: " + cardToReturn);
        var cardToUndraw = currentRevealedCards[indexToReturnTo];
        if(cardToUndraw != "nothing")
        {
            currentDeck.unshift(cardToUndraw);
        }
        currentRevealedCards[indexToReturnTo] = cardToReturn;
        switch(indexToReturnTo)
        {
            case 0:
                $('#cardSlot0').show();    
                $('#cardSlot0').attr("src", currentRevealedCards.at(0));
                break;
            case 1:
                $('#cardSlot1').show();     
                $('#cardSlot1').attr("src", currentRevealedCards.at(1));
                break;
            case 2:
                $('#cardSlot2').show(); 
                $('#cardSlot2').attr("src", currentRevealedCards.at(2));
                break;
        }
    }
}