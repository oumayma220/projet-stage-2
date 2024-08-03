import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { TableRestaurant } from '../TableRestaurant';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-addtable',
  templateUrl: './addtable.component.html',
  styleUrls: ['./addtable.component.css']
})
export class AddtableComponent implements OnInit {
  table: TableRestaurant = {
    numero: 0,
    userId: 0,
    etat: '' // Initialisé avec une chaîne vide
  };
  users: User[] = [];  // Liste des utilisateurs
  errorMessage: string = '';


  constructor(private registrationService: RegistrationService, private router:Router) {}
  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(): void {
    this.registrationService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        this.errorMessage = 'Erreur lors de la récupération des utilisateurs.';
      }
    });
  }

  // Méthode pour ajouter une table
  addTable(): void {
    this.registrationService.createTable(this.table).subscribe({
      next: (response) => {
        console.log('Table ajoutée avec succès!', response);
        this.router.navigateByUrl('/table');
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de la table:', error);
        if (error.status === 404) {
          this.errorMessage = 'User ID n\'existe pas.';
        } else {
          this.errorMessage = 'Erreur lors de l\'ajout de la table. Veuillez vérifier les données.';
        }
      }
    });
  }
}