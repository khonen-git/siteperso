import {
  Heading1,
  Heading2,
  Heading3,
  Paragraph,
  InlineCode,
  CodeBlock,
  Blockquote,
} from './renderers/text';

import {
  UnorderedList,
  OrderedList,
  ListItem,
} from './renderers/lists';

import {
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
} from './renderers/tables';

// Mapping pour les composants markdown
export const MarkdownComponents = {
  // Text elements
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  code: InlineCode,
  pre: CodeBlock,
  blockquote: Blockquote,

  // List elements
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,

  // Table elements
  table: Table,
  thead: THead,
  tbody: TBody,
  tr: TR,
  th: TH,
  td: TD,
};

export default MarkdownComponents;