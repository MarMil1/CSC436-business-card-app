import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BusinessCard } from './businessCard';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardsService {
  private cardsCollection: AngularFirestoreCollection<BusinessCard>;
  businessCards: Observable<BusinessCard[]>;

  constructor(private afs: AngularFirestore) { 
    this.cardsCollection = afs.collection<BusinessCard>('businessCards');
    this.businessCards = this.cardsCollection.valueChanges(); 
  } 

  addBusinessCard(card: BusinessCard) {
    const id = this.afs.createId();
    card.id = id;
    return this.cardsCollection.doc(id).set(card);
  }

  updateBusinessCard(id: string, card: BusinessCard) {
    return this.cardsCollection.doc(id).update(card);
  }

  removeBusinessCard(id: string) {
    return this.cardsCollection.doc(id).delete();
  }

}
