import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface SelectedAuthor {
  id: string;
  name: string;
}

@Component({
  selector: 'app-authors-select',
  templateUrl: './authors-select.component.html',
  styleUrls: ['./authors-select.component.scss'],
})
export class AuthorsSelectComponent implements OnInit, OnChanges {

  @Input() authors: Array<SelectedAuthor> = [];
  @Input() selectedAuthors: Array<SelectedAuthor> = [];

  public chosenAuthors: FormGroup;
  public openSuggestions: boolean;

  constructor() { }

  ngOnInit() {
    this.chosenAuthors = new FormGroup({
      authors: new FormArray([])
    });
  }

  ngOnChanges({authors}: SimpleChanges): void {
    if (authors.currentValue) {
      console.log(this.authors);
    }
  }

  public get myAuthors(): FormArray {
    return <FormArray>this.chosenAuthors.get('authors');
  }

  public showSuggestions(show: boolean): void {
    this.openSuggestions = show;
  }

  public addAuthor(author: SelectedAuthor): void {
    console.log(author);
    this.showSuggestions(false);
  }

  public removeAuthor(author: SelectedAuthor): void {
    console.log(author);
  }

}
