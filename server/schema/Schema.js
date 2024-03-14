export class User {
  constructor(user) {
    (this.fullName = user.fullName||""),
      (this.email = user.email),
      (this.sex = user.sex || ""),
      (this.password = user.password|| ""),
      (this.birthday = user.birthday?new Date(user.birthday):"" ),
      (this.phone = user.phone|| ""),
      (this.role=user.role || "user")
  }
}
export class Books {
  constructor(book) {
    (this.name = book.name),
      (this.author = book.author),
      (this.date = new Date(book.date)),
      (this.type = book.type),
      (this.publisher = book.publisher),
      (this.amount = book.amount),
           (this.img = book.img),
      (this.price = book.price),
      (this.description = book.description),
      (this.status = book.status),
      (this.discount = book.discount),
      (this.dateIn = book.dateIn);
  }
}
export class Comment {
  constructor(comment) {
    (this.userCode = comment.userCode),
      (this.bookCode = comment.bookCode),
      (this.content = comment.content),
      (this.rate = comment.rate),
      (this.date = new Date(comment.date));
  }
}
export class ImportedBook {
  constructor(book) {
    (this.userCode = book.userCode),
      (this.dateIn = book.dateIn),
      (this.amount = book.amount),
      (this.book = book.book);
  }
}
export class Receipt {
  constructor(receipt) {
    (this.userID = receipt.userID),
      (this.date = new Date(receipt.date)),
      (this.cart = receipt.cart),
      (this.status = receipt.status);
  }
}

export class HiredBook {
  constructor(book) {
    (this.userCode = book.userCode),
      (this.bookCode = book.bookCode),
      (this.dateIn = new Date(book.dateIn)),
      (this.dateOut = new Date(book.dateOut)),
      (this.state = book.state);
  }
}
export class Cart {
  constructor(cart) {
    (this.bookID = cart.bookID),
      (this.amount = cart.amount),
      (this.discount = cart.discount),
      (this.price = cart.price);
  }
}
