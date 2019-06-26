import { CalculatorService } from "./calculator.service";
import { TestBed, inject } from "@angular/core/testing";
import { LoggerService } from "./logger.service";

describe("CalculatorService", () => {
  let calc: CalculatorService, loggerSpy: any;
  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy }
      ]
    });
    calc = TestBed.get(CalculatorService);
  });

  it("should add two numbers", () => {
    const res = calc.add(2, 2);
    expect(res).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract two numbers", () => {
    const res = calc.subtract(2, 2);
    expect(res).toBe(0);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
