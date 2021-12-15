import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// This function stores our state.

const storeState = () => {
    let currentState = {};
    return (stateChangeFunction = state => state) => {
      const newState = stateChangeFunction(currentState);
      currentState = {...newState};
      return newState;
    }
  }
  
  const stateControl = storeState();
  
  // This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.
  
  const changeState = (prop) => {
    return (value) => {
      return (state) => ({
        ...state,
        [prop] : (state[prop] || 0) + value
      })
    }
  }
  
  // We create four functions using our function factory. We could easily create many more.
  
  const feed = changeState("soil")(1);
  const blueFood = changeState("soil")(5);
  
  const hydrate = changeState("water")(1);
  const superWater = changeState("water")(5);

  const initialState = { soil: 0, water: 0 };

  const plant2 = storeState(initialState);
  
  $(document).ready(function() {
  
  // This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.
  
    $('#feed').click(function() {
      const newState = stateControl(blueFood);
      $('#soil-value').text(`Soil: ${newState.soil}`);
    });
  
  // This function doesn't actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.
  
    $('#show-state').click(function() {
      // We just need to call stateControl() without arguments to see our current state.
      const currentState = stateControl();
      $('#soil-value').text(`Soil: ${currentState.soil}`);
      $('#water-value').text(`Soil: ${currentState.water}`);
    });

    $('#feed').click(function() {
      const newState = stateControl(feed);
     // updateStatus(newState);
      $('#soil-value').text(`Soil: ${newState.soil}`);
    });

    $('#water').click(function() {
      const newState = stateControl(hydrate);
     // updateStatus(newState);
      $('#soil-value').text(`water: ${newState.water}`);
    });
    $('#water').click(function() {
      const newState = stateControl(superWater);
     // updateStatus(newState);
      $('#soil-value').text(`water: ${newState.water}`);
    });
    $('#feed2').click(function() {
      const newState = plant2(blueFood);
      $('#soil-value').text(`Soil: ${newState.soil}`);
    });
  
  // This function doesn't actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.
  
    $('#show-state2').click(function() {
      // We just need to call stateControl() without arguments to see our current state.
      const currentState = plant2();
      $('#soil-value').text(`Soil: ${currentState.soil}`);
      $('#water-value').text(`water: ${currentState.water}`);
    });

    $('#feed2').click(function() {
      const newState = plant2(feed);
     // updateStatus(newState);
      $('#soil-value').text(`Soil: ${newState.soil}`);
    });

    $('#water2').click(function() {
      const newState = plant2(hydrate);
     // updateStatus(newState);
      $('#soil-value').text(`water: ${newState.water}`);
    });
    $('#water2').click(function() {
      const newState = plant2(superWater);
     // updateStatus(newState);
      $('#soil-value').text(`water: ${newState.water}`);
    });
  });

  