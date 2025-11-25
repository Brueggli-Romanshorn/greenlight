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
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import RichTextViewer from '../shared_components/utilities/RichTextViewer';
import useSiteSetting from '../../hooks/queries/site_settings/useSiteSetting';
import BackButton from '../shared_components/utilities/BackButton';

export default function Imprint() {
  const { t } = useTranslation();
  const { data: imprint, isLoading: isBoolanLoading } = useSiteSetting(['Imprint']);
  const { data: imprintContent, isLoading: isLoadingContent } = useSiteSetting(['ImprintText']);

  if (isBoolanLoading) return null;
  
  if (imprint === false){
    return <Navigate to="/404" />;
  }
  if(isLoadingContent) return null;

  return (
    <>
      <Row className="wide-white">
        <Col lg={10}>
          <div id="homepage-hero">
            <h1 className="my-4"> {t('legal_informations.imprint')} </h1>
            <RichTextViewer richTextData={ imprintContent } />
          </div>
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          <BackButton />
        </Col>
      </Row>
    </>
  );
}
