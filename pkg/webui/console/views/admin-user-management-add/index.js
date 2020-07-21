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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Col, Row } from 'react-grid-system'
import bind from 'autobind-decorator'
import { defineMessages } from 'react-intl'
import { push } from 'connected-react-router'

import toast from '@ttn-lw/components/toast'
import PageTitle from '@ttn-lw/components/page-title'
import { withBreadcrumb } from '@ttn-lw/components/breadcrumbs/context'
import Breadcrumb from '@ttn-lw/components/breadcrumbs/breadcrumb'

import UserDataForm from '@console/components/user-data-form'

import sharedMessages from '@ttn-lw/lib/shared-messages'
import PropTypes from '@ttn-lw/lib/prop-types'

import { createUser } from '@console/store/actions/users'
import { attachPromise } from '@console/store/actions/lib'

const m = defineMessages({
  createSuccess: 'User created',
  createFailure: 'Error creating user',
})

@connect(
  undefined,
  {
    createUser: attachPromise(createUser),
    navigateToList: () => push(`/admin/user-management`),
  },
)
@withBreadcrumb('admin.user-management.add', () => {
  return <Breadcrumb path={`/admin/user-management/add`} content={sharedMessages.add} />
})
export default class UserManagementAdd extends Component {
  static propTypes = {
    createUser: PropTypes.func.isRequired,
    navigateToList: PropTypes.func.isRequired,
  }

  @bind
  async onSubmit(values) {
    const { createUser } = this.props

    return createUser(values)
  }

  @bind
  onSubmitSuccess(response) {
    const { navigateToList } = this.props

    toast({
      title: response.ids.user_id,
      message: m.createSuccess,
      type: toast.types.SUCCESS,
    })

    navigateToList()
  }

  @bind
  onSubmitFailure(response) {
    toast({
      title: m.createFailure,
      message: response.message,
      type: toast.types.ERROR,
    })
  }

  render() {
    return (
      <Container>
        <PageTitle title={sharedMessages.userAdd} />
        <Row>
          <Col lg={8} md={12}>
            <UserDataForm
              create
              error={null}
              onSubmit={this.onSubmit}
              onSubmitSuccess={this.onSubmitSuccess}
              onSubmitFailure={this.onSubmitFailure}
              initialValues={{
                ids: { user_id: '' },
                name: '',
                description: '',
              }}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}
