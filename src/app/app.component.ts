import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public navLinks: Object=[
    {
      path:"config",
      label: "DASHBOARD",
      icon: "dashboard"
    },
    {
      path:"add-rep",
      label: "REGISTER A CANDIDATE",
      icon: "person_add"
    },
    {
      path:"add",
      label: "REGISTER A PARTY",
      icon: "flag"
    },
    {
      path:"stream",
      label: "STREAM",
      icon: "view_stream"
    }
  ]
  public test = "Hello world";
  title = 'Electioner';
}
