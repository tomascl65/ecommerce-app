import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Notification {
  
  showError(message: string): void {
    // Mostrar notificación al usuario
    console.error('Error:', message);
    alert(`Error: ${message}`);
  }
}
