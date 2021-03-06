layui.config({
  base: '../src/js/lib/' //假设这是test.js所在的目录
}).extend({ //设定组件别名
  datatable: 'datatable' //如果test.js是在根目录，也可以不用设定别名
});
layui.use(['layer', 'jquery', 'datatable'], function() {
  var $ = layui.jquery,
    layer = layui.layer,
    datatable = layui.datatable;
  /*全选*/
  $("table thead th input:checkbox").on("click", function() {
    $(this).closest("table").find("tr > td:first-child input:checkbox").prop("checked", $("table thead th input:checkbox").prop("checked"));
  });
  $(function() {
    $('.table-sort').dataTable({
      "searching": false, //是否允许Datatables开启本地搜索
      "paging": false, //是否开启本地分页
      "lengthChange": false, //是否允许用户改变表格每页显示的记录数
      "info": false, //控制是否显示表格左下角的信息
      "columnDefs": [{
        "targets": 'nosort', //列的样式名
        "orderable": false //包含上样式名‘nosort’的禁止排序
      }],
      //跟数组下标一样，第一列从0开始，这里表格初始化时，第四列默认降序
      "order": [1, 'desc'], //asc升序   desc降序 
      "aoColumnDefs": [{
          "sProcessing": "正在加载中......",
          "sEmptyTable": "无数据",
          "orderable": false,
          "aTargets": [0, 9]
        } // 指定列不参与排序
      ]
    });
    $('.table-sort tbody').on('click', 'tr', function() {
      if($(this).hasClass('selected')) {
        $(this).removeClass('selected');
      } else {
        $('tr.selected').removeClass('selected');
        $(this).addClass('selected');
      }
    });
  });
  //注册弹出方法
  function layer_show(title, url, id, w, h) {
    if(title == null || title == '') {
      title = false;
    };
    if(url == null || url == '') {
      url = "404.html";
    };
    if(w == null || w == '') {
      w = 800;
    };
    if(h == null || h == '') {
      h = ($(window).height() - 50);
    };
    layer.open({
      type: 2,
      area: [w + 'px', h + 'px'],
      fix: false,
      maxmin: false,
      shade: 0.4,
      title: title,
      content: url
    });
  }
  /*关闭弹出框口*/
  function layer_close() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
  }
  //用户--查看
  $('.btn-showuser').on('click', function() {
    var username = $(this).html();
    var href = 'user/user-show.html';
    var id = $(this).parents('tr').attr('data-userid');
    console.log(id);
    layer_show(username, href, id, '360', '400');
  });
  /*用户-添加*/
  $('#btn-adduser').on('click', function() {
    var username = $(this).html();
    var href = 'user/user-add.html';
    layer_show(username, href, '', '360', '400');
  });
  /*用户-停用*/
  $('.handle-btn-stop').on('click', function() {
    var obj = $(this);
    var id = $(this).parents('tr').attr('data-userid');
    console.log(id);
    layer.confirm('确认要停用吗？', function(index) {
      $(obj).parents("tr").find(".td-handle").prepend('<span class="handle-btn" onClick="member_start(this,id)" title="启用"><i class="mobilefont icon-qiyong"></i></span>');
      $(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius">已停用</span>');
      $(obj).remove();
      layer.msg('已停用!', {
        icon: 5,
        time: 1000
      });
    });
  });
  /*用户-启用*/
  $('.handle-btn-stop').on('click', function() {
    var obj = $(this);
    var id = $(this).parents('tr').attr('data-userid');
    console.log(id);
    layer.confirm('确认要启用吗？', function(index) {
      $(obj).parents("tr").find(".td-handle").prepend('<span class="handle-btn" onClick="member_stop(this,id)" title="停用"><i class="mobilefont icon-zanting"></i></span>');
      $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已启用</span>');
      $(obj).remove();
      layer.msg('已启用!', {
        icon: 6,
        time: 1000
      });
    });
  });
  /*用户-编辑*/
  function member_edit(title, url, id, w, h) {
    layer_show(title, url, w, h);
  }
  /*密码-修改*/
  function change_password(title, url, id, w, h) {
    layer_show(title, url, w, h);
  }
  /*用户-删除*/
  function member_del(obj, id) {
    layer.confirm('确认要删除吗？', function(index) {
      $(obj).parents("tr").remove();
      layer.msg('已删除!', {
        icon: 1,
        time: 1000
      });
    });
  }
});