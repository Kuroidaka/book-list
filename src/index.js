

var bookStorage = []


const App = {
   updateJob: function(books) {
       localStorage.setItem('books', JSON.stringify(books));
   },
   handleEvent: function(){
       // tạo ra một cái _this để thay thế cho cái this là cái object App bao quát ở ngoài
       const _this = this
       const addBtn = document.querySelector('.add')
       // Click thêm
       addBtn.onclick = (e) => {
           e.preventDefault()

           const bookName =  document.querySelector('#book-name')
           const author =  document.querySelector('#author')
           const price =  document.querySelector('#price')
           const date =  document.querySelector('#date')
           const NSX =  document.querySelector('#NSX')
           const detail =  document.querySelector('#detail')
           const imgUrl =  document.querySelector('#img-url')
           
           // tạo một object mới để lưu trữ các thông tin vừa input
           const newBooks = {
               bookName: bookName.value,
               author: author.value,
               price: price.value,
               date: date.value,
               NSX: NSX.value,
               detail: detail.value,
               imgUrl: imgUrl.value,
           }

           // lưu cái object vừa tạo vào mảng jobStorage để đẩy lên localStorage
           bookStorage.push(newBooks)

    //        // đẩy lên localStorage
           _this.updateJob(bookStorage)

    //        // render ra những gì vừa thêm vào
           _this.render()
       }

   },   
   render: function() {
       if(bookStorage){
       const htmls = bookStorage.map((book, id) => {
           return `
                   <div>
                        <img src='${book.imgUrl}'>
                        <h3>${book.bookName}</h3>
                        <div>Tác giả: ${book.author}</div>
                        <div>Năm sản xuất: ${book.date}</div>
                        <div>Giá: ${book.price}</div>
                        <div onclick="App.renderPage(${id})">Chi tiết</div>
                   </div>
               `
       })
       document.querySelector('.book-list').innerHTML = htmls.join('')
   }
   },
   renderPage: function(id) {
       const htmls = `
       <div>
            <img src='${bookStorage[id].imgUrl}'>
            <h1>${bookStorage[id].bookName}</h1>
            <p>Người phụ trách: ${bookStorage[id].author}</p>
            <p>Nhà Xuất bản: ${bookStorage[id].date}</p>
            <p>Năm Xuất bản: ${bookStorage[id].NSX}</p>
            <p>Giá: ${bookStorage[id].price}</p>
            <h3>Chi tiết</h3>
            <div>${bookStorage[id].detail}</div>
       </div>
   `
       document.open()
       document.write(htmls)
   },
   loadBooks: function() {
       // check valid localStorage (cause it will return null when local not contain any data and it will error to use map function for jobStorage)
       const getBooks = JSON.parse(localStorage.getItem('books'))

       // lưu dữ liệu từ localStorage về cái mảng để render
       if(getBooks){
           bookStorage = getBooks
       }
   },

   start: async function(){
       // load những job hiện có trong danh sách đã được thêm
       this.loadBooks()
       // render những jobs trong danh sách
       this.render()
       // hàm xử lí sự kiện
       this.handleEvent()
   }
}

App.start()



