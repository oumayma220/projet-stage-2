import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
user = new User();
msg='';
email:string | undefined ;
  constructor(private _service:RegistrationService, private _router:Router,private authService:AuthService){    
  }
  ngOnInit(): void {  
  }
  currentUser = this.authService.currentUserValue;
  loginUser(){
    this._service.loginUserFromRemote(this.user).subscribe(
      data=>{
        localStorage.setItem("accessToken",data.accessToken)
        this.authService.getCurrentUser()
    },
    Error=>{
      console.log("exception occured");
      this.msg="Bad credenials,please enter valid email and password"
    })}
  gotoregistration(){
    this._router.navigate(['/registration'])
  }  
}


