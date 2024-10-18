import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  private readonly small = '(max-width: 600px)';
  private readonly medium = '(min-width-width: 601px) and (max-width: 1000px)';
  private readonly large = '(min-width-width: 1001px)';

  breakpointObserver = inject(BreakpointObserver);


  screenWidth = toSignal(this.breakpointObserver.observe([this.small, this.medium, this.large]));

  smallWidth = computed(() => this.screenWidth()?.breakpoints[this.small]);
  mediumWidth = computed(() => this.screenWidth()?.breakpoints[this.small]);
  largeWidth = computed(() => this.screenWidth()?.breakpoints[this.small]);

  constructor() { }
}
