<template>
  <Card dis-hover style="width:100%;height: 99%">
    <Row>
      <Tree :data="data3" :load-data="loadData" show-checkbox></Tree>
    </Row>
  </Card>
</template>

<script>

export default {
  data () {
    return {
      data3: [
        {
          title: '普通权限',
          loading: false,
          children: []
        },
        {
          title: '高级权限',
          loading: false,
          children: []
        }
      ]
    }
  },
  methods: {
    loadData (item, callback) {
      setTimeout(() => {
        // 进行权限的查询
        const data = [
          {
            title: 'children',
            loading: false,
            children: []
          },
          {
            title: 'children',
            loading: false,
            children: []
          }
        ]
        callback(data)
      }, 1000)
    }
  }
}
</script>

<style scoped>
  .expand-row {
    margin-bottom: 16px;
  }
</style>
