import { Component, Input, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { BusinessCardsService } from '../businessCards.service';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-update-info',
  templateUrl: './dialog-update-info.component.html',
  styleUrls: ['./dialog-update-info.component.css']
})
export class DialogUpdateInfoComponent implements OnDestroy {
  @Input() card: any;
  sub = new Subscription();

  constructor(
    public dialog: MatDialog,
    ) { }

  openDialogTwo() {
    const config = new MatDialogConfig;
    config.data = this.card;
    const dialogRef = this.dialog.open(DialogUpdateInfoContent, config);
    
   const tempSub = dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    this.sub.add(tempSub)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

@Component({
  selector: 'dialog-update-info-content',
  templateUrl: 'dialog-update-info-content.html',
  styleUrls: ['./dialog-update-info-content.css']
})
export class DialogUpdateInfoContent implements OnInit {
  updateFormGroup: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private snackbar: MatSnackBar,
    public businessCardsService: BusinessCardsService,
    public dialogRef: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public card: any) {}

    ngOnInit(): void {
      this.updateFormGroup =  this.formBuild.group({
        id: this.card.id,
        firstName: this.card.firstName,
        lastName : this.card.lastName,
        email: this.card.email,
        phone: this.card.phone
      });
    }

  updateBusinessCard() {
    this.businessCardsService.updateBusinessCard(this.updateFormGroup.value.id, this.updateFormGroup.value)
    .then(() => {
      this.dialogRef.close();
      this.openSnackBar('BUSINESS CARD UPDATED', 'OK', 'green-snackbar');
    })
    .catch(() => {
      this.openSnackBar('COULD NOT UPDATE THE BUSINESS CARD', 'OK', 'gray-snackbar');
    })
    
  }

  openSnackBar(message: string, action: string, className: string) {
    this.snackbar.open(message, action, {
      duration: 7000,
      panelClass: [className],
    });
  }
}
