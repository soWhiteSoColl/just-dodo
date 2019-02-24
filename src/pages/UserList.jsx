import React from 'react'
import { Table } from 'antd'
import { dateFormater } from '../util/tool'
import { inject, observer } from 'mobx-react'
import ConfirmDelete from '../components/ConfirmDelete'

@inject('userStore')
@observer
export default class LeavedMessageList extends React.Component {
  columns = [
    {
      key: 'username',
      dataIndex: 'username',
      title: '名字'
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: '邮箱',
      width: 300
    },
    {
      key: 'created',
      dataIndex: 'created',
      title: '注册时间',
      width: 300,
      render: created => dateFormater(created)
    },
    {
      key: 'action',
      dataIndex: '_id',
      title: '操作',
      render: id => <ConfirmDelete onConfirm={() => this.handleDelete(id)} />
    }
  ]

  componentDidMount() {
    this.fetch()
  }

  fetch = params => {
    this.props.userStore.getUsers(params)
  }

  handleDelete = id => {
    this.props.userStore.deleteUser(id)
  }

  handleTogglePage = pagination => {
    this.fetch({ page: pagination.current })
  }

  render() {
    const { userList } = this.props.userStore
    const { list, total, page, perPage } = userList

    return (
      <div className="do-container">
        <Table
          columns={this.columns}
          rowKey={item => item._id}
          dataSource={list}
          onChange={this.handleTogglePage}
          pagination={total > perPage ? { current: Number(page), pageSize: Number(perPage), total } : false}
        />
      </div>
    )
  }
}
