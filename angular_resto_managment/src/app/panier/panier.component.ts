import { Component, OnInit } from '@angular/core';
import { CommandeDTO } from '../CommandeDTO';
import { PanierService } from '../panier.service';
import { PanierDTO } from '../PanierDTO';
import { Plat } from '../plat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  panier!: PanierDTO;
  plats: Plat[] = [];
  platIds: number[] = [];
  updatedQuantity: { [platId: number]: number } = {};
  totalPrice: number = 0;
  tableNumero: number = 0;
  addedPlats: Set<number> = new Set();

  constructor(private panierService: PanierService, private router: Router) {}

  ngOnInit(): void {
    this.loadPanier();
    this.loadPlats();
  }

  loadPanier() {
    const panierId = Number(localStorage.getItem("panierId"));
    if (panierId) {
      this.panierService.getPanierById(panierId).subscribe(
        data => {
          this.panier = data;
          this.platIds = Object.keys(this.panier.platQuantities).map(id => parseInt(id));
          
          // Initialiser les quantités par défaut
          this.platIds.forEach(id => {
            this.updatedQuantity[id] = this.panier.platQuantities[id];
          });
          
          this.calculateTotal();
        },
        error => console.error('Erreur lors du chargement du panier:', error)
      );
    }
  }
  
  loadPlats() {
    // Remplacez ceci par une vraie méthode pour obtenir tous les plats si nécessaire
    this.panierService.getPanierById(Number(localStorage.getItem("panierId"))).subscribe(
      panierData => {
        this.platIds = Object.keys(panierData.platQuantities).map(id => parseInt(id));
        this.plats = this.platIds.map(platId => ({
          id: platId,
          platName: panierData.platNames[platId],
          description: '', // Ajoutez la logique pour obtenir la description si nécessaire
          price: panierData.platPrices[platId] || 0, // Utiliser le prix maintenant disponible
          image: '' // Ajoutez la logique pour obtenir l'image si nécessaire
        }));
      },
      error => console.error('Erreur lors du chargement des plats:', error)
    );
  }

  removePlat(platId: number) {
    const panierId = Number(localStorage.getItem("panierId"));
    if (panierId) {
      this.panierService.removePlatFromPanier(panierId, platId).subscribe(
        () => {
          this.plats = this.plats.filter(plat => plat.id !== platId); // Retirer le plat de la liste affichée
          delete this.updatedQuantity[platId]; // Supprimer la quantité du plat
          this.calculateTotal(); // Recalculer le total du panier
        },
        error => console.error('Erreur lors de la suppression du plat du panier:', error)
      );
    }
  }

  onQuantityChange(platId: number, quantity: number) {
    this.updatedQuantity[platId] = quantity;
    this.updateQuantity(platId);
  }

  updateQuantity(platId: number): void {
    const panierId = Number(localStorage.getItem("panierId"));
    const quantity = this.updatedQuantity[platId];
  
    this.panierService.updatePlatQuantityInPanier(panierId, platId, quantity)
      .subscribe(
        response => {
          console.log('Quantité mise à jour avec succès', response);
          // Recalculer le total
          this.calculateTotal();
        },
        error => {
          console.error('Erreur lors de la mise à jour de la quantité:', error);
        }
      );
  }
  
  calculateTotal() {
    const panierId = Number(localStorage.getItem("panierId"));
    if (panierId) {
      this.panierService.calculateTotal(panierId).subscribe(
        total => this.totalPrice = total,
        error => console.error('Erreur lors du calcul du total:', error)
      );
    }
  }
  
  convertPanierToCommande() {
    const panierId = Number(localStorage.getItem("panierId"));
    if (panierId && this.tableNumero > 0) { // Vérifiez que tableNumero est valide
      this.panierService.convertPanierToCommande(panierId, this.tableNumero).subscribe(
        (commande: CommandeDTO) => {
          console.log('Commande créée avec succès:', commande);
          // Rediriger vers la composante de détails de la commande
          this.router.navigate(['/commande', commande.id]); // Assurez-vous que la route et l'ID sont corrects
        },
        error => console.error('Erreur lors de la conversion du panier en commande:', error)
      );
    } else {
      console.error('Numéro de table invalide');
    }
  }
}