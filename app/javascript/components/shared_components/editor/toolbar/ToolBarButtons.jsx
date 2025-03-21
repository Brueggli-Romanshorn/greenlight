import React from 'react'
import { useSlate } from 'slate-react'
import { Button, Icon } from './Components'
import { isBlockActive, 
  isMarkActive, 
  toggleBlock, 
  toggleMark, 
  isLinkActive,
  unwrapLink, 
  insertLink 
  } from '../EditorControl'
import PropTypes from 'prop-types';
import CreateLinkModal from './CreateLinkModal';
import { useTranslation } from 'react-i18next';
import Modal from '../../modals/Modal'

export const MarkButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
      <Button
        active={isMarkActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault()
          toggleMark(editor, format)
        }}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
}

export const BlockButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
      <Button
        active={isBlockActive(
          editor,
          format
        )}
        onMouseDown={event => {
          event.preventDefault()
          toggleBlock(editor, format)
        }}
      >
      <Icon>{icon}</Icon>
      </Button>
    )
}

export const LinkButton = () => {
  const editor = useSlate()
  const icon = isLinkActive(editor) ? 'link_off' : 'link'
  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={event => {
        event.preventDefault()
        if (isLinkActive(editor)) {
          unwrapLink(editor)
        }
        else {
          const url = window.prompt('Enter the URL of the link:')
          if (!url) return
          insertLink(editor, url)
        }
      }}
    >
      <Icon>{ icon }</Icon>
    </Button>
  )
}

export const TestModalButton = () => {
  const { t } = useTranslation();
  return (
    <Modal
      modalButton={
      <Button>
        <Icon>extension</Icon>
      </Button>
      }
      title={t('admin.site_settings.administration.enter_link')}
      body={<CreateLinkModal />}
    />
  );
}

TestModalButton.propTypes = {
  istoggled: PropTypes.bool,
};




/*
export const AddLinkButton = () => {
  const editor = useSlate()
  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={event => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the link:')
        if (!url) return
        insertLink(editor, url)
      }}
    >
      <Icon>link</Icon>
    </Button>
  )
}
export const RemoveLinkButton = () => {
  const editor = useSlate()
  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={event => {
        if (isLinkActive(editor)) {
          unwrapLink(editor)
        }
      }}
    >
      <Icon>link_off</Icon>
    </Button>
  )
}*/