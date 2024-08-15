import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
  
})
export class AddItemsComponent {

  //Injection
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<AddItemsComponent>);

  form : FormGroup;


  constructor(){
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      tradeFor: new FormControl('', Validators.required),
    });
  }

  
  

  onCancel() {
    this.dialogRef.close();
  }

}
