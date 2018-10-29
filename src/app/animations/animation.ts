import { state, trigger, style, transition, animate } from "@angular/animations";

export let fade = trigger('fade', [
    state('void', style({ opacity: 0})),
    transition(':enter', 
    [
      animate(1000)
    ])
  ]);

export let slideInRight = trigger('slideInRight', 
[
    state('void', style({
      transform: 'translateX(200px)'
    })),
    transition(':enter', 
    [
      animate(500)
    ])
])