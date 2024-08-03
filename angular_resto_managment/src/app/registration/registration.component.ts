import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  fullname:string="";
  email:string="";
  password:string="";
  user=new User();
  msg='';
  newUserFormGroup! : FormGroup;
  constructor(private _service:RegistrationService, private _router:Router ){

  }
  ngOnInit(): void {
  
  }
  registerUser(){
    this._service.registerUserFromRemote(this.user).subscribe(
      data=>{
        console.log("response received");
        this._router.navigate(['/loginsuccess'])     },
      error =>{
        console.log("exception occured");
        this.msg=error.error;
      }
    )
  }
  gotopage(){
    this._router.navigate(['/login'])
  }


}

