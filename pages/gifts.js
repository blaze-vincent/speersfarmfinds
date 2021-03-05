import Layout from '../components/Layout';
import {dbconnect, jsonify} from '../middleware/db';
import SalesItem from '../models/salesItem';
import Scroller from '../components/Scroller';

const arraySplit = (array = []) => {
    let output = []
    for (let i=0; i < array.length; i += 10) {
         output.push(array.slice(i, i+10));
    }
    return output;
}


export async function getServerSideProps(context){
  dbconnect();
  const gifts = await SalesItem.find({type: "gift miscellanea"}, function (err, salesItems) {
    if (err) return console.error(err);
    
    return salesItems;
  }).exec();

  return {
    props: {
      gifts: jsonify(gifts),
    }
  }
}


export default function Gifts({gifts}) {
    const abc = arraySplit(gifts)

    return (<div id="gifts-container">
        <Layout>
            {abc.map( (array, i) => {
                return <Scroller title="" titleLink="/gifts" heightRemsInt="22" data={array} key={i}/>
            })}
        </Layout>
    </div>)
}