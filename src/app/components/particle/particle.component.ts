import {
  Component,
  OnInit,
  signal,
  PLATFORM_ID,
  Inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
// @Component({
//   selector: 'app-particle',
//   standalone: true,
//   imports: [],
//   templateUrl: './particle.component.html',
//   styleUrl: './particle.component.css',
// })

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  direction: {
    x: number;
    y: number;
  };
}

@Component({
  selector: 'app-particle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="star-container">
      @for (star of stars(); track star.x) {
      <div
        class="star"
        [style.left.px]="star.x"
        [style.top.px]="star.y"
        [style.width.px]="star.size"
        [style.height.px]="star.size"
        [style.opacity]="star.opacity"
      ></div>
      }
    </div>
  `,
  styles: [
    `
      .star-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
      }
      .star {
        position: absolute;
        background-color: white;
        border-radius: 50%;
        box-shadow: 0 0 3px 1px rgba(255, 255, 255, 0.5);
        animation: twinkle 2s infinite alternate;
      }
      @keyframes twinkle {
        from {
          opacity: 0.3;
        }
        to {
          opacity: 1;
        }
      }
    `,
  ],
})
export class ParticleComponent implements OnInit, OnDestroy {
  stars = signal<Star[]>([]);
  private animationFrameId: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.generateStars();
      this.startStarMovement();
    }
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  generateStars() {
    const starCount = 100;
    const stars: Star[] = [];
    const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const height = typeof window !== 'undefined' ? window.innerHeight : 1080;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.5 + 0.1,
        direction: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
      });
    }

    this.stars.set(stars);
  }

  startStarMovement() {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const height = typeof window !== 'undefined' ? window.innerHeight : 1080;

    const animate = () => {
      const updatedStars = this.stars().map((star) => {
        // Update position
        let newX = star.x + star.direction.x * star.speed;
        let newY = star.y + star.direction.y * star.speed;

        // Wrap around screen
        if (newX < 0) newX = width;
        if (newX > width) newX = 0;
        if (newY < 0) newY = height;
        if (newY > height) newY = 0;

        return {
          ...star,
          x: newX,
          y: newY,
        };
      });

      this.stars.set(updatedStars);

      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }
}
