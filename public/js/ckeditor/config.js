/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

	
	config.image2_maxSize = {
			height: 250,
			width: 400
	};

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';
    config.filebrowserUploadMethod = 'form';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
	config.forcePasteAsPlainText = false;
	config.entities_processNumerical = true;
	//config.filebrowserBrowseUrl = 'js/ckeditor/ckfinder/ckfinder.html',
	//config.filebrowserImageBrowseUrl = 'js/ckeditor/ckfinder/ckfinder.html?type=Images',
	//config.filebrowserFlashBrowseUrl = 'js/ckeditor/ckfinder/ckfinder.html?type=Flash',
	//config.filebrowserUploadUrl = 'js/ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
	//config.filebrowserImageUploadUrl = 'js/ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',
	//config.filebrowserFlashUploadUrl = 'js/ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash'
	
	
};

//botões personalizados

CKEDITOR.plugins.add('custom_list_styles_roman', {
    init: function(editor) {
        editor.addCommand('changeListTypeRoman', {
            exec: function(editor) {
                var selection = editor.getSelection();
                var element = selection.getStartElement();
                if (element) {
                    var list = element.getAscendant('ul', true) || element.getAscendant('ol', true);
                    if(list){
	                    if (list.getAttribute('type') != 'upper-roman') {
	                        var type = (list.getName() == 'ul') ? 'disc' : 'upper-roman';
	                        list.setAttribute('type', type);
	                    }else{
							var type = (list.getName() == 'ul') ? 'disc' : '';
	                        list.setAttribute('type', type);
						}
					}
                }
            }
        });

        editor.ui.addButton('ListTypeRoman', {
            label: 'Números Romanos',
            command: 'changeListTypeRoman',
            icon: '../ckeditor/plugins/liststyle/list-roman.png'
        });
    }
});
	
CKEDITOR.plugins.add('custom_list_styles_alpha', {
    init: function(editor) {
        editor.addCommand('changeListTypeAlpha', {
            exec: function(editor) {
                var selection = editor.getSelection();
                var element = selection.getStartElement();
                if (element) {
                    var list = element.getAscendant('ul', true) || element.getAscendant('ol', true);
                    if(list){
	                    if (list.getAttribute('type') != 'lower-alpha') {
	                        var type = (list.getName() == 'ul') ? 'disc' : 'lower-alpha';
	                        list.setAttribute('type', type);
	                    }else{
							var type = (list.getName() == 'ul') ? 'disc' : '';
	                        list.setAttribute('type', type);
						}
					}
                }
            }
        });

        editor.ui.addButton('ListTypeAlpha', {
            label: 'Letras',
            command: 'changeListTypeAlpha',
            icon: '../ckeditor/plugins/liststyle/list-alpha.png'
        });
    }
});
