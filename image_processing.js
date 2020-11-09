const ImageProcessing = (options) => {
  const defaultOptions = {
    lazy: true,
    wrapperClass: 'content-img',
    className: null,
    netlifyLargeMedia: {
      enable: false,
      maxWidth: 750,
      size: [280, 750, 1500]
    }
  };

  options = Object.assign({}, defaultOptions, options);

  return function (url, title, alt) {
    let img = '';

    // wrapper class
    if (options.wrapperClass !== null) img += `<div class="${options.wrapperClass}">`;

    // img tag start
    img += `<img src="${url}"`;

    // if use lazy load
    if (options.lazy) img += ' loading="lazy"';

    // img class name
    if (options.className) img += ` class="${options.className}"`;

    // img title
    if (title) img += ` title="${title}"`;

    // img alt text
    if (alt) img += ` alt="${alt}"`;

    if (
      options.netlifyLargeMedia.enable &&
      url.startsWith('assets/') &&
      process.env.NETLIFY
    ) {
      img += ` srcset="${options.netlifyLargeMedia.size
        .map((size) => `${url}?nf_resize=fit&w=${size} ${size}w`)
        .join(',')}"`;
      img += `size="(max-width: ${options.netlifyLargeMedia.maxWidth}px) 100vw, ${options.netlifyLargeMedia.maxWidth}px"`;
    }

    // close img tag
    img += '/>';

    // close wrapper class
    if (options.wrapperClass !== null) img += `</div>`;

    return img;
  };
};

export default ImageProcessing;
