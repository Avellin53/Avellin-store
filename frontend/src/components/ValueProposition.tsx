import React from 'react';
import './ValueProposition.css';

const ValueProposition: React.FC = () => {
  const values = [
    {
      title: "Boundless Variety",
      desc: "The freedom of a physical market, organized with digital perfection. Compare sellers effortlessly."
    },
    {
      title: "Absolute Fluency",
      desc: "From English and French to Yoruba and Hausa. Real-time, auto-translated chat lets you speak your language while the world understands."
    },
    {
      title: "Uncompromising Security",
      desc: "Bank-grade payments and AI-moderated communications keep every transaction safe."
    }
  ];

  return (
    <section className="vp-section">
      <div className="container vp-grid">
        {values.map((v, i) => (
          <div key={i} className="vp-card">
            <h3 className="vp-title">{v.title}</h3>
            <p className="vp-desc">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueProposition;
