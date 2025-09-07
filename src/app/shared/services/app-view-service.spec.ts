import { TestBed } from '@angular/core/testing';

import { AppViewService } from './app-view-service';
import { provideZonelessChangeDetection } from '@angular/core';
function mockMatchMedia(matches: boolean) {
  spyOn(window, 'matchMedia').and.returnValue({
    matches: matches,
    media: '',
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
describe('AppViewService', () => {
  let service: AppViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(AppViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should set scheme to 0', () => {
    service.currentScheme.set(1);
    service.setCurrentScheme('light');
    expect(service.currentScheme()).toBe(0);
  });
  it('should set scheme to 1', () => {
    service.currentScheme.set(0);
    service.setCurrentScheme('system');
    expect(service.currentScheme()).toBe(1);
  });
  it('should set scheme to 2', () => {
    service.currentScheme.set(0);
    service.setCurrentScheme('dark');
    expect(service.currentScheme()).toBe(2);
  });
  it('toggleScheme should apply scheme', () => {
    spyOn(service, 'applyScheme');
    service.toggleScheme();
    expect(service.applyScheme).toHaveBeenCalled();
  });
  it('toggleScheme should set currentScheme to 0', () => {
    service.currentScheme.set(2);
    service.toggleScheme();
    expect(service.currentScheme()).toBe(0);
  });
  it('toggleScheme should increment currentScheme', () => {
    service.currentScheme.set(0);
    service.toggleScheme();
    expect(service.currentScheme()).toBe(1);
  });

  it('name of current scheme should be light', () => {
    service.currentScheme.set(0);
    expect(service.nameOfCurrentScheme()).toBe('light');
  });
  it('name of current scheme should be system', () => {
    service.currentScheme.set(1);
    expect(service.nameOfCurrentScheme()).toBe('system');
  });
  it('name of current scheme should be dark', () => {
    service.currentScheme.set(2);
    expect(service.nameOfCurrentScheme()).toBe('dark');
  });
  it('initScheme should apply scheme', () => {
    spyOn(service, 'applyScheme');
    service.initScheme();
    expect(service.applyScheme).toHaveBeenCalled();
  });
  it('initScheme should start listening to the system changes', () => {
    spyOn(service, 'listenToSystemSchemeChanges');
    service.initScheme();
    expect(service.listenToSystemSchemeChanges).toHaveBeenCalled();
  });
  it('if savedScheme is null,setCurrentScheme should not be called', () => {
    spyOn(service, 'setCurrentScheme');
    service.savedScheme = null;
    service.initScheme();
    expect(service.setCurrentScheme).toHaveBeenCalledTimes(0);
  });
  it('if savedScheme is not null,setCurrentScheme should  be called', () => {
    spyOn(service, 'setCurrentScheme');
    service.savedScheme = 'light';
    service.initScheme();
    expect(service.setCurrentScheme).toHaveBeenCalledTimes(1);
  });
  it("should return 'dark' when prefers-color-scheme is dark", () => {
    mockMatchMedia(true);
    expect(service.getSystemPreferredScheme()).toBe('dark');
  });
  it("should return 'light' when prefers-color-scheme is light", () => {
    mockMatchMedia(false);
    expect(service.getSystemPreferredScheme()).toBe('light');
  });
  it('change event should call applyScheme function', () => {});
});
