import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgSmartTabsDirective } from './luno-follow-line.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    NgSmartTabsDirective,
  ],
  exports: [
    NgSmartTabsDirective,
  ]
})
export class NgSmartTabsModule { }
