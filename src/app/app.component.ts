import {
  Component, OnInit, OnDestroy, AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Current News';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

}
