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
import { Dropdown, Row, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import useUpdateSiteSetting from '../../../../hooks/mutations/admin/site_settings/useUpdateSiteSetting';
import useSiteSettings from '../../../../hooks/queries/admin/site_settings/useSiteSettings';
import useRoleMapping from '../../../../hooks/queries/admin/site_settings/useRoleMapping';
import SettingsRow from '../SettingsRow';
import useEnv from '../../../../hooks/queries/env/useEnv';
import SettingSelect from '../settings/SettingSelect';
import useRoles from '../../../../hooks/queries/admin/roles/useRoles';
import Spinner from '../../../shared_components/utilities/Spinner';

export default function Registration() {
  const { t } = useTranslation();
  const { data: env } = useEnv();
  const { data: siteSettings } = useSiteSettings(['DefaultRole', 'ResyncOnLogin', 'RegistrationMethod', 'AllowedDomains']);
  const { data: roleMapping } = useRoleMapping();
  const { data: roles } = useRoles();
  const updateRegistrationMethod = useUpdateSiteSetting('RegistrationMethod');
  const updateDefaultRole = useUpdateSiteSetting('DefaultRole');
  const updateRoleMapping = useUpdateSiteSetting('RoleMapping');
  const updateDomainSignUp = useUpdateSiteSetting('AllowedDomains');
  // changes fmo1: review naming-convention
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(roleMapping || '');

  useEffect(() => {
    if (roleMapping) {
      setInputValue(roleMapping);
    }
  }, [roleMapping]);

  const refetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/v1/admin/role_mappings.json', {
        headers: {
        'Accept': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    console.log(data);
    setInputValue(data.data); // here should the new value be assigned to the input elment
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    try {
      const value = e.target.previousSibling.value;
      console.log('Updating role mapping with value:', value);
      await updateRoleMapping.mutateAsync({ value });
      await refetchData();
    } catch (error) {
      console.error('Error updating role mapping:', error);
    }
  };

  return (
    <>
      <SettingSelect
        defaultValue={siteSettings?.RegistrationMethod}
        title={t('admin.site_settings.registration.registration_method')}
        description={t('admin.site_settings.registration.registration_method_description')}
      >
        <Dropdown.Item key="open" value="open" onClick={() => updateRegistrationMethod.mutate({ value: 'open' })}>
          {t('admin.site_settings.registration.registration_methods.open')}
        </Dropdown.Item>
        <Dropdown.Item key="invite" value="invite" onClick={() => updateRegistrationMethod.mutate({ value: 'invite' })}>
          {t('admin.site_settings.registration.registration_methods.invite')}
        </Dropdown.Item>
        <Dropdown.Item key="approval" value="approval" onClick={() => updateRegistrationMethod.mutate({ value: 'approval' })}>
          {t('admin.site_settings.registration.registration_methods.approval')}
        </Dropdown.Item>
      </SettingSelect>

      { env?.EXTERNAL_AUTH && (
        <Row className="mb-3">
          <SettingsRow
            name="ResyncOnLogin"
            title={t('admin.site_settings.registration.resync_on_login')}
            description={(
              <p className="text-muted mb-0">
                { t('admin.site_settings.registration.resync_on_login_description') }
              </p>
            )}
            value={siteSettings?.ResyncOnLogin}
          />
        </Row>
      )}

      <SettingSelect
        defaultValue={siteSettings?.DefaultRole}
        title={t('admin.site_settings.registration.default_role')}
        description={t('admin.site_settings.registration.default_role_description')}
      >
        {
          roles?.map((role) => (
            <Dropdown.Item key={role.name} value={role.name} onClick={() => updateDefaultRole.mutate({ value: role.name })}>
              {role.name}
            </Dropdown.Item>
          ))
        }
      </SettingSelect>

      <Row className="mb-3">
        <strong> { t('admin.site_settings.registration.role_mapping_by_email') } </strong>
        <p className="text-muted"> { t('admin.site_settings.registration.role_mapping_by_email_description') } </p>
        <Stack direction="horizontal">
          <input
            className="form-control"
            placeholder={t('admin.site_settings.registration.enter_role_mapping_rule')}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            variant="brand"
            className="ms-2"
            onClick={handleUpdate}
            disabled={loading}
          >
            { loading ? <Spinner className="me-2" /> : t('update') }
          </Button>
        </Stack>
      </Row>

      <Row className="mb-3">
        <strong> {t('admin.site_settings.registration.allowed_domains')} </strong>
        <p className="text-muted">{t('admin.site_settings.registration.allowed_domains_signup_description')}</p>
        <Stack direction="horizontal">
          <input
            className="form-control"
            placeholder={t('admin.site_settings.registration.enter_allowed_domains_rule')}
            defaultValue={siteSettings?.AllowedDomains}
          />
          <Button
            variant="brand"
            className="ms-2"
            onClick={(e) => updateDomainSignUp.mutate({ value: e.target.previousSibling.value })}
          >
            {t('update')}
          </Button>
        </Stack>
      </Row>
    </>
  );
}
