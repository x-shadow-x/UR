<?php


define('IN_ECS', true);



require('./sainit.php');
require('./set_title.php');
$tpl=isset($_GET['tpl'])?$_GET['tpl']:'index';
$site_title = $header_title[$tpl];
$smarty->assign('site_title',$site_title);
$smarty->display($tpl.'.html');
?>