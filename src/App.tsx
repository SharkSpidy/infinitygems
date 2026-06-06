import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ModalProvider } from './hooks/useModal'
import Header from './components/Header'
import Footer from './components/Footer'
import InquiryModal from './components/InquiryModal'
import Home from './pages/Home'
import Collection from './pages/Collection'
import ItemDetail from './pages/ItemDetail'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <div className="grain">
      {!isAdmin && <Header />}
      <main>{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <InquiryModal />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </ModalProvider>
    </BrowserRouter>
  )
}
