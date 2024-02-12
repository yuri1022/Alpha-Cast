import Header from "../header";
import { ItemData } from "../../data/ItemData";
import { useParams } from "react-router-dom";


export default function ItemDetail () {
 const { itemName } = useParams();
const filteredItems = ItemData.filter((item) => item.id === itemName);

  return(
    <>
    <Header />

    {filteredItems.map((item)=>(
      <div className="item" key={item.id} style={{marginTop:'5%'}}>
        <img src={item.avatar} alt="" />
        <h2 className="item-title">{item.name}</h2>
      <p className="item-description" style={{marginTop:'20px'}}>{item.info}</p>
      </div>
    ))}
    </>
  );
}