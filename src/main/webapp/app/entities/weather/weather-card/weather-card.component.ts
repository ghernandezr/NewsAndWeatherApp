import { Component, Input, OnInit } from '@angular/core';
import { Moment } from 'moment';

@Component({
  selector: 'jhi-weather-card',
  templateUrl: 'weather-card.component.html',
  styleUrls: ['weather-card.component.scss'],
})
export class WeatherCardComponent implements OnInit {
  @Input() date?: Moment;
  @Input() src?: string;
  @Input() temp?: string;
  @Input() description?: string;

  constructor() {}

  ngOnInit(): void {}
}
