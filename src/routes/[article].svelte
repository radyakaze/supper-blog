<script context="module" lang="ts">
  import type { Article, Page } from './api/article/_post.interface';
  import { url, author, comment } from '~/site.config.json';

  export async function preload({ params }) {
    const res = await this.fetch(`api/article/detail/${params.article}.json`);
    const data: Article | Page | Error = await res.json();

    if (res.status === 200) {
      return { post: data as Article };
    } else {
      this.error(res.status, (data as Error).message);
    }
  }


</script>

<script lang="ts">
  import Icon from '../components/Icon.svelte';
  import IntersectionObserver from 'svelte-intersection-observer';
  import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
  import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
  import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
  import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
  import { onMount } from 'svelte';
  import Disqus from '../components/Disqus.svelte';
  import { stores } from '@sapper/app';

  const { page } = stores();

  export let post: Article;

  let commentElement: HTMLElement;
  let showComment: boolean = false;
  let browser = false;

  onMount(() => {
    browser = true;
  });

  const showDisqus = () => {
    showComment = true;
  };
</script>

<svelte:head>
  <title>{post.title}</title>
  <meta name="description" content={post.summary} />
  <meta name="author" content={author.name} />

  <!-- Open Graph data -->
  <meta property="og:title" content={post.title} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="{url}/{post.slug}" />
  <meta property="og:image" content={post.image || author.photo} />
  <meta property="og:description" content={post.summary} />
</svelte:head>

<div class="card is-clipped">
  <article class="card-content article">
    <h1 class="article-title is-size-2 is-size-3-mobile has-text-weight-normal has-text-centered">{post.title}</h1>
    {#if post.date !== undefined && post.reading_time !== undefined}
      <div class="is-size-7 is-uppercase mb-5 has-text-centered">
        <Icon icon={faCalendar} class="meta-icon mr-1" />
        <time class="dateline" datetime={post.date.iso}>{post.date.formatted}</time>
        ·
        <Icon icon={faClock} class="meta-icon mr-1" />
        {post.reading_time}
        read
      </div>
    {/if}
    <div>
      <div class="content">
        {@html post.content}
      </div>
    </div>
  </article>
</div>

{#if post.meta !== undefined && (post.meta.previous !== null || post.meta.next !== null)}
  <div class="card">
    <div class="card-content level">
      {#if post.meta.previous !== null}
        <div class="level-left previous-post">
          <a rel="prefetch" class="has-link-grey" href="/{post.meta.previous.slug}">
            <Icon icon={faChevronLeft} />
            {post.meta.previous.title}
          </a>
        </div>
      {/if}
      {#if post.meta.next !== null}
        <div class="level-right next-post has-text-right">
          <a rel="prefetch" class="has-link-grey" href="/{post.meta.next.slug}">
            {post.meta.next.title}
            <Icon icon={faChevronRight} />
          </a>
        </div>
      {/if}
    </div>
  </div>
{/if}

{#if comment.enable && post.commentable !== false}
  <div class="card" bind:this={commentElement}>
    <div class="card-content comment">
      <!-- Autoload Comment -->
      {#if comment.autoload && browser}
        <IntersectionObserver
          element={commentElement}
          on:observe={({ detail: entry }) => {
            if (entry.isIntersecting && !showComment) {
              showDisqus();
            }
          }} />
      {:else if !comment.autoload && !showComment}
        <div class="has-text-centered">
          <button class="button is-primary is-rounded" on:click={showDisqus}>Show Comment</button>
        </div>
      {/if}

      {#if showComment}
        <Disqus url={url + $page.path} identifier={$page.path} />
      {/if}
    </div>
  </div>
{/if}
