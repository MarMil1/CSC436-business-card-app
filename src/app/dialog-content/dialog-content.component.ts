import { Component, Input, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnDestroy {

  @Input() card: any;
  sub = new Subscription();

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const config = new MatDialogConfig;
    config.data = this.card;
    console.log(config.data);
    
    const dialogRef = this.dialog.open(DialogContentDialog, config);

    const tempSub = dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    this.sub.add(tempSub);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

@Component({
  selector: 'dialog-content-dialog',
  templateUrl: 'dialog-content-dialog.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public info: any) {}
  
  onNoClick(): void {
    console.log(this.info);
    this.dialogRef.close();
  }
  
}
