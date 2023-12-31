import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(    
    private websocket: WebsocketService,
  ) {}
}
