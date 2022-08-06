import { EditorUlistIcon } from '@/components/common/icons'
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
        editorClassName="p-3 border border-gray-200 rounded min-h-[154px]"
        onEditorStateChange={setEditorState}
        placeholder="Add a short bio..."
        toolbar={{
          options: ['blockType', 'inline', 'link', 'list'],
          inline: {
            inDropdown: false,
            className: undefined,
            options: ['bold', 'italic'],
            bold: {
              icon: '/images/editor/editor-bold-icon.svg',
              className: 'border-none hover:shadow-none',
            },
            italic: {
              icon: '/images/editor/editor-italic-icon.svg',
              className: 'border-none hover:shadow-none',
            },
          },
          blockType: {
            inDropdown: true,
            className:
              'text-gray-700 border-gray-200 rounded w-40 hover:shadow-none',
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
            unordered: {
              icon: '/images/editor/editor-ulist-icon.svg',
              className: 'border-none hover:shadow-none',
            },
            ordered: {
              icon: '/images/editor/editor-olist-icon.svg',
              className: 'border-none hover:shadow-none',
            },
          },
          textAlign: { className: 'hidden' },
          link: {
            className: undefined,
            inDropdown: false,
            dropdownClassName: undefined,
            targetCheckbox: true,
            options: ['link', 'unlink'],
            link: {
              icon: '/images/editor/editor-link-icon.svg',
              className: 'border-none hover:shadow-none',
            },
          },
        }}
      />
    </div>
  )
}

export default TextEditor
