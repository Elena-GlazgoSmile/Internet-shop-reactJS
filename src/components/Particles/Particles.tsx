import { useEffect, useState } from 'react';
import './Particles.css';
import type { JSX } from 'react/jsx-runtime';

const Particles = () => {
  const [particles, setParticles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const newParticles = [];
    const count = 50;

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 6 + 2;
      const left = Math.random() * 100;
      const delay = Math.random() * 20;
      const duration = Math.random() * 10 + 15;
      const opacity = Math.random() * 0.3 + 0.1;

      newParticles.push(
        <div
          key={i}
          className="particle"
          style={{
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            background: `rgba(167, 139, 250, ${opacity})`,
            boxShadow: `0 0 ${size * 2}px rgba(167, 139, 250, ${opacity})`,
          }}
        />
      );
    }

    setParticles(newParticles);
  }, []);

  return <div className="particles-container">{particles}</div>;
};

export default Particles;