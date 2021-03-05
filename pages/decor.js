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
  const decor = await SalesItem.find({type: "farmhouse primitive"}, function (err, salesItems) {
    if (err) return console.error(err);
    
    return salesItems;
  }).exec();

  return {
    props: {
      decor: jsonify(decor),
    }
  }
}


export default function Decor({decor}) {
    const abc = arraySplit(decor)

    return (<div id="decor-container">
        <Layout>
            {abc.map( (array, i) => {
                return <Scroller title="" titleLink="/decor" heightRemsInt="22" data={array} key={i}/>
            })}
        </Layout>
    </div>)
}