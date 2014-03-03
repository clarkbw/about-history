This is a Firefox Add-on that displays your history visually.  While you browse this add-on gathers additional meta data from the websites you visit; things like description, title, and images.  When you review your history via the `about:history` page you'll see more useful information than just the URL and page title normally provided.

See screenshot: http://cl.ly/image/0g2W1Z353A0w

Coding
=====

You'll need the latest verion of the [addon-sdk](https://github.com/mozilla/addon-sdk/)

This add-on requires these modules in the `packages` directory.  
 - [addon-pathfinder](https://github.com/erikvold/addon-pathfinder)
 - [indexed-db-storage](https://github.com/clarkbw/indexed-db-storage)

From the base directory do this:
`git clone https://github.com/erikvold/addon-pathfinder.git packages/addon-pathfinder`
`git clone https://github.com/clarkbw/indexed-db-storage.git packages/indexed-db-storage`
