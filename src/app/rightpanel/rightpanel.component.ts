import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-rightpanel',
  templateUrl: './rightpanel.component.html',
  styleUrls: ['./rightpanel.component.css']
})
export class RightpanelComponent {
  isSidebarOpen = false;

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
}
