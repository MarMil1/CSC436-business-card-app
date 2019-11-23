import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BusinessCard } from '../businessCard';
import { BusinessCardsService } from '../businessCards.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-new-card',
  templateUrl: './add-new-card.component.html',
  styleUrls: ['./add-new-card.component.css']
})
export class AddNewCardComponent implements OnInit {
  base64 = '';
  newBusinessCard: BusinessCard;
  private formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private businessCardsService: BusinessCardsService,
    private snackbar: MatSnackBar) {
   }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      'firstName': [''],
      'lastName': [''],
      'email': [''],
      'phone': ['']
    });
  }

  getBase64(base64) {
    this.base64 = base64;
    // console.log(this.base64);
  }

  submit() {
    this.newBusinessCard = this.formGroup.value;
    this.newBusinessCard.snapshot = this.base64;

    this.businessCardsService.addBusinessCard(this.newBusinessCard)
    .then(res => {
      this.openSnackBar('NEW BUSINESS CARD ADDED', 'OK', 'green-snackbar');
      console.log('ADDED!');
    })
    .catch(err => {
      this.openSnackBar('COULD NOT ADD BUSINESS CARD', 'OK', 'gray-snackbar');
      console.log('ERROR!!!!!');
      
    });

    console.log(this.newBusinessCard);
    
  }

  openSnackBar(message: string, action: string, className: string) {
    this.snackbar.open(message, action, {
      duration: 5000,
      panelClass: [className],
    });
  }

  getTextsFromWebCam(textsFromWebCam) {
    this.formGroup = this.formBuilder.group({
      'firstName': textsFromWebCam.fname,
      'lastName': textsFromWebCam.lname,
      'email': textsFromWebCam.email,
      'phone': textsFromWebCam.phone
    });
    
  }

}
