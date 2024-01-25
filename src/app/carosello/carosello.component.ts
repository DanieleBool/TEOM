import { Component, OnDestroy, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-carosello',
  templateUrl: './carosello.component.html',
  styleUrls: ['./carosello.component.css']
})
export class CaroselloComponent {
  @ViewChild('slickModal', { static: false }) slickModal!: SlickCarouselComponent;

  slideConfig = {
    "slidesToShow": 1, 
    "slidesToScroll": 1,
    "dots": false,
    "infinite": true,
    "autoplay": true,
    "autoplaySpeed": 2900,
    prevArrow: false,
    nextArrow: false
  };

  nextSlide() {
    this.slickModal.slickNext();
  }

  previousSlide() {
    this.slickModal.slickPrev();
  }
  currentContainerBackground: string = 'defaultBackground'; // Bbackground predefinito
  
  public currentPerspItem: any;
  public canUpdatePersp = true;
  // public currentContainerBackground = 'default-background';
  public currentBackgroundImage = 'none';
  public showOverlay = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  slides = [
    { img: "assets/cards_img/t1.jpg", bgClass: 'bg1' },
    { img: "assets/cards_img/t2.jpg", bgClass: 'bg2' },
    { img: "assets/cards_img/t3.jpg", bgClass: 'bg3' },
    { img: "assets/cards_img/t4.jpg", bgClass: 'bg3' },
    { img: "assets/cards_img/t5.jpg", bgClass: 'bg3' },
    { img: "assets/cards_img/t6.jpg", bgClass: 'bg3' },
    { img: "assets/cards_img/t7.jpg", bgClass: 'bg3' },
    { img: "assets/cards_img/t8.jpg", bgClass: 'bg3' },
    { img: "assets/cards_img/t9.jpg", bgClass: 'bg3' },
    { img: "assets/cards_img/t10.jpg", bgClass: 'bg3' },
    { img: "assets/cards_img/t11.jpg", bgClass: 'bg3' },
  ];

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