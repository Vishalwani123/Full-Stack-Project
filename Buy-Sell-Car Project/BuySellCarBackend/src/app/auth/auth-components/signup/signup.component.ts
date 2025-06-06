import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm!: FormGroup;
  isSpinning:boolean = false;

  constructor(private fb: FormBuilder,
    private service:AuthService,
  ){
    this.signupForm = this.fb.group({
      name : [null, [Validators.required]],
      email : [null, [Validators.required, Validators.email]],
      password : [null, [Validators.required]],
      confirmPassword : [null, [Validators.required], this.confirmationValidator],
    })
  }

confirmationValidator = (control: FormControl): { [s: string]: boolean} => {
  if(!control.value)
    return {require: true};
  else if (control.value !== this.signupForm.controls["password"].value)
    return { confirm: true, error: true};
  return {};
}

  signup(){
    console.log(this.signupForm.value);
    this.service.register(this.signupForm.value).subscribe((res)=>{
      console.log(res);
    })
  }
}
