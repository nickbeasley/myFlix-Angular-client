import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Component that displays a description in a dialog box.
 */
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
  /**
   * Creates an instance of DescriptionDialogComponent.
   * @param dialogRef - Reference to the dialog box.
   * @param data - The data to display in the dialog box.
   */
  constructor(
    public dialogRef: MatDialogRef<DescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; description: string }
  ) {}

  /**
   * Returns the title to display in the dialog box.
   * @returns The title.
   */
  get title(): string {
    return this.data.title;
  }

  /**
   * Returns the description to display in the dialog box.
   * @returns The description.
   */
  get description(): string {
    return this.data.description;
  }
}
