import { useEffect, useState } from 'react'
import { ContentState, convertToRaw, EditorState } from 'draft-js'
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'
import draftToHtml from 'draftjs-to-html'
import userSelector from '@/redux/selectors/user'
import { useSelector } from 'react-redux'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false },
)

const TextEditor = ({ placeholder, initialState, setNewState }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [mounted, setMounted] = useState(0)

  useEffect(() => {
    console.log(mounted)
    setMounted((prev) => prev + 1)
    if (mounted === 0 || mounted === 1) {
      const getInitialEditorState = () => {
        const htmlToDraft = require('html-to-draftjs').default
        const contentBlock = htmlToDraft(initialState || '')
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks,
        )
        const editorState = EditorState.createWithContent(contentState)
        setEditorState(editorState)
      }
      getInitialEditorState()
    }
  }, [initialState])

  const handleOnEditorStateChange = (newState) => {
    setEditorState(newState)
    const draft = draftToHtml(convertToRaw(newState.getCurrentContent()))

    setNewState(draft)
  }

  return (
    <div className="">
      <Editor
        editorState={editorState}
        toolbarClassName="border-none px-0"
        editorClassName="p-3 border border-gray-200 rounded min-h-[154px]"
        onEditorStateChange={handleOnEditorStateChange}
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
        placeholder={placeholder}
        moveFocusToEnd={true}
      />
    </div>
  )
}

TextEditor.propTypes = {
  placeholder: PropTypes.string,
  initialState: PropTypes.string,
  setNewState: PropTypes.func,
}

export default TextEditor
