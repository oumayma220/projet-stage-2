import { Component, OnInit } from '@angular/core';
import { Plat } from '../plat';
import { RegistrationService } from '../registration.service';
import { PanierService } from '../panier.service';

@Component({
  selector: 'app-loginsuccess',
  templateUrl: './loginsuccess.component.html',
  styleUrls: ['./loginsuccess.component.css']
})
export class LoginsuccessComponent implements OnInit {
  plats: Plat[] = [];
  panierId!: number;
  addedPlatIds: Set<number> = new Set();

  constructor(private registrationService: RegistrationService, private panierService: PanierService) {}

  ngOnInit() {
    this.panierId = Number(localStorage.getItem("panierId"));

    if (this.panierId) {
      // Charger les plats actuellement dans le panier
      this.loadPlatsInPanier();
    } else {
      console.error('Panier ID non trouvé');
    }
  }

  loadPlatsInPanier() {
    this.panierService.getPanierById(this.panierId).subscribe(
      panier => {
        this.addedPlatIds = new Set(Object.keys(panier.platQuantities).map(id => parseInt(id)));
        localStorage.setItem('addedPlatIds', JSON.stringify(Array.from(this.addedPlatIds)));
        this.loadPlats(); // Charger les plats disponibles après avoir mis à jour les plats dans le panier
      },
      error => {
        console.error('Erreur lors du chargement des plats dans le panier:', error);
      }
    );
  }

  loadPlats() {
    this.registrationService.getAllPlats().subscribe(
      data => {
        this.plats = data;
      },
      error => {
        console.error('Erreur lors de la récupération des plats:', error);
      }
    );
  }

  addToPanier(platId: number, quantity: number) {
    if (this.panierId) {
      this.panierService.addPlatToPanier(this.panierId, platId, quantity).subscribe(
        response => {
          console.log('Plat ajouté au panier avec succès:', response);
          this.addedPlatIds.add(platId);
          localStorage.setItem('addedPlatIds', JSON.stringify(Array.from(this.addedPlatIds)));
        },
        error => {
          console.error('Erreur lors de l\'ajout du plat au panier:', error);
        }
      );
    } else {
      console.error('Panier ID non trouvé');
    }
  }

  removePlat(platId: number) {
    if (this.panierId) {
      this.panierService.removePlatFromPanier(this.panierId, platId).subscribe(
        () => {
          console.log('Plat supprimé du panier avec succès');
          this.addedPlatIds.delete(platId);
          localStorage.setItem('addedPlatIds', JSON.stringify(Array.from(this.addedPlatIds)));
        },
        error => {
          console.error('Erreur lors de la suppression du plat du panier:', error);
        }
      );
    } else {
      console.error('Panier ID non trouvé');
    }
  }

  isPlatAdded(platId: number): boolean {
    return this.addedPlatIds.has(platId);
  }
}