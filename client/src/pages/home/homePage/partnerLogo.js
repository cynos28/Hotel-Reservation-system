import React from 'react';
import partnerLogo1 from './Logos/millenium.png';
import partnerLogo2 from './Logos/petro.png';
import partnerLogo3 from './Logos/pg.png';
import partnerLogo4 from './Logos/reliance.png';

const OurPartners = () => {
  const partnerLogos = [
    partnerLogo1,
    partnerLogo2,
    partnerLogo3,
    partnerLogo4,
  ];

  const containerStyle = {
    backgroundColor: '#FFF2E1',
    padding: '20px 20px',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30px',
  };

  const logoContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const logoStyle = {
    width: '150px',
    height: 'auto',
    margin: '20px',
    filter: 'grayscale(100%)',
    transition: 'filter 0.3s ease-in-out',
    '&:hover': {
      filter: 'none',
    },
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Our Partners</h2>
      <div style={logoContainerStyle}>
        {partnerLogos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Partner Logo ${index + 1}`}
            style={logoStyle}
          />
        ))}
      </div>
    </div>
  );
};

export default OurPartners;