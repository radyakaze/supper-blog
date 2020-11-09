<script context="module" lang="ts">
  import type { Post, PaginationMeta, Pagination } from './api/article/_post.interface';
  import { title as siteName, description, url, author } from '~/site.config.json';

  export function preload() {
    return this.fetch(`api/article/1.json`)
      .then((r: { json: () => any }) => r.json())
      .then((response) => {
        return {
          posts: response.data,
          meta: response.meta
        };
      });
  }
</script>

<script lang="ts">
  import PostCard from '../components/PostCard.svelte';
  import IntersectionObserver from 'svelte-intersection-observer';
  import { onMount } from 'svelte';

  export let posts: Post[];
  export let meta: PaginationMeta;

  let element: HTMLElement;
  let browser = false;
  onMount(() => {
    browser = true;
  });

  const loadMore = async () => {
    // const res = await this.fetch((`api/article/${meta.current_page + 1}.json`);
    fetch(`api/article/${meta.current_page + 1}.json`)
      .then((response) => response.json())
      .then((data: Pagination) => {
        posts = posts.concat(data.data);
        meta = data.meta;
      });
  };
</script>

<svelte:head>
  <title>{siteName}</title>
  <meta name="description" content={description} />

  <!-- Open Graph data -->
  <meta property="og:title" content={siteName} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={author.photo} />
  <meta property="og:description" content={description} />
</svelte:head>

{#each posts as post}
  <PostCard {post} />
{/each}

{#if browser && meta.current_page < meta.total_page}
  <IntersectionObserver
    {element}
    on:observe={({ detail: entry }) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    }}>
    <div class="has-text-centered p-3 mt-3" bind:this={element}>
      <button aria-label="Load More" class="button is-primary is-rounded is-loading" on:click={loadMore} />
    </div>
  </IntersectionObserver>
{/if}
