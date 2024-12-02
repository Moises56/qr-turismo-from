import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  @ViewChild('profileDropdown') profileDropdown!: ElementRef;

  isSidebarOpen = false;
  isDarkMode = false;
  isProfileMenuOpen = false;

  navigationItems = [
    { label: 'Dashboard', route: '/dashboard', icon: 'fas fa-home' },
    { label: 'Events', route: '/events', icon: 'fas fa-calendar' },
    { label: 'Explore', route: '/explore', icon: 'fas fa-compass' },
    { label: 'lugares', route: '/lugares', icon: 'fas fa-plane' },
  ];

  mainLinks = [
    { label: 'Home', route: '/' },
    { label: 'Events', route: '/events' },
    { label: 'Explore', route: '/explore' },
    { label: 'lugares', route: '/lugares' },
  ];
  constructor() {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.checkScreenSize();
    }
  }

  // @HostListener('window:resize')
  // checkScreenSize(): void {
  //   this.isSidebarOpen = window.innerWidth >= 1024;
  // }

  @HostListener('window:resize')
  checkScreenSize(): void {
    if (typeof window !== 'undefined') {
      this.isSidebarOpen = window.innerWidth >= 1024;
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    if (
      this.profileDropdown &&
      !this.profileDropdown.nativeElement.contains(event.target)
    ) {
      this.isProfileMenuOpen = false;
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    // Implement theme switching logic here
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }
}
