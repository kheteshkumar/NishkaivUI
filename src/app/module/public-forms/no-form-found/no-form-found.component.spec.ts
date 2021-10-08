import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoFormFoundComponent } from './no-form-found.component';

describe('NoFormFoundComponent', () => {
  let component: NoFormFoundComponent;
  let fixture: ComponentFixture<NoFormFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoFormFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoFormFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
