import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Aggiorna la posizione di .core
    this.applyParallaxEffect('.core', scrollPosition, 0.05);

    // Aggiorna la posizione di .logo
    this.applyParallaxEffect('.logo', scrollPosition, 0.2);

    // Aggiorna la posizione di .k41
    this.applyParallaxEffect('.k41', scrollPosition, 0.05);

    // Aggiorna la posizione di .clock
    this.applyParallaxEffect('.clock', scrollPosition, 0.1);

    // Aggiorna la posizione di .aiden
    this.applyParallaxEffect('.aiden', scrollPosition, 0.15);
  }

  private applyParallaxEffect(selector: string, scrollPosition: number, rate: number): void {
    const element = document.querySelector(selector);
    if (element) {
      const adjustedPosition = scrollPosition * rate;
      element.setAttribute('style', `transform: translateY(${adjustedPosition}px)`);
    }
  }
}

