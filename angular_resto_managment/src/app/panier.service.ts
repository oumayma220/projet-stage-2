import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CommandeDTO } from './CommandeDTO';
import { PanierDTO } from './PanierDTO';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private baseUrl = "http://localhost:8081/rest/paniers";
  private commandeUrl = "http://localhost:8081/rest/commandes"; 
  private panierItemCountSubject = new BehaviorSubject<number>(0);
  panierItemCount$ = this.panierItemCountSubject.asObservable();


  
  constructor(private http: HttpClient) { }
  public updatePanierItemCount(panierId: number): void {
    this.getPanierById(panierId).subscribe(panier => {
      const itemCount = panier ? Object.keys(panier.platQuantities).length : 0;
      this.panierItemCountSubject.next(itemCount);
    });
  }

  public createPanier(): Observable<PanierDTO> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
      
    return this.http.post<PanierDTO>(`${this.baseUrl}/create`, null, { headers });
  }

  public addPlatToPanier(panierId: number, platId: number, quantity: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
    
    const params = new HttpParams()
      .set('panierId', panierId.toString())
      .set('platId', platId.toString())
      .set('quantity', quantity.toString());
  
      return this.http.post<any>(`${this.baseUrl}/addPlat`, null, { headers, params }).pipe(
        tap(() => this.updatePanierItemCount(panierId)) // Recharger le nombre d'éléments après ajout
      );
    }

  public removePlatFromPanier(panierId: number, platId: number): Observable<PanierDTO> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
    
    const params = new HttpParams()
      .set('panierId', panierId.toString())
      .set('platId', platId.toString());
    
      return this.http.delete<PanierDTO>(`${this.baseUrl}/removePlat`, { headers, params }).pipe(
        tap(() => this.updatePanierItemCount(panierId)) // Recharger le nombre d'éléments après suppression
      );
    }

  public updatePlatQuantityInPanier(panierId: number, platId: number, quantity: number): Observable<PanierDTO> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
    
    const params = new HttpParams()
      .set('panierId', panierId.toString())
      .set('platId', platId.toString())
      .set('quantity', quantity.toString());
  
      return this.http.put<PanierDTO>(`${this.baseUrl}/updatePlatQuantity`, null, { headers, params }).pipe(
        tap(() => this.updatePanierItemCount(panierId)) // Recharger le nombre d'éléments après mise à jour
      );
    }
  

  public calculateTotal(panierId: number): Observable<number> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
    
    const params = new HttpParams()
      .set('panierId', panierId.toString());
    
    return this.http.get<number>(`${this.baseUrl}/calculateTotal`, { headers, params });
  }

  public getPanierById(id: number): Observable<PanierDTO> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
    
    return this.http.get<PanierDTO>(`${this.baseUrl}/${id}`, { headers });
  }

  public deletePanier(id: number): Observable<void> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
    
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers });
  }

  public convertPanierToCommande(panierId: number, tableId: number): Observable<CommandeDTO> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
    
    const params = new HttpParams()
      .set('panierId', panierId.toString())
      .set('tableId', tableId.toString());
    
    return this.http.post<CommandeDTO>(`${this.baseUrl}/convertToCommande`, null, { headers, params });
  }
  public confirmCommande(commandeId: number): Observable<CommandeDTO> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
    
    return this.http.post<CommandeDTO>(`${this.commandeUrl}/${commandeId}/confirm`, null, { headers });
  }





  public getCommandeById(commandeId: number): Observable<CommandeDTO> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
    
    return this.http.get<CommandeDTO>(`${this.commandeUrl}/${commandeId}`, { headers });
  }
  public getRevenuByTableForDate(tableId: number, date: string): Observable<number> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
    
    const params = new HttpParams()
      .set('tableId', tableId.toString())
      .set('date', date);
    
    return this.http.get<number>(`${this.commandeUrl}/revenu`, { headers, params });
  }


}