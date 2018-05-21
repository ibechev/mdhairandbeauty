// Scripts
const galleryPath =
  process.env.NODE_ENV === "production"
    ? "/gallery"
    : "/mdhairandbeauty/gallery";

require("babel-core/register");
require("babel-polyfill");
require("./script");
require("./navigation");
window.location.pathname === galleryPath && require("./galleryPage");

console.log(window.location.pathname + " = " + galleryPath);
