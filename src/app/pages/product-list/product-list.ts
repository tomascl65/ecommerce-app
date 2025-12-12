import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  get searchTermControl(): FormControl {
    return this.searchForm.get('searchTerm') as FormControl;
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      const searchTerm = this.searchForm.get('searchTerm')?.value;
      console.log('Buscar productos:', searchTerm);
      // Aquí se implementaría la lógica de búsqueda
    }
  }
}
