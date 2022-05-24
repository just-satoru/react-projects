import './App.scss';
import QRCode from 'react-qr-code';
import { useState } from 'react';

function App() {
  const [qr, setQr] = useState('');
  const [inputText, setInputText] = useState('');
  const [showQr, setShowQr] = useState(false);

  const handleClick = () => {
      if (inputText) {
          setQr(inputText);
          setShowQr(true);
          setInputText('');
      }
  };

  return (
      <div className="QRMain">
          <div className="QRHeader">
              <h1>QR Generator</h1>
          </div>
          <div className="QRApp">
              <div className='QRForm'>
                  <h3>Enter a link or phrase in the field below</h3>
                  <textarea placeholder='Write something' value={inputText} onChange={(event) => setInputText(event.target.value)} />
                  <button onClick={handleClick}>Create</button>
              </div>
              {showQr ?
                  <div className='QRCode'>
                      <QRCode size={150} value={qr} />
                  </div>
                  :
                  <div className='QRCode'></div>
              }
          </div>
      </div>
  );
}

export default App;
