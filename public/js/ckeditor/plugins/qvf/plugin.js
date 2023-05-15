CKEDITOR.plugins.add('qvf', {
	icons : 'qvf',
	init : function(editor) {
		editor.addCommand('insertQvf', {
			exec : function(editor) {
				var html = editor.getSelectedHtml().getHtml();
				editor.insertText('[QVF]');
			}
		});

		editor.ui.addButton('qvf', {
			label : 'Verdadeiro/Falso [QVF]',
			command : 'insertQvf',
			toolbar : 'avaliacao'
		});
	}
});
