import { basename, extname } from 'path';
import marked, { Renderer } from 'marked';
import grayMatter from 'gray-matter';
import prism from 'prismjs';
import loadLanguages from 'prismjs/components/';
import ImageProcessing from './image_processing';
import sanitizeHtml from 'sanitize-html';

export default function (options = {}) {
  const defaultOptions = {
    image: {
      lazy: true
    },
    highlight: {
      enable: true,
      languages: ['javascript', 'jsx', 'css', 'markup', 'bash', 'json', 'php']
    }
  };

  options = Object.assign({}, defaultOptions, options);

  loadLanguages(options.highlight.languages);

  const renderer = new Renderer();
  renderer.image = ImageProcessing(options.image);

  marked.setOptions({
    renderer,
    highlight: function (code, lang) {
      if (options.highlight.enable && prism.languages[lang]) {
        return prism.highlight(code, prism.languages[lang], lang);
      }

      return code;
    },
    breaks: true
  });

  return {
    name: 'markdown-parser',
    transform(code, id) {
      if (extname(id) !== '.md') return;

      const matter = grayMatter(code);
      const html = sanitizeHtml(marked(matter.content), {
        allowedAttributes: {
          a: [ 'href', 'name', 'target', 'rel' ],
          img: [ 'src', 'srcset', 'alt', 'title', 'width', 'height', 'size' ],
          '*': ['class']
        },
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
        allowedClasses: {
          'div': [ 'content-img' ]
        }
      });

      const result = JSON.stringify({
        metadata: matter.data,
        html,
        filename: basename(id),
        path: id
      });

      return {
        code: `export default ${result}`,
        map: { mappings: '' }
      };
    }
  };
}
