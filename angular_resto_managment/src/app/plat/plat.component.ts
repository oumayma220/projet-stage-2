import { Component, OnInit } from '@angular/core';
import { Plat } from '../plat';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.css']
})
export class PlatComponent implements OnInit {
  plats: Plat[] = [];

  constructor(private registrationService: RegistrationService , public authService: AuthService, private router:Router) {}

  ngOnInit() {
    this.registrationService.getAllPlats().subscribe(
      data => {
        this.plats = data;
      },
      error => {
        console.error('Erreur lors de la récupération des plats:', error);
      }
    );
  }
  deletePlat(id: number) {
    let conf=confirm("Are you sure to delete?");
    if (conf==false) return;
    this.registrationService.deletePlat(id).subscribe(
      () => {
        console.log('plat supprimé avec succès.');
        // Effectuer des actions supplémentaires après la suppression de l'utilisateur si nécessaire
      },
      error => {
        console.error('Une erreur s\'est produite lors de la suppression de l\'utilisateur:', error);
        // Gérer les erreurs de suppression de l'utilisateur ici
      }
    );
  }
  currentUser: User = new User();
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }  
}
      

