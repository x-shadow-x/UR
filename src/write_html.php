<?php

$pages = array('new_arrival','goods_list', 'sales', 'phone_login', 'phone_register','phone_forget_pwd');

// $pages = array('brand','brand_introduce', 'ur_videos', 'ur_magazines', 'store_index','event_details','index_en', 'customer_service', 'event_index', 'series_index', 'new_arrival','goods_list', 'sales', 'phone_login', 'phone_register','phone_forget_pwd');




write_page($pages);

function write_page($pages){
	$location_url = getLocationUrl();
	$file_dir = 'page';
	if(!is_dir($file_dir))
	{
		@mkdir ($file_dir);
	}
	
	foreach($pages as  $page){
	
		$StrConents = file_get_contents($location_url."".$page.".html");
		$TxtFileName = "page/".$page.".html";
		$TxtRes=fopen ($TxtFileName,"w+");
		//以读写方式打写指定文件，如果文件不存则创建
		if( $TxtRes === FALSE){
			echo("创建可写文件：".$TxtFileName."失败<br/>");
			return;
		}
		if(!fwrite ($TxtRes,$StrConents)){ //将信息写入文件
			echo ($TxtFileName."写入失败！<br/>");
			fclose($TxtRes);
			return;
		}
		echo ($TxtFileName."写入成功！<br/>");
		fclose ($TxtRes); //关闭指针
	}
}
//获取网站域名
function getLocationUrl($brand_id=0,$is_img = false){
    global $db,$ecs;
	$location = "";
	if ($_SERVER['HTTPS'] == "on") {
		$location .="https://";
	 }else{
		$location .="http://";
	}
	if($is_img && IMA_SERVER_START){
		$location = IMG_SERVER_CDN_URL;
	}else{
		if($brand_id > 0 ){
			$brand_url = $db->getOne(" select brand_url from ".$ecs->table("brand")." where brand_id=".$brand_id);
			if($brand_url){
				$location .= $brand_url."/";
			}
		}else{
			$location .=$_SERVER['HTTP_HOST']."/";
		}
	}
	return $location;
}

?>