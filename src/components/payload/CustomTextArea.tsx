'use client'

import { TextareaFieldClientComponent } from 'payload'
import React from 'react'
import { FieldLabel, Tooltip, useField } from '@payloadcms/ui'

const CustomTextArea: TextareaFieldClientComponent = ({ path, field }) => {
  const maxCharacterCount = 370

  const { value, setValue, showError, valid, errorMessage } = useField({ path })

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    event.stopPropagation()
  }

  return (
    <div className="w-full relative mb-[var(--spacing-field)]">
      <div className={`field-type textarea ${showError && !valid ? 'error' : ''}`}>
        <FieldLabel label={field?.label || field?.name} path={path} required={field?.required} />
        <Tooltip
          show={showError && !valid}
          alignCaret="right"
          className="field-error top-0"
          staticPositioning
        >
          {errorMessage}
        </Tooltip>
        <textarea
          value={value as string | undefined}
          onChange={setValue}
          onKeyDown={handleOnKeyDown}
          maxLength={maxCharacterCount}
        />
      </div>
      <div className="absolute right-0 bottom-0 translate-y-[110%] text-background-2">
        {value ? (value as string).split('').length : 0}/{maxCharacterCount}
      </div>
    </div>
  )
}

export default CustomTextArea
