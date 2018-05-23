import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {EventDialogComponent} from "../event-dialog/event-dialog.component";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-match-update-dialog',
  templateUrl: './match-update-dialog.component.html',
  styleUrls: ['./match-update-dialog.component.css']
})
export class MatchUpdateDialogComponent implements OnInit {
  type: string;
  match;
  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<EventDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.match = this.data.match;
    this.formGroup = this._formBuilder.group({
      ht_h: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      ht_a: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      ft_h: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      ft_a: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });
    console.log(this.data.match);
  }

  done() : void {
    this.match.active = false;
    this.match.final_home_score = this.formGroup.get('ft_h').value;
    this.match.final_away_score = this.formGroup.get('ft_a').value;
    if(this.match.sport == 'Football' || this.match.sport == 'Basketball') {
      this.match.ht_home_score = this.formGroup.get('ht_h').value;
      this.match.ht_away_score = this.formGroup.get('ht_a').value;
    }
    this.dialogRef.close(this.match);
  }
}
