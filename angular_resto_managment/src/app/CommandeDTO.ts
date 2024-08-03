export interface CommandeDTO {
    id: number; 
    date: Date; 
    tableNumero: number; 
    platQuantities: { [platId: number]: number }; // Utilisation d'un objet pour représenter la Map<Long, Integer>
    platNames: { [platId: number]: string }; // Utilisation d'un objet pour représenter les noms des plats
    totalPrice: number; 
  }
  