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
  const flowers = await SalesItem.find({type: "flower"}, function (err, salesItems) {
    if (err) return console.error(err);
    
    return salesItems;
  }).exec();

  return {
    props: {
      flowers: jsonify(flowers),
    }
  }
}


export default function Flowers({flowers}) {
    const abc = arraySplit(flowers)
    console.log(abc)
    return (<div id="flowers-container">
        <Layout>
            {abc.map( (array, i) => {
                return <Scroller title="" titleLink="/flowers" heightRemsInt="22" data={array} key={i}/>
            })}
        </Layout>
    </div>)
}