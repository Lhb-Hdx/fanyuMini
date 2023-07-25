export const handleExport = (tableData, title) => {
  require.ensure([], () => {
    const tHeader = tableData.exportHead
    // for (let key in tableData[0]) {
    //   tHeader.push(key)
    // }
    const filterVal = tableData.filterVal
    const { exportJsonToExcel } = require('@/vendor/Export2Excel') // 引入文件
    // const tHeader = ['编号', '应用名称', '订单编码', '会员名称'] // 将对应的属性名转换成中文
    // const filterVal = ['orderId', 'applicationName', 'code', 'memberName'] // table表格中对应的属性名
    const list = tableData.dataList
    const data = list.map(v => filterVal.map(j => v[j]))
    // const data = this.formatJson(filterVal, list)
    exportJsonToExcel(tHeader, data, title)
    // this.downloadLoading = false
  })
}
