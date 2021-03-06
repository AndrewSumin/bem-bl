var myPath = require('bem/lib/path'),
    Template = require('bem/lib/template'),
    Js = require('bem/lib/techs/js');

exports.techModule = module;

exports.outFile = Js.outFile;

exports.newFileContent = function (vars) {
    vars.BemObj = 'BEM' + (/^i-/.test(vars.BlockName) ? '' : '.DOM');
    vars.DeclObj = "'" + vars.BlockName + "'";
    if (vars.ModName || vars.ModVal) {
        vars.DeclObj = "{ name: " + vars.DeclObj +
            (vars.ModName? ", modName: '" + vars.ModName + "'" : '') +
            (vars.ModVal? ", modVal: '" + vars.ModVal + "'" : '') +
            '}';
    }

    return Template.process([
        '/** @requires BEM */',
        '/** @requires {{bemBemObj}} */',
        '',
        '(function() {',
        '',
        "{{bemBemObj}}.decl({{bemDeclObj}}, {",
        '',
        '    onSetMod : {',
        "        'js' : function() {",
        '            /* ... */',
        '        }',
        '    }',
        '',
        '}, {',
        '',
        '    live : function() {',
        '        /* ... */',
        '    }',
        '',
        '});',
        '',
        '})();'], vars);
};
