import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TableRestaurant } from '../TableRestaurant';
import { User } from '../user';

@Component({
  selector: 'app-modifiertable',
  templateUrl: './modifiertable.component.html',
  styleUrls: ['./modifiertable.component.css']
})
export class ModifiertableComponent implements OnInit {
  table: TableRestaurant = {
    numero: 0,
    userId: 0,
    etat: '' // Initialisé avec une chaîne vide
  };
  tableId!: number;
  errorMessage: string = '';
  users: User[] = []; // Liste des utilisateurs
  selectedUserId: number | null = null; // ID utilisateur sélectionné


  constructor(
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tableId = +this.route.snapshot.paramMap.get('id')!; // Récupérer l'ID de la route
    this.getTableById();
    this.loadUsers(); // Charger la liste des utilisateurs

  }

  getTableById(): void {
    this.registrationService.getTableById(this.tableId).subscribe({
      next: (table) => {
        this.table = table;
        this.selectedUserId = this.table.userId; // Assigner l'ID utilisateur sélectionné
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la table:', err);
        // Gérez l'erreur ici
      }
    });
  }

  loadUsers(): void {
    this.registrationService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs:', err);
        // Gérez l'erreur ici
      }
    });
  }

  onUserChange(event: any): void {
    this.selectedUserId = +event.target.value; // Met à jour l'ID utilisateur sélectionné
    this.table.userId = this.selectedUserId; // Met à jour le champ userId de la table
  }

  updateTable(): void {
    this.registrationService.updateTable(this.tableId, this.table).subscribe({
      next: () => {
        this.router.navigate(['/table']);
      },
      error: (err) => {
        if (err.status === 404) {
          this.errorMessage = 'User ID n\'existe pas.';
        } else {
          this.errorMessage = 'Erreur lors de la mise à jour de la table. Veuillez vérifier les données.';
        }
      }
    });
  }
}