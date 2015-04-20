package 
{
	import fl.controls.listClasses.CellRenderer;
	import fl.controls.listClasses.ICellRenderer;
	import fl.controls.listClasses.ListData;
	import flash.display.Shape;
	public class MyCellRenderer extends CellRenderer implements ICellRenderer
	{
		private var m:Shape = new Shape();
		public function MyCellRenderer()
		{
			addChildAt(m,0);
		}
		override public function set listData(value:ListData):void
		{
			super.listData = value;
			m.graphics.beginFill(0xeeeeee,value.index%2);
			m.graphics.drawRect(1,1,width-2,height-2);
			m.graphics.endFill();
		}
	}
}