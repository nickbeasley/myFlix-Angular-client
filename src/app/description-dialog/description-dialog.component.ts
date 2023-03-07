import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-description-dialog',
  template: `
    <h2 mat-dialog-title>{{ title }}</h2>
    <mat-dialog-content>
      <p>{{ description }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
})
export class DescriptionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; description: string }
  ) {}

  get title(): string {
    return this.data.title;
  }

  get description(): string {
    return this.data.description;
  }
}
