import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotesDataService } from 'src/app/services/notes-data.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: FormControl;

  constructor(private notesService: NotesDataService) { }

  ngOnInit(): void {
    this.searchTerm = new FormControl();

    this.searchTerm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.notesService.onSearch(value);
      });
  }

}
