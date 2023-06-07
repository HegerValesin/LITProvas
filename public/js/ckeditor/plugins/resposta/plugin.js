CKEDITOR.plugins.add('resposta', {
	icons : 'resposta',
	init : function(editor) {
		editor.addCommand('insertResposta', {
			exec : function(editor) {
				var html = editor.getSelectedHtml().getHtml();
				editor.insertHtml('[R]'+ html +	'[/R]');
			}
		});

		editor.ui.addButton('resposta', {
			label : 'Resposta [R]',
			command : 'insertResposta',
			toolbar : 'avaliacao'
		});
	}
});
