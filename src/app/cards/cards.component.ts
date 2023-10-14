import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  public currentPerspItem: any;
  public canUpdatePersp = true;
  public currentContainerBackground = 'default-background';
  public currentBackgroundImage = 'none';
  public showOverlay = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
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

  public changeBackgroundForRow(event: MouseEvent, image: string, bgClass: string) {
    const debouncedChange = this.debounce(() => {
      const backgroundContainer = this.el.nativeElement.querySelector('.background-container');
      backgroundContainer.style.setProperty('--background-image-url', `url(${image})`);
      backgroundContainer.classList.add('show-background', bgClass);
    }, 180);  // 150ms di attesa
    debouncedChange();
  }
  
  public resetBackground(event: MouseEvent) {
    const debouncedReset = this.debounce(() => {
      const backgroundContainer = this.el.nativeElement.querySelector('.background-container');
      backgroundContainer.classList.remove('show-background', 'bg1', 'bg2', 'bg3');
    }, 180);  // 250ms di attesa
    debouncedReset();
  }
  

  // MOVIMENTO CARD
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
    const inner = this.currentPerspItem;

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