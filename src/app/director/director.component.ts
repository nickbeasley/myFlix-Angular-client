import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component that displays director information in a dialog box.
 */
@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})
export class DirectorComponent implements OnInit {
  /**
   * Creates an instance of DirectorComponent.
   * @param data - The data to display in the dialog box.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
    }
  ) {}

  /**
   * Angular lifecycle hook that is called after component initialization.
   */
  ngOnInit(): void {}
}
