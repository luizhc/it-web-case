import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'Message-Control-Error',
  templateUrl: './message-control-error.component.html',
  styleUrls: ['./message-control-error.component.scss'],
})
export class MessageControlErrorComponent {
  @Input() error: string;
  @Input() msg: string;
  @Input() control: AbstractControl;
}
