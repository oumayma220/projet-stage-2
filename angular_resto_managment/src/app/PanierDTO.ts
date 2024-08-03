export interface PanierDTO {
    id: number; // Correspond à Long en Java
    platQuantities: { [platId: number]: number }; // Map<Long, Integer> en Java
    platNames: { [platId: number]: string }; 
    platPrices: { [platId: number]: number }; // Ajouter cette ligne
// Map<Long, String> en Java
    totalPrice: number; // Correspond à Float en Java
  }
  