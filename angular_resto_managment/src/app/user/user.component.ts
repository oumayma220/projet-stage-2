import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  pageTitle: string = 'Liste des utilisateurs';
  userlist: User[]= [];
  userId!: number ;
  editMode: boolean = true;
  newFullname: string="";
newEmail: string="";
userForm!: FormGroup;
selectedUserId!: number; 
  constructor( private _service:RegistrationService, private http:HttpClient,private formBuilder: FormBuilder,
    private route: ActivatedRoute,private router: Router,){}
  ngOnInit():void {
    
    this._service.getUsers().subscribe(data=>{
      console.log("bbbbbbbbb",data);
      this.userlist=data})
    }
    deleteUser(userId: number) {
      let conf=confirm("Are you sure to delete?");
      if (conf==false) return;
      
      this._service.deleteUser(userId).subscribe(
        () => {
          console.log('Utilisateur supprimé avec succès.');
          // Effectuer des actions supplémentaires après la suppression de l'utilisateur si nécessaire
        },
        error => {
          console.error('Une erreur s\'est produite lors de la suppression de l\'utilisateur:', error);
          // Gérer les erreurs de suppression de l'utilisateur ici
        }
      );
    }
    
    
  
  

}
