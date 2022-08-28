import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  Observable,
  of,
  Subject,
  takeUntil,
} from 'rxjs';

import { Expense } from '../../../models/expense.model';
import { UtilService } from '../../../services/util.service';
import { ExpenseListFacade } from './state/expense-list.component.facade';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent implements OnInit {
  formFilter: FormGroup;
  isLoading$: Observable<boolean>;
  expenses$: Observable<Expense[]>;
  destroyed$ = new Subject<void>();
  @ViewChild('filterInput') filterInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private expenseListFacade: ExpenseListFacade,
    public utilService: UtilService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.setup();
  }

  private buildForm() {
    this.formFilter = this.formBuilder.group({
      filter: [''],
    });
    setTimeout(() => this.filterInput?.nativeElement.focus(), 1000);
  }

  private setup() {
    this.expenseListFacade.getExpenses();
    this.isLoading$ = this.expenseListFacade
      .selectIsLoading$()
      .pipe(takeUntil(this.destroyed$));
    this.expenses$ = this.expenseListFacade
      .selectExpenses$()
      .pipe(takeUntil(this.destroyed$));
    this.filterListener();
  }

  private filterListener() {
    this.expenses$ = combineLatest([
      this.expenseListFacade.selectExpenses$(),
      merge(
        of(''),
        this.formFilter
          .get('filter')
          .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      ),
    ]).pipe(
      takeUntil(this.destroyed$),
      map(([expenses, filter]) => {
        const valid = expenses?.length > 0 && filter !== '' && filter !== null;
        return valid
          ? expenses?.filter(
              (expense) =>
                expense?.name?.toUpperCase().includes(filter?.toUpperCase()) ||
                expense?.category?.description
                  ?.toUpperCase()
                  .includes(filter?.toUpperCase()) ||
                this.utilService
                  .convertToMoney(expense?.value)
                  ?.toUpperCase()
                  .includes(filter?.toUpperCase()) ||
                this.utilService
                  .castTimestampFirebaseToDate(expense?.createdAt)
                  ?.toUpperCase()
                  .includes(filter?.toUpperCase()) ||
                this.utilService
                  .castTimestampFirebaseToDate(expense?.updatedAt)
                  ?.toUpperCase()
                  .includes(filter?.toUpperCase())
            )
          : expenses;
      })
    );
  }

  clearFilter() {
    this.formFilter.reset();
    setTimeout(() => this.filterInput.nativeElement.focus(), 1000);
  }

  navigateToCategories(event: Event) {
    event.preventDefault();
    this.utilService.navigateByUrl('categorias');
  }

  edit(expense: Expense) {
    this.expenseListFacade.expenseSelected(expense);
    this.utilService.navigateByUrl('lancamentos/detalhe');
  }

  delete(expense: Expense) {
    this.expenseListFacade.deleteExpense(expense);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
