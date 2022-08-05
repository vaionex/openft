import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false },
)

const TextEditor = ({ onChange }) => {
  const [editorState, setEditorState] = useState(null)

  return (
    <div className="">
      <Editor
        editorState={editorState}
        toolbarClassName="border-none px-0"
        wrapperClassName=""
        editorClassName="p-3 border border-gray-200 rounded"
        onEditorStateChange={setEditorState}
        toolbar={{
          options: ['blockType', 'inline', 'link', 'list'],
          inline: {
            inDropdown: false,
            className: undefined,
            options: ['bold', 'italic'],
          },
          blockType: {
            inDropdown: true,
            className: 'text-gray-700',
            options: [
              'Normal',
              'H1',
              'H2',
              'H3',
              'H4',
              'H5',
              'H6',
              'Blockquote',
            ],
          },
          fontSize: { className: 'hidden' },
          fontFamily: { className: 'hidden' },
          list: {
            inDropdown: false,
            className: undefined,
            options: ['unordered', 'ordered'],
          },
          textAlign: { className: 'hidden' },
          link: {
            className: undefined,
            inDropdown: false,
            dropdownClassName: undefined,
            targetCheckbox: true,
            options: ['link', 'unlink'],
          },
        }}
      />
    </div>
  )
}

export default TextEditor
