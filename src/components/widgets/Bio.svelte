<script context="module" lang="ts">
  import { author } from '~/site.config.json';

  const photo = author.photo;
  const photoSize = (size: string) => {
    const file = photo.split('.');
    return `${file[0]}@${size}.${file[1]}`;
  }
</script>

<script lang="ts">
  import Icon from '../../components/Icon.svelte';
  import { faRss } from '@fortawesome/free-solid-svg-icons/faRss';
  import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
  import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
  import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
  import type { IconDefinition } from '@fortawesome/free-brands-svg-icons';

  let icon: Record<string, IconDefinition> = {
    facebook: faFacebook,
    instagram: faInstagram,
    github: faGithub
  };
</script>

<div class="card widget bio-widget">
  <div class="card-content has-text-centered">
    <div>
      <figure class="image">
        <picture>
          <source srcset="{photoSize('80')} 1x, {author.photo} 2x" media="(max-width: 768px)" />
          <img
            srcset="{author.photo} 1x, {photoSize('2x')} 2x"
            src={author.photo}
            alt={author.name}
            width="160"
            height="160"
            class="profile-picture is-rounded" />
        </picture>
        <figcaption>
          <p class="is-size-4 is-block">{author.name}</p>
          <p class="is-size-6 is-block">{author.bio}</p>
        </figcaption>
      </figure>
    </div>
  </div>
  <footer class="card-footer is-block">
    <div class="text-center p-2">
      <div class="level is-mobile">
        {#each author.socials as social}
          <a
            target="_blank"
            rel="noopener noreferrer external"
            href={`https://${social.name}.com/${social.account_name}`}
            class="level-item button is-text is-marginless"
            aria-label={social.name}>
            <Icon icon={icon[social.name]} />
          </a>
        {/each}
        <a
          target="_blank"
          rel="noopener noreferrer external"
          href="/rss.xml"
          class="level-item button is-text is-marginless"
          aria-label="RSS">
          <Icon icon={faRss} />
        </a>
      </div>
    </div>
  </footer>
</div>
