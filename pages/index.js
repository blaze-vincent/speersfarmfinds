import Layout from '../components/Layout';
import Scroller from '../components/Scroller';

export default function Home() {
  return (
    <div id="home-container">
      <Layout>
        <h2>Store Highlights</h2>
        <Scroller title="Fresh flowers" titleLink="/flowers" heightRemsInt="18"/>
        <Scroller title="Farmhouse primitive" titleLink="/decor" heightRemsInt="16"/>
        <Scroller title="Gift Miscellanea" titleLink="/gifts" heightRemsInt="14"/>
      </Layout>
      <style jsx>{`
        h2 {
          width: max-content;
          font-size: 1.25rem;
          font-weight: 400;
          margin: auto;
        }
      `}</style>
    </div>
  )
}
