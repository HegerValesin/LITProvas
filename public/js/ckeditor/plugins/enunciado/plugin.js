CKEDITOR.plugins.add('enunciado', {
	icons : 'enunciado',
	init : function(editor) {
		editor.addCommand('insertEnunciado', {
			exec : function(editor) {
				var html = editor.getSelectedHtml().getHtml()
				editor.insertHtml('[E]' + html + '[/E]')
			}
		});

		editor.ui.addButton('enunciado', {
			label : 'Enunciado [E]',
			command : 'insertEnunciado',
			toolbar : 'avaliacao'
		});
	}
});