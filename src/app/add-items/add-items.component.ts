import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemService } from '../_services/item.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
  
})
export class AddItemsComponent {

  //Injection
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<AddItemsComponent>);
  itemsService = inject(ItemService);
  toastr = inject(ToastrService);
  //Initialization
  form : FormGroup;
  selectedFiles: File[] = [];


  constructor(){
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      tradeFor: new FormControl('', Validators.required),
    });
  }

  
  onFileChange(event: any){
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }

  }

  onCancel() {
    this.dialogRef.close();
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('tradeFor', this.form.get('tradeFor')?.value);

    this.selectedFiles.forEach(file => {
      formData.append('files', file, file.name);
    });

    console.log("FormData");
    console.log(formData);
    this.itemsService.addItems(formData).subscribe(() => {
      console.log("successfully added");
      this.toastr.success("Added successfully");
      
    },
    (error) => {
      this.toastr.error("Error"); 
      console.log(error);
    }
  );


    this.dialogRef.close(formData); // Close the dialog and pass the form data
  }


  

  clearFiles() {
    this.selectedFiles = [];
  }


  


}
