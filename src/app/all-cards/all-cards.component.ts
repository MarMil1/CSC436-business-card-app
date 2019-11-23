import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusinessCardsService } from '../businessCards.service';
import { BusinessCard } from '../businessCard';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.css']
})
export class AllCardsComponent implements OnInit, OnDestroy {
  businessCardList: BusinessCard[];
  public searchText : string;
  public businessCards : any;
  sub: Subscription;

  constructor(
    private businessCardsService: BusinessCardsService,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.sub = new Subscription();
    const tempSub = this.businessCardsService.businessCards
    .subscribe((cards: BusinessCard[]) => {
      this.businessCardList = cards
    });
    this.sub.add(tempSub);
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  removeCard(card: any) {
    this.businessCardsService.removeBusinessCard(card.id)
    .then(() => {
      this.openSnackBar('BUSINESS CARD DELETED', 'OK', 'green-snackbar');
    })
    .catch(() => {
      this.openSnackBar('COULD NOT DELETE THE BUSINESS CARD', 'OK', 'gray-snackbar');
    })

  }

  openSnackBar(message: string, action: string, className: string) {
    this.snackbar.open(message, action, {
      duration: 7000,
      panelClass: [className],
    });
  }

}
