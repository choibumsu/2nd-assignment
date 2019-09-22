const timerValue = document.querySelector(".dgt-clock");
var countDown;

function secHandRotate(degree) {
	//degree 값에 따라 초침의 각도를 변환
	const secondHandWrap = document.querySelector(".second-hand-wrap");
	secondHandWrap.style.transform = `rotate(${degree}deg)`;
}

function turnDisabled(adding) {
	//adding이 true이면 버튼들에 disabled를 추가, false는disabled를 제거
	const plusBtn = document.querySelector(".plusBtn");
	const minusBtn = document.querySelector(".minusBtn");
	const startBtn = document.querySelector(".startBtn");

	const btns = [plusBtn, minusBtn, startBtn];

	if (adding) {
		btns.forEach(btn => {
			btn.classList.add("disabled");
		});
	}
	else {
		btns.forEach(btn => {
			btn.classList.remove("disabled");
		});
	}
}

function processStart() {
	//현재 남은 시간을 1초 줄여주고, 초침도 변경
	const currentTime = parseInt(timerValue.innerText) - 1;

	timerValue.innerText = currentTime;
	secHandRotate(currentTime * 6);

	//남은 시간이 없으면 inverval을 멈추고, 버튼들의 disabled 해제
	if (currentTime === 0) {
		clearInterval(countDown);
		turnDisabled(false);
	}
}

function handleStartBtn(event) {
	//시작버튼의 클릭 이벤트.
	//disabled 이 아니고 남은 시간이 0 초과일때, 1초마다 processStart 호출하고 버튼들을 disabled 로 전환
	const startBtn = event.target;
	const disabled = startBtn.classList.contains('disabled');
	const currentTime = parseInt(timerValue.innerText);

	if (disabled === false && currentTime > 0) {
		turnDisabled(true);
		countDown = setInterval(processStart, 1000);
	}
}

function handlePlusBtn(event) {
	const plusBtn = event.target;
	const disabled = plusBtn.classList.contains('disabled');
	const currentTime = parseInt(timerValue.innerText) + 1;

	if (disabled === false && currentTime < 60) {
		timerValue.innerText = currentTime;
		secHandRotate(currentTime * 6);
	}
}

function handleMinusBtn() {
	const minusBtn = event.target;
	const disabled = minusBtn.classList.contains('disabled');
	const currentTime = parseInt(timerValue.innerText) - 1;

	if (disabled === false && currentTime > -1) {
		timerValue.innerText = currentTime;
		secHandRotate(currentTime * 6);
	}
}

function initAnalogClock() {
	const clock = document.querySelector(".anlg-clock");
	const clockCircle = document.createElement("div"),
		secondHandWrap = document.createElement("div"),
		secondHand = document.createElement("div");

	const CL_SIZE = 200,
		CL_BORDER_SIZE = 1,
		CL_BORDER_COLOR = "black",
		CL_BORDER_KIND = "solid",
		SEC_HAND_SIZE = 1,
		SEC_HAND_COLOR = "pink",
		CL_SEC_GAP = 10;

	clockCircle.classList.add("clock-circle");
	secondHandWrap.classList.add("second-hand-wrap");
	secondHand.classList.add("second-hand");

	clockCircle.style.width = `${CL_SIZE}px`;
	clockCircle.style.height = `${CL_SIZE}px`;
	clockCircle.style.border = `${CL_BORDER_SIZE}px ${CL_BORDER_KIND} ${CL_BORDER_COLOR}`;
	clockCircle.style.borderRadius = "100%";
	clockCircle.style.display = "flex";
	clockCircle.style.flexDirection = "column";
	clockCircle.style.alignItems = "center";
	clockCircle.style.justifyContent = "center";

	secondHandWrap.style.width = `${SEC_HAND_SIZE}px`;
	secondHandWrap.style.height = `${CL_SIZE - CL_SEC_GAP}px`;

	secondHand.style.width = `${SEC_HAND_SIZE}px`;
	secondHand.style.height = `${(CL_SIZE - CL_SEC_GAP) / 2}px`;
	secondHand.style.backgroundColor = `${SEC_HAND_COLOR}`;

	secondHandWrap.append(secondHand);

	clockCircle.append(secondHandWrap);

	clock.innerText = "";
	clock.append(clockCircle);
}

function setElement(elem, elemText, elemClass, elemEvent, elemEventFunc) {
	elem.innerText = elemText;
	elem.classList.add(elemClass);
	elem.addEventListener(elemEvent, elemEventFunc);
}

function initTimerBtn() {
	const timerControl = document.querySelector(".timer");
	const btnDiv = document.createElement("div"),
		plusBtn = document.createElement("button"),
		minusBtn = document.createElement("button"),
		startBtn = document.createElement("button");

	setElement(plusBtn, "+", "plusBtn", "click", handlePlusBtn);
	setElement(minusBtn, "-", "minusBtn", "click", handleMinusBtn);
	btnDiv.append(minusBtn, plusBtn);

	setElement(startBtn, "시작", "startBtn", "click", handleStartBtn);

	timerControl.innerText = "";
	timerControl.append(btnDiv, startBtn);
}

function setZero() {
	const seconds = 0;
	timerValue.innerText = `${seconds}`;
}

function init() {
	setZero();
	initTimerBtn();
	initAnalogClock();
}
init();
