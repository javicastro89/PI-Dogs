import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import App from './App';
import Detail from './Components/Detail/Detail';
import LandingPage from './Components/LandingPage/LandingPage';
import Nav from './Components/NavBar/NavBar'


configure({adapter: new Adapter()});

describe('App', () => {
  let store
  const middlewares = []
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore({
      breeds: [],
      temperament: [],
      searchBreeds: [],
      breedDetail: {}
  });
  });

  describe('Components Tests', () => {
    // it('Debería renderizarse en la ruta "/"', () => {
    //   const wrapper = mount(
    //       <Provider store={store}>
    //         <MemoryRouter initialEntries={[ '/create' ]}>
    //           <App />
    //         </MemoryRouter>
    //       </Provider>
    //   );
    //     expect(wrapper.find(Nav)).toHaveLength(1);
    // });
    // it('Debería renderizarse en la ruta "/otraRuta"', () => {
    //   const wrapper = mount(
    //       <Provider store={store}>
    //         <MemoryRouter initialEntries={[ '/otraRuta' ]}>
    //           <App />
    //         </MemoryRouter>
    //       </Provider>
    //   );
    //     expect(wrapper.find(Nav)).toHaveLength(1);
    // });
    it('LandingPage component should render in / (just in "/")', () => {
      const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={[ '/' ]}>
              <App />
            </MemoryRouter>
          </Provider>
      );
  
        expect(wrapper.find(LandingPage)).toHaveLength(1);
        expect(wrapper.find(Nav)).toHaveLength(1);
        expect(wrapper.find(Detail)).toHaveLength(0);
    });
  });
})