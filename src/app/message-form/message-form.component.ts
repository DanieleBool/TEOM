import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent {
  isCheckboxChecked: boolean = false;
  isSubmitted: boolean = false;
  showError: boolean = false;

  // Aggiungi le proprietà per raccogliere i dati del form
  name: string = '';
  email: string = '';
  message: string = '';

  // Inietta HttpClient nel costruttore
  constructor(private http: HttpClient) {}

  onSubmit(button: HTMLButtonElement) {
    if (this.isCheckboxChecked) {
      this.isSubmitted = true;
      this.showError = false;
  
      // Prepara i dati da inviare
      const formData = {
        name: this.name,
        email: this.email,
        message: this.message
      };
  
      // Invia i dati al tuo endpoint API Gateway
      this.http.post('https://hsey0ho24k.execute-api.eu-north-1.amazonaws.com/fase1', formData).subscribe({
        next: (response) => {
          console.log('Email inviata con successo', response);
          // Resetta il form qui se necessario
        },
        error: (error) => {
          console.error('Errore nell\'invio dell\'email', error);
        },
        complete: () => console.log('Richiesta completata') // Opzionale
      });
  
      // Gestione dell'animazione del pulsante
      button.classList.add('submit-button-animate');
      setTimeout(() => {
        button.classList.remove('submit-button-animate');
      }, 1000);
  
      setTimeout(() => {
        this.isSubmitted = false;
      }, 3500);
    } else {
      this.showError = true;
    }
  }
  
}
