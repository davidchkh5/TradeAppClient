import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-input',
  templateUrl: './edit-input.component.html',
  styleUrls: ['./edit-input.component.css']
})
export class EditInputComponent implements OnInit{

  @Input() label: string = '';
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Input() editAble: boolean = true;
  @Input() formGroup!: FormGroup;
  @Input() value: string = '';
  fb = inject(FormBuilder);


  ngOnInit(): void {
    
    if (!this.formGroup) {
      console.error('formGroup input is required');
      return;
    }


    if (!this.formGroup.get(this.name)) {
      this.formGroup.addControl(this.name, this.fb.control('')); // Added this block
    }
  }

  // editForm: FormGroup;
  // fb = inject(FormBuilder);



  // constructor() {
  //   this.editForm = this.fb.group ({

  //     gender: ['male'],
  //     username: ['', Validators.required],
  //     knownAs: ['', Validators.required],
  //     password: ['', [Validators.required,
  //     Validators.minLength(4),Validators.maxLength(8)]],
  //     city: ['', Validators.required],  
  //     country: ['', Validators.required],
  //     address: ['', Validators.required],
  //     phoneNumber: ['', Validators.required],
  //     email: ['', [Validators.email, Validators.required]],
      
  //   })
  // }

}
