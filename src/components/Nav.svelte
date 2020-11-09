<script lang="ts">
  import Icon from '../components/Icon.svelte';
  import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';
  import { title as siteName, navbar } from '~/site.config.json';

  export let segment: string;
  let isToggleOn = false;

  const handleClick = () => {
    isToggleOn = !isToggleOn;
  };

  const nightModeToggle = () => {
    let html = document.querySelector('html').classList;
    localStorage.setItem('dark-mode', (!html.contains('dark-mode')).toString())
    html.toggle('dark-mode');
  };
</script>

<header class="navbar navbar-main is-fixed-top" class:is-active={isToggleOn}>
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item navbar-logo has-text-primary" href="/">
        <h1 class="is-size-4">{siteName}</h1>
      </a>
      <button
        class="navbar-burger burger button is-text"
        class:is-active={isToggleOn}
        aria-label="Open Menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        on:click={handleClick}>
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </div>
    <nav class="navbar-menu" class:is-active={isToggleOn}>
      <div class="navbar-start navbar-content">
        {#each navbar.menu as nav}
          <a
            href={nav.url}
            class="navbar-item"
            class:is-active={segment === (nav.url === '/' ? undefined : nav.url.substring(1))}
            rel={nav.rel}
            on:click={handleClick}>
            {nav.title}
          </a>
        {/each}
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <button class="button is-small is-rounded" aria-label="Dark Mode" on:click={nightModeToggle}>
            <Icon icon={faMoon} />
          </button>
        </div>
      </div>
    </nav>
  </div>
</header>
