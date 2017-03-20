import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingEditorComponent } from './voting-editor.component';

describe('VotingEditorComponent', () => {
  let component: VotingEditorComponent;
  let fixture: ComponentFixture<VotingEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
