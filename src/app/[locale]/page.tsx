import Header from '@/components/header/Header'
import About from '@/components/about/About'
import Paintings from '@/components/paintings/Paintings'
import ArtworkGrid from '@/components/artwork/ArtworkGrid'
import Footer from '@/components/footer/Footer'

export default function HomePage() {
  // The locale is now available via params
//   const { locale } = params
   

  // Note: Data fetching for the content (e.g., GraphQL) should happen here in the Server Component.

  return (
    <main className="layout__main">
      <Header />
      <About />
      <Paintings />
      <ArtworkGrid />
      <Footer />
    </main>
  )
}
