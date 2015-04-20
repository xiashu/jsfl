var ImageURL;


/*打开图片文件夹*/
function browImageFile()
{
	fl.outputPanel.clear();   
	ImageURL= fl.browseForFolderURL("请选择素材文件夹"); 
	if(ImageURL)
    importFolder(ImageURL);  
	fl.trace(ImageURL);
}

/*导入文件夹*/
function importFolder(folderURI) 
{
	var dom = fl.getDocumentDOM();
    var lib = fl.getDocumentDOM().library;
    fl.trace(folderURI);        
    var folderContents;
    var fitem;
        
    var libPath = folderURI.replace(ImageURL, "");
		
    var subLibPath = libPath.substr(1);        //去掉第一个“/”
       
    //文件
    folderContents = FLfile.listFolder(folderURI, "files");
		
        for (var i in folderContents) 
		{
                fitem = folderContents[i];
                var inx = fitem.lastIndexOf(".");
                if (inx > 0)
				{
                        var ext = fitem.substr(inx+1).toLowerCase();  //扩展名
                        if (ext == "jpg" ||ext == "png" || ext == "gif")
						{
                                fl.trace("导入文件：" + fitem);
                                dom.importFile(folderURI + "/" + fitem, true);                               
                                if (libPath != "")
								{
                                        lib.selectItem(fitem);
                                        lib.moveToFolder(subLibPath);
                                }
                        }
                }
        }
    
alert("文件夹导入完成！"); 	
}


/*将图片转换为MC*/
function converToMovieClip()
{	

  var doc=fl.getDocumentDOM(); 
  var lib = fl.getDocumentDOM().library; //library 对象   
  var libLength = lib.items.length;     //库项目长度 
  var itemArr = [];   
  if(libLength==0) return; 

 for(var i=0; i < libLength; i++)
 {   
   //将位图放入数组   
    if(lib.items[i].itemType=="bitmap" && lib.items[i].linkageExportForAS==false)   
    {
	   itemArr.push(lib.items[i]); 
	   fl.trace("没有进行勾选的库元件:"+lib.items[i].name);
    }
 }  

for (var i = 0; i < itemArr.length; i++)
{     
  
  // fl.trace("是否进行了库连接"+itemArr[i].linkageExportForAS);  
   if(itemArr[i].linkageExportForAS==false)
   {	   
	  var itemName = itemArr[i].name;   
      var expName = itemName.split(".")[0]; //不带后缀名   
      lib.selectItem(itemName); //选中位图   
      lib.addItemToDocument({x:0,y:0});   
      doc.selectAll();   
	  doc.convertToSymbol("movie clip",expName,"top left") ; //将位图转化为mc元件   
     
	 if(lib.getItemProperty('linkageImportForRS') == true)
     {   
         lib.setItemProperty('linkageImportForRS', false);   
     }
	 lib.setItemProperty('linkageExportForAS', true);   
     lib.setItemProperty('linkageExportForRS', false);   
     lib.setItemProperty('linkageExportInFirstFrame', true);   
     lib.setItemProperty('linkageClassName', expName);   
     lib.setItemProperty('scalingGrid',  false); 
	 doc.selectAll(); //清空舞台   
     doc.deleteSelection();
   }
   
    lib.updateItem(); 
    lib.selectNone(); 
	
}  
  doc.save(); 
  alert("图片转换MC操作结束！"); 

}



//取消图片库链接
function canelAsImgLink()
{
  var doc=fl.getDocumentDOM(); //获取文档   
  var lib=doc.library; //获取库   
  fl.outputPanel.clear();//清除面板输出      
  if (doc == null) {alert("不能使用jsfl. 发生错误");}  
  if(lib.items.length==0)return;
  
 for(i=0; i<lib.items.length; i++)  
 {   
   if(lib.items[i].itemType=="bitmap")  
   {   //判断库里面资源是不是位图类型                  
   if(lib.items[i].linkageExportForAS)   
   {  
    lib.items[i].linkageClassName="";  
    lib.items[i].linkageExportForAS=false;//取消为as导出   
   }    
   }  
 }   
 lib.selectAll(); //选择全部   
 lib.updateItem();   
 lib.selectNone();   
 doc.save(); //保存   
 alert("取消图片库链接操作结束");  	
}


//给所有图片添加as链接
function addAllImagAsLink()
{
 	
   var doc=fl.getDocumentDOM(); 
   var lib=doc.library; 
   if(lib.items.length==0)return;
   
for(i=0; i<lib.items.length; i++)
{ 
  if(lib.items[i].itemType=="bitmap")
  {
    var item = lib.items[i]; 
	var className ;
    item.linkageExportForAS = true; 
	if(item.name.lastIndexOf(".")!=-1)
	{
       className = item.name.substr(0, item.name.lastIndexOf("."));
	  if(className.lastIndexOf("/")!=-1)
	  {
		 className=className.substr(className.lastIndexOf("/")+1,item.name.lastIndexOf("."));
		 fl.trace(className);
	  }
	}else
	{
		 className = item.name.substr(0);
	   if(className.lastIndexOf("/")!=-1)
	   {
		  className=className.substr(className.lastIndexOf("/")+1);
		  fl.trace(className);
	   }
		
	}
	
	
	item.linkageClassName =className; 
    item.linkageExportInFirstFrame = true;
	item.linkageURL=className;
	item.linkageBaseClass = "flash.display.BitmapData";
	
  }
} 
lib.selectAll(); 
lib.updateItem(); 
lib.selectNone(); 
doc.save(); 
alert("给所有图片添加as链接操作结束"); 

}

//导入图片转换mc并添加as链接
function importImageToMc()
{
  browImageFile();
  converToMovieClip();	
}


//导入一张图片并添加as链接
function importImageAndLink()
{
  fl.outputPanel.clear();     
  var doc=fl.getDocumentDOM();
  var lib = fl.getDocumentDOM().library;
  
  var imagePath= fl.browseForFileURL("select","导入一张图片");
  if(imagePath)
  {
	doc.importFile(imagePath,true);
  }
  else return;
 
  var index=imagePath.lastIndexOf("/");
  var end=imagePath.lastIndexOf(".");
  var newName=imagePath.substring(index+1,end);
  var itemName=imagePath.substr(index+1);
 
  
  itemName=decodeURI(itemName);
   fl.trace(newName);
   newName=decodeURI(newName);
  lib.selectItem(itemName); //选中位图   
  if(lib.getItemProperty('linkageImportForRS') == true)
    {   
         lib.setItemProperty('linkageImportForRS', false);   
    }
	 lib.setItemProperty('linkageExportForAS', true);   
     lib.setItemProperty('linkageExportForRS', false);   
     lib.setItemProperty('linkageExportInFirstFrame', true);   
     lib.setItemProperty('linkageClassName', newName);   
     lib.setItemProperty('scalingGrid',  false); 
	 
	 lib.selectNone();
	 alert("导入图片并添加链接");
}


//导入一张图片并添加as链接
function addImageToMcAndLink()
{
	
  fl.outputPanel.clear();     
  var doc=fl.getDocumentDOM();
  var lib = fl.getDocumentDOM().library;
  
  var imagePath= fl.browseForFileURL("select","导入一张图片");
  if(imagePath)
  doc.importFile(imagePath,true);
  else return;
  
  var index=imagePath.lastIndexOf("/");
  var end=imagePath.lastIndexOf(".");
  var newName=imagePath.substring(index+1,end);
  var itemName=imagePath.substr(index+1);
 
 
  var iselect= lib.selectItem(itemName); //选中位图 
  if(!iselect) return;
 
  lib.addItemToDocument({x:0,y:0});
  doc.selectAll();  
   
 
   fl.getDocumentDOM().convertToSymbol("movie clip",newName,"top left") ; //将位图转化为mc元件   
     
   if(lib.getItemProperty('linkageImportForRS') == true)
   {   
     lib.setItemProperty('linkageImportForRS', false);   
   }
	 lib.setItemProperty('linkageExportForAS', true);   
     lib.setItemProperty('linkageExportForRS', false);   
     lib.setItemProperty('linkageExportInFirstFrame', true);   
     lib.setItemProperty('linkageClassName', newName);   
     lib.setItemProperty('scalingGrid',  false); 
	 
	 lib.selectNone();
	 doc.selectAll(); //清空舞台   
     doc.deleteSelection();
	 alert("图片转换MovieClip完成");
}


//导入一张图片 
function importOneImage()
{
  var imagePath= fl.browseForFileURL("select","导入一张图片");
  if(imagePath)
  fl.getDocumentDOM().importFile(imagePath,true); 
}




/*删除所有*/
function delectLib()
{
	var lib = fl.getDocumentDOM().library;
	lib.selectAll();
	var selItems = lib.getSelectedItems();
	if(!selItems) return ;
	for(var i=0;i<selItems.length;i++ )
	{
		lib.deleteItem(selItems[i].name);
	}
	 alert("删除库所有元件操作结束！"); 
}

/*删除所有影片剪辑MovieClip*/
function delectAllMoviClip()
{
	var lib = fl.getDocumentDOM().library;
	lib.selectAll();
	var selItems = lib.getSelectedItems();
	if(!selItems) return ;
	for(var i=0;i<selItems.length;i++ )
	{
		if(selItems[i].itemType=="movie clip")
		lib.deleteItem(selItems[i].name);
	}
	lib.selectNone();
	 alert("删除MovieClip操作结束！"); 
}

/*删除所有位图*/
function delectAllBitmap()
{
	var lib = fl.getDocumentDOM().library;
	lib.selectAll();
	var selItems = lib.getSelectedItems();
	if(!selItems) return ;
	for(var i=0;i<selItems.length;i++ )
	{
		if(selItems[i].itemType=="bitmap")
		lib.deleteItem(selItems[i].name);
	}
	lib.selectNone();
	alert("删除库所有位图操作结束！"); 
}

/* 保存swf*/
function saveSwf()
{
	
	var vesionName = prompt("输入导出swf的版本号【8,9,10】", "9");
	if(vesionName)
	{
		if(vesionName=="8" || vesionName=="9" ||vesionName=="10")
		{
			fl.getDocumentDOM().setPlayerVersion(vesionName);
			fl.getDocumentDOM().exportSWF("",true);
		}
		else
		{
			alert("请正确输入版本号,如8,9,10 数字");
		}		
	}	
}


/* 查询WindowSWFswf*/
function  printWindowSWFPath()
{
	
 var configDir = fl.configDirectory;  
 fl.trace(fl.configDirectory); 
 alert(fl.configDirectory);
	
}

 /* 批量导出swc文件*/
function browMyFile()
{
	fl.outputPanel.clear();   
	var fileURL= fl.browseForFolderURL("请选择导入文件夹"); 	
	if(fileURL)
    exportSwc(fileURL);  
}

function exportSwc( folderPath )  
{  
	var sources = FLfile.listFolder( folderPath);		
	var i = 0;
	var len = sources.length;
	
	for ( i=0; i<len; i++ )
	{
		var props = sources[i].split( "." );
		var extendsName = props[1].toLowerCase();		
		 if ( extendsName == "fla" )
         {
		    var doc = fl.openDocument( folderPath + "/" + sources[i] );
			var profileXML = fl.getDocumentDOM().exportPublishProfileString('Default');
	        profileXML = profileXML.replace("<swc>0</swc>", "<swc>1</swc>");
		    profileXML = profileXML.replace("<html>1</html>", "<html>0</html>");
			profileXML = profileXML.replace("<flash>1</flash>", "<flash>0</flash>");
            fl.getDocumentDOM().importPublishProfileString(profileXML);
			doc.save();
			doc.publish();
			doc.close();
		 }
	}
 }

/*整合网上九宫的分组的方法*/
function scale9()
{

var curItem;
var rect = {l:0, r:0, t:0, b:0}; 
var items = fl.getDocumentDOM().library.getSelectedItems();
for(var i=0; i<items.length; i++)
{
	curItem = items[0];
	if(curItem.scalingGrid)
         {
		rect.l = curItem.scalingGridRect.left;
		rect.r = curItem.scalingGridRect.right;
		rect.t = curItem.scalingGridRect.top;
		rect.b = curItem.scalingGridRect.bottom;
		
		 
		var doc = fl.getDocumentDOM();
		var imgItem = doc.selection[0];
		if(imgItem.instanceType == "bitmap")
               {
			doc.breakApart();
			
			//左上角打组
			doc.setSelectionRect({left:-500, right:rect.l, top:-500, bottom:rect.t}, true, false);
			doc.group();
			//右上角打组
			doc.setSelectionRect({left:rect.r, right:1000, top:-500, bottom:rect.t}, true, false);
			doc.group();
			//右下角打组
			doc.setSelectionRect({left:rect.r, right:1000, top:rect.b, bottom:1000}, true, false);
			doc.group();
			//左下角打组
			doc.setSelectionRect({left:-500, right:rect.l, top:rect.b, bottom:1000}, true, false);
			doc.group();
			//中间部分打组
			doc.setSelectionRect({left:rect.l, right:rect.r, top:rect.t, bottom:rect.b}, true, false);
			doc.group();
			//左边部分打组
			doc.setSelectionRect({left:-500, right:rect.l, top:rect.t, bottom:rect.b}, true, false);
			doc.group();
			//右边部分打组
			doc.setSelectionRect({left:rect.r, right:1000, top:rect.t, bottom:rect.b}, true, false);
			doc.group();
			//上边部分打组
			doc.setSelectionRect({left:rect.l, right:rect.r, top:-500, bottom:rect.t}, true, false);
			doc.group();
			//下边部分打组
			doc.setSelectionRect({left:rect.l, right:rect.r, top:rect.b, bottom:1000}, true, false);
			doc.group();
                        alert("九宫分组成功了");


		}else{
			alert('please select a bitmap.');
			 
		}
	}
}



}



