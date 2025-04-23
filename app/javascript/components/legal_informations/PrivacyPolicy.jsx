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

import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import RichTextViewer from '../shared_components/utilities/RichTextViewer';
import useSiteSetting from '../../hooks/queries/site_settings/useSiteSetting';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const { data: privacy, isLoading: isBoolanLoading } = useSiteSetting(['PrivacyPolicy']);
  const { data: termsContent, isLoading: isLoadingContent } = useSiteSetting(['PrivacyText']);

  if (isBoolanLoading) return null;

  if (privacy === false){
    return <Navigate to="/404" />;
  }
  if(isLoadingContent) return null;

  return (
    <Row>
      <Col>
        <Card className="lg-content">
          <Card.Header>
            <h2>{t('legal_informations.privacy_policy')}</h2>
          </Card.Header>
          <Card.Body>
              <Card.Text><RichTextViewer richTextData={ termsContent } /></Card.Text>
          </Card.Body>
        </Card>
        <a href="javascript:history.back()" className="text-link fw-bolder">
          <ArrowLeftIcon className="hi-s ms-2" />
          {t('back')}
        </a>
      </Col>
    </Row>
  );
}
