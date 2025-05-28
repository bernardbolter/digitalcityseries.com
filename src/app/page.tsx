import ArtworkGrid from "../components/artwork/ArtworkGrid";
import Search from "../components/artwork/Search";
import About from "../components/artwork/About";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero">
        <div className="home__container">
          <h1 className="home__title">Digital City Series</h1>
          <p className="home__subtitle">Exploring urban environments through digital art</p>
          <div className="home__buttons">
            <Link href="#artwork" className="button button--primary">
              View Artwork
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <About />
      
      {/* Search Section */}
      <Search />
      
      {/* Artwork Grid Section */}
      <section id="artwork" className="home__section">
        <div className="home__container">
          <div className="home__section-header">
            <h2 className="home__section-title">Artwork Collection</h2>
          </div>
          <ArtworkGrid />
        </div>
      </section>
    </div>
  );
}
