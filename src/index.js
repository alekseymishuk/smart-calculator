class SmartCalculator {
  constructor(initialValue) {
    this.value = initialValue;
    this.operationQueue = [];
  }

  add(number, secondValue = null) {
    if ( secondValue === null) {
      this.operationQueue.push({operation: this.add, value: number, priority: 2});
      return this;
    }
    return number + secondValue;
  }
  
  subtract(number, secondValue = null) {
    if ( secondValue === null) {
      this.operationQueue.push({operation: this.subtract, value: number, priority: 2});
      return this;
    }
    return number - secondValue;
  }
  

  multiply(number, secondValue = null) {
    if (secondValue === null) {
      this.operationQueue.push({operation: this.multiply, value: number, priority: 1});
      return this;
    }
    return number * secondValue;
  }

  devide(number, secondValue = null) {
    if (secondValue === null) {
      this.operationQueue.push({operation: this.devide, value: number, priority: 1});
      return this;
    }
    return number / secondValue;
  }

  pow(number, secondValue = null) {
    if (secondValue === null) {
      this.operationQueue.push({operation: this.pow, value: number, priority: 0});
      return this;
    }
    return Math.pow(number, secondValue);
  }

  calculateValue() {
    for (let priorityIndex = 0; priorityIndex < 2; priorityIndex ++) {
      
      while(this.operationQueue.some(it => it.priority === priorityIndex)) {
        let operationIndex = -1;
        if (priorityIndex === 0 ) operationIndex = this.operationQueue.map(it => it.priority === priorityIndex).lastIndexOf(true);

        const currentOperation = priorityIndex > 0 ? this.operationQueue.find((it, index) => {
          if (it.priority === priorityIndex) {
            operationIndex = index;
            return true;
          }
          return false;
        }) : this.operationQueue[operationIndex];

        if (operationIndex === 0)
          this.value = currentOperation.operation(this.value, currentOperation.value);
        else
          this.operationQueue[operationIndex - 1].value = 
          currentOperation.operation(this.operationQueue[operationIndex - 1].value, currentOperation.value);

        this.operationQueue = this.operationQueue.filter(it => it != currentOperation);
      }
    }

    this.value = this.operationQueue.reduce((accumulator, item) => {
      return item.operation(accumulator, item.value);
    }, this.value);
  }

  valueOf() {
    this.calculateValue();
    return this.value;
  }
  
}

module.exports = SmartCalculator;
