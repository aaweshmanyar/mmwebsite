import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './component/Homepage'
import Addarticle from './component/Addarticle'
import Navbar from './component/Navbar/Navbar'
import Footer from './component/Footer/Footer'
import Aboutcenter from './component/Aboutcenter'
import Fullarticle from './component/Fullarticle'
import Fullengarticle from './component/Fullengarticle'
import Bookpage from './component/BookPage';
import BookDetailsPage from './component/BookDetailsPage'
import Books from './component/BookList';
import ArticleFullpage from './component/Articlefullpage'
import Question from './component/Question'
import QuestionDetail from './component/QuestionDetail'
import Quesetionpage from './component/Questionpage'
import Requestbook from './component/Requestbook'
import WriterProfile from './component/WriterProfile'
import NewandEvent from './component/NewandEvent'
import ContactUs from './component/Contactus'
import ScrollTop from './component/ScrollToTop'


const App = () => {
  return (
    <Router>
          <ScrollTop/>
      <div>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/article" element={<Addarticle/>} />
          <Route path="/about" element={<Aboutcenter/>} />
          <Route path="/detailarticle/:id" element={<Fullarticle/>} />
          <Route path="/engarticle" element={<Fullengarticle/>} />
          <Route path="/books" element={<Bookpage/>} />
          <Route path="/bookdetail/:id" element={<BookDetailsPage/>} />
          <Route path="/bookslist" element={<Books/>} />
          <Route path="/articlefullpage" element={<ArticleFullpage/>} />
          <Route path="/questionlist" element={<Question/>} />
          <Route path="/question/:id"  element={<QuestionDetail/>} />
          <Route path="/question"  element={<Quesetionpage/>} />
          <Route path="/requestbook"  element={<Requestbook/>} />
          <Route path="/writer"  element={<WriterProfile/>} />
          <Route path="/newsandevent"  element={<NewandEvent/>} />
          <Route path="/contact"  element={<ContactUs/>} />
        
        
       
         
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  )
}

export default App
