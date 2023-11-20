import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // "Risucchia" l'immagine  più velocemente verso l'alto
    this.applyParallaxSuctionEffect('.core', scrollPosition, 0.8);
    this.applyParallaxSuctionEffect('.logo', scrollPosition, 0.6);
    this.applyParallaxSuctionEffect('.k41', scrollPosition, 0.5);
    this.applyParallaxSuctionEffect('.clock', scrollPosition, 0.4);
    this.applyParallaxSuctionEffect('.aiden', scrollPosition, 0.3);
  }

  private applyParallaxSuctionEffect(selector: string, scrollPosition: number, rate: number): void {
    const element = document.querySelector(selector);
    if (element) {
      const adjustedPosition = -(scrollPosition * rate);
      element.setAttribute('style', `transform: translateY(${adjustedPosition}px)`);
    }
  }
}