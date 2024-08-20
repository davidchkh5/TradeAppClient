import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemService } from '../_services/item.service';
import { ToastrService } from 'ngx-toastr';
import { Item } from '../_models/item';
import { FileSystemFileEntry, FileSystemDirectoryEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { forEach } from 'lodash';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
  
})
export class AddItemsComponent {
//IN || OUT
@Output() addedITem = new EventEmitter<Item>();

  //Injection
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<AddItemsComponent>);
  itemsService = inject(ItemService);
  toastr = inject(ToastrService);

  //Initialization
  form : FormGroup;
  selectedFiles: File[] = [];
  allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];


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

    console.log(this.selectedFiles[0].stream);




    this.itemsService.addItems(formData).subscribe((result : Item) => {

      this.addedITem.emit(result);

       
      this.toastr.success("Added successfully");
      
    },
    (error) => {
      this.toastr.error("Error"); 
      console.log(error);
    }
  );


    this.dialogRef.close(formData); // Close the dialog and pass the form data
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  
  onFileDrop(files: NgxFileDropEntry[]) {
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const droppedFile = files[i];

        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

          fileEntry.file((file: File) => {
            if(this.allowedTypes.includes(file.type)){
              this.selectedFiles.push(file);
              console.log(`File dropped: ${file.name}`);

            }else {
              this.toastr.warning(`For file ${file.name} This type of file is not able to upload`);
            }

    
          });
        } else {

          console.log(`Dropped directory: ${droppedFile.relativePath}`);
        }
      }
    }
  }


  onFileOver(event: any) {
    console.log('File over');
  }

  onFileLeave(event: any) {
    console.log('File leave');
  }


  clearFiles() {
    this.selectedFiles = [];
  }


  


}
