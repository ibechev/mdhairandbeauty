// Scripts

require("babel-core/register");
require("babel-polyfill");
require("./script");
require("./navigation");
window.location.pathname === "/mdhairandbeauty/gallery" &&
  require("./galleryPage");
