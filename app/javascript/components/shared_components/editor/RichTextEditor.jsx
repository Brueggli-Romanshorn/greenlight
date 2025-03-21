import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import { isKeyHotkey } from 'is-hotkey'
import { Editable, withReact, Slate, useSelected } from 'slate-react'
import { createEditor, Range } from 'slate'
import { withHistory } from 'slate-history'
import { withInlines } from './EditorControl'
import Toolbar from './toolbar/Toolbar'
import { css } from '@emotion/css'
// import { Placeholder } from 'react-bootstrap';

// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405


const InlineChromiumBugfix = () => (
  <span
    contentEditable={false}
    className={css`
      font-size: 0;
    `}
  >
    {String.fromCodePoint(160) /* Non-breaking space */}
  </span>
)
const allowedSchemes = ['http:', 'https:', 'mailto:', 'tel:']
const LinkComponent = ({ attributes, children, element }) => {
  const selected = useSelected()
  const safeUrl = useMemo(() => {
    let parsedUrl = null
    try {
      parsedUrl = new URL(element.url)
      // eslint-disable-next-line no-empty
    } catch {}
    if (parsedUrl && allowedSchemes.includes(parsedUrl.protocol)) {
      return parsedUrl.href
    }
    return 'about:blank'
  }, [element.url])
  return (
    <a
      {...attributes}
      href={safeUrl}
      className={
        selected
          ? css`
              box-shadow: 0 0 0 3px #35C4F0;
            `
          : ''
      }
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </a>
  )
}



  
export default function RichTextEditor ( { value, onChange } ) {
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const renderPlaceholder = useCallback(props => <Placeholder {...props} />, [])

  const editor = useMemo(() =>  withInlines(withHistory(withReact(createEditor()))), [])
  const { t } = useTranslation();

  const onKeyDown = event => {
    const { selection } = editor
    // Default left/right behavior is unit:'character'.
    // This fails to distinguish between two cursor positions, such as
    // <inline>foo<cursor/></inline> vs <inline>foo</inline><cursor/>.
    // Here we modify the behavior to unit:'offset'.
    // This lets the user step into and out of the inline without stepping over characters.
    // You may wish to customize this further to only use unit:'offset' in specific cases.
    if (selection && Range.isCollapsed(selection)) {
      const { nativeEvent } = event
      if (isKeyHotkey('left', nativeEvent)) {
        event.preventDefault()
        Transforms.move(editor, { unit: 'offset', reverse: true })
        return
      }
      if (isKeyHotkey('right', nativeEvent)) {
        event.preventDefault()
        Transforms.move(editor, { unit: 'offset' })
        return
      }
    }
  }
  
  return (
    <Slate editor={editor} initialValue={ value } onChange={ onChange }>
      <Toolbar />
      <Editable
        className="form-control text-editor"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder={ t('admin.site_settings.administration.set_text') }
        renderPlaceholder={renderPlaceholder}

        spellCheck
        autoFocus
        onKeyDown={onKeyDown}
      />
    </Slate>
  )
}

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align }

  switch (element.type) {
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'link':
      return (
        <LinkComponent element={element} children={children} {...attributes} />
      )
    case 'heading-one':
      return (
        <h4 style={style} {...attributes}>
          {children}
        </h4>
      )
    case 'heading-two':
      return (
        <h5 style={style} {...attributes}>
          {children}
        </h5>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.code) {
    children = <code>{children}</code>
  }
  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  return <span {...attributes}>{children}</span>
}

const Placeholder = ({ attributes, children }) => {
  const customAttributes = {
    ...attributes,
    style: {
      ...attributes.style,
      top: '6px',
      width: '80%',
    }
  }

  return (
    <div {...customAttributes}>
      <p>{children}</p>
    </div>
  )
}