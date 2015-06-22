## Website Performance Optimization portfolio project

### Setting up the website

To run a non-minified version of the website, you can open the `index.html` file in your favorite browser:
```
open index.html
```

To create a minified version of the website, you need to set up the **Gulp** build system.
Running the default Gulp task will create a minified version of the website in the `build/` directory.
```
npm install
node_modules/.bin/gulp
open build/index.html
```

The minified version can be pushed to Github Pages using a Gulp task.
```
node_modules/.bin/gulp gh_pages
```

An already published version can be found [here](http://wvl-udacity.github.io/frontend-nanodegree-mobile-portfolio/)
([Pagespeed insights](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fwvl-udacity.github.io%2Ffrontend-nanodegree-mobile-portfolio%2F&tab=mobile)).

### Optimizations

#### Optimizations in index.html

* Scripts were made asynchronous so they didn't block the rendering process.
* A high-resolution image (`pizzeria.jpg`) was resized to the appropriate size for the page.
* Images were optimally encoded using **jpegtran**.
* Necessary CSS was inlined, with the extra CSS being loaded at the next frame.

#### Optimizations for pizza.html

* Removed the `determineDx()` function in favor of a `determineWidth()` function that is independent of the pizza element.
* Any retrieval of a property that forces a layout was moved outside of a loop, both for `updatePositions()` and `resizePizzas()`.
* A query selector was made to be only called once in `changePizzaSizes()`.
* The `.mover` elements were put in their own composite layers.
