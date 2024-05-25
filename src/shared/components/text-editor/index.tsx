import { useMemo, type HTMLAttributes } from 'react';
import { BlockNoteView } from '@blocknote/mantine';
import type {
  BlockNoteEditorOptions,
  BlockSchema,
  InlineContentSchema,
  PartialBlock,
  StyleSchema,
} from '@blocknote/core';
import '@blocknote/mantine/style.css';

import { useCreateBlockNote } from '@blocknote/react';

export type CreateBlockNoteOption = BlockNoteEditorOptions<
  BlockSchema,
  InlineContentSchema,
  StyleSchema
>;
export type TextEditorProps = HTMLAttributes<HTMLDivElement> & {
  onChange?: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  collaboration?: CreateBlockNoteOption['collaboration'];
};

export type EditorContent = PartialBlock[];

export default function TextEditor(props: TextEditorProps) {
  const { initialContent, collaboration, onChange, ...rest } = props;

  const initContent = useMemo<PartialBlock[]>(() => {
    try {
      return initialContent ? JSON.parse(initialContent) : undefined;
    } catch (error) {
      return undefined;
    }
  }, [initialContent]);

  const editor = useCreateBlockNote(
    {
      initialContent: initContent,
      collaboration,
    },
    [initContent]
  );

  const handleChange = () => {
    onChange?.(JSON.stringify(editor.document, null, 2));
  };

  return (
    <BlockNoteView
      theme='light'
      className='min-h-[max(200px,40vh)]'
      editor={editor}
      onChange={handleChange}
      {...rest}
    />
  );
}
