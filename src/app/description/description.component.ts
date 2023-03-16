import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component that displays a description in a dialog box.
 */
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  /**
   * Creates an instance of DescriptionComponent.
   * @param data - The data to display in the dialog box.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
    }
  ) {}

  /**
   * Angular lifecycle hook that is called after component initialization.
   */
  ngOnInit(): void {}
}
