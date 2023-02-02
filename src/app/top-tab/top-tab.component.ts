import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetInboxService } from '../inbox/get-inbox.service';

@Component({
  selector: 'app-top-tab',
  templateUrl: './top-tab.component.html',
  styleUrls: ['./top-tab.component.css'],
})
export class TopTabComponent implements OnInit {
  private countUnradSubscriber!: Subscription;

  public unread: number = 0;
  
  public subscribed: boolean = false;

  constructor(private getInboxService: GetInboxService) {}

  ngOnInit(): void {
    this.countUnradSubscriber = this.getInboxService.unread$.subscribe(
      (data) => {
        this.unread = data;
        this.subscribed = true;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscribed) this.countUnradSubscriber.unsubscribe();
  }
}
