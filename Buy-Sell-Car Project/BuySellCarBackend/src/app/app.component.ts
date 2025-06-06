import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SellBuyCarFrontend';

  isAdminLoggedIn: boolean = false;
  isCustomerLoggedIn: boolean = false;
  showNavbar: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
        const hiddenRoutes = ['/register'];
        this.showNavbar = !hiddenRoutes.includes(event.url);
      }
    });
  }

  logout() {
    StorageService.signout();
    //this.router.navigateByUrl("/login" );
    this.router.navigateByUrl("/login" , { skipLocationChange: true }).then(() =>{
      this.router.navigate(['/login']);
    });

  }

}
