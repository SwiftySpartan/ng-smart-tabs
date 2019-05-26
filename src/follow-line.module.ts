import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgSmartTabsDirective } from './follow-line.directive';

export { NgSmartTabsDirective }

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
