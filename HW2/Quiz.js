class Author {
    constructor(n, b) {
        this.name = n
        this.birth = b 
        this.books = []
    }
    addBook(b) {
        this.books.push(b);
        b.author = this;
    }
    toString() {
        return this.name+" ("+this.birth+")"+
           " with "+this.books.length +" books"
    }
}

class Book {
    constructor(n, p, a) {
        this.name = n
        this.pages = p
        this.author = a
    }
    toString() { //not required in the quiz
        return this.name+" by "+this.author.name
    }
}
class Temperature {
  constructor(a) {
    this.celsius = Math.round(a);
  }
  get fahrenheit() {
    return Math.round(this.celsius * 1.8 + 32);
  }
  set fahrenheit(value=32) {
    this.celsius = Math.round((value - 32) / 1.8);
  }
  toString() {
    return this.celsius+"°C"
  }
  static fromFahrenheit(value) {
    let t = new Temperature();
    t.fahrenheit = value;
    return t;
  }
}

class Quiz extends Menu {
  constructor() {
    super();
	this.convertToMap();
    let a = this.solution(); 
    this.rumi = a
    this.mesnevi = a.books[0]
    this.divan = a.books[1]
    this.data = a.books.concat(a.books)
	console.log(this.data)
	
  }
  solution() {
    let a = new Author("Rumi", 1273)
    a.addBook(new Book("Mesnevi", 180))
    a.addBook(new Book("Divan", 350))
    return a
  }
  morePagesThan(num=100) {
    let s = new Set()
    for (let b of this.data)
      if (b.pages > num) s.add(b);
    return s
  }
  convertToMap() {
    let m = new Map();
    for (let b of this.data) {
      let n = m.get(b.author.name)
      if (!n) { //not found
        n = new Set()
        m.set(b.author.name, n)
      }
      n.add(b)
    }
    return m
  }
  report(num=100) {
    let c = this.data.length
    if (!c) return ""
    let t = this.rumi+"\n"
    t += "\n• Start with "+c+" books:\n"
    for (let b of this.data) t += b+"\n"
    t += "\n• morePagesThan("+num+"):\n"
    for (let b of this.morePagesThan(num)) 
      t += b+"\n"
    t += "\n• convertToMap():\n"
    let m = this.convertToMap()
    for (let k of m.keys()) 
      t += k+" -- "+m.get(k).size+" books\n"
    return t
  }
}
