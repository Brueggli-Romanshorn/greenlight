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

import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import useEnv from '../../hooks/queries/env/useEnv';
import MarkdownViewer from '../shared_components/utilities/MarkdownViewer';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const error = searchParams.get('error');
  // const { data: recordValue } = useRoomConfigValue('record');
  const { data: env } = useEnv();

  useEffect(() => {
    switch (error) {
      case 'InviteInvalid':
        toast.error(t('toast.error.users.invalid_invite'));
        break;
      case 'SignupError':
        toast.error(t('toast.error.users.signup_error'));
        break;
      default:
    }
    if (error) { setSearchParams(searchParams.delete('error')); }
  }, [error]);

  // useEffect for inviteToken
  useEffect(
    () => {
      const inviteToken = searchParams.get('inviteToken');

      // Environment settings not loaded
      if (!env) {
        return;
      }

      if (inviteToken && env?.EXTERNAL_AUTH) {
        const signInForm = document.querySelector('form[action="/auth/openid_connect"]');
        signInForm.submit();
      } else if (inviteToken && !env?.EXTERNAL_AUTH) {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach((button) => {
          if (button.textContent === 'Sign Up') {
            button.click();
          }
        });
      }
    },
    [searchParams, env],
  );

  return (
    <>
      <div className="vertical-center">
        <Card className="terms">
          <Card.Header>
              {t('legal_informations.privacy_policy')}
          </Card.Header>
          <Card.Body>
             <Card.Text><MarkdownViewer fileName="privacy.md" /></Card.Text>
          </Card.Body>
        </Card>
        <a href="/" className="fs-5 text-link fw-bolder">
          <ArrowLeftIcon className="hi-s ms-2" />
          {t('return_home')}
        </a>
      </div>
    </>
  );
}
