import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cryptotracker-detail',
  templateUrl: './cryptotracker-detail.component.html',
  styleUrls: ['./cryptotracker-detail.component.scss'],
})
export class CryptotrackerDetailComponent implements OnInit {

  segment: string;
  slug: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    try {
      this.slug = this.router.getCurrentNavigation().extras.state.slug;
    } catch (e) {
      this.router.navigate(['cryptotracker/coins'], {relativeTo: this.route.parent});
    }
  }

}
