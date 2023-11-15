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
    // Ascoltatore di eventi per lo scroll con la rotellina del mouse
    this.renderer.listen(this.carouselContainer.nativeElement, 'wheel', (event: WheelEvent) => {
      if (event.deltaY > 0) {
        this.scrollRight();
      } else {
        this.scrollLeft();
      }
    });
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

  public changeBackgroundForRow(event: MouseEvent, image: string, bgClass: string) {
    const debouncedChange = this.debounce(() => {
      const backgroundContainer = this.el.nativeElement.querySelector('.background-container');
      backgroundContainer.style.setProperty('--background-image-url', `url(${image})`);
      backgroundContainer.classList.add('show-background', bgClass);
    }, 160);
    debouncedChange();
  }
  
  public resetBackground(event: MouseEvent) {
    const debouncedReset = this.debounce(() => {
      const backgroundContainer = this.el.nativeElement.querySelector('.background-container');
      backgroundContainer.classList.remove('show-background', 'bg2', 'bg3');
    }, 160);
    debouncedReset();
  }

  // Funzioni di scorrimento per il carosello
  public scrollLeft() {
    this.carouselContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  public scrollRight() {
    this.carouselContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
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

  private debounce(func: (...args: any[]) => void, wait: number): (...args: any[]) => void {
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