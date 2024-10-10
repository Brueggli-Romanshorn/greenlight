// BigBlueButton open source conferencing system - http://www.bigbluebutton.org/.
//
// Copyright (c) 2022 BigBlueButton Inc. and by respective authors (see below).
//
// This program is free software; you can redistribute it and/or modify it under the
// terms of the GNU Lesser General Public License as published by the Free Software
// Foundation; either version 3.0 of the License, or (at your option) any later
// version.
//
// Greenlight is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License along
// with Greenlight; if not, see <http://www.gnu.org/licenses/>.

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
//import remarkAutolinkHeadings from 'remark-autolink-headings';

const MarkdownViewer = ({ fileName }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`/${fileName}`)
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error('Error fetching markdown:', error));
  }, [fileName]);

  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]}
    />
  );
};

export default MarkdownViewer;