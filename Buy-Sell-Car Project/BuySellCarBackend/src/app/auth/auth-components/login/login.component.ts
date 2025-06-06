import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  isSpinning:boolean = false;

  constructor(private fb: FormBuilder,
    private service: AuthService,
    private message: NzMessageService,
    private router: Router
  ){
    this.loginForm = this.fb.group({
      email : [null, [Validators.required, Validators.email]],
      password : [null, [Validators.required]],
    })
  }

  login(){
    this.isSpinning = true;
    this.service.login(this.loginForm.value).subscribe((res) => {
      if(res.userId != null){
        const user = {
          id: res.userId,
          role: res.userRole
        }
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);
        if(StorageService.isAdminLoggedIn())
          this.router.navigateByUrl("/admin/dashboard");
        else if (StorageService.isCustomerLoggedIn())
          this.router.navigateByUrl("/customer/dashboard");
      }
      else{
        this.message.error("Bad credentials", {nzDuration: 5000})
      }
      this.isSpinning = false;
    })
  }

}
