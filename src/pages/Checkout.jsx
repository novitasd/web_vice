import { useState } from "react";

import CartStep from "../components/checkout/CartStep";
import ShippingStep from "../components/checkout/ShippingStep";
import PaymentStep from "../components/checkout/PaymentStep";
import OrderSummary from "../components/checkout/OrderSummary";
import { getShippingMethod } from "../data/shippingZones";
import "./Checkout.css";

function Checkout() {
  const [step, setStep] = useState(1);

 const [shippingData, setShippingData] = useState({
  name: "",
  lastName: "",
  phone: "",
  department: "",
  province: "",
  district: "",
  ubigeo: "",
  address: "",
  reference: "",
});
const shippingMethod = getShippingMethod(shippingData);

  return (
    <main className="checkout-page">
      <div className="checkout-layout">

        {/* COLUMNA IZQUIERDA */}
        <div className="checkout-main">

          {step === 1 && (
            <CartStep />
          )}

          {step === 2 && (
            <ShippingStep
              shippingData={shippingData}
              setShippingData={setShippingData}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}

          {step === 3 && (
            <PaymentStep
              shippingData={shippingData}
              shippingMethod={shippingMethod}
              onBack={() => setStep(2)}
            />
          )}

        </div>

        {/* COLUMNA DERECHA */}
        <aside className="checkout-sidebar">

          <OrderSummary
            step={step}
            shippingMethod={shippingMethod}
            onContinue={() => {
              if (step === 1) {
                setStep(2);
              } else if (step === 2) {
                setStep(3);
              }
            }}
          />

        </aside>

      </div>
    </main>
  );
}

export default Checkout;