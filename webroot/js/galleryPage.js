var PhotoSwipe = require('photoswipe');
var PhotoSwipeUI_Default = require('photoswipe/dist/photoswipe-ui-default');

// Start PhotoSwipe from a click on a thumbnail
var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) {
                continue;
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if(pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            showHideOpacity:true,

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

// Dinamically populate image thumbnails
async function loadThumbnails(url) {
  const thumbnails = await getInstagramMedia(url);

  thumbnails.map(thumbnail => {
    let figure = $("<figure class='cell shadow' itemprop: 'associatedMedia' itemscope itemtype: 'http://schema.org/ImageObject'></figure>");

    let anchor = $('<a>', {
      href: thumbnail.a.href,
      itemprop: 'contentUrl',
      'data-size': thumbnail.a.dataSize
    });

    // Get the size of the image and determine if 'portrait' or 'landscape'
    let size = thumbnail.a.dataSize.split('x');
    let imgClass = size[0] < size[1] ? 'portrait' : 'landscape';

    let img = $('<img>', {
      class: 'responsive-image ' + imgClass,
      src: thumbnail.img.thumbnailSrc,
      alt: thumbnail.img.alt
    });

    anchor.append(img);
    figure.append(anchor);
    $('#thumbnails-grid').append(figure);
  })
}




$(document).ready(() => {
  const instaURL = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=203960036.f9b0e7d.a45634cd86b0486da84160f7cc603b32';

  $.when(
    // Populate image thumbnails
    loadThumbnails(instaURL)
  ).done(() => {
    // execute above function
    initPhotoSwipeFromDOM('.thumbnails-grid')
  });
});


const renderElement = (data) => {
  let imgData = data.data[0].images.standard_resolution;

  let image = $('<img>', {
    class: 'insta-image',
    src: imgData.url,
    alt: imgData.alt
  });

  //$('.gallery').append(image);
}


async function getInstaData(url) {
  try {
    let response = await fetch(url);
    let feed = await response.json();
    return feed;
  } catch(error) {
    console.log('Error! ', error);
  }
}

async function getInstagramMedia(url) {
  const instaData = await getInstaData(url);
  let galleryData;

  galleryData = instaData.data.map((
    {
      images: {thumbnail, low_resolution, standard_resolution},
      caption: {text},
      type
    }
  ) => {
    return {
      a: {
        href: standard_resolution.url,
        dataSize: `${standard_resolution.width}x${standard_resolution.height}`
      },
      img: {
        thumbnailSrc: thumbnail.url,
        alt: text
      }
    };
  });

  return galleryData;
}


var galleryContent = [
  {
    a: {
      href: 'webroot/images/gallery/people-q-c-600-400-2.jpg',
      dataSize: '600x400'
    },
    img: {
      thumbnailSrc: 'webroot/images/gallery/people-q-c-600-400-2.jpg',
      alt: 'Some description'
    },
    caption: 'Some caption'
  },
  {
    a: {
      href: 'webroot/images/gallery/animals-h-c-400-600-2.jpg',
      dataSize: '400x600'
    },
    img: {
      thumbnailSrc: 'webroot/images/gallery/animals-h-c-400-600-2.jpg',
      alt: 'Some description'
    },
    caption: 'Some caption'
  },
  {
    a: {
      href: 'webroot/images/gallery/people-q-c-600-400-4.jpg',
      dataSize: '600x400'
    },
    img: {
      thumbnailSrc: 'webroot/images/gallery/people-q-c-600-400-4.jpg',
      alt: 'Some description'
    },
    caption: 'Some caption'
  },
  {
    a: {
      href: 'webroot/images/gallery/fashion-h-c-400-600-10.jpg',
      dataSize: '400x600'
    },
    img: {
      thumbnailSrc: 'webroot/images/gallery/fashion-h-c-400-600-10.jpg',
      alt: 'Some description'
    },
    caption: 'Some caption'
  },
  {
    a: {
      href: 'webroot/images/gallery/people-q-c-600-400-7.jpg',
      dataSize: '600x400'
    },
    img: {
      thumbnailSrc: 'webroot/images/gallery/people-q-c-600-400-7.jpg',
      alt: 'Some description'
    },
    caption: 'Some caption'
  },
  {
    a: {
      href: 'webroot/images/gallery/nightlife-h-c-400-600-1.jpg',
      dataSize: '400x600'
    },
    img: {
      thumbnailSrc: 'webroot/images/gallery/nightlife-h-c-400-600-1.jpg',
      alt: 'Some description'
    },
    caption: 'Some caption'
  }
]
