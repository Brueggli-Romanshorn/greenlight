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
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';
import useEnv from '../../hooks/queries/env/useEnv';
import useSiteSetting from '../../hooks/queries/site_settings/useSiteSetting';
import { useAuth } from '../../contexts/auth/AuthProvider';
import DisplayModal from './modals/DisplayModal';
import ButtonLink from './utilities/ButtonLink';

export default function Footer() {
  const { t } = useTranslation();
  const { data: env } = useEnv();
  const { data: links } = useSiteSetting(['Terms', 'PrivacyPolicy', 'HelpCenter', 'Imprint', 'AccessibilityStatement']);
  const currentUser = useAuth();
  const isAuthenticated = currentUser?.signed_in;

  return (
    <footer id="footer" className="footer text-center">
      <Container id="footer-container" className="py-3">
        { links?.PrivacyPolicy
          && (
            <DisplayModal title={ t('admin.site_settings.administration.privacy_policy') } name="PrivacyText">
              { t('admin.site_settings.administration.privacy') }
            </DisplayModal>
          )}
        { links?.Terms
          && (
            <DisplayModal title={ t('admin.site_settings.administration.terms') } name="TermsText">
              { t('admin.site_settings.administration.terms') }
            </DisplayModal>
          )}
        { !isAuthenticated && links?.Imprint
          && (
            <DisplayModal title={ t('legal_informations.imprint') } name="ImprintText">
              { t('legal_informations.imprint') }
            </DisplayModal>
          )}
        { (isAuthenticated && links?.HelpCenter)
          && (
            <a className="d-inline-block cursor-pointer ps-3 btn btn-link" href={links?.HelpCenter} target="_blank" rel="noreferrer">
                { t('help_center') }
            </a> 
          )}
        { links?.AccessibilityStatement
          && (
            <a className="d-inline-block cursor-pointer ps-3 btn btn-link" href={links?.AccessibilityStatement} target="_blank" rel="noreferrer">
              { t('admin.site_settings.administration.accessibility_statement') }
            </a>
          )}
      </Container>
    </footer>
  );
}
