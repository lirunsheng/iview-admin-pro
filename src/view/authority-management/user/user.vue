<template>
  <div>
    <Card dis-hover style="width:100%;height: 99%">
      <Row class-name="searchBar">
        <Col span="4">
          <Input v-model="searchUserName" placeholder="用户名" style="width: 98%"/>
        </Col>

        <Col span="5">
          <span class="operateTable">
            <Button type="primary" @click="searchUser">查询</Button>
          </span>
          <Button type="info" @click="showAddUserModal">新增</Button>
        </Col>

      </Row>
      <Table border :columns="columns" :data="data"></Table>

      <div>
        <Page @on-change="changePageNumber"
              @on-page-size-change="changePageSize"
              :current="pageNum"
              :total="total" :page-size="pageSize"
              show-sizer

              :styles="{'textAlign': 'center','padding':'10px'}"/>
      </div>

    </Card>

    <!-- 编辑数据模态框 -->
    <Modal
      v-model="isShowEdit"
      title="编辑用户"
      :loading="isLoading"
      @on-ok="editUser">
      <p>
        <Row class-name="searchBar">
          <Col span="3">ID:</Col>
          <Col span="7">{{editUserObj.id}}</Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">手机号:</Col>
          <Col span="7"><Input clearable v-model="editUserObj.phone" placeholder="手机号" style="width: 200px"/></Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">邮箱:</Col>
          <Col span="7"><Input clearable v-model="editUserObj.email" placeholder="邮箱" style="width: 200px"/></Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">姓名:</Col>
          <Col span="7"><Input clearable v-model="editUserObj.fullName" placeholder="姓名" style="width: 200px"/></Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">是否禁用:</Col>
          <Col span="7">
            <i-switch v-model="editUserObj.status" true-color="#13ce66" false-color="#ff4949"/>
          </Col>
        </Row>
      </p>
    </Modal>

    <!-- 查看数据模态框 -->
    <Modal
      v-model="isLookUser"
      title="编辑用户"
      :loading="isLoading"
      @on-ok="editUser">
      <p>
        <Row class-name="searchBar">
          <Col span="3">ID:</Col>
          <Col span="7">{{editUserObj.id}}</Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3">手机号:</Col>
          <Col span="7">{{editUserObj.phone}}</Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3">邮箱:</Col>
          <Col span="7">{{editUserObj.email}}</Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3">姓名:</Col>
          <Col span="7">{{editUserObj.fullName}}</Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3">登录地址:</Col>
          <Col span="7">{{editUserObj.remoteIp}}</Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3">是否禁用:</Col>
          <Col span="7">
            <i-switch disabled v-model="editUserObj.status" true-color="#13ce66" false-color="#ff4949"/>
          </Col>
        </Row>
      </p>
    </Modal>

    <!-- 新增数据模态框 -->
    <Modal
      v-model="isShowAdd"
      title="新增用户"
      :loading="isLoading"
      @on-ok="addUser">
      <p>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">用户名:</Col>
          <Col span="7"><Input clearable v-model="editUserObj.username" placeholder="用户名" style="width: 200px"/></Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">密码:</Col>
          <Col span="7"><Input clearable v-model="editUserObj.password" placeholder="用户名" style="width: 200px"/></Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">手机号:</Col>
          <Col span="7"><Input clearable v-model="editUserObj.phone" placeholder="手机号" style="width: 200px"/></Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">邮箱:</Col>
          <Col span="7"><Input clearable v-model="editUserObj.email" placeholder="邮箱" style="width: 200px"/></Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">姓名:</Col>
          <Col span="7"><Input clearable v-model="editUserObj.fullName" placeholder="姓名" style="width: 200px"/></Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">启用状态:</Col>
          <Col span="7">
            <i-switch v-model="editUserObj.status" true-color="#13ce66" false-color="#ff4949"/>
          </Col>
        </Row>
      </p>
    </Modal>
  </div>

</template>

<script>
import {getUserList, updateUser, queryUser, insertUser, delUser} from '@/api/user'

export default {
  name: 'user-manager',
  data () {
    return {
      pageNum: 1, // 当前页数 默认第一页
      pageSize: 10, // 当前页显示的条数
      total: 0, // 总条数
      searchUserName: '', // username
      isShowEdit: false, // 是否显示编辑用户对话框
      isShowAdd: false, // 是否显示新增用户对话框
      isLookUser: false, // 是否显示新增用户对话框
      isLoading: true, // 是否显示加载

      editUserObj: {
        'id': '',
        'phone': '',
        'email': '',
        'fullName': '',
        'status': false
      },
      columns: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '手机号',
          key: 'phone'
        },

        {
          title: '姓名',
          key: 'fullName'
        },
        {
          title: '是否禁用',
          key: 'status',
          render: (h, params) => {
            return h('div', [
              h('i-switch', {
                props: {
                  value: params.row.status
                },
                on: {
                  'on-change': (e) => {
                    params.row.status = e
                  }
                }
              })

            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.lookUser(params.row)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteUser(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data: []
    }
  },
  methods: {
    // 页面切换
    changePageNumber (currentPage) {
      this.pageNum = currentPage
      this.queryUserData()
    },

    // 更改页面显示的条数
    changePageSize (newPageSize) {
      if (this.total < 10) {
        this.pageSize = 10
      } else {
        this.pageSize = newPageSize
        this.queryUserData()
      }
    },

    init () {
      this.editUserObj = {
        'id': '',
        'phone': '',
        'email': '',
        'fullName': ''
      }
    },
    // 校验新增数据
    checkAddUserData () {
      if (this.editUserObj.username == '') {
        this.$Message.error('用户名不能为空')
        return false
      }

      if (this.editUserObj.phone == '') {
        this.$Message.error('手机号不能为空')
        return false
      }

      if (this.editUserObj.email == '') {
        this.$Message.error('邮箱地址不能为空')
        return false
      }

      if (this.editUserObj.姓名 == '') {
        this.$Message.error('姓名不能为空')
        return false
      }
    },

    // 请求用户数据
    getUsers () {
      // 数据列表请求
      getUserList().then(({data}) => {
        if (data.code == 200) {
          this.pageNum = data.data.current
          this.total = data.data.total
          this.pageSize = data.data.size
          this.data = data.data.records
        }
      })
    },

    // 查看用户详细数据
    lookUser (user) {
      this.editUserObj = user
      this.isLookUser = true
    },

    // 搜索用户
    searchUser () {
      if (this.searchUserName == '') {
        this.$Message.error('用户名不能为空')
        return false
      }
      this.queryUserData()
      return true
    },

    queryUserData () {
      queryUser(this.pageNum, this.pageSize, this.searchUserName)
        .then(({data}) => {
          if (data.code == 200) {
            if (data.data.records.length > 0) {
              this.pageNum = data.data.current
              this.total = data.data.total
              this.pageSize = data.data.size
              this.data = data.data.records
              this.$Message.success('数据查询成功')
            } else {
              this.$Message.error('数据查询失败')
            }
          } else {
            this.$Message.error('数据查询失败')
          }
        })
        .catch((err) => {
          this.$Message.error('数据查询失败')
        })
    },

    // 新增用户
    addUser () {
      insertUser(this.editUserObj)
        .then(({data}) => {
          if (data.code == 200) {
            this.$Message.success('数据插入成功')
          } else {
            this.$Message.error('数据插入失败')
          }
          this.isShowAdd = false
          this.isLoading = false
          this.getUsers()
        })
        .catch((err) => {
          this.$Message.error('数据插入失败')
          this.isShowAdd = false
          this.isLoading = false
          this.getUsers()
        })
    },

    // 显示添加用户模态
    showAddUserModal () {
      this.isShowAdd = true
      this.init()
    },

    show (row) {
      this.isShowEdit = true
      this.editUserObj = JSON.parse(JSON.stringify(row))
    },
    // 删除一条用户数据
    remove (index) {
      this.data6.splice(index, 1)
    },
    editUser () {
      updateUser(this.editUserObj)
        .then(({data}) => {
          if (data.code == 200) {
            this.$Message.success('更新成功')
          } else {
            this.$Message.error('更新失败')
          }
          this.isLoading = false
          this.isShowEdit = false
          this.getUsers()
        })
        .catch((err) => {
          this.$Message.error('更新失败')
          this.isLoading = false
          this.isShowEdit = false
          this.getUsers()
        })
    },
    deleteUser (id) {
      delUser(id)
        .then(({data}) => {
          if (data.code == 200) {
            this.$Message.success('删除成功')
          } else {
            this.$Message.error('删除失败')
          }
          this.isLoading = false
          this.isShowEdit = false
          this.getUsers()
        })
        .catch((err) => {
          this.$Message.error('删除失败')
          this.isLoading = false
          this.isShowEdit = false
          this.getUsers()
        })
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>

<style scoped>
  .searchBar {
    padding: 10px 0 10px 0;
  }

  .operateTable {
    padding: 10px 10px 10px 0;
  }
</style>
