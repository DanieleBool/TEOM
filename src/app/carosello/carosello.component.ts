import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carosello',
  templateUrl: './carosello.component.html',
  styleUrls: ['./carosello.component.css']
})
export class CaroselloComponent implements OnInit {
  public currentPerspItem: any;
  public canUpdatePersp = true;
  public currentContainerBackground = 'default-background';
  public currentBackgroundImage = 'none';
  public showOverlay = false;

  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    // Impostazione iniziale per lo scorrimento infinito
    this.setupInfiniteScroll();
  }

  private setupInfiniteScroll() {
    // Assicurati che ci siano abbastanza card per lo scorrimento infinito
    const cards = this.carouselContainer.nativeElement.querySelectorAll('.cardWrapper');
    if (cards.length < 3) {
      console.error('Sono necessarie almeno tre card per lo scorrimento infinito.');
      return;
    }

    // Clona le card per lo scorrimento infinito
    const firstCard = cards[0].cloneNode(true);
    const lastCard = cards[cards.length - 1].cloneNode(true);
    this.carouselContainer.nativeElement.insertBefore(lastCard, this.carouselContainer.nativeElement.firstChild);
    this.carouselContainer.nativeElement.appendChild(firstCard);
  }

  public scrollLeft() {
    const cardWidth = this.carouselContainer.nativeElement.querySelector('.cardWrapper').offsetWidth;
    this.carouselContainer.nativeElement.style.transition = 'none';
    this.carouselContainer.nativeElement.scrollLeft -= cardWidth;

    setTimeout(() => {
      this.carouselContainer.nativeElement.style.transition = 'scroll 0.5s ease-out';
      this.carouselContainer.nativeElement.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }, 10);

    // Sposta l'ultima card all'inizio dopo lo scorrimento
    setTimeout(() => {
      const cards = this.carouselContainer.nativeElement.querySelectorAll('.cardWrapper');
      const lastCard = cards[cards.length - 1];
      this.carouselContainer.nativeElement.insertBefore(lastCard, this.carouselContainer.nativeElement.firstChild);
      this.carouselContainer.nativeElement.scrollLeft -= cardWidth;
    }, 510);
  }

  public scrollRight() {
    const cardWidth = this.carouselContainer.nativeElement.querySelector('.cardWrapper').offsetWidth;
    this.carouselContainer.nativeElement.style.transition = 'scroll 0.5s ease-out';
    this.carouselContainer.nativeElement.scrollBy({ left: cardWidth, behavior: 'smooth' });

    // Sposta la prima card alla fine dopo lo scorrimento
    setTimeout(() => {
      const cards = this.carouselContainer.nativeElement.querySelectorAll('.cardWrapper');
      const firstCard = cards[0];
      this.carouselContainer.nativeElement.appendChild(firstCard);
      this.carouselContainer.nativeElement.scrollLeft += cardWidth;
    }, 510);
  }

  

  public changeBackgroundForRow(event: MouseEvent, image: string, bgClass: string) {
    const backgroundContainer = this.el.nativeElement.querySelector('.background-container');
    backgroundContainer.style.setProperty('--background-image-url', `url(${image})`);
    backgroundContainer.classList.add('show-background', bgClass);
  }
  
  public resetBackground(event: MouseEvent) {
    const backgroundContainer = this.el.nativeElement.querySelector('.background-container');
    backgroundContainer.classList.remove('show-background', 'bg2', 'bg3');
  }

  public onItemMouseEnter(event: MouseEvent) {
    const item = event.target as HTMLElement;
    if (item) {
      this.currentPerspItem = item;
      this.updatePersp(event);
    }
  }

  public onItemMouseLeave(event: MouseEvent) {
    if (this.currentPerspItem) {
      this.currentPerspItem.style = '';
      this.currentPerspItem = null;
    }
  }

  public onItemMouseMove(event: MouseEvent) {
    if (this.isTimeToUpdatePersp()) {
      this.updatePersp(event);
    }
  }

  // Movimento della Card
  private updatePersp(event: MouseEvent) {
    const target = event.target as HTMLElement;

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
    if (this.currentPerspItem) {
      let intensifiedX = (parseFloat(x) * 10).toFixed(10);
      let intensifiedY = (parseFloat(y) * 10).toFixed(10);

      let style = `rotateX(${intensifiedX}deg) rotateY(${intensifiedY}deg) translateZ(-10px) scale(1.05)`;

      this.currentPerspItem.style.transform = style;
      this.currentPerspItem.style.webkitTransform = style;
      this.currentPerspItem.style.mozTransform = style;
      this.currentPerspItem.style.msTransform = style;
      this.currentPerspItem.style.oTransform = style;
    }
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

  debounce(func: (...args: any[]) => void, wait: number): (...args: any[]) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return function executedFunction(...args: any[]) {
      const later = () => {
        if (timeout !== null) {
          clearTimeout(timeout);
        }
        func(...args);
      };
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(later, wait);
    };
  }  
}