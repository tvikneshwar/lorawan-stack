// Copyright © 2019 The Things Network Foundation, The Things Industries B.V.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useEffect } from 'react'
import { defineMessages } from 'react-intl'

import Field from '@ttn-lw/components/form/field'

import PropTypes from '@ttn-lw/lib/prop-types'

import connect from './connect'
import JoinEUIPrefixesInput from './join-eui-prefixes-input'

const m = defineMessages({
  prefixesFetchingFailure: 'Prefixes unavailable',
})

const JoinEUIPrefixesField = function({
  name,
  title,
  description,
  required,
  horizontal,
  autoFocus,
  disabled,
  prefixes,
  error,
  fetching,
  getPrefixes,
  showPrefixes,
}) {
  useEffect(() => {
    getPrefixes()
  }, [getPrefixes])

  return (
    <Field
      name={name}
      title={title}
      description={description}
      required={required}
      autoFocus={autoFocus}
      horizontal={horizontal}
      component={JoinEUIPrefixesInput}
      disabled={disabled}
      fetching={fetching}
      warning={Boolean(error) ? m.prefixesFetchingFailure : undefined}
      prefixes={prefixes}
      showPrefixes={showPrefixes}
    />
  )
}

JoinEUIPrefixesField.propTypes = {
  autoFocus: PropTypes.bool,
  description: PropTypes.message,
  disabled: PropTypes.bool,
  error: PropTypes.error,
  fetching: PropTypes.bool.isRequired,
  getPrefixes: PropTypes.func.isRequired,
  horizontal: PropTypes.bool,
  name: PropTypes.string.isRequired,
  prefixes: PropTypes.arrayOf(
    PropTypes.shape({
      prefix: PropTypes.string,
      length: PropTypes.number,
    }),
  ),
  required: PropTypes.bool,
  showPrefixes: PropTypes.bool,
  title: PropTypes.message.isRequired,
}

JoinEUIPrefixesField.defaultProps = {
  required: false,
  horizontal: false,
  autoFocus: false,
  disabled: false,
  prefixes: [],
  error: undefined,
  showPrefixes: true,
  description: undefined,
}

export default connect(JoinEUIPrefixesField)
