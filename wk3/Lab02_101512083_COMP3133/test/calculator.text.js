const { expect } = require("chai");
const calculator = require("../app/calculator");

describe("Calculator Test Suite", () => {

  describe("Addition", () => {
    it("should add two positive numbers", () => {
      expect(calculator.add(5, 3)).to.equal(8);
    });

    it("should add a positive and a negative number", () => {
      expect(calculator.add(10, -4)).to.equal(6);
    });
  });

  describe("Subtraction", () => {
    it("should subtract two numbers", () => {
      expect(calculator.sub(10, 4)).to.equal(6);
    });

    it("should subtract a larger number from smaller one", () => {
      expect(calculator.sub(3, 8)).to.equal(-5);
    });
  });

  describe("Multiplication", () => {
    it("should multiply two numbers", () => {
      expect(calculator.mul(6, 7)).to.equal(42);
    });

    it("should multiply by zero", () => {
      expect(calculator.mul(9, 0)).to.equal(0);
    });
  });

  describe("Division", () => {
    it("should divide two numbers", () => {
      expect(calculator.div(20, 5)).to.equal(4);
    });

    it("should throw error when dividing by zero", () => {
      expect(() => calculator.div(10, 0)).to.throw("cant divide by 0");
    });
  });

});
