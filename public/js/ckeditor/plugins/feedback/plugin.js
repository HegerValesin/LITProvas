CKEDITOR.plugins.add('feedback', {
	icons : 'feedback',
	init : function(editor) {
		editor.addCommand('insertFeedback', {
			exec : function(editor) {
				var html = editor.getSelectedHtml().getHtml()
				editor.insertHtml('[F]'+ html +	'[/F]')
			}
		});

		editor.ui.addButton('feedback', {
			label : 'Feedback [F]',
			command : 'insertFeedback',
			toolbar : 'avaliacao'
		});
	}
});
