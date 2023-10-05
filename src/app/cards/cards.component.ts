import { Component, Renderer2, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent  implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngAfterViewInit() {
    const cards: NodeListOf<Element> = this.el.nativeElement.querySelectorAll('.card');
    cards.forEach((card: Element) => {
      this.renderer.listen(card, 'mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const xAxis = ((rect.width / 2) - (event.clientX - rect.left)) / 10;
        const yAxis = ((rect.height / 2) - (event.clientY - rect.top)) / 10;
  
        // Calcola la profondità in base alla posizione verticale del mouse
        const verticalPosition = (event.clientY - rect.top) / rect.height;
        const zDepth = (verticalPosition < 0.5) ? 30 : -30;
  
        this.renderer.setStyle(card, 'transform', `translateZ(${zDepth}px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`);
      });
  
      this.renderer.listen(card, 'mouseleave', () => {
        this.renderer.setStyle(card, 'transform', 'none');
      });
    });
  }
  
}
