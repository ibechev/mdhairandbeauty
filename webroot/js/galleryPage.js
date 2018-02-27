var PhotoSwipe = require('photoswipe');
var PhotoSwipeUIDefault = require('photoswipe/dist/photoswipe-ui-default');

var galleryPage = () => {

  var pswpElement = document.querySelector('.pswp');

  var items = [
    {
        src: 'images/gallery/people-q-c-600-400-2.jpg',
        w: 600,
        h: 400,
        title: 'Some title 1'
    },
    {
        src: 'images/gallery/people-q-c-600-400-4.jpg',
        w: 600,
        h: 400,
        title: 'Some title 2'
    },
    {
        src: 'images/gallery/people-q-c-600-400-5.jpg',
        w: 600,
        h: 400,
        title: 'Some title 3'
    },
    {
        src: 'images/gallery/people-q-c-600-400-6.jpg',
        w: 600,
        h: 400,
        title: 'Some title 4'
    },
    {
        src: 'images/gallery/people-q-c-600-400-7.jpg',
        w: 600,
        h: 400,
        title: 'Some title 5'
    },
    {
        src: 'images/gallery/people-q-c-600-400-8.jpg',
        w: 600,
        h: 400,
        title: 'Some title 6'
    },
  ];

  // define options (if needed)
  var options = {
      // optionName: 'option value'
      focus: true,
      history: true,
      index: 0 // start at first slide
  };

  // Initializes and opens PhotoSwipe
  var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUIDefault, items, options);
  gallery.init();

}

$(document).ready(() => {
  //galleryPage();
});

export default galleryPage;
