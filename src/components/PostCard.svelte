<script lang="ts">
  import { slide } from 'svelte/transition';

  export let post;
</script>

<div class="card is-clipped" transition:slide|local>
  <div class="card-content article">
    <time class="article-meta is-size-7 is-uppercase dateline article-date" datetime={post.date.iso}>{post.date.formatted}</time>
    <h1 class="is-size-3 is-size-4-mobile has-text-weight-normal">
      <a rel="prefetch" class="has-link-black-ter" href="/{post.slug}">{post.title}</a>
    </h1>
    <div>
      <div class="content summary">
        {@html post.summary}
      </div>
      <div class="read-more">
        <a rel="prefetch" class="button is-size-7 is-light" href="/{post.slug}">Read More · {post.reading_time} read</a>
      </div>
    </div>
  </div>
</div>
