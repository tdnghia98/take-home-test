import { HerbalTea } from "feature/drug";
import { mockDateNow } from "test/utils";
import { creationTime, dayInMs } from "./constants";

describe("Herbal Tea", () => {
  it("should lower the value of expiresIn and increase the value of benefit at the end of each day", () => {
    jest.spyOn(global.Date, "now").mockImplementation(() => creationTime);
    const drug = new HerbalTea("HerbalTea", 10, 10);

    mockDateNow(creationTime + dayInMs);
    expect(drug.expiresIn).toBe(9);
    expect(drug.benefit).toBe(11);
  });
  it("should increases in benefit twice as fast after the expiration date", () => {
    jest.spyOn(global.Date, "now").mockImplementation(() => creationTime);
    const drug = new HerbalTea("HerbalTea", 10, 20);

    mockDateNow(creationTime + 10 * dayInMs);
    expect(drug.expiresIn).toBe(0);
    expect(drug.benefit).toBe(30);

    mockDateNow(creationTime + 11 * dayInMs);
    expect(drug.expiresIn).toBe(-1);
    expect(drug.benefit).toBe(32);

    mockDateNow(creationTime + 12 * dayInMs);
    expect(drug.expiresIn).toBe(-2);
    expect(drug.benefit).toBe(34);
  });
  it("should never exceed 50 in benefit ", () => {
    mockDateNow(creationTime);
    const drug = new HerbalTea("Herbal Tea", 100, 100);
    expect(drug.benefit).toBe(50);

    mockDateNow(creationTime + 50 * dayInMs);
    expect(drug.benefit).toBe(50);
  });
});
