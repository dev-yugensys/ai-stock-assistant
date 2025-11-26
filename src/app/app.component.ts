import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ai-stock-assistant';

  messages: any[] = [];
  userInput: string = '';

  constructor(private chatService: ChatService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    // push user message
    this.messages.push({
      sender: 'user',
      text: this.userInput
    });

    const messageToSend = this.userInput;
    this.userInput = '';

    // call backend
    this.chatService.sendMessage(messageToSend).subscribe({
      next: (response) => {
        this.messages.push({
          sender: 'ai',
          text: response.response   // python returns { "reply": "..." }
        });
      },
      error: (err) => {
        this.messages.push({
          sender: 'ai',
          text: "⚠️ Backend error"
        });
      }
    });
  }

  quickAsk(text: string) {
    this.userInput = text;
    this.sendMessage();
  }
}
