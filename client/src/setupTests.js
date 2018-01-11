import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

Object.defineProperty(window, "matchMedia", {
    value: jest.fn(() => { return { matches: true } })
});