CKEDITOR.plugins.add('qdi', {
	icons : 'qdi',
	init : function(editor) {
		editor.addCommand('insertQdi', {
			exec : function(editor) {
				var html = editor.getSelectedHtml().getHtml();
				editor.insertText('[QDI]');
			}
		});

		editor.ui.addButton('qdi', {
			label : 'Dissertação [QDI]',
			command : 'insertQdi',
			toolbar : 'avaliacao'
		});
	}
});
