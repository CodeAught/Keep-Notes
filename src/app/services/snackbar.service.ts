import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class SnackbarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition,
      duration: 3000,
    });
  }
}
