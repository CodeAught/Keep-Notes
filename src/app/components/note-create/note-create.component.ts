import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {
  @Output() addedNote = new EventEmitter();
  titleInput: boolean = false;
  title: string;
  desc: string;

  constructor() { }

  ngOnInit(): void {
  }

  onFocus() {
    this.titleInput = true;
  }

  onBlur() {
    this.titleInput = false;
  }

  onAdd() {
    this.addedNote.emit(
      {
        id: null,
        title: this.title,
        description: this.desc
      }
    );

    this.clear();
  }

  clear() {
    this.title = '';
    this.desc = '';
  }

}
