<template>
  <el-tiptap :extensions="extensions" :content="content" placeholder="Write something ..."/>
</template>

<script>
import {
  // all extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Link,
  Image,
  Blockquote,
  ListItem,
  BulletList, // use with ListItem
  OrderedList, // use with ListItem
  TodoItem,
  TodoList, // use with TodoItem
  TextAlign,
  Indent,
  HorizontalRule,
  HardBreak,
  History,
  // LineHeight,
  // Iframe,
  // CodeBlock,
  // TrailingNode,
  // Table, // use with TableHeader, TableCell, TableRow
  // TableHeader,
  // TableCell,
  // TableRow,
  // FormatClear,
  // TextColor,
  // TextHighlight,
  // Preview,
  // Print,
  Fullscreen,
  CodeView
  // SelectAll,
} from "element-tiptap";

import codemirror from "codemirror";
import "codemirror/lib/codemirror.css"; // import base style
import "codemirror/mode/xml/xml.js"; // language
import "codemirror/addon/selection/active-line.js"; // require active-line.js
import "codemirror/addon/edit/closetag.js"; // autoCloseTags

export default {
  name: "Editor",

  data: () => ({
    extensions: [
      new Doc(),
      new Text(),
      new Paragraph(),
      new Heading({ level: 5 }),
      new Bold({ bubble: true }),
      new Underline({ bubble: true }),
      new Italic({ bubble: true }),
      new Strike({ bubble: true }),
      new Link({ bubble: true }),
      new Image(),
      new Blockquote(),
      new TextAlign(),
      new ListItem(),
      new BulletList({ bubble: true }),
      new OrderedList({ bubble: true }),
      new TodoItem(),
      new TodoList(),
      new Indent(),
      new HardBreak(),
      new HorizontalRule({ bubble: true }),
      new Fullscreen(),
      new CodeView({
        codemirror,
        codemirrorOptions: {
          styleActiveLine: true,
          autoCloseTags: true
        }
      }),
      new History()
    ],

    content: ``
  })
};
</script>
