// Copyright © 2020 The Things Network Foundation, The Things Industries B.V.
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

import React from 'react'
import RcSlider from 'rc-slider'
import 'rc-slider/assets/index.css'
import classnames from 'classnames'

import PropTypes from '@ttn-lw/lib/prop-types'

import style from './slider.styl'

const Slider = props => {
  const { className, step, min, max, onChange, value, disabled, dots, ...rest } = props
  return (
    <div className={classnames(className, style.container)}>
      <RcSlider
        step={step}
        min={min}
        max={max}
        onChange={onChange}
        value={value}
        disabled={disabled}
        dots={dots}
        {...rest}
      />
    </div>
  )
}

Slider.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  dots: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  step: PropTypes.number,
  value: PropTypes.number,
}

Slider.defaultProps = {
  className: undefined,
  disabled: false,
  dots: false,
  max: 100,
  min: 0,
  onChange: () => null,
  step: 1,
  value: null,
}

export default Slider
