import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  sensex: any = null;
  nifty: any = null;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.loadData();
    setInterval(() => this.loadData(), 5000);
  }

  loadData() {
    this.chatService.getSensex().subscribe(res => this.sensex = res);
    this.chatService.getNifty().subscribe(res => this.nifty = res);
  }
}
