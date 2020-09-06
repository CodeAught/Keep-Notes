import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note';
import { Observable, BehaviorSubject } from 'rxjs';
import { DeletedNotesService } from './deleted-notes.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class NotesDataService {
  private notes: Note[] = [];
  private deletedNotes: Note[] = [];
  private _notes$: BehaviorSubject<Note[]> = new BehaviorSubject(this.notes);
  public notesChange$: Observable<Note[]> = this._notes$.asObservable();

  constructor(private deletedNotesService: DeletedNotesService,
              private snackbar: SnackbarService) {

  }

  getNotes() {
    return [...this.notes];
  }

  addNote(note: Note) {
    note = { ...note, id: this.notes.length + 1 };
    this.notes.push(note);
    this._notes$.next(this.notes);
    this.snackbar.openSnackBar('Note added');
  }

  updateNote(note: Note) {
    const id = note.id;
    const index = this.notes.findIndex(note => +note.id === +id);
    if(index >= 0) {
      this.notes[index] = { ...note };
    }

    this._notes$.next(this.notes);
    this.snackbar.openSnackBar('Note updated');
  }

  deleteNote(note: Note) {
    console.log(note);
    const id = note.id;
    const index = this.notes.findIndex(note => +note.id === +id);
    this.deletedNotesService.addNote(this.notes[index]);
    if(index >= 0) this.notes.splice(index, 1);

    this._notes$.next(this.notes);
    this.snackbar.openSnackBar('Note deleted');
  }

  onSearch(term: string) {
    const filteredNotes = this.notes.filter(
      note => term ? (note.title?.toLowerCase().includes(term?.toLowerCase()) ||
              note.description?.toLowerCase().includes(term?.toLowerCase())) : this.notes.slice()
    );

    this._notes$.next(filteredNotes);
  }
}
