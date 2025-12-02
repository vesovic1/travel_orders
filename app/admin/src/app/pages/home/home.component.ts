import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router,
  ) {
    this.titleService.setTitle("TripGo");
  }

  ngOnInit() {
    if (this.authService.isLoggedOut()) {
      this.router.navigate(['/auth/signin']);
    }
  }
}
