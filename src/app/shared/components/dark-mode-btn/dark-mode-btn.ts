import { Component, inject, Signal, WritableSignal } from '@angular/core';
import { AppViewService } from '../../services/app-view-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dark-mode-btn',
  imports: [CommonModule],
  templateUrl: './dark-mode-btn.html',
  styleUrl: './dark-mode-btn.css',
})
export class DarkModeBtn {
  appViewService = inject(AppViewService);
  currentScheme = this.appViewService.currentScheme;
  changeMode() {
    this.appViewService.toggleScheme();
  }
}
