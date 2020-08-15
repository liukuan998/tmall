<?php
header('Content-Type:text/html;charset=utf-8');

$type = $_REQUEST['type'];
$phone = $_REQUEST['phone'];
$pass = $_REQUEST['pass'];
$name = $_REQUEST['name'];

// 1.连接数据库
$link = mysqli_connect('localhost','root','123456','kk');
if (!$link) {
    echo '{"err":0,"msg":"连接失败"}';
    die();
}
// 2.设置字符集
mysqli_set_charset($link,'utf8');
// 3.判断是登录还是注册
if ($type === 'login') {
   $login_sql = "select * from tmuser where phone='$phone' and pass='$pass'";
   $login_res = mysqli_query($link,$login_sql);
   $login_arr = mysqli_fetch_all($login_res,1);
   $res=json_encode($login_arr, JSON_UNESCAPED_UNICODE);
   
   if (count($login_arr) > 0) {
    //    echo "{\"result\":1,\"name\":\"$res\"}";
    // echo '{"result":-1,"name":"账号或密码正确"}';
    echo $res;
   } else {
        echo '{"result":1,"name":"账号或密码错误"}';
   }
}
if ($type === 'add') {
    $add_sql = "select * from tmuser where phone='$phone'";
    $add_res = mysqli_query($link,$add_sql);
    $add_arr = mysqli_fetch_all($add_res,1);
    if (count($add_arr) > 0) {
        echo '{"result":2,"msg":"手机号已被注册"}';
        die();
    }
    $insert_sql = "insert into tmuser(name,pass,phone) values('$name','$pass','$phone')";
    mysqli_query($link,$insert_sql);
    $num = mysqli_affected_rows($link);//返回受影响条数
    if ($num > 0) {
        echo "{\"name\":\"$name\",\"phone\":\"$phone\",\"pass\":\"$pass\"}";
    } else {
        echo '{"result":4,"msg":"注册失败"}';
    }
}
if ($type === 'select') {
    $add_sql = "select * from tmuser where phone='$phone'";
    $add_res = mysqli_query($link,$add_sql);
    $add_arr = mysqli_fetch_all($add_res,1);
    if (count($add_arr) <= 0) {
        echo '{"result":2,"msg":"手机号未注册"}';
        die();
    }
    $res=json_encode($add_arr, JSON_UNESCAPED_UNICODE);
    echo $res;
}
// 关闭连接
mysqli_close($link);

?>