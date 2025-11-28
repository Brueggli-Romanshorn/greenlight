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

import React from 'react';
// import { useTranslation } from 'react-i18next';
import useSiteSetting from '../../../hooks/queries/site_settings/useSiteSetting';
import RichTextViewer from '../utilities/RichTextViewer';
import { Card, Button } from 'react-bootstrap';
import Modal from './Modal';

export default function DisplayModal({ children, title, name }) {

  const { data: textContent, isLoading } = useSiteSetting( name );

  if (isLoading) return null;

  return (
    <Modal
      modalButton={ <Button className="d-inline-block cursor-pointer ps-3" variant="link" >{ children }</Button> }
      title={ title }
      body={ <RichTextViewer className="lg-content" richTextData={ textContent } /> }
      size="lg"
    />
  );
}
