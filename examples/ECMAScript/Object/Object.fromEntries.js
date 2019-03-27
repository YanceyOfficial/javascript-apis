const arr = [
  ['firstName', 'Yancey'],
  ['lastName', 'Leo'],
  ['say', function () {
    console.log('say something...')
  }],
];

const obj = Object.fromEntries(arr);

obj.say(); // 'say something...'