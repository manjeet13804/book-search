import './App.css';
import searchIcon from "./images/search.png";
import { useEffect, useState } from 'react';
import { Link, BrowserRouter } from "react-router-dom"
function App() {
  const [searchValue, setSearchValue] = useState()
  const [data, setData] = useState([])
  useEffect(() => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=%7BbookTitle")
      .then(response => response.json())
      .then(alldata => setData(alldata.items))
  }, [])
  const [books, setBooks] = useState([])
  const searchData = () => {
    setBooks(data.filter(name => name.volumeInfo.title.includes(searchValue)))
  }
  return (
    <>
      <header className="head">
        BOOK SEARCH
      </header>
      <section className='main'>
        <span><input type="search" className="search" value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} /></span>
        <button className='search-icon' onClick={() => searchData()}>
          <img src={searchIcon} alt="search" />
        </button>

      <div className='book-list'>
          <BrowserRouter>
            {data.map(eachone => {

              // console.log(eachone.volumeInfo.title)
              return <>
                <span className='list-img'>

                  <a href={eachone.volumeInfo.previewLink}>
                    <img src={eachone.volumeInfo.imageLinks.thumbnail} alt="icon" />
                  </a>
                </span>
              </>
            })}
            {/* {console.log((data))} */}
          </BrowserRouter>
        </div>
      </section>
    </>
  );
}

export default App;
