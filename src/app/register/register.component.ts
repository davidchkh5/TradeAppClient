import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
   registerForm: FormGroup;
  @Output() cancelRegister = new EventEmitter();
  public model : any = {};
  constructor(private accountService: AccountService, private fb: FormBuilder, private toast: ToastrService){

   this.registerForm =  this.fb.group ({

    gender: ['male'],
    username: ['', Validators.required],
    knownAs: ['', Validators.required],
    password: ['', [Validators.required,
    Validators.minLength(4),Validators.maxLength(8)]],
    city: ['', Validators.required],  
    country: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    
  })

  }
  
  register(){

    const values = this.registerForm.value;

    this.accountService.registerUser(values).subscribe(
      response => {
        console.log("User registered successfully", response);
      },
      error => {
        this.toast.error(error);
      }
    )
  }

  cancel(){
    this.cancelRegister.emit(false);
  }


}
