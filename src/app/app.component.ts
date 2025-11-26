import { Component, ElementRef, ViewChild } from '@angular/core';
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
  isLoading = false;

  constructor(private chatService: ChatService) {}

  sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;
    this.isLoading = true;
    const userText = this.userInput;
    this.userInput = '';
    this.messages.push({ sender: 'user', text: userText });

    // call backend
    this.chatService.sendMessage(userText).subscribe({
      next: (response) => {
        this.messages.push({sender: 'ai', text: response.response});
        this.isLoading = false;
      },
      error: (err) => {
        this.messages.push({sender: 'ai', text: "⚠️ Something went wrong!"});
        this.isLoading = false;
      }
    });
  }

  quickAsk(text: string) {
    this.userInput = text;
    this.sendMessage();
  }
}
