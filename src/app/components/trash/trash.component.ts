import { Component, OnInit } from '@angular/core';
import { DeletedNotesService } from 'src/app/services/deleted-notes.service';
import { pipe, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Note } from 'src/app/interfaces/note';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  unsubscribe$ = new Subject();
  notes: Note[];

  constructor(private deletedNotesService: DeletedNotesService) { }

  ngOnInit(): void {
    this.deletedNotesService.notesChange$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (notes: Note[]) => {
          this.notes = notes;
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
