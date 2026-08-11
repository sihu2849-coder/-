const display = document.getElementById('display');
let shouldResetDisplay = false;

// 1. 숫자 입력 처리
function appendNumber(number) {
    if (display.value === '0' || shouldResetDisplay) {
        display.value = number;
        shouldResetDisplay = false;
    } else {
        display.value += number;
    }
}

// 2. 사칙연산자 입력 처리 (중복 입력 방지)
function appendOperator(operator) {
    const lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
    shouldResetDisplay = false;
}

// 3. 초기화 (C)
function clearDisplay() {
    display.value = '0';
}

// 4. 사칙연산 결과 출력
function calculate() {
    try {
        let result = eval(display.value);
        // 부동 소수점 오차 제어 (최대 15자리)
        display.value = Number(result.toPrecision(15)).toString();
        shouldResetDisplay = true;
    } catch (error) {
        display.value = '오류';
        shouldResetDisplay = true;
    }
}

// 5. 핵심: 공학용 단일 수학 함수 처리 기능
function scientific(type) {
    try {
        // 먼저 현재 화면에 있는 식이나 숫자를 연산하여 값 확보
        let currentVal = eval(display.value);
        let result;

        switch (type) {
            case 'sin':
                // Math.sin은 라디안 기준이므로 디그리(Degree) 각도로 변환하여 계산
                result = Math.sin(currentVal * (Math.PI / 180));
                break;
            case 'cos':
                result = Math.cos(currentVal * (Math.PI / 180));
                break;
            case 'tan':
                result = Math.tan(currentVal * (Math.PI / 180));
                break;
            case 'sqrt':
                result = Math.sqrt(currentVal);
                break;
            case 'pow2':
                result = Math.pow(currentVal, 2);
                break;
            case 'log':
                result = Math.log10(currentVal); // 상용로그 (밑이 10)
                break;
            case 'ln':
                result = Math.log(currentVal); // 자연로그 (밑이 e)
                break;
            case 'abs':
                result = Math.abs(currentVal); // 절대값
                break;
            default:
                return;
        }

        // 결과값을 표시창에 업데이트
        display.value = Number(result.toPrecision(15)).toString();
        shouldResetDisplay = true;
    } catch (error) {
        display.value = '오류';
        shouldResetDisplay = true;
    }
}
