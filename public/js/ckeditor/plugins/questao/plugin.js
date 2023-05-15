CKEDITOR.plugins.add('questao', {
	icons : 'questao',
	init : function(editor) {
		editor.addCommand('insertQuestao', {
			exec : function(editor) {
				var html = editor.getSelectedHtml().getHtml();
				editor.insertHtml('[Q]'+ html +	'[/Q]');
			}
		});

		editor.ui.addButton('questao', {
			label : 'Questão [Q]',
			command : 'insertQuestao',
			toolbar : 'avaliacao'
		});
	}
});