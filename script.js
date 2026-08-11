const display = document.getElementById('display');
let shouldResetDisplay = false;

// 숫자 입력 함수
function appendNumber(number) {
    if (display.value === '0' || shouldResetDisplay) {
        display.value = number;
        shouldResetDisplay = false;
    } else {
        display.value += number;
    }
}

// 연산자 입력 함수 (연속 입력 방지 포함)
function appendOperator(operator) {
    const lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
    shouldResetDisplay = false;
}

// 초기화(C) 함수
function clearDisplay() {
    display.value = '0';
}

// 결과 계산 함수
function calculate() {
    try {
        let result = eval(display.value);
        // 부동 소수점 오차 방지 및 글자 수 제한 (15자리)
        display.value = Number(result.toPrecision(15)).toString();
        shouldResetDisplay = true;
    } catch (error) {
        display.value = '오류';
        shouldResetDisplay = true;
    }
}
