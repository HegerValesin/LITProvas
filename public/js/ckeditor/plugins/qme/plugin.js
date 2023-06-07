CKEDITOR.plugins.add('qme', {
	icons : 'qme',
	init : function(editor) {
		editor.addCommand('insertQme', {
			exec : function(editor) {
				var html = editor.getSelectedHtml().getHtml();
				editor.insertText('[QME]');
			}
		});

		editor.ui.addButton('qme', {
			label : 'Múltipla Escolha [QME]',
			command : 'insertQme',
			toolbar : 'avaliacao'
		});
	}
});
