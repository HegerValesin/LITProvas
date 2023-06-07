CKEDITOR.plugins.add('qde', {
	icons : 'qde',
	init : function(editor) {
		editor.addCommand('insertQde', {
			exec : function(editor) {
				var html = editor.getSelectedHtml().getHtml();
				editor.insertText('[QDE]');
			}
		});

		editor.ui.addButton('qde', {
			label : 'Descrição [QDE]',
			command : 'insertQde',
			toolbar : 'avaliacao'
		});
	}
});
