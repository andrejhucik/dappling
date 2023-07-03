import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterState } from '@angular/router';
import { NgxGa4Service } from '@kattoshi/ngx-ga4';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document,
    private _ga4 : NgxGa4Service
  ) {
    this.handleRouteEvents();
  }

  title = 'ga4';
  async ngOnInit(): Promise<void> {
    try {
      await this._ga4.install$("G-SGZ0DP6B48");
      this._ga4.js();
      this._ga4.config();
    }
    catch(ex)
    {
      throw new Error (`Script load exception=${ex}`);
    }
  }
  onRaizeEvent() {
    this._ga4.event("event_name" ,
      {
        timestamp : new Date().toISOString()
      });


    gtag('event', 'test_view', {
      page_title: 'test_event',
      page_path: 'Test ano',
      page_location: this.document.location.href
    })
  }

  handleRouteEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
        this.titleService.setTitle(title);
        gtag('event', 'page_view', {
          page_title: title,
          page_path: event.urlAfterRedirects,
          page_location: this.document.location.href
        })
      }
    });
  }

  getTitle(state: RouterState, parent: ActivatedRoute): string[] {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data['title']) {
      data.push(parent.snapshot.data['title']);
    }
    if (state && parent && parent.firstChild) {
      data.push(...this.getTitle(state, parent.firstChild));
    }
    return data;
  }
}
