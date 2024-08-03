import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addplat',
  templateUrl: './addplat.component.html',
  styleUrls: ['./addplat.component.css']
})
export class AddplatComponent implements OnInit {
  url: any;
  imageName: string = "Aucune image n'a été selectionné";
  formulaireForm = new FormGroup({
    platName: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
    price: new FormControl(null, [Validators.required])
  });
  constructor(private registrationService: RegistrationService, private router:Router) {}

  
  ngOnInit(): void {
  }
  saveform() {
    let payload = JSON.stringify(this.formulaireForm.value);
    const formData: FormData = new FormData();
    formData.append('image', this.url);
    formData.append('subject', payload);
    this.registrationService.createPlat(formData).subscribe(
      {
        next:() =>{
          this.router.navigateByUrl('/adminpage');
        },
        error:(err) =>{
          if(err.status === 406)
            this.router.navigateByUrl('/adminpage');
        },
        complete:()=>{
          this.router.navigateByUrl('/adminpage');
        }
      }
    );
  }

  onSelectFile(event: any) {
    var reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file); // Pass 'file' instead of 'event.target.file'
    reader.onload = event => {
      this.url = event.target?.result;
      this.imageName = file.name;
    }
  }




}
