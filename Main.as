package
{
	import flash.display.Sprite;
	import flash.events.*;
	import fl.controls.List;
	import fl.data.DataProvider;
	import flash.net.*;
	import flash.text.TextFormat;
	import adobe.utils.MMExecute;
	import fl.managers.StyleManager;
	import fl.events.*;


	public class Main extends Sprite
	{
		private var loader:URLLoader;
		private var xml:XML;
		private var dp:DataProvider;
		private var defaultJsfl:String;

		public function Main()
		{
			loader=new URLLoader();
			loader.dataFormat=URLLoaderDataFormat.TEXT;
			loader.addEventListener(Event.COMPLETE,onLoadComplete);
		    loader.load(new URLRequest("config.xml"));
		}
		
		private function onLoadComplete(event:Event):void
		{
			xml=XML(loader.data);
			var len:int=xml.item.length();
			defaultJsfl=xml.defaultJsfl;  
			var vesion:Version=new Version(this,xml.vesion);//设置版本信息
            var myxml:*=XML(xml.root);  
			dp = new DataProvider(myxml)
		    creatListControl(dp);
		}
		
		//创建list组件
		private function creatListControl(dp:DataProvider):void
		{
			var list:List=new List();
			addChild(list);
			var format:TextFormat=new TextFormat("黑体",12,0x000000);
			StyleManager.setStyle("textFormat",format);
			list.setStyle("cellRenderer", MyCellRenderer);
			list.dataProvider=dp;
			list.addEventListener(ListEvent.ITEM_CLICK, changeHandler);
			list.width=300;
			list.height=400;
			list.rowHeight=30;			
		}
		
		private function changeHandler(event:ListEvent):void
		{
			var command:String=event.item.fun;
			var isUse:int=event.item.isuse;//是否使用了其他jsfl
			if(isUse==0)
			{
			    doAction(command,"WindowSWF/"+defaultJsfl+".jsfl");  
			}
			else if(isUse==1)
			{    var path:String="WindowSWF/"+event.item.fileName+".jsfl";    
				doAction(command,path);
				
			}
			else if(isUse==2)
			{
				var jsflPath:String="WindowSWF/"+event.item.fileName+".jsfl";
				dofileCommand(jsflPath);
			}
		}
		
		//执行命令调用jsfl
		private function doAction(command:String,path:String=""):void
		{   
		     
			MMExecute("fl.runScript( fl.configURI + '"+path+"','"+command+"');");
		}
		
		//执行整个jsfl文件
		private function dofileCommand(path:String):void
		{
			MMExecute("fl.runScript( fl.configURI + '"+path+"')");
		}
		
	}
	
	
}