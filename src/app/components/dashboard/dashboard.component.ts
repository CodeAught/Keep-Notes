import { Component, OnInit, OnDestroy } from '@angular/core';
import { Note } from '../../interfaces/note';
import { Router, ActivatedRoute } from '@angular/router';
import { NotesDataService } from 'src/app/services/notes-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public notes: Note[] = [];
  unsubscribe$: Subject<void> = new Subject();

  constructor(
    private notesDataService: NotesDataService,
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    // this.notes = this.route.snapshot.data.notes;
    this.onNotesChange();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addedNote(note: Note) {
    this.notesDataService.addNote(note);
  }

  onNotesChange() {
    this.notesDataService.notesChange$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (notes: Note[]) => {
          this.notes = notes;
        }
      );
  }

  noteChange = (note: Note) => {
    this.notesDataService.updateNote(note);
  }

  deleteNote = (note: Note) => {
    this.notesDataService.deleteNote(note);
  }


}
