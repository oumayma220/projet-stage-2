import { Component, OnInit } from '@angular/core';
import { PanierService } from '../panier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent  implements OnInit {
  revenuForm: FormGroup;
  revenu: number | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private panierService: PanierService) {
    this.revenuForm = this.fb.group({
      tableId: [''],
      date: ['']
    });
  }
  ngOnInit(): void {
    this.revenuForm = this.fb.group({
      tableId: [null, [Validators.required, Validators.min(1)]],
      date: [null, Validators.required]
    });
  }

    getRevenu(): void {
      if (this.revenuForm.valid) {
        const tableId = this.revenuForm.get('tableId')?.value;
        const date = this.revenuForm.get('date')?.value;
  
        this.panierService.getRevenuByTableForDate(tableId, date).subscribe(
          (data: number) => {
            this.revenu = data;
            this.error = null;
          },
          (error) => {
            this.revenu = null;
            this.error = 'An error occurred while fetching the revenue.';
          }
        );
      } else {
        this.revenu = null;
        this.error = 'Please fill in all required fields correctly.';
      }
    }
}
