CKEDITOR.plugins.add('score', {
	icons : 'score',
	init : function(editor) {
		editor.addCommand('insertScore', {
			exec : function(editor) {
				var html = editor.getSelectedHtml().getHtml();
				editor.insertHtml('[S]'+ html +	'[/S]');
			}
		});

		editor.ui.addButton('score', {
			label : 'Score [S]',
			command : 'insertScore',
			toolbar : 'avaliacao'
		});
	}
});
