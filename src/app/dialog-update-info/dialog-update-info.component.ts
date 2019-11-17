import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-update-info',
  templateUrl: './dialog-update-info.component.html',
  styleUrls: ['./dialog-update-info.component.css']
})
export class DialogUpdateInfoComponent {

  constructor(public dialog: MatDialog) { }

  openDialogTwo() {
    const dialogRef = this.dialog.open(DialogUpdateInfoContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dialog-update-info-content',
  templateUrl: 'dialog-update-info-content.html',
  styleUrls: ['./dialog-update-info-content.css']
})
export class DialogUpdateInfoContent {}
