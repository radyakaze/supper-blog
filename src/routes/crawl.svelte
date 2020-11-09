<script context="module" lang="ts">
  import type { Pagination } from "./api/article/_post.interface";

  export function preload() {
    return this.fetch(`api/article/1.json`)
      .then((r: { json: () => any }) => r.json())
      .then((response: Pagination) => {
        return {
          totalPage: response.meta.total_page,
        };
      });
  }
</script>

<script lang="ts">
  export let totalPage: number;
</script>

<ol type="1">
  {#each { length: totalPage } as _, i}
    <li><a href="/api/article/{i + 1}.json">Page {i + 1}</a></li>
  {/each}
  <li><a href="/sitemap.xml">Sitemap</a></li>
</ol>
