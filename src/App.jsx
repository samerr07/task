import React, { useEffect, useRef, useState } from 'react';
import './App.css'; 

function App() {
  
  const [activeDiv, setActiveDiv] = useState(null);

 
  const leftDivRefs = useRef([]);

  useEffect(() => {
    const options = {
      root: document.querySelector('.left-section'),
      threshold: 0.5, 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = parseInt(entry.target.dataset.index, 10);
        if (entry.isIntersecting) {
          setActiveDiv(index); 
        }
      });
    }, options);

    leftDivRefs.current.forEach((div) => {
      if (div) observer.observe(div); 
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="parent-container">
      
      <div className="left-section">
        {['Div 1', 'Div 2', 'Div 3'].map((text, index) => (
          <div
            key={index}
            className="left-div"
            data-index={index}
            ref={(el) => (leftDivRefs.current[index] = el)}
          >
            {text}
          </div>
        ))}
      </div>

      
      <div className="right-section">
        {['Right 1', 'Right 2', 'Right 3'].map((text, index) => (
          <div
            key={index}
            className={`right-div ${activeDiv === index ? 'active' : ''}`}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

