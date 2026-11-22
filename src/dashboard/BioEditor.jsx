import { useEditor, useEditorState, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

const tool = (editor, name) => editor?.isActive(name) ?? false;

export default function BioEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        code: false,
        horizontalRule: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
      }),
      Placeholder.configure({ placeholder: 'A short biography…' }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'bio-editor-body',
        'aria-label': 'Biography',
      },
    },
    onUpdate: ({ editor: current }) => onChange(current.getHTML()),
  });

  const active = useEditorState({
    editor,
    selector: ({ editor: current }) => ({
      bold: tool(current, 'bold'),
      italic: tool(current, 'italic'),
      underline: tool(current, 'underline'),
      bullet: tool(current, 'bulletList'),
      ordered: tool(current, 'orderedList'),
      link: tool(current, 'link'),
    }),
  });

  const run = (command) => {
    if (!editor) return;
    command();
  };

  const onLink = () => {
    if (!editor) return;
    const previous = editor.getAttributes('link').href || '';
    const entered = window.prompt('Link URL', previous);
    if (entered === null) return;
    const url = entered.trim();
    if (!url) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
  };

  return (
    <div className="bio-editor">
      <div className="bio-editor-bar" role="toolbar" aria-label="Biography formatting">
        <button
          type="button"
          className={active?.bold ? 'is-active' : ''}
          onClick={() => run(() => editor.chain().focus().toggleBold().run())}
        >
          Bold
        </button>
        <button
          type="button"
          className={active?.italic ? 'is-active' : ''}
          onClick={() => run(() => editor.chain().focus().toggleItalic().run())}
        >
          Italic
        </button>
        <button
          type="button"
          className={active?.underline ? 'is-active' : ''}
          onClick={() => run(() => editor.chain().focus().toggleUnderline().run())}
        >
          Underline
        </button>
        <button
          type="button"
          className={active?.bullet ? 'is-active' : ''}
          onClick={() => run(() => editor.chain().focus().toggleBulletList().run())}
        >
          Bullets
        </button>
        <button
          type="button"
          className={active?.ordered ? 'is-active' : ''}
          onClick={() => run(() => editor.chain().focus().toggleOrderedList().run())}
        >
          Numbered
        </button>
        <button type="button" className={active?.link ? 'is-active' : ''} onClick={onLink}>
          Link
        </button>
        <button type="button" onClick={() => run(() => editor.chain().focus().unsetAllMarks().clearNodes().run())}>
          Clear
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
