CKEDITOR.plugins.add('percentual', {
	icons : 'percentual',
	init : function(editor) {
		editor.addCommand('insertPercentual', {
			exec : function(editor) {
				var html = editor.getSelectedHtml().getHtml();
				editor.insertHtml('[P]'+ html +	'[/P]');
			}
		});

		editor.ui.addButton('percentual', {
			label : 'Percentual  Resposta [P]',
			command : 'insertPercentual',
			toolbar : 'avaliacao'
		});
	}
});
