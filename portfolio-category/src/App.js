import { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/header/Header';
import Item from './components/item/Item';

import img0 from './item_0.png';
import img1 from './item_1.png';
import img2 from './item_2.png';
import img3 from './item_3.png';
import img4 from './item_4.png';
import img5 from './item_5.png';
import img6 from './item_6.png';
import img7 from './item_7.png';
import img8 from './item_8.png';

function App() {
  const [items, setItems] = useState([
    { id: 0, name: 'SOFA', category: 'Design', src: img0 },
    { id: 1, name: 'KeyBoard', category: 'Branding', src: img1 },
    { id: 2, name: 'Work Media', category: 'Illustration', src: img2 },
    { id: 3, name: 'DDDone', category: 'Motion', src: img3 },
    { id: 4, name: 'Abstract', category: 'Design', src: img4 },
    { id: 5, name: 'HandP', category: 'Branding', src: img5 },
    { id: 6, name: 'Architect', category: 'Motion', src: img6 },
    { id: 7, name: 'CalC', category: 'Design', src: img7 },
    { id: 8, name: 'Sport', category: 'Branding', src: img8 },
    { id: 9, name: 'SOFA2', category: 'Design', src: img0 },
    { id: 10, name: 'KeyBoard2', category: 'Branding', src: img1 },
    { id: 11, name: 'Work Media2', category: 'Illustration', src: img2 },
    { id: 12, name: 'DDDone2', category: 'Motion', src: img3 },
    { id: 13, name: 'Abstract2', category: 'Design', src: img4 },
    { id: 14, name: 'HandP2', category: 'Branding', src: img5 },
    { id: 15, name: 'Architect2', category: 'Motion', src: img6 },
    { id: 16, name: 'CalC2', category: 'Design', src: img7 },
    { id: 17, name: 'Sport2', category: 'Branding', src: img8 },
  ])

  const [allCategory, setAllCategory] = useState(['Show All', 'Design', 'Branding', 'Illustration', 'Motion']);
  const [category, setCategory] = useState('');
  const [loadMore, setLoadMore] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.innerText.split('\n').length === 1) {
      setCategory(e.target.innerText);
    }
  }

  useEffect(() => {
    const onKeypress = (e) => {
      const arr = document.querySelectorAll('.select');

      if (e.key === 'Delete' && arr.length > 0) {
        const arrName = [];
        for (let i = 0; i < arr.length; i++) {
          arrName.push(arr[i].innerText.split('\n').pop());
        }

        setItems((prev) => {
          return [...prev].filter(item => !arrName[arrName.indexOf(item.name)])
        });
      }
    };

    document.addEventListener('keydown', onKeypress);

    return () => {
      document.removeEventListener('keydown', onKeypress);
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <div className="container">
          <div className="portfolio__category">
            <ul onClick={handleClick}>
              {allCategory.map((item, index) => 
                <li className={!category && item === 'Show All' ? 'active' : item === category ? 'active' : ''} key={index}>{item}</li>
                )}
            </ul>
          </div>
          <div className="portfolio__items">
            {items.map((item, index) => {
              if (!loadMore && item.id < 9) {
                if (item.category === category) {
                  return <Item key={item.id} item={item} handleClick={handleClick} />
                } else if (!category || category === 'Show All') {
                  return <Item key={item.id} item={item} handleClick={handleClick} />
                }
              } else if (loadMore) {
                if (item.category === category) {
                  return <Item key={item.id} item={item} handleClick={handleClick} />
                } else if (!category || category === 'Show All') {
                  return <Item key={item.id} item={item} handleClick={handleClick} />
                }
              }
            }
            )}
           
          </div>

          <div className="btn__more-items">
            <a onClick={(e) => {
              e.preventDefault();
              setLoadMore((prev) => !prev)
            }}>{loadMore ? 'Hide' : 'Load more'}</a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
