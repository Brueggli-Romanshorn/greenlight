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

import React, { useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Form from '../../../shared_components/forms/Form';
import RichTextEditor from '../../../shared_components/editor/RichTextEditor';
import { validateJson } from '../../../../helpers/JsonValidater'


export default function EditorForm({ id, data, handleClose, mutation: useUpdateSiteSettingsAPI }) {
  const updateContent = useUpdateSiteSettingsAPI();
  const { t } = useTranslation();

  if (validateJson(data)) {
    RichTextJSON = data;
  }
  else {
    RichTextJSON = '[{"type":"paragraph","children":[{"text":"'+ data +'"}]}]';
  }
  const [value, setValue] = useState(JSON.parse(RichTextJSON));
  

  const handleUpdate = () => { 
    const formText = {
      value: JSON.stringify(value),
    };
    updateContent.mutate(formText);
    handleClose();
  };

  const handleChange = newValue => { 
    setValue(newValue);
  };

  /* const handleDebug = () => {
    alert(JSON.stringify(value));
  } */
  
  return (
    <Row>
      <Form id={id} >
        <div className="mb-2">
            <RichTextEditor value={value} onChange={handleChange}/>
        </div>
        <Button variant="brand" className="mb-2 float-end" onClick={handleUpdate}>
          {t('save')}
        </Button>
        <Button variant="neutral" className="mb-2 float-end me-2" onClick={handleClose}>
          {t('cancel')}
        </Button>
        {/* <Button variant="neutral" className="mb-2 float-end me-2" onClick={handleDebug}>
          Show JSON
        </Button> */}
      </Form>
    </Row>
  );
}

EditorForm.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  mutation: PropTypes.func.isRequired,
};

EditorForm.defaultProps = {
  handleClose: () => { },
};
