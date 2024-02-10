import Step1 from '../Form/Step1.jsx';
import Step2 from '../Form/Step2.jsx';
import Step3 from '../Form/Step3.jsx';
import ProgressControl from '../Form/ProgressControl.jsx';
import StepProgress from '../Form/StepProgress.jsx';
import '../Form/form.scss'
import Cart from '../Form/Cart.jsx';
import { useState, useContext } from "react";
import { CartProvider } from '../Form/Cartcontext.jsx';
import { CartContext } from '../Form/Cartcontext.jsx'; 

export default function CheckoutForm() {
  const { cardInfo,updateCardInfo } = useContext(CartContext);
  const [shopStage, setShopStage] = useState(1);


const handleNextClick = () => {
  if (shopStage < 3) {
    setShopStage((prevStage) => prevStage + 1);
  }
};

const handlePreviousClick = () => {
  if (shopStage > 1) {
    setShopStage((prevStage) => prevStage - 1);
  }
};

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Form data submitted:', cardInfo);

  };

  const renderForm = () => {
    switch (shopStage) {
      case 1:
        return <Step1></Step1>;
      case 2:
        return <Step2></Step2>;
      case 3:
        return <Step3 handleFormSubmit={handleFormSubmit}
        cardInfo={cardInfo}
        updateCardInfo={updateCardInfo}  // 確保 updateCardInfo 被傳遞
       />;
        
      default:
      console.log('Unexpected shopStage:', shopStage);
      return null;
    }

  };

  return (
    <>
      <section
        id="form"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }} className={`${
          shopStage === 1 ? 'stage-1' : shopStage === 2 ? 'stage-2' : shopStage === 3 ? 'stage-3' :''
        }`}
      >
        <div className="form-container">
          <div className="form-left">
            <div className="step-progress">
              <div className="progress-title">結帳</div>
            <StepProgress shopStage={shopStage} />
              {renderForm()}
             <span className='progress-line'></span>
            </div>                       
          <ProgressControl
  shopStage={shopStage}
  handlePreviousClick={(direction) => {
    if (direction === 'previous') {
      handlePreviousClick();
    } else if (direction === 'next') {
      handleNextClick();
    }
  }}
  handleNextClick={(direction) => {
    if (direction === 'previous') {
      handlePreviousClick();
    } else if (direction === 'next') {
      handleNextClick();
    }
  }}
  handleFormSubmit={handleFormSubmit}  // 確保 handleFormSubmit 被正確傳遞
  cardInfo={cardInfo}
/>
           
          </div>
          <div className="form-right">
            <div className="form-right-container">
        <CartProvider>
        <Cart />
      </CartProvider>
              </div>
          </div>
        </div>
      </section>
    </>
  );
}

