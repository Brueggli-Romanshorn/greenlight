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
// import { Button, Stack } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
import CreateLinkForm from './CreateLinkForm';

export default function CreateLinkModal({ handleClose }) {
  // const { t } = useTranslation();

  /*return (
    <div>
      <Stack className="mt-1" direction="horizontal" gap={1}>
        <Button variant="neutral" className="ms-auto" onClick={handleClose}>
          {t('cancel')}
        </Button>
        <Button variant="brand" type="submit">
          {t('admin.site_settings.administration.create_link')}
        </Button>
      </Stack>
    </div>
  );*/

  return (
    <div>
      <CreateLinkForm id="" value="" handleClose={handleClose}/>
    </div>
  );
}

CreateLinkModal.propTypes = {
  handleClose: PropTypes.func,
};

CreateLinkModal.defaultProps = {
  handleClose: () => { },
};
