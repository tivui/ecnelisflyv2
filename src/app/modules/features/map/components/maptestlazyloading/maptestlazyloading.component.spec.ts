import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaptestlazyloadingComponent } from './maptestlazyloading.component';

describe('MaptestlazyloadingComponent', () => {
  let component: MaptestlazyloadingComponent;
  let fixture: ComponentFixture<MaptestlazyloadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaptestlazyloadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaptestlazyloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
