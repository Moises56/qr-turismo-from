import {
  Component,
  OnInit,
  signal,
  PLATFORM_ID,
  Inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
}

@Component({
  selector: 'app-particula-nieve',
  standalone: true,
  imports: [],
  template: `
    <div class="snowflake-container">
      @for (flake of snowflakes(); track flake.x) {
      <div
        class="snowflake"
        [style.left.px]="flake.x"
        [style.top.px]="flake.y"
        [style.width.px]="flake.size"
        [style.height.px]="flake.size"
        [style.opacity]="flake.opacity"
      ></div>
      }
    </div>
  `,
  styles: [
    `
      .snowflake-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
      }
      .snowflake {
        position: absolute;
        background-color: white;
        border-radius: 50%;
        box-shadow: 0 0 3px 1px rgba(255, 255, 255, 0.5);
      }
    `,
  ],
})
export class ParticulaNieveComponent implements OnInit, OnDestroy {
  snowflakes = signal<Snowflake[]>([]);
  private animationFrameId: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.generateSnowflakes();
      this.startSnowfallAnimation();
    }
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  generateSnowflakes() {
    const flakeCount = 100;
    const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const snowflakes: Snowflake[] = [];

    for (let i = 0; i < flakeCount; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: -Math.random() * 100, // Start above the screen
        size: Math.random() * 3 + 1, // Random size between 1-4px
        speed: Math.random() * 2 + 1, // Random fall speed
        opacity: Math.random() * 0.7 + 0.3, // Random opacity
        wobble: 0, // Initial wobble position
        wobbleSpeed: (Math.random() - 0.5) * 0.5, // Random wobble speed
      });
    }

    this.snowflakes.set(snowflakes);
  }

  startSnowfallAnimation() {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const height = typeof window !== 'undefined' ? window.innerHeight : 1080;

    const animate = () => {
      const updatedSnowflakes = this.snowflakes().map((flake) => {
        // Update vertical position (falling)
        let newY = flake.y + flake.speed;

        // Update horizontal position (wobbling)
        flake.wobble += flake.wobbleSpeed;
        let newX = flake.x + Math.sin(flake.wobble) * 0.5;

        // Reset flake if it goes below the screen
        if (newY > height) {
          newY = -flake.size;
          newX = Math.random() * width;
        }

        return {
          ...flake,
          x: newX,
          y: newY,
        };
      });

      this.snowflakes.set(updatedSnowflakes);

      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }
}
