import React from "react";

const plans = [
  {
    name: "Basic Plan",
    price: 5000,
    benefits: [
      "5 Active Projects Allowed",
      "2 Site Engineers Allowed",
      "Unlimited Material Reports",
      "100 Daily Site Visit Logs",
      "Email & Call Support",
    ],
  },
  {
    name: "Standard Plan",
    price: 10000,
    benefits: [
      "15 Active Projects Allowed",
      "5 Site Engineers Allowed",
      "Unlimited Material Reports",
      "500 Daily Site Visit Logs",
      "Priority Email & Call Support",
    ],
  },
  {
    name: "Enterprise Plan",
    price: 20000,
    benefits: [
      "Unlimited Active Projects",
      "Unlimited Site Engineers",
      "Unlimited Material & Budget Reports",
      "Unlimited Site Visit Logs",
      "Dedicated Account Manager",
      "24/7 Priority Support",
    ],
  },
];

const PlanPackage = () => {
  return (
    <div className="container p-4">
      <h2 className="text-center mb-4">Construction Plan Packages</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {plans.map((plan, index) => (
          <div className="col" key={index}>
            <div className="card border-0 shadow h-100 p-3 d-flex flex-column">
              <h2 className="text-center">{plan.name}</h2>
              <div className="card-body flex-grow-1">
                <h4 className="fw-bold text-center">
                  ₹{plan.price} <span className="fs-5">/Year</span>
                </h4>
                <ul className="list-unstyled text-start">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i}>✅ {benefit}</li>
                  ))}
                </ul>
              </div>
              <div className="card-footer bg-white border-0 mt-auto">
                <button className="btn btn-primary w-100">
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanPackage;
