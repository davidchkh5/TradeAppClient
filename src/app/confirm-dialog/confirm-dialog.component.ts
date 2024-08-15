import { Component, Inject, inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  //injection

  dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  data = inject(MAT_DIALOG_DATA) as { message: string };

  


  onConfirm() : void {
    this.dialogRef.close(true);
  }

  onCancel() : void {
    this.dialogRef.close(false);
  }




}
