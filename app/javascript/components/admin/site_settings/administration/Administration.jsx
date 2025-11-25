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
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LinksForm from './LinksForm';
import TextForm from './TextForm';
import SettingsRow from '../SettingsRow';
import useUpdateSiteSetting from '../../../../hooks/mutations/admin/site_settings/useUpdateSiteSetting';
import useSiteSettings from '../../../../hooks/queries/admin/site_settings/useSiteSettings';

export default function Administration() {
  const { t } = useTranslation();
  const { data: siteSettings } = useSiteSettings(['Terms', 'Imprint','PrivacyPolicy', 'HelpCenter', 'Maintenance']);

  return (
    <>
      <SettingsRow
        name="PrivacyPolicy"
        title={t('admin.site_settings.administration.privacy_policy')}
        edit="PrivacyText"
        description={(
          <p className="text-muted">
            { t('admin.site_settings.administration.en_disable_privacy_link') }
          </p>
      )}
        value={siteSettings?.PrivacyPolicy}
      />
      <SettingsRow
        name="Terms"
        title={t('admin.site_settings.administration.terms')}
        edit="TermsText"
        description={(
          <p className="text-muted">
            { t('admin.site_settings.administration.en_disable_terms_link') }
          </p>
      )}
        value={siteSettings?.Terms}
      />
      <SettingsRow
        name="Imprint"
        title={t('admin.site_settings.administration.imprint')}
        edit="ImprintText"
        description={(
          <p className="text-muted">
            { t('admin.site_settings.administration.en_disable_imprint_link') }
          </p>
      )}
        value={siteSettings?.Imprint}
      />
      <Row>
        <strong> { t('admin.site_settings.administration.helpcenter') } </strong>
        <p className="text-muted"> { t('admin.site_settings.administration.change_helpcenter_link') } </p>
        <LinksForm
          id="helpForm"
          mutation={() => useUpdateSiteSetting('HelpCenter')}
          value={siteSettings?.HelpCenter}
        />
      </Row>
      <Row>
        <strong> { t('admin.site_settings.administration.maintenance') } </strong>
        <p className="text-muted"> { t('admin.site_settings.administration.change_maintenance_text') } </p>
        <TextForm
          id="maintenanceForm"
          mutation={() => useUpdateSiteSetting('Maintenance')}
          value={siteSettings?.Maintenance}
        />
      </Row>
    </>
  );
}
