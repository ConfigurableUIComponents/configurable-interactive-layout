import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme'; // for https://github.com/blainekasten/enzyme-matchers to be available

Enzyme.configure({ adapter: new Adapter() });