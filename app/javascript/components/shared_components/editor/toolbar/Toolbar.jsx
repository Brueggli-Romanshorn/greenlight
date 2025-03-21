import React from 'react'
import { MarkButton, BlockButton, LinkButton, TestModalButton } from './ToolBarButtons'
import { Strip } from './Components'


export default function Toolbar () {   
    return (
      <Strip>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <LinkButton />
        <TestModalButton />
      </Strip>
    );
}