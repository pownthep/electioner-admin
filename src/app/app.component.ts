import { Component } from '@angular/core';
import { fade } from './animations/animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fade
  ]
})

export class AppComponent {
  public navLinks: Object=[
    {
      path:"add",
      label: "REGISTER A PARTY",
      icon: "flag"
    },
    {
      path:"add-rep",
      label: "REGISTER A CANDIDATE",
      icon: "person_add"
    },
    {
      path:"setting",
      label: "SETTINGS",
      icon: "settings"
    }
  ]
}
