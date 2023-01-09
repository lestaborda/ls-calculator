import { useState } from 'react';
import { Button } from '../components/Button';
import { Display } from '../components/Display';

import './Calculator.css';

function Calculator() {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [clearDisplay, setClearDisplay] = useState<boolean>(false);
  const [operation, setOperation] = useState<string | null>(null);
  const [values, setValues] = useState<number[]>([0, 0]);
  const [currentValue, setCurrentValue] = useState<number>(0);

  const clearMemory = () => {
    setDisplayValue('0');
    setClearDisplay(false);
    setOperation(null);
    setValues([0, 0]);
    setCurrentValue(0);
  };

  const handleOperation = (op: string) => {
    if (currentValue === 0) {
      setCurrentValue(1);
      setOperation(op);
      setClearDisplay(true);
    } else {
      const equals = operation === '=';
      const cloneValues = [...values];
      cloneValues[0] = eval(`${cloneValues[0]} ${operation} ${cloneValues[1]}`);
      cloneValues[1] = 0;

      setDisplayValue(String(cloneValues[0]));
      setOperation(equals ? null : operation);
      setCurrentValue(equals ? 0 : 1);
      setClearDisplay(!equals);
      setValues(cloneValues);
    }
  };

  const addDigit = (value: string) => {
    if (value === '.' && displayValue.includes('.')) {
      return;
    }

    const hasClearDisplay = displayValue === '0' || clearDisplay;
    const current = hasClearDisplay ? '' : displayValue;
    const displayValueResult = current + value;

    if (value !== '.') {
      const index = currentValue;
      const newValue = parseFloat(displayValueResult);
      const cloneValues = [...values];
      cloneValues[index] = newValue;

      setValues(cloneValues);
    }

    setDisplayValue(displayValueResult);
    setClearDisplay(false);
  };

  return (
    <div className='container'>
      <header>
        <span>Calculadora</span>
      </header>
      <div className='calculator'>
        <Display value={displayValue} />
        <Button label='AC' onClick={clearMemory} double />
        <Button label='%' onClick={addDigit} />
        <Button label='/' onClick={handleOperation} operation />
        <Button label='7' onClick={addDigit} />
        <Button label='8' onClick={addDigit} />
        <Button label='9' onClick={addDigit} />
        <Button label='*' onClick={handleOperation} operation />
        <Button label='4' onClick={addDigit} />
        <Button label='5' onClick={addDigit} />
        <Button label='6' onClick={addDigit} />
        <Button label='-' onClick={handleOperation} operation />
        <Button label='1' onClick={addDigit} />
        <Button label='2' onClick={addDigit} />
        <Button label='3' onClick={addDigit} />
        <Button label='+' onClick={handleOperation} operation />
        <Button label='0' onClick={addDigit} double />
        <Button label='.' onClick={addDigit} />
        <Button label='=' onClick={handleOperation} operation />
      </div>
    </div>
  );
}

export default Calculator;
