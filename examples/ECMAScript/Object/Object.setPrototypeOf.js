function Foo(name) {
  this.name = name;
}

const o = {};
o.__proto__ = Foo.prototype;
Foo.call(o)

const o1 = {};
Object.setPrototypeOf(o1, Foo.prototype);
Foo.call(o1)