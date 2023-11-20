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
    this.applyParallaxSuctionEffect('.core', scrollPosition, -0.2);
    this.applyParallaxSuctionEffect('.logo', scrollPosition, -0.3);
    this.applyParallaxSuctionEffect('.k41', scrollPosition, -0.1);
    this.applyParallaxSuctionEffect('.clock', scrollPosition, -0.05);
    this.applyParallaxSuctionEffect('.aiden', scrollPosition, 0.0);
    this.applyParallaxSuctionEffect('.btnWrapper', scrollPosition, 0.05);
  }

  private applyParallaxSuctionEffect(selector: string, scrollPosition: number, rate: number): void {
    const element = document.querySelector(selector);
    if (element) {
      const adjustedPosition = -(scrollPosition * rate);
      element.setAttribute('style', `transform: translateY(${adjustedPosition}px)`);
    }
  }
}