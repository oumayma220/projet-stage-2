import { Component, OnInit } from '@angular/core';
import { TableRestaurant } from '../TableRestaurant';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  tables: TableRestaurant[] = [];

  constructor(private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.registrationService.getAllTables().subscribe(
      (data: TableRestaurant[]) => {
        this.tables = data;
        console.log(this.tables); // Verify userId is present here
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des tables', error);
      }
    );
  }
  deleteTable(id?: number): void {
    if (id === undefined) {
      console.error('ID de la table est undefined.');
      return;
    }
  
    if (confirm('Êtes-vous sûr de vouloir supprimer cette table ?')) {
      this.registrationService.deleteTable(id).subscribe({
        next: () => {
          this.tables = this.tables.filter(table => table.id !== id);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la table:', err);
          // Gérez l'erreur ici
        }
      });
    }
  }
}