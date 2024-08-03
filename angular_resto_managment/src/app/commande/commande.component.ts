import { Component, OnInit } from '@angular/core';
import { PanierService } from '../panier.service';
import { ActivatedRoute } from '@angular/router';
import { CommandeDTO } from '../CommandeDTO';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  commande!: CommandeDTO;
  commandeId!: number;
  isCommandeConfirmed = false; // Nouvelle variable pour suivre l'état de confirmation
  constructor(private route: ActivatedRoute, private panierService: PanierService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.panierService.getCommandeById(id).subscribe(
        (data: CommandeDTO) => {
          this.commande = data;
          console.log('Commande chargée:', this.commande);
          console.log('platNames:', this.commande.platNames);
        },
        error => console.error('Erreur lors du chargement de la commande:', error)
      );
    }
  }
  

  getPlatQuantities() {
    return Object.entries(this.commande.platQuantities).map(([key, value]) => ({
      key: Number(key),
      value,
      name: this.commande.platNames[Number(key)] || 'Nom inconnu'
    }));
  }
  confirmCommande() {
    if (this.commande && this.commande.id && !this.isCommandeConfirmed) {
      this.panierService.confirmCommande(this.commande.id).subscribe(
        (data: CommandeDTO) => {
          this.commande = data; // Mettre à jour la commande avec les nouvelles informations
          this.isCommandeConfirmed = true; // Marquer la commande comme confirmée
          alert('La commande a été confirmée avec succès !'); // Message d'alerte
          console.log('Commande confirmée:', this.commande);
        },
        error => {
          alert('Erreur lors de la confirmation de la commande'); // Message d'alerte en cas d'erreur
          console.error('Erreur lors de la confirmation de la commande:', error);
        }
      );
    } else {
      alert('La commande est déjà confirmée ou ID de la commande non trouvé'); // Message d'alerte si la commande est déjà confirmée ou ID non trouvé
      console.error('La commande est déjà confirmée ou ID de la commande non trouvé');
    }
  }
  
  
}