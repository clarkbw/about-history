[![Build Status](https://travis-ci.org/erikvold/about-history.png)](https://travis-ci.org/erikvold/about-history)

This is a Firefox Add-on that displays your history visually.  While you browse this add-on gathers additional meta data from the websites you visit; things like description, title, and images.  When you review your history via the `about:history` page you'll see more useful information than just the URL and page title normally provided.

# Links

* [Screenshot](http://cl.ly/image/0g2W1Z353A0w)
* [Example Page](https://rawgithub.com/clarkbw/about-history/master/chrome/content/history.html)
* [Add-on](https://addons.mozilla.org/firefox/addon/about-history/)


# Development (Build Instructions)

1. `git clone https://github.com/clarkbw/about-history.git`

2. Make sure you have an updated copy of [Firefox Nightly](https://nightly.mozilla.org/) installed.

3. Make sure you have node (and subsequently npm) installed. Instructions for that are [here](http://nodejs.org/download/).

4. Install jpm with `npm install -g jpm`. [jpm](https://www.npmjs.org/package/jpm) is a node utility for developing browser add-ons.

5. Install about-history's node dependencies by running `npm install` in the `about-history` clone that was created in step 1.

Then from your `about-history` clone you can use `jpm run -b nightly`.

Tests can be run using `jpm test -b nightly -v`
