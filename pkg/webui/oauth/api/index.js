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

import axios from 'axios'

import {
  selectApplicationRootPath,
  selectStackConfig,
  selectCSRFToken,
} from '@ttn-lw/lib/selectors/env'

const appRoot = selectApplicationRootPath()
const stackConfig = selectStackConfig()
const isBaseUrl = stackConfig.is.base_url

const csrf = selectCSRFToken()
const instance = axios.create({
  headers: { 'X-CSRF-Token': csrf },
})

export default {
  users: {
    async register(userData) {
      return axios.post(`${isBaseUrl}/users`, userData)
    },
    async resetPassword(user_id) {
      return axios.post(`${isBaseUrl}/users/${user_id}/temporary_password`)
    },
    async updatePassword(user_id, passwordData) {
      const response = await fetch(`${isBaseUrl}/users/${user_id}/password`, {
        method: 'PUT',
        body: JSON.stringify(passwordData),
        credentials: 'omit', // Do not include auth cookies with the request.
      })

      if (!response.ok) {
        const data = await response.json()
        throw { response: { data } }
      }

      return response.json()
    },
    async validate(validationData) {
      return axios.patch(`${isBaseUrl}/contact_info/validation`, validationData)
    },
  },
  oauth: {
    login(credentials) {
      return instance.post(`${appRoot}/api/auth/login`, credentials)
    },
    logout() {
      return instance.post(`${appRoot}/api/auth/logout`)
    },
    me() {
      return instance.get(`${appRoot}/api/me`)
    },
  },
}
