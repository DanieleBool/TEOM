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

  onSubmit() {
    if (this.isCheckboxChecked) {
      this.isSubmitted = true;
      this.showError = false;
      // Hide the 'Inviato' message after 3 seconds
      setTimeout(() => {
        this.isSubmitted = false;
      }, 4000);
    } else {
      this.showError = true;
    }
  }
}