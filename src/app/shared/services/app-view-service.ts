import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppViewService {
  currentScheme = signal(1);
  nameOfCurrentScheme = computed(() => {
    switch (this.currentScheme()) {
      case 0:
        return 'light';
      case 1:
        return 'system';
      default:
        return 'dark';
    }
  });
  listenToSystemSchemeChanges() {
    window
      .matchMedia('(prefers-color-scheme:dark)')
      .addEventListener('change', () => {
        if (this.nameOfCurrentScheme() === 'system') {
          this.applyScheme();
        }
      });
  }
  initScheme() {
    const saved = localStorage.getItem('seriesScheme');
    const scheme = saved || this.getSystemPreferredScheme();
    this.listenToSystemSchemeChanges();
    this.setCurrentScheme(scheme);
    this.applyScheme();
  }
  applyScheme() {
    localStorage.setItem('seriesScheme', `${this.nameOfCurrentScheme()}`);
    document.body.classList.remove('light-scheme', 'dark-scheme');
    if (this.nameOfCurrentScheme() === 'system') {
      document.body.classList.add(`${this.getSystemPreferredScheme()}-scheme`);
      return;
    }
    document.body.classList.add(`${this.nameOfCurrentScheme()}-scheme`);
  }
  setCurrentScheme(scheme: string) {
    switch (scheme) {
      case 'light':
        this.currentScheme.set(0);
        break;
      case 'system':
        this.currentScheme.set(1);
        break;
      case 'dark':
        this.currentScheme.set(2);
        break;
    }
  }
  toggleScheme() {
    if (this.currentScheme() === 2) {
      this.currentScheme.set(0);
    } else {
      this.currentScheme.update((value) => value + 1);
    }
    this.applyScheme();
  }
  getSystemPreferredScheme() {
    return window.matchMedia('(prefers-color-scheme:dark)').matches
      ? 'dark'
      : 'light';
  }
}
