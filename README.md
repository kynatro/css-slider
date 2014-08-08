# CSS Slider
A Simple CSS Transition Based, Responsive Slider, Built On Jquery.

#### Minimum Required Markup
```
<div class="css-slider">
  <div class="slide">
    <h1>Slide One</h1>
  </div>
  <div class="slide">
    <h1>Slide Two</h1>
  </div>
  <div class="slide">
    <h1>Slide Three</h1>
  </div>
</div>
```

#### Adding Default Navigation
```
<div class="css-slider">
  <div class="slide">
    <h1>Slide One</h1>
  </div>
  <div class="slide">
    <h1>Slide Two</h1>
  </div>
  <div class="slide">
    <h1>Slide Three</h1>
  </div>
  <div class="prev"></div>
  <div class="next"></div>
  <div class="slider-navigation"></div>
</div>
```

#### Adding Custom Navigation
```
<div class="css-slider" data-navigation="#my-special-slider-navigation" data-prev="#my-special-prev-button" data-next="#my-special-next-button">
  <div class="slide">
    <h1>Slide One</h1>
  </div>
  <div class="slide">
    <h1>Slide Two</h1>
  </div>
  <div class="slide">
    <h1>Slide Three</h1>
  </div>
  <div class="slide">
    <h1>Slide Four</h1>
  </div>
</div>
<div id="my-special-prev-button"></div>
<div id="my-special-next-button"></div>
<div id="my-special-slider-navigation"></div>
```

### Running the Jasmine Tests

After cloning the repository, `cd` into the root of the project and enter the following commands to: add all the required node.js modules; run grunt; check the results in a web browser.

1. Ensure that [node.js](http://nodejs.org/) is installed by running `node -v` You should get the version number as output.
1. `npm install` You should get a lof of output and modules being installed.
1. `grunt` Grunt should run the default task and watch for changes in the JavaScript while live reloading the test suite in the browser.
1. visit `http://localhost:8001` in your browser to see the test suite
