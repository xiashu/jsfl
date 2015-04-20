package
{
	
	import flash.display.InteractiveObject;
	import flash.ui.ContextMenu;
	import flash.ui.ContextMenuItem;

	public class Version
	{
		public function Version(target:InteractiveObject,vesionInfo:String)
		{
			var menu:ContextMenu = new ContextMenu();
			menu.hideBuiltInItems();
			try
			{
				var str:String =vesionInfo;               				                                var m:ContextMenuItem = new ContextMenuItem(str);	
				menu.customItems.push(m);
			}
			catch(error:Error)
			{
				throw new Error( error.message );
			}
			target.contextMenu = menu;
		}
	}
}