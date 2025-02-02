function problem1(pobi, crong) {
  let answer;
  const FIRST_PAGE = 1;
  const LAST_PAGE = 400;
  const MINIMUM_PAGE = 2;
  const PAGE_LENGTH = 2;

  const EXCEPTIONS = -1;
  const WINNER_POBI = 1;
  const WINNER_CRONG = 2;
  const DRAW = 0;

  // - [x] 책을 임의로 펼친다.
  // - [x] 책을 펼쳤을때 시작 면이나 마지막 면이 나오지 않는다.
  const getRandomPage = () =>
    Math.floor(Math.random() * (LAST_PAGE - FIRST_PAGE)) + MINIMUM_PAGE;
  const getOddNumber = (number) => (isEvenNumber(number) ? number + 1 : number);
  if (!pobi) {
    const leftPage = getOddNumber(getRandomPage());
    const rightPage = leftPage + 1;
    pobi = [leftPage, rightPage];
  }
  if (!crong) {
    const leftPage = getOddNumber(getRandomPage());
    const rightPage = leftPage + 1;
    crong = [leftPage, rightPage];
  }

  // - [x] pobi와 crong의 길이는 2이다.
  const isLengthMatch = (length, pages) => pages.length === length;
  if (!isLengthMatch(PAGE_LENGTH, pobi) || !isLengthMatch(PAGE_LENGTH, crong)) {
    answer = EXCEPTIONS;
    return answer;
  }

  // - [x] 모든 페이지에는 번호가 적혀있다.
  const isNumber = (pages) =>
    pages.filter((page) => typeof page === 'number').length > 0;
  if (!isNumber(pobi) || !isNumber(crong)) {
    answer = EXCEPTIONS;
    return answer;
  }

  // - [x] 좌우 페이지는 연속된다.
  const isContinuousPage = ([left, right]) => left - right === -1;
  if (!isContinuousPage(pobi) || !isContinuousPage(crong)) {
    answer = EXCEPTIONS;
    return answer;
  }

  // - [x] 왼쪽 페이지는 홀수, 오른쪽 페이지는 짝수 번호다.
  const isOddNumber = (number) => number % 2 > 0;
  const isEvenNumber = (number) => number % 2 === 0;
  const [pobiLeft, pobiRight] = pobi;
  const [crongLeft, crongRight] = crong;
  if (
    !isOddNumber(pobiLeft) ||
    !isOddNumber(crongLeft) ||
    !isEvenNumber(pobiRight) ||
    !isEvenNumber(crongRight)
  ) {
    answer = EXCEPTIONS;
    return answer;
  }

  // - [x] 왼쪽 페이지 번호의 각 자리 숫자를 모두 더하거나, 곱해 가장 큰 수를 구한다.
  // - [x] 오른쪽 페이지 번호의 각 자리 숫자를 모두 더하거나, 곱해 가장 큰 수를 구한다.
  // - [x] 5~6의 결과 중 가장 큰 수를 본인의 점수로 한다
  // - [x] 점수를 비교해 가장 높은 사람이 게임의 승자다.
  const splitNumber = (number) => {
    let splittedNumbers = [];
    const stringNumber = '' + number;

    for (const oneLetter of stringNumber) {
      splittedNumbers.push(+oneLetter);
    }
    return splittedNumbers;
  };
  const splitNumberArray = (numberArray) =>
    numberArray.map((number) => splitNumber(number));

  const sum = (numberArray) => numberArray.reduce((prev, cur) => prev + cur, 0);

  const multiple = (numberArray) =>
    numberArray.reduce((prev, cur) => prev * cur, 1);

  const getPoint = (pages) => {
    const points = [];
    const splittedNumber = splitNumberArray(pages);

    splittedNumber.forEach((page) => {
      points.push(sum(page));
      points.push(multiple(page));
    });
    return Math.max(...points);
  };

  pobiPoint = getPoint(pobi);
  crongPoint = getPoint(crong);

  if (pobiPoint > crongPoint) {
    answer = WINNER_POBI;
    return answer;
  }

  if (pobiPoint < crongPoint) {
    answer = WINNER_CRONG;
    return answer;
  }
  if (pobiPoint === crongPoint) {
    answer = DRAW;
    return answer;
  }

  answer = EXCEPTIONS;
  return answer;
}

module.exports = problem1;
