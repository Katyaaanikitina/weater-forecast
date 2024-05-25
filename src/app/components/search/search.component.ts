import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SandboxService } from '../../shared/services/forecast.service';
import { Subscription, debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() currentOption!: string;
  @Output() onOptionChosen = new EventEmitter();
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions!: string[];
  subscription!: Subscription;

  constructor(private readonly _sandboxService: SandboxService) {}

  ngOnInit() {
    this.options.push(this.currentOption);
  }

  ngAfterViewInit() {
    this.subscription = fromEvent(this.input.nativeElement, 'input')
      .pipe(distinctUntilChanged(),debounceTime(1000))
      .subscribe((value) => {
        if (!this.input.nativeElement.value) {
          this.filteredOptions = [];
          return;
        }
        
        this._sandboxService.getCities(this.input.nativeElement.value).subscribe((cities) => {
          this.filteredOptions = cities;
        });
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setChoice(chosenElement: string): void {
    const locationArray = chosenElement.split(',');
    const city = locationArray[0];
    this.onOptionChosen.emit(city);
  }
}

