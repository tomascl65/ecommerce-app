import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Notification {
  showError(message: string): void {
    // Mostrar notificación
    console.error('Error:', message);
    alert(`Error: ${message}`);
  }
}
