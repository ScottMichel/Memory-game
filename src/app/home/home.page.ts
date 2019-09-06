import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public cardList: Array<{name: string, currentImg: string, revealed: boolean}> = [];

  public numberOfDistinctCards = 2;

  public numberOfCardsPerRow = 2;

  private questionMarkUrl = '/assets/imgs/question-mark.png'; 

  private hasRevealedCard = false;

  private previousCard;

  public numberOfRevealedCards =0;

  previousCardIndex: number;

  constructor() {
    this.generateDeck();
    }

  private generateDeck(){
    //Boucle pour générer une liste de paires de cartes
    for(let i=0; i< this.numberOfDistinctCards; i++){
      let imgUrl = '/assets/imgs/cards/' + i + '.png';
      this.cardList.push(
        {name: imgUrl, revealed: false, currentImg: this.questionMarkUrl}
        );
      this.cardList.push(
        {name: imgUrl, revealed: false, currentImg: this.questionMarkUrl}
        );
    }

    this.shuffleDeck();

    console.log(this.cardList);
  }

    //Le mélange des cartes
  private shuffleDeck(){
    this.cardList.forEach(
      (item, index, deck) => {
        let newPos = Math.floor(Math.random() * deck.length);
        deck [index] = deck[newPos];
        deck[newPos] = item;
      }
     );
    }

    private revealCard(card, index){
      //Affichage de la carte
      card.currentImg = card.name;
      card.revealed = true;
      this.hasRevealedCard = true

      //test de la carte précédente pour déterminer si on a une paire
      if(this.previousCard && this.previousCard.name == card.name && index != this.previousCardIndex){
        this.previousCard.currentImg = card.name;
        this.previousCard.reveales = true;
        this.hasRevealedCard = false; 
        this.numberOfRevealedCards++;
      } else {
      //Masquage de la carte au bout d'un certain délais
      setTimeout(
        ()=> {this.hideCard(card, index)}, 1000
      ); 
      }
    }


  hideCard(card: any, index:number) {
    card.currentImg = this.questionMarkUrl;
    card.revealed = false; 
    this.hasRevealedCard = false;
    this.previousCard = card;
    this.previousCardIndex = index;
  }
    
    public flipCard(card, index){
      if (! card.revealed && ! this.hasRevealedCard){
        this.revealCard(card, index);
      }
    }

    //On va demander a la fonction de réinitialiser les variables, score a zero, cacher les cartes de nouveau
    //réinitialiser la carte précédente, et régénérer le jeu.
  public playAgain() {
    this.numberOfRevealedCards = 0;
    this.hasRevealedCard = false;
    this.previousCard = null;
    this.previousCardIndex = null;


    //this.cardList va lancer un tableau vide et le this.generateDeck va de nouveau 
    //Instancier un nouveau jeu.
    this.cardList = [];
    this.generateDeck();
  }

}
