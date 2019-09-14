window.onload = () => {
	const app = document.querySelector("#app");
	const testDiv = document.createElement("div");
	const practiceOne = document.createElement("p");
	const practiceTwo = document.createElement("p");

	practiceOne.innerText = `지정한 숫자만큼 아날로그 초침이 시계 방향으로 설정된 다음 
        시작 버튼을 누르면 1초마다 시계 반대 방향으로 움직여서 
        결국 12시 방향을 가르키며 종료되는 아날로그 타이머`;
	practiceTwo.innerText = `지정한 숫자만큼 타이머가 표시되고 
        시작 버튼을 누르면 1초씩 줄어들고 
        0초에서 정지하는 디지털 타이머`;

	testDiv.append(practiceOne, practiceTwo);
	app.prepend(testDiv);
};
