import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent {
  private apiHost = 'https://api.voxelstudios.it/';

  name: string = '';
  email: string = '';
  message: string = '';
  isCheckboxChecked: boolean = false;
  isSubmitted: boolean = false;
  showError: boolean = false;

  constructor(private http: HttpClient) {}

  onSubmit(button: HTMLButtonElement) { 
    if (this.isCheckboxChecked) {
      this.isSubmitted = true;
      this.showError = false;
      button.classList.add('submit-button-animate');
      this.sendContactMessage(this.email, this.message).then(() => {
        // Gestisci la risposta qui
      }).catch(err => {
        // Gestisci l'errore qui
      });
      setTimeout(() => {
        button.classList.remove('submit-button-animate');
        this.isSubmitted = false;
      }, 3500);
    } else {
      this.showError = true;
    }
  }

  public sendContactMessage(email: string, message: string): Promise<any> {
    const url = this.apiHost + 'contact/sendMessage';
    return this.postJson(url, { email, message });
  }

  private postJson(url: string, json: Object, addHeaders: Array<{ name: string, value: string }> = []): Promise<any> {
    let data = JSON.stringify(json);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    for (let header of addHeaders) {
      headers = headers.append(header.name, header.value);
    }
    return this.http.post(url, data, { headers })
      .toPromise()
      .catch(err => {
        console.error(err);
        throw err;  // Rilancia l'errore per gestirlo più in alto
      });
  }
}
