import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Injection
  route = inject(ActivatedRoute);
  router = inject(Router);

  // Initialization
  userName: string | null | undefined;
  activeTab: string = 'update'; // Default tab

  ngOnInit(): void {
    // Subscribe to paramMap to get userName
    this.route.paramMap.subscribe(params => {
      this.userName = params.get('userName');

      // Check if we need to initialize the active tab based on the route
      const tab = this.route.snapshot.firstChild?.url[0]?.path || 'update';
      this.activeTab = tab;

      // Redirect to default tab if no specific tab is provided
      if (this.route.snapshot.url.length === 2) {
        this.router.navigate([`/profile`, this.userName, 'update']);
      }
    });
  }

  navigateTo(tab: string) {
    if (this.userName) {
      this.activeTab = tab;
      this.router.navigate([`/profile`, this.userName, tab]);
    }
  }
}
