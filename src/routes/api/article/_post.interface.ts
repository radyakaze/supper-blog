interface MarkdownMetadata {
  [key: string]: any;
}

export interface MarkdownData {
  html: string;
  metadata: MarkdownMetadata;
  filename: string;
  path: string;
}

export interface PostDate {
  iso: string;
  formatted: string;
}

export interface PostTag {
  name: string;
  slug: string;
}

export interface Post {
  title: string;
  slug: string;
  summary: string;
  date: PostDate;
  reading_time: string;
  tags?: PostTag[];
}

export interface PaginationMeta {
  total: number;
  current_page: number;
  total_page: number;
}

export interface Pagination {
  tag?: PostTag;
  data: Post[];
  meta: PaginationMeta;
}

interface ArticleMetaPost {
  title: string;
  slug: string;
}

interface ArticleMeta {
  next: ArticleMetaPost | null;
  previous: ArticleMetaPost | null;
}

export interface Article {
  title: string;
  slug: string;
  image?: string;
  summary: string;
  reading_time: string;
  content: string;
  date: PostDate;
  meta: ArticleMeta;
  commentable?: boolean;
}

export interface Page {
  title: string;
  slug: string;
  image?: string;
  summary: string;
  content: string;
  commentable?: boolean;
}

export interface ArchiveItem {
  title: string;
  slug: string;
  date: string;
}

interface ArchiveDate {
  [key: string]: ArchiveItem[]
}

export interface ArchivePost {
  [key: string]: ArchiveDate;
}
