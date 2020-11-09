<script context="module" lang="ts">
  import { title } from '~/site.config.json';
</script>

<script lang="ts">
  import Nav from '../components/Nav.svelte';
  import Icon from '../components/Icon.svelte';
  import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
  import { onMount, onDestroy } from 'svelte';
  import Bio from '../components/widgets/Bio.svelte';

  export let segment: string;

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let isScrolled: boolean = false;
  let browser: boolean = false;

  const onScroll = () => {
    isScrolled = window.scrollY > 100;
  };

  onMount(() => {
    browser = true;
    window.addEventListener('scroll', onScroll);
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('scroll', onScroll);
    }
  });
</script>

<!-- Tidak jadi, masalah performa -->
<!--<style lang="scss" global>
  @import './styles/index.scss';
</style>-->

{#if segment !== 'crawl'}
  <div id="rad-container">
    <div id="wrapper">
      <Nav {segment} />
      <div class="section">
        <div class="container">
          <div class="columns is-centered">
            <main class="column is-8-tablet is-8-desktop is-8-widescreen has-order-2 column-main">
              <slot />
            </main>
            <aside class="column is-3-tablet is-3-desktop is-3-widescreen has-order-1 column-left is-sticky">
              <Bio />
            </aside>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer has-text-centered">
      <div>Made with <span class="has-text-danger">&#9829;</span> in My Kokoro</div>
      <div>&copy; {new Date().getFullYear()} {title}</div>
    </footer>
  </div>
  <button
    class="button is-primary is-rounded backtotop"
    class:is-visible={isScrolled}
    aria-label="Go to top"
    on:click={goToTop}>
    <Icon icon={faChevronUp} />
  </button>
{:else}
  <slot />
{/if}
