import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClickLoggerDirective } from './click-logger.directive';

@Component({
  template: '<button appClickLogger>Click Me</button>'
})
class TestComponent {}

describe('ClickLoggerDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let button: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClickLoggerDirective],
      declarations: [TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    button = fixture.nativeElement.querySelector('button');
  });

  it('should create an instance', () => {
    const directive = new ClickLoggerDirective(button as any);
    expect(directive).toBeTruthy();
  });

  it('should log to console when clicked', () => {
    spyOn(console, 'log');
    const directive = new ClickLoggerDirective(button as any);
    directive.onClick();
    expect(console.log).toHaveBeenCalledWith('Element clicked:', button);
  });
});