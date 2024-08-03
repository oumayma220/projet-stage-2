import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent  implements OnInit {
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
        this._router.navigate(['/adminpage'])     },
      error =>{
        console.log("exception occured");
        this.msg=error.error;
      }
    )
  }

}
