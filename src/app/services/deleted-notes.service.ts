import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DeletedNotesService {
  private notes: Note[] = [];
  private notes$ = new BehaviorSubject(this.notes);
  public notesChange$: Observable<Note[]> = this.notes$.asObservable();

  addNote(note: Note) {
    this.notes.push(note);
    this.notes$.next(this.notes);
  }
}
