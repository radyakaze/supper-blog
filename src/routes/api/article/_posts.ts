// @ts-ignore
import markdownFiles from '../../../../contents/*.md';
import dayjs from 'dayjs';
import slug from 'slug';
import htmlSubstring from 'html-substring';
import readingTime from 'read-time-estimate';
import { pagination as paginationConfig } from '~/site.config.json';
import { ArchivePost, ArchiveItem, Article, MarkdownData, Pagination, Post, PostDate, Page } from './_post.interface';

function dateFormat(date: string): PostDate {
  return {
    formatted: dayjs(date).format('DD MMMM YYYY'),
    iso: dayjs(date).toISOString()
  };
}

export let posts: Post[] = (markdownFiles as MarkdownData[])
  .filter((markdown) => markdown.metadata.type == undefined || markdown.metadata.type == 'article')
  .map((markdown) => {
    return {
      title: markdown.metadata.title,
      slug: markdown.filename.slice(0, -3),
      summary: htmlSubstring(markdown.html, 300),
      date: dateFormat(markdown.metadata.date),
      reading_time: readingTime(markdown.html, 275, 12, 500, ['img', 'Image']).humanizedDuration,
      tags: markdown.metadata.tags?.map((tag: string) => {
        return {
          name: tag,
          slug: slug(tag)
        };
      })
    };
  })
  .sort((a: Post, b: Post) => {
    return b.date.iso.localeCompare(a.date.iso);
  });

export const pagination = (page: number = 1, tag?: string): Pagination => {
  const limit = paginationConfig.limit;
  let tagDetail = undefined;
  if (tag !== undefined) {
    posts = posts.filter((post) => {
      return post.tags?.some((t) => t.slug == tag);
    });

    tagDetail = posts[0].tags.find((t) => t.slug === tag);
  }
  const total = posts.length;
  return {
    tag: tagDetail,
    data: posts.slice((page - 1) * limit, page * limit),
    meta: {
      total,
      current_page: page,
      total_page: Math.ceil(total / limit)
    }
  };
};

export const detail = (slug: string): Article | Page => {
  // gunakan index agar bisa ambil previous post dan next post
  const post = (markdownFiles as MarkdownData[]).find((p) => p.filename.slice(0, -3) === slug);

  if (post.metadata !== undefined && post.metadata.type === 'page') {
    return {
      title: post.metadata.title,
      slug: post.filename.slice(0, -3),
      summary: (post.metadata.summary || htmlSubstring(post.html, 150)).replace(/(<([^>]+)>)/gi, ''),
      content: post.html,
      commentable: post.metadata.commentable
    } as Page;
  }

  // cek apakah ada
  if (post === undefined) {
    return null;
  }

  // index pada posts agar bisa mencari next dan previous post
  const postIndex = posts.findIndex((p) => p.slug === post.filename.slice(0, -3));

  // meta (previous and next article)
  const meta = {
    previous: null,
    next: null
  };

  // previous article
  if (posts[postIndex + 1] !== undefined) {
    const previous = posts[postIndex + 1];
    meta['previous'] = {
      title: previous.title,
      slug: previous.slug
    };
  }

  // next article
  if (posts[postIndex - 1] !== undefined) {
    const next = posts[postIndex - 1];
    meta['next'] = {
      title: next.title,
      slug: next.slug
    };
  }

  return {
    title: post.metadata.title,
    slug: post.filename.slice(0, -3),
    summary: (post.metadata.summary || htmlSubstring(post.html, 150)).replace(/(<([^>]+)>)/gi, ''),
    reading_time: readingTime(post.html, 275, 12, 500, ['img', 'Image']).humanizedDuration,
    content: post.html,
    date: dateFormat(post.metadata.date),
    commentable: post.metadata.commentable,
    meta
  } as Article;
};

export const archive = (): ArchivePost => {
  const archivePost: ArchiveItem[] = (markdownFiles as MarkdownData[])
    .filter(markdown => markdown.metadata.type !== 'page')
    .map((markdown) => {
      const date = dayjs(markdown.metadata.date);
      return {
        title: markdown.metadata.title,
        slug: markdown.filename.slice(0, -3),
        date: dayjs(date).toISOString()
      };
    })
    .sort((a, b) => {
      return b.date.localeCompare(a.date);
    });

  const groupBy = (data: ArchiveItem[], formatDate: string) => {
    return data.reduce((res, obj) => {
      const format = dayjs(obj.date).format(formatDate);
      (res[format] = res[format] || []).push(obj);
      return res;
    }, {});
  };

  const grouped = groupBy(archivePost, 'MMMM YYYY');

  for (const month in grouped) {
    grouped[month] = groupBy(grouped[month], 'DD');
  }

  return grouped;
};
