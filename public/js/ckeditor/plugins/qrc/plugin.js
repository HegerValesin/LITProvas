CKEDITOR.plugins.add('qrc', {
	icons : 'qrc',
	init : function(editor) {
		editor.addCommand('insertQrc', {
			exec : function(editor) {
				var html = editor.getSelectedHtml().getHtml();
				editor.insertText('[QRC]');
			}
		});

		editor.ui.addButton('qrc', {
			label : 'Resposta Curta [QRC]',
			command : 'insertQrc',
			toolbar : 'avaliacao'
		});
	}
});
