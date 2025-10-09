import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import About from '@/components/about/About'
import Paintings from '@/components/paintings/Paintings'
import ArtworkGrid from '@/components/artwork/ArtworkGrid'

export default function IndexPage() {

  return (
    <div>
      <Header />
      <About />
      <Paintings />
      <ArtworkGrid />
      <Footer />
    </div>
  )
}