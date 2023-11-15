import { Component } from '@angular/core';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent {

  isCheckboxChecked: boolean = false;
  isSubmitted: boolean = false;
  showError: boolean = false;

  onSubmit(button: HTMLButtonElement) { // Aggiungi il parametro button per riferirsi al pulsante inviato
    if (this.isCheckboxChecked) {
      this.isSubmitted = true;
      this.showError = false;
      // Aggiungi la classe per l'animazione del pulsante
      button.classList.add('submit-button-animate');
      // Rimuovi la classe per l'animazione del pulsante dopo che l'animazione è terminata
      setTimeout(() => {
        button.classList.remove('submit-button-animate');
      }, 1000); // L'animazione dura 0.6 secondi
      // Hide the 'Inviato' message after 4 seconds
      setTimeout(() => {
        this.isSubmitted = false;
      }, 3500);
    } else {
      this.showError = true;
    }
  }
}
