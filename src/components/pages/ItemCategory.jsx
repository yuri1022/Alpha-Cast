import Header from "../header";
import Footer from "../Footer/footer";
import { ItemData } from "../../data/ItemData";
import { useParams } from "react-router-dom";


export default function ItemCategory () {
 const { categoryName } = useParams();
const filteredItems = ItemData.filter((item) => item.category === categoryName);

  return(
    <>
    <Header />

    {filteredItems.map((item)=>(
      <div className="item" key="item.id">{item.name}</div>
    ))}
    <Footer />
    </>
  );
}