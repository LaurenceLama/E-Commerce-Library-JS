let books;
async function renderBooks(filter) {
  const booksWrapper = document.querySelector('.books');


  // document.body.classList += ' books__loading' : this line of command affects the whole body whereas we only needed to apply for the loading thing itself
  booksWrapper.classList += ' books__loading'
  if (!books) {
   books = await getBooks()
  }
  booksWrapper.classList.remove('books__loading')
  
  if (filter === "Low_to_High") {
    // so with that OR gate, the left side (saleprice) is prioritized when applicable, then if salePrice is null, then original takes place
    books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice))
  }
  else if (filter === "High_to_Low") {
    books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice))
  }
  else if (filter === 'Rating') {
    books.sort((a, b) => b.rating - a.rating)
  }

  const booksHtml = books.map(book => {
    // this HTML looking thing was actually copied from the HTML itself, so we can u know, encode the data with dynamicism
    return`<div class="book">
      <figure class="book__img--wrapper">
        <img class="book__img" src="${book.url}" alt="" />
      </figure>
      <div class="book__title">${book.title}</div>
      <div class="book__ratings">
        ${ratingsHTML(book.rating)}
      </div>
      <div class="book__price">
      <span>${priceHTML(book.originalPrice, book.salePrice)}</span> 
      </div>
      </div>`
    }).join('')
    // this join command lets us remove the centerd ,commas, while allowing it to be flex wrapped(i think)
    booksWrapper.innerHTML = booksHtml
  }
  // <span class="book__price--normal">$${book.originalPrice}</span> $${book.salePrice}

function filterBooks(event) {
  // basically that 3 dotted argument = the Low to High value on HTML (see Line 67 on HTML for more info)
  renderBooks(event.target.value)
}

function ratingsHTML(rating) {
  let ratingHTML = ''
  for (let i = 0; i < Math.floor(rating); i++) {
    ratingHTML += '<i class="fas fa-star"></i>'
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fas fa-star-half-alt"></i>'
  }
  return ratingHTML
}

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `$${originalPrice.toFixed(2)}`
  }
  return `<span class="book__price--normal">$${originalPrice.toFixed(2)}</span>$${salePrice.toFixed(2)}`
  // that toFixed(2) is just like numbering how many sig. figs. (significant figures if u forgot)
}

setTimeout(() => {
  renderBooks();
},1);
// on my case, leaving that 1 blank, still resulted to null so yeh

// FAKE DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack the coding interview.png",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic habits.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep work.jpeg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 35,
          salePrice: null,
          rating: 4,
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
      ]);

    }, 1000);
  })
}
