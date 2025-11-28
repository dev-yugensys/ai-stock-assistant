import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../services/chat.service';

interface Message {
  type: 'question' | 'answer';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-rightpanel',
  templateUrl: './rightpanel.component.html',
  styleUrls: ['./rightpanel.component.css']
})
export class RightpanelComponent {
  isSidebarOpen = false;
  @ViewChild('askInput') askInput!: ElementRef<HTMLInputElement>;
  
  messages: Message[] = [];
  isLoading = false;
  userQuestion = '';

  constructor(private chatService: ChatService) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const body = document.body;

    if (sidebar) {
      sidebar.classList.toggle('open');
    }
    if (overlay) {
      overlay.classList.toggle('active');
    }
    if (this.isSidebarOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  }

  scrollToInput() {
    setTimeout(() => {
      if (this.askInput) {
        const el = this.askInput.nativeElement;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          el.focus();
        }, 500);
      }
    }, 100);
  }

  askQuestion(question?: string) {
    const questionText = question || this.userQuestion.trim();
    
    if (!questionText) return;

    // Add user question to messages
    this.messages.push({
      type: 'question',
      content: questionText,
      timestamp: new Date()
    });

    this.isLoading = true;
    this.userQuestion = '';

    // Call API
    this.chatService.sendMessage(questionText).subscribe({
      next: (response) => {
        this.messages.push({
          type: 'answer',
          content: response.answer || response.response || 'No answer received',
          timestamp: new Date()
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.messages.push({
          type: 'answer',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date()
        });
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.askQuestion();
    }
  }
}
