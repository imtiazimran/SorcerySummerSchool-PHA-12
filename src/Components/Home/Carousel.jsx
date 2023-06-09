import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Slider = () => (
    // TODO: RESIZE THE CAROUSEL
  <div className='w-4/5 mx-auto h-3/4 py-3 md:mb-14'>
  <AutoplaySlider
    play={true}
    cancelOnInteraction={false} // should stop playing on user interaction
    interval={6000}
  >
    <div data-src="https://www.gold.ac.uk/media/images-by-section/about-us/news/press-office/2019-news-stories/Magic_2-WEB_s.jpg" />
    <div data-src="https://images.ctfassets.net/3s5io6mnxfqz/4acmfUaKRfNK1oB8q2ZVbi/bfa206f93949e3173946161d13668187/AdobeStock_75868527.jpeg" />
    <div data-src="https://media.wired.co.uk/photos/606dafe7ae8f3096ae168005/master/w_1600%2Cc_limit/magic_1.jpg" />
  </AutoplaySlider>
  </div>
);
export default Slider;