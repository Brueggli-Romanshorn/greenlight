import React from 'react';
import { serialize } from '../../../helpers/HTMLSerializer'
import { validateJson } from '../../../helpers/JsonValidater'
//import DOMPurify from 'dompurify';


export default function RichTextViewer( { richTextData } ) {
    //console.log( richTextData );
    
    const rawHTML = validateJson(richTextData) ? serialize(JSON.parse(richTextData)) : '<p>' + richTextData + '</p>'
    
    
    //const sanatizedHTML = DOMPurify.sanitize(rawHTML);

    return (
      <div dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );

}