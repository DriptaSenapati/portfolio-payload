'use client'

import { OptionObject, TextFieldClientComponent } from 'payload'
import React, { useState } from 'react'
import { FieldLabel, Select, Tooltip, useField } from '@payloadcms/ui'
import { stateAndDistrict } from '@/lib/stateAndDistricts'
import { useEffectOnce } from 'react-use'

const LocationComponent: TextFieldClientComponent = ({ path, field }) => {
  const { value, setValue, showError, valid, errorMessage } = useField<string>({ path })
  const [stateValue, setStateValue] = useState<OptionObject | undefined>(undefined)
  const [districtValue, setDistrictValue] = useState<OptionObject | undefined>(undefined)

  // useEffect(() => {
  //   if (stateValue && districtValue && !firstRender.current) {
  //     setValue(`${districtValue.label} - ${stateValue.label}`)
  //   }
  // }, [stateValue, districtValue, setValue])

  const onChangeState = (val: OptionObject | null) => {
    if (val) {
      const districtOptions = stateAndDistrict.states
        .filter((state) => state.state === val.value)[0]
        .districts.map((district) => ({
          label: district,
          value: district,
        }))
      setDistrictValue(districtOptions[0])
      setStateValue(val)
    }
  }

  const onChangeDistrict = (val: OptionObject | null) => {
    if (val && stateValue) {
      setDistrictValue(val)
      setValue(`${val.label} - ${stateValue.label}`)
    }
  }

  // useEffect(() => {
  //   console.log('stateValue', stateValue)
  //   if (stateValue && !firstRender.current) {
  //     const districtOptions = stateAndDistrict.states
  //       .filter((state) => state.state === stateValue.value)[0]
  //       .districts.map((district) => ({
  //         label: district,
  //         value: district,
  //       }))
  //     setDistrictValue(districtOptions[0])
  //   }
  // }, [stateValue])

  useEffectOnce(() => {
    if (value) {
      const [district, state] = value.split('-').map((val) => val.trim())
      setDistrictValue({ value: district, label: district })
      setStateValue({ value: state, label: state })
    } else {
      setDistrictValue(undefined)
      setStateValue(undefined)
    }
  })

  return (
    <div className="w-full relative">
      <Tooltip
        show={showError && !valid}
        alignCaret="right"
        className="field-error top-0"
        staticPositioning
      >
        {errorMessage}
      </Tooltip>
      <div
        className={`flex justify-between items-center gap-5 ${showError && !valid ? 'error' : ''}`}
      >
        <div className="w-full">
          <FieldLabel label={'State Name'} path={path} required={field?.required} />
          <Select
            placeholder="Select State"
            value={stateValue ? { label: stateValue.label, value: stateValue.value } : undefined}
            isSearchable
            className="w-full"
            onChange={(val) => {
              onChangeState(val as OptionObject | null)
            }}
            options={stateAndDistrict.states.map((state) => ({
              label: state.state,
              value: state.state,
            }))}
            isClearable={false}
            showError={showError && !valid}
          />
        </div>
        <div className="w-full">
          <FieldLabel label={'District Name'} path={path} required={field?.required} />
          <Select
            placeholder="Select District"
            disabled={!stateValue?.value}
            value={
              districtValue ? { label: districtValue.label, value: districtValue.value } : undefined
            }
            className="w-full"
            onChange={(val) => onChangeDistrict(val as OptionObject | null)}
            options={
              stateValue
                ? stateAndDistrict.states
                    .filter((state) => state.state === stateValue.value)[0]
                    .districts.map((district) => ({
                      label: district,
                      value: district,
                    }))
                : []
            }
            isClearable={false}
            showError={showError && !valid}
          />
        </div>
      </div>
    </div>
  )
}

export default LocationComponent
