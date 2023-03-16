import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
/**
 * Component that displays a genre in a dialog box.
 */
@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {
  /**
   * Creates an instance of GenreComponent.
   * @param data - The data to display in the dialog box.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    }
  ) {}
  /**
   * Angular lifecycle hook that is called after component initialization.
   */
  ngOnInit(): void {}
}
