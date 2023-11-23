import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent {
  private apiHost = 'https://api.voxelstudios.it/';

  // Get values from the form using IDs
  name: string = document.getElementById('name') ? document.getElementById('name')!.innerText : "";
  email: string = document.getElementById('email') ? document.getElementById('email')!.innerText : "";
  message: string = document.getElementById('message') ? document.getElementById('message')!.innerText : "";
  isCheckboxChecked: boolean = false;
  isSubmitted: boolean = false;
  showError: boolean = false;

  constructor(private http: HttpClient) {}

  onSubmit(button: HTMLButtonElement) {
  console.log('submit');
    if (this.isCheckboxChecked) {
        console.log('Messaggio inviato col cazz');
      this.isSubmitted = true;
      this.showError = false;
      button.classList.add('submit-button-animate');
      this.sendContactMessage(this.name, this.email, this.message).then(() => {
        // Gestisci la risposta qui
        console.log(this.name, this.email, this.message);
        console.log('Messaggio inviato con successo');
      }).catch(err => {
        // Gestisci l'errore qui
        console.error(err);
      });
      setTimeout(() => {
        button.classList.remove('submit-button-animate');
        this.isSubmitted = false;
      }, 3500);
    } else {
      this.showError = true;
      console.log('Checkbox non selezionata');
    }
  }

  public sendContactMessage(name: string, email: string, message: string): Promise<any> {
    console.log(name, email, message);
    console.log('Messaggio inviato con successo');
    const url = this.apiHost + 'contact/sendMessage';
    //print the values
    return this.postJson(url, { name, email, message });
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

