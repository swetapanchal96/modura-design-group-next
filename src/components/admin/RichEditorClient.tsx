"use client";

import { useEffect, useRef } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  Alignment,
  Link,
  BlockQuote,
  SourceEditing,
  GeneralHtmlSupport,
  HorizontalLine,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

import type { RichEditorProps } from "./RichEditor";


const FULL_TOOLBAR = [
  "undo",
  "redo",
  "|",
  "heading",
  "|",
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "|",
  "bulletedList",
  "numberedList",
  "|",
  "alignment",
  "|",
  "link",
  "blockQuote",
  "horizontalLine",
  "|",
  "sourceEditing",
];


const SMALL_TOOLBAR = [
  "undo",
  "redo",
  "|",
  "bold",
  "italic",
  "underline",
  "|",
  "link",
  "sourceEditing",
];


const PLUGINS = [
  Essentials,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  Alignment,
  Link,
  BlockQuote,
  SourceEditing,
  GeneralHtmlSupport,
  HorizontalLine,
];


function normalizeHtml(
  value: string | null | undefined
): string {

  if (!value) {
    return "";
  }

  if (
    value === "<p>&nbsp;</p>" ||
    value === "<p><br></p>"
  ) {
    return "";
  }

  return value;
}


export default function RichEditorClient({
  value,
  onChange,
  small = false,
  invalid = false,
}: RichEditorProps) {

  // change the ref
  const editorRef = useRef<ClassicEditor | null>(null);

  const onChangeRef = useRef(onChange);


  useEffect(() => {

    onChangeRef.current = onChange;

  }, [onChange]);


  /*
  |--------------------------------------------------------------------------
  | Synchronize external value
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const editor = editorRef.current;

    if (!editor) {
      return;
    }

    const nextValue = normalizeHtml(value);

    const currentValue = normalizeHtml(
      editor.getData()
    );

    if (currentValue !== nextValue) {

      editor.setData(nextValue);

    }

  }, [value]);


  return (
    <div
      className={[
        "rich-editor-wrapper",
        small ? "small-editor" : "",
        invalid ? "invalid-editor" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >

      <CKEditor
        editor={ClassicEditor}

        data={normalizeHtml(value)}

        config={{

          /*
           * IMPORTANT:
           * GPL works with the self-hosted
           * npm distribution.
           */

          licenseKey: "GPL",

          plugins: PLUGINS,

          toolbar: {
            items: small
              ? SMALL_TOOLBAR
              : FULL_TOOLBAR,

            shouldNotGroupWhenFull: false,
          },


          heading: {

            options: [

              {
                model: "paragraph",
                title: "Paragraph",
                class: "ck-heading_paragraph",
              },

              {
                model: "heading2",
                view: "h2",
                title: "Heading 2",
                class: "ck-heading_heading2",
              },

              {
                model: "heading3",
                view: "h3",
                title: "Heading 3",
                class: "ck-heading_heading3",
              },

              {
                model: "heading4",
                view: "h4",
                title: "Heading 4",
                class: "ck-heading_heading4",
              },

            ],

          },


          link: {

            addTargetToExternalLinks: true,

            defaultProtocol: "https://",

          },


          htmlSupport: {

            allow: [

              {
                name: /^(p|div|span|h[1-6]|ul|ol|li|blockquote)$/,

                classes: true,

                styles: true,

                attributes: true,
              },

              {
                name: /^(a|strong|em|b|i|u|s|br|hr)$/,

                classes: true,

                styles: true,

                attributes: true,
              },

            ],


            disallow: [

              {
                name:
                  /^(script|iframe|object|embed|form)$/,
              },

              {
                name: /.*/,

                attributes: [
                  /^on/i,
                ],
              },

            ],

          },

        }}


        onReady={(editor: ClassicEditor) => {

          editorRef.current = editor;

        }}


        onChange={(_event:any, editor: ClassicEditor) => {

          const html = normalizeHtml(
            editor.getData()
          );

          onChangeRef.current(html);

        }}


        onAfterDestroy={() => {

          editorRef.current = null;

        }}

      />

    </div>
  );
}