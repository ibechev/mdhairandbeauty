// Scripts
const galleryPath =
	location.hostname === 'localhost' ? '/mdhairandbeauty/gallery' : '/gallery';

require('babel-core/register');
require('babel-polyfill');
require('./script');
require('./navigation');
window.location.pathname === galleryPath && require('./galleryPage');
