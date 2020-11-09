<script context="module" lang="ts">
  import { url as siteUrl, comment } from '~/site.config.json';
</script>

<script lang="ts">
  import { stores } from '@sapper/app';
  const { page } = stores();

  export let url = siteUrl + $page.path;
  export let identifier = $page.path;

  const mount = ({ identifier, url }) => {
    if (document.getElementById('disqus-script') === null) {
      const c = document.createElement('script');
      c.id = 'disqus-config';
      c.type = 'text/javascript';
      c.innerHTML = `const disqus_config = function () { this.page.url = '${url}'; this.page.identifier = '${identifier}'; };`;
      document.head.appendChild(c);

      const s = document.createElement('script');
      s.id = 'disqus-script';
      s.src = `//${comment.disqus_shortname}.disqus.com/embed.js`;
      s.dataset.timestamp = new Date().toString();
      (document.head || document.body).appendChild(s);
    }
  };

  const unmountDisqus = () => {
    document.getElementById('disqus-config').remove();
    document.getElementById('disqus-script').remove();

    return true;
  };

  const updateDisqus = ({ identifier, url }) => {
    // @ts-ignore
    window.DISQUS.reset({
      reload: true,
      config: function () {
        this.page.identifier = identifier;
        this.page.url = url;
      }
    });
  };

  function disqusThread(node: HTMLElement, params: { url: string; identifier: string }) {
    mount(params);

    return {
      update(params: { url: string; identifier: string }) {
        updateDisqus(params)
      },
      destroy() {
        unmountDisqus();
      }
    };
  }
</script>

<div id="disqus_thread" use:disqusThread={{ url, identifier }} />
