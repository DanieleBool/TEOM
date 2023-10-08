import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  public currentPerspItem: any;
  public canUpdatePersp = true;
  public currentContainerBackground = 'default-background';


  constructor() { }

  ngOnInit(): void {
  }
  // Nuove funzioni per gestire il cambio dello sfondo
  public changeBackground(backgroundClass: string) {
    this.currentContainerBackground = backgroundClass;
  }

  public resetBackground() {
    this.currentContainerBackground = 'default-background';
  }

  public onItemMouseEnter(event: MouseEvent) {
    const item = event.target as HTMLElement;
    if (item) {
      this.currentPerspItem = item;
      this.updatePersp(event);
    }
  }

  public onItemMouseLeave(event: MouseEvent) {
    this.currentPerspItem.style = '';
    this.currentPerspItem = null;
  }

  public onItemMouseMove(event: MouseEvent) {
    if (this.isTimeToUpdatePersp()) {
      this.updatePersp(event);
    }
  }






  private updatePersp(event: MouseEvent) {
    const target = event.target as HTMLElement;  // Aggiungi la conversione di tipo qui

    if (target) {
        const rect = target.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        let minX = 0;
        let minY = 0;
        let maxX = target.offsetWidth;
        let maxY = target.offsetHeight;

        x = this.normalize(x, minX, maxY) * maxX / 2;
        y = this.normalize(y, minY, maxY) * maxY / 2;

        this.updateTransformStyle(
            (-y / target.offsetHeight / 2 * 3).toFixed(2),
            (x / target.offsetWidth / 2 * 3).toFixed(2)
        );
    }
}

  private normalize(x: number, min: number, max: number) {
    return 2 * (x - min) / (max - min) - 1;
  }

  private updateTransformStyle(x: string, y: string) {
    const inner = this.currentPerspItem;

    // Moltiplica i valori x e y per un fattore per intensificare l'effetto
    let intensifiedX = (parseFloat(x) * 10).toFixed(10);
    let intensifiedY = (parseFloat(y) * 10).toFixed(10);

    let style = `rotateX(${intensifiedX}deg) rotateY(${intensifiedY}deg) translateZ(-10px)  scale(1.05)`;

    inner.style.transform = style;
    inner.style.webkitTransform = style;
    inner.style.mozTransform = style;
    inner.style.msTransform = style;
    inner.style.oTransform = style;
}


  private isTimeToUpdatePersp() {
    if (this.canUpdatePersp) {
      this.canUpdatePersp = false;
      setTimeout(() => {
        this.canUpdatePersp = true;
      }, 45);
      return true;
    }
    return false;
  }
}