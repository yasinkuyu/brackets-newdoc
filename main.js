/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * Yasin Kuyu - twitter.com/yasinkuyu
 * Insya Interaktif
 * 21/06/2014
 *
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets, window, $, Mustache, navigator */

define(function (require, exports, module) {
    "use strict";

    var docIndex         = 1;
    var commandId        = "insya.newdoc.cmd";

    // Menu
    var html5File        = "insya.newhtml5";
    var html5FileLabel   = "New Html5...";

    // Brackets modules
    var DocumentManager             = brackets.getModule("document/DocumentManager"),
        Commands                    = brackets.getModule("command/Commands"),
        CommandManager              = brackets.getModule("command/CommandManager"),
        KeyBindingManager           = brackets.getModule("command/KeyBindingManager"),
        EditorManager               = brackets.getModule("editor/EditorManager"),
        MainViewManager             = brackets.getModule("view/MainViewManager"),
        Menus                       = brackets.getModule("command/Menus");

    // Template file
    var Html5Template               = require("text!htmlContent/template.html");

    // Brackets elements
    var sidebar = $("#sidebar"),
        toolbar = $("#main-toolbar");

    /**
     * Create a new untitled document in the workingset, and make it the current document.
     * Promise is resolved (synchronously) with the newly-created Document.
     */
    function handleFileNew() {

        var defaultExtension = ".html";  // disable preference setting for now

        var doc = DocumentManager.createUntitledDocument(docIndex++, defaultExtension);
        MainViewManager._edit(MainViewManager.ACTIVE_PANE, doc);
        
        // Set template
        handleTempate(Html5Template);
        
        return new $.Deferred().resolve(doc).promise();
       
    }
    
    function handleTempate(templateContent)
    {
        
        try
        {
            
           // Detect active editor
           var activeEditor = EditorManager.getActiveEditor();
            
               // Set template content
               activeEditor.document.replaceRange(templateContent, activeEditor.getCursorPos());
        }
        catch(err){}
       
    }
    
    // Sidebar double-click event
    sidebar.on('dblclick', 'div', function(e) {

        // if not children element
        if (e.target === this) {
            handleFileNew();
        }

    });

    // Toolbar double-click event
    toolbar.on('dblclick', function(e) {

        // if not children element
        if (e.target === this) {
            handleFileNew();
        }

    });

    // Register command
    CommandManager.register(html5FileLabel, html5File, handleFileNew);

    // Set menu
    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    menu.addMenuItem(html5File, undefined, Menus.AFTER, Commands.FILE_NEW_UNTITLED);

    // Shortcut add binding
    KeyBindingManager.addBinding(commandId, "Ctrl-Alt-N", "mac");
    KeyBindingManager.addBinding(commandId, "Ctrl-Alt-N", "win");


});
