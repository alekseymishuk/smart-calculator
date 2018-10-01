class SmartCalculator {
  constructor(initialValue) {
    this.value = initialValue;
    this.operationQueue = [];
  }

  add(number, secondValue = null) {
    if ( secondValue === null) {
      this.operationQueue.push({operation: this.add, value: number});
      return this;
    }
    return number + secondValue;
  }
  
  subtract(number, secondValue = null) {
    if ( secondValue === null) {
      this.operationQueue.push({operation: this.subtract, value: number});
      return this;
    }
    return number - secondValue;
  }
  

  multiply(number) {
    const lastOperation = this.operationQueue.pop();
    
    if (!lastOperation) {
      this.value *= number; 
      return this;
    }
    
    this.operationQueue.push({operation: lastOperation.operation, value: lastOperation.value * number});
    return this;
  }

  devide(number) {
    const lastOperation = this.operationQueue.pop();
    
    if (!lastOperation) {
      this.value /= number; 
      return this;
    }
    
    this.operationQueue.push({operation: lastOperation.operation, value: lastOperation.value / number});
    return this;
  }

  pow(number) {
    const lastOperation = this.operationQueue.pop();
    
    if (!lastOperation) {
      this.value = Math.pow(this.value, number); 
      return this;
    }
    
    this.operationQueue.push({operation: lastOperation.operation, value: Math.pow(lastOperation.value, number)});
    return this;
  }

  valueOf() {
    //return this.value;
    this.value = this.operationQueue.reduce((accumulator, item) => {
      return item.operation(accumulator, item.value);
    }, this.value);
    return this.value;
  }
  
}

//module.exports = SmartCalculator;

let calc = new SmartCalculator(10);
const x = calc.multiply(2)
.pow(2)
.subtract(95)
.subtract(56)
.pow(2)
.pow(2)
.pow(1)
.multiply(1);
console.log(x);
