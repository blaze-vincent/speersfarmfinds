import Layout from '../components/Layout';
import Scroller from '../components/Scroller';
import {dbconnect, jsonify} from '../middleware/db';
import SalesItem from '../models/salesItem';

export async function getServerSideProps(context){
  dbconnect();
  const flowers = await SalesItem.find({type: "flower"}, function (err, salesItems) {
    if (err) return console.error(err);
    
    return salesItems;
  }).limit(10).exec();

  const farmhousePrimitives = await SalesItem.find({type: "farmhouse primitive"}, function (err, salesItems) {
    if (err) return console.error(err);

    return salesItems;
  }).limit(10).exec();

  const giftMiscellanea = await SalesItem.find({type: "gift miscellanea"}, function (err, salesItems) {
    if (err) return console.error(err);

    return salesItems;
  }).limit(10).exec();
  return {
    props: {
      flowers: jsonify(flowers),
      farmhousePrimitives: jsonify(farmhousePrimitives),
      giftMiscellanea: jsonify(giftMiscellanea) 
    }
  }
}


export default function Home({ flowers, farmhousePrimitives, giftMiscellanea }) {

  return (
    <div id="home-container">
      <Layout>
        <Scroller title="Fresh flowers" titleLink="/flowers" heightRemsInt="18" data={flowers} />
        <Scroller title="Farmhouse primitive" titleLink="/decor" heightRemsInt="16" data={farmhousePrimitives}/>
        <Scroller title="Gift Miscellanea" titleLink="/gifts" heightRemsInt="14" data={giftMiscellanea}/>
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