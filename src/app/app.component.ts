import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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

  @ViewChild('chatBoxContainer') messagesContainer!: ElementRef;

  constructor(private chatService: ChatService) {}

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;
    this.isLoading = true;
    const userText = this.userInput;
    this.userInput = '';
    this.messages.push({ sender: 'user', text: userText });
    this.scrollToBottom();

    // call backend
    this.chatService.sendMessage(userText).subscribe({
      next: (response) => {
        this.messages.push({sender: 'ai', text: response.response});
        this.isLoading = false;
        this.scrollToBottom();
      },
      error: (err) => {
        this.messages.push({sender: 'ai', text: "⚠️ Something went wrong!"});
        this.isLoading = false;
        this.scrollToBottom();
      }
    });
  }

  quickAsk(text: string) {
    this.userInput = text;
    this.sendMessage();
  }

  scrollToBottom() {
    try {
      setTimeout(() => {
        const el = this.messagesContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
      }, 50);
    } catch {}
  }
}
