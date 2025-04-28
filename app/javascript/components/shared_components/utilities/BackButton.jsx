import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => { 
    const previousUrl = document.referrer;
    const currentDomain = window.location.origin;
    
    if (previousUrl && previousUrl.startsWith(currentDomain)) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }


  return (
    <Stack 
      className="d-inline-block cursor-pointer pe-2 pt-2 text-muted back-button"
      aria-hidden="true"
      onClick={handleClick}
    >
      <ArrowLeftIcon className="hi-s ms-2" />
      {t('back')}
    </Stack>
  );
}