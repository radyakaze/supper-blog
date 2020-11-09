<script lang="ts">
  export let icon;
  const path = icon.icon[4];
  const iconClass = $$props.class;
  const viewBox = `0 0 ${icon.icon[0]} ${icon.icon[1]}`;
</script>

<svg aria-hidden="true" class="fa-svelte {iconClass || ''}" role="img" xmlns="http://www.w3.org/2000/svg" {viewBox}>
  <path fill="currentColor" d={path} />
</svg>
