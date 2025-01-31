import { Fervex } from "feature/drug";
import { mockDateNow } from "test/utils";
import { creationTime, dayInMs } from "./constants";

describe("Fervex", () => {
  it("should have an expiresIn value which denotes the number of days we have until the item expires", () => {
    const drug = new Fervex("Fervex", 10, 10);
    expect(drug.expiresIn).toBeCloseTo(10);
  });
  it("should have a benefit value which denotes how powerful the drug is", () => {
    const drug = new Fervex("Fervex", 10, 10);
    expect(drug.benefit).toBeCloseTo(10);
  });
  it("should increase the values of benefit and decrease the value of expiresIn at the end of each day", () => {
    mockDateNow(creationTime);
    const drug = new Fervex("Fervex", 20, 20);

    mockDateNow(creationTime + dayInMs);
    expect(drug.expiresIn).toBe(19);
    expect(drug.benefit).toBe(21);
  });
  it("should increases in benefit by 2 when there are 10 days or less in expiration", () => {
    mockDateNow(creationTime);
    const drug = new Fervex("Fervex", 20, 20);

    mockDateNow(creationTime + 10 * dayInMs);
    expect(drug.expiresIn).toBe(10);
    expect(drug.benefit).toBe(31);

    mockDateNow(creationTime + 11 * dayInMs);
    expect(drug.expiresIn).toBe(9);
    expect(drug.benefit).toBe(33);
  });
  it("should increases in benefit by 3 when there are 5 days or less in expiration", () => {
    mockDateNow(creationTime);
    const drug = new Fervex("Fervex", 20, 20);

    mockDateNow(creationTime + 15 * dayInMs);
    expect(drug.expiresIn).toBe(5);
    expect(drug.benefit).toBe(42);

    mockDateNow(creationTime + 16 * dayInMs);
    expect(drug.expiresIn).toBe(4);
    expect(drug.benefit).toBe(45);
  });
  it("should drop benefit to 0 after expiration date", () => {
    mockDateNow(creationTime);
    const drug = new Fervex("Fervex", 20, 20);

    mockDateNow(creationTime + 20 * dayInMs);
    expect(drug.expiresIn).toBe(0);
    expect(drug.benefit).toBe(50);

    mockDateNow(creationTime + 21 * dayInMs);
    expect(drug.expiresIn).toBe(-1);
    expect(drug.benefit).toBe(0);
  });
  it("should never exceed 50 in benefit ", () => {
    mockDateNow(creationTime);
    const drug = new Fervex("Fervex", 100, 100);
    expect(drug.benefit).toBe(50);

    mockDateNow(creationTime + 50 * dayInMs);
    expect(drug.benefit).toBe(50);
  });
  it("should never degrade the benefit to negative value", () => {
    mockDateNow(creationTime);
    const drug = new Fervex("Fervex", 1, 2);

    mockDateNow(creationTime + 3 * dayInMs);
    expect(drug.benefit).toBe(0);
  });
});
