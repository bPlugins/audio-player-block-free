import { createRoot } from 'react-dom/client';
import './style.scss';
import Theme from './Components/Common/Theme';
import Style from './Components/Common/Style';

document.addEventListener('DOMContentLoaded', () => {
  const mp3PlayerEls = document.querySelectorAll('.wp-block-bpmp-mp3-player');
  mp3PlayerEls.forEach((mp3PlayerEl) => {
    const dataAttributes = mp3PlayerEl.dataset.attributes;

    if (dataAttributes) {
      try {
        const attributes = JSON.parse(dataAttributes);

        createRoot(mp3PlayerEl).render(<>
          <Style {...{ attributes, id: mp3PlayerEl.id }} />
          <Theme {...{ attributes }} />
        </>);

        mp3PlayerEl?.removeAttribute('data-attributes');
      } catch (error) {
        console.error('Invalid JSON in data-attributes:', dataAttributes, error);
      }
    } else {
      console.warn('No data-attributes found for', mp3PlayerEl);
    }
  });
});

