CKEDITOR.plugins.add('nome', {
	icons : 'nome',
	init : function(editor) {
		editor.addCommand('insertNome', {
			exec : function(editor) {
				var html = editor.getSelectedHtml().getHtml();
				editor.insertHtml('[N]'+ html +	'[/N]');
			}
		});

		editor.ui.addButton('nome', {
			label : 'Nome da questão [N]',
			command : 'insertNome',
			toolbar : 'avaliacao'
		});
	}
});
