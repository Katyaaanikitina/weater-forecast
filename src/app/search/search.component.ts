import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SandboxService } from '../entity/sandbox.service';
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() currentOption!: string;
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions!: string[];

  constructor(private _sandboxService: SandboxService) {}

  ngOnInit() {
    this.options.push(this.currentOption);
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'input').pipe(debounceTime(1000)).subscribe((value) => {
      if (this.input.nativeElement.value) {
        this._sandboxService.getCities(this.input.nativeElement.value).subscribe((cities) => {
          console.log(cities)
          this.filteredOptions = cities;
        })
      } else {
        this.filteredOptions = [];
      }
    })
  }
}

