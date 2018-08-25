// const f = (m) => () => console.log(m);
const f = function (m) {
  return function () {
    return console.log(m);
  };
};
// const f2 = (f3) => f3();
const f2 = function (f3) {
	f3();
}
f2(f('Test'));