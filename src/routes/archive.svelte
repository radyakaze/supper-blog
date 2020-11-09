<script context="module" lang="ts">
  import { title as siteName, description, url, author } from '~/site.config.json';
  import type { ArchivePost } from './api/article/_post.interface';

  export function preload() {
    return this.fetch(`api/article/archive.json`)
      .then((r: { json: () => any }) => r.json())
      .then((archive: ArchivePost) => {
        return { archive };
      });
  }
</script>

<script lang="ts">
  export let archive: ArchivePost;
</script>

<svelte:head>
  <title>Archive | {siteName}</title>
  <meta name="description" content={description} />

  <!-- Open Graph data -->
  <meta property="og:title" content="Archive | {siteName}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{url}/archive" />
  <meta property="og:image" content={author.photo} />
  <meta property="og:description" content={description} />
</svelte:head>

<div class="card">
  <div class="card-content">
    <h1 class="is-size-3 is-size-4-mobile has-text-weight-normal mb-4">Archive</h1>
    <div class="timeline ml-5">
      {#each Object.keys(archive) as month}
        <header class="timeline-header"><span class="px-3">{month}</span></header>
        {#each Object.keys(archive[month]) as day}
          <div class="timeline-item">
            <div class="timeline-marker">{day}</div>
            <div class="timeline-content mt-1">
              {#each archive[month][day] as post}
                <div>
                  {#if archive[month][day].length > 1}
                    <span class="has-text-grey-dark">&raquo;</span>
                  {/if}
                  <a rel="prefetch" href="/{post.slug}">{post.title}</a></div>
              {/each}
            </div>
          </div>
        {/each}
      {/each}
      <header class="timeline-header"><span class="px-3">Big Bang</span></header>
    </div>
  </div>
</div>
