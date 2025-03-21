import React from 'react';
import { serialize } from '../../../helpers/HTMLSerializer.jsx'
//import DOMPurify from 'dompurify';


export default function RichTextViewer( { richTextData } ) {
    //console.log( richTextData );
    const rawHTML = serialize(richTextData)
    
    
    //const sanatizedHTML = DOMPurify.sanitize(rawHTML);

    return (
      <div dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );

}