QUnit.test( "Dependencies FR", function( assert ) {
    loadFr();
    var pomme = comp(N("pomme"),det(D("le")));
    var pommeS = subj(N("pomme"),det(D("le")));
    var  gars = subj(N("garçon").n("p"),det(D("le")));
    addToLexicon({"John":{"N":{"g":"m","tab":"n4"}}})
    addToLexicon({"Mary":{"N":{"g":"f","tab":"n16"}}})
    var phrases = [
        // 1
        {"expression":root(V('être').t("p"),
                           comp(A('gris')),
                           subj(N('souris'),
                                det(D('le')),
                                mod(V('manger').t("pc"),
                                    comp(Pro('que')).pos("pre"),
                                    subj(N('chat').n("p"),
                                         det(D('le')))))),
         "expected":"La souris que les chats ont mangée est grise. ",
         "message":"Phrase avec attribut, de plus le passé composé avec avoir est accordé correctement... "},
        // 2
        {"expression":root(N('cadeau').n("p")).cap(false),
         "expected":"cadeaux",
         "message":"Phrase sans capitale"},
        // 3
        {"expression":
            root(N('cadeau').n("p"),
                 mod(A('beau'))),
         "expected":"Beaux cadeaux. ",
         "message":"Accord adjectif"},
        // 4
        {"expression":
            root(N('gens').n("p"),
                 det(D('le')),
                 mod(A('vulgaire').pos("pre"))).cap(false),
         "expected":"les vulgaires gens",
         "message":"Adjectif pré-posé"},
        // 5
        {"expression":
            root(N('père'),
                 det(D('le')),
                 mod(P('de'),
                     mod(N('fille'),
                         det(D('mon').pe(1))))),
         "expected":"Le père de ma fille. ",
         "message":"Complément du nom"},
        // 6
        {"expression":
            root(V('agir').t("pc"),
                 comp(Adv('conformément'),
                      mod(P('à'),
                          mod(N('loi'),
                              det(D('le'))))),
                 subj(Pro('je').pe(1).n("p"))).typ({"neg":true}),
         "expected":"Nous n'avons pas agi conformément à la loi. ",
         "message":"Phrase négative avec accord du verbe"},
        // 7
        {"expression":
            root(V('travailler').t("pc"),
                 comp(Adv('bien')),
                 subj(Pro('je').pe(2))).typ({"mod":"nece"}),
         "expected":"Tu as dû travailler bien. ",
         "message":"Phrase au passé avec modalité de nécessité"},
        // 8
        {"expression":
            root(V('être').t("p"),
                 comp(A('gentil')),
                 coord(C('et'),
                       subj(N('garçon'),
                            det(D('le'))),
                       subj(N('fille'),
                            det(D('le'))))),
         "expected":"Le garçon et la fille sont gentils. ",
         "message": "Coordination"},
        // 9
        {"expression":
            root(V('parler').t("p"),
                 coord(C('et'),
                       subj(N('boulanger').g("f"),
                            det(D('le'))),
                       subj(N('client').g("f"),
                            det(D('le'))))).typ({"int":"yon"}),
         "expected":"La boulangère et la cliente parlent-elles? ",
         "message":"Coordination et interrogation"},
        // 10
        {"expression":
            root(V('parler').t("p"),
                 coord(C('et'),
                       subj(N('boulanger').g("f"),
                            det(D('le'))),
                       subj(N('vendeur'),
                            det(D('le'))),
                       subj(N('client').g("f"),
                            det(D('le'))))),
         "expected":"La boulangère, le vendeur et la cliente parlent. ",
         "message":"Coordination"},
        // 11
        {"expression":
            root(V('manger'),
                 comp(N('gâteau'),
                      det(D('le'))),
                 subj(N('enfant').n("p"),
                      det(D('le')))).typ({"pas":true}),
         "expected":"Le gâteau est mangé par les enfants. ",
         "message":"Passif avec élision"},
        // 12
        {"expression":
            root(V('manger'),
                 comp(N('gâteau'),
                      det(D('le'))),
                 subj(N('enfant').n("p"),
                      det(D('le'))).pro()),
         "expected":"Ils mangent le gâteau. ",
         "message":"Pronominalisation du sujet"},
        // 13
        {"expression":
            root(V('manger'),
                 comp(N('gâteau'),
                      det(D('le'))).pro(),
                 subj(N('enfant').n("p"),
                      det(D('le')))),
         "expected":"Les enfants le mangent. ",
         "message":"Pronominalisation du complément"},
        // 14
        {"expression":
            root(V('manger'),
                 comp(N('gâteau'),
                      det(D('le'))).pro(),
                 subj(N('enfant').n("p"),
                      det(D('le')))).typ({"pas":true}),
         "expected":"Il est mangé par les enfants. ",
         "message":"Pronominalisation du complément au passif"},
        // 15
        {"expression":
            root(V('manger'),
                 comp(N('souris'),
                      det(D('le'))),
                 subj(N('chat').g("f").n("p"),
                      det(D('le')))),
         "expected":"Les chattes mangent la souris. ",
         "message":"Phrase affirmative"},
        // 16
        {"expression":
            root(V('dévorer').t("pc"),
                 comp(N('souris'),
                      det(D('le')),
                      mod(A('gris')),
                      mod(Q('Wow!'))).tag('a',{"href":"http://wikipedia.org/cat","target":"_blank"}),
                 subj(N('chat').g("f").n("p").tag("b").tag("i"),
                      det(D('le')),
                      mod(Q('super')))).typ({"neg":true}),
         "expected":'Les <i><b>chattes</b></i> super n\'ont pas dévoré <a href="http://wikipedia.org/cat" target="_blank">la souris grise Wow!</a>',
         "message":"Phrase avec tag HTML"},
        // 17
        {"expression":
            root(V('être').t("p"),
                 comp(A('gris')),
                 subj(N('souris').n("p"),
                      det(D('le')))).typ({"neg":true}),
         "expected":"Les souris ne sont pas grises. ",
         "message":"Accord avec être"},
        // 18
        {"expression":
            root(V('avoir').t("cp"),
                 comp(N('ami').g("f"),
                      det(NO(2)),
                      mod(A('beau'))),
                 subj(Pro('je').n("p").pe(2))).typ({"neg":"plus"}),
         "expected":"Vous n'auriez plus eu 2 belles amies. ",
         "message":"Négation avec adjectif au pluriel"},
        // 19
        {"expression":
            root(V('évanouir').t("pc"),
                 comp(P('à'),
                      mod(DT('Mon May 21 1979 12:00:00 GMT-0400 (EDT)').dOpt({"hour":false,"minute":false,"second":false}))),
                 subj(N('John'))).typ({"neg":true}),
         "expected":"John ne s'est pas évanoui au lundi 21 mai 1979. ",
         "message":"Phrase avec une date et un ajout au dictionnaire"},
        // 20
        {"expression":
            root(V('évanouir').t("pc"),
                 comp(P('à'),
                      mod(DT('Mon May 21 1979 12:00:00 GMT-0400 (EDT)').dOpt({"hour":false,"minute":false,"second":false}))),
                 coord(C('et'),
                       subj(N('John')),
                       subj(N('Mary')))).typ({"neg":true}),
         "expected":"John et Mary ne se sont pas évanouis au lundi 21 mai 1979. ",
         "message":"Phrase avec coordination ou et date. "},
        // 21
        {"expression":root(V("aimer")).add(pomme).add(gars,0),
         "expected":"Les garçons aiment la pomme. ",
         "message":"Phrase construite par morceaux"},
        // 22
        {"expression":
        root(V('venir').t("pc"),
             comp(Adv('hier')),
             coord(C('et'),
                   subj(N('fruit'),
                        det(D('le')))).add(pommeS).add(gars)),
         "expected":"Le fruit, la pomme et les garçons sont venus hier. ",
         "message":"Coordination construite par morceaux"},
        // 23
        {"expression":
            root(V('arriver').t("pc"),
                 comp(Adv('hier')),
                 coord(C('et'),
                       subj(N('orange'),
                            det(D('le')))).add(pommeS)),
         "expected":"L'orange et la pomme sont arrivées hier. ",
         "message":"Coordination avec attribut au pluriel"},
        // 24
        {"expression":
            root(V('manger').t("pc"),
                 comp(N('pomme'),
                      det(D('le'))),
                 subj(Pro('je'))),
         "expected":"Il a mangé la pomme. ",
         "message":"Phrase de base"},
        // 25
        {"expression":
            root(V('manger').t("pc"),
                 comp(N('pomme'),
                      det(D('le'))).tag("i").pro(),
                 subj(Pro('je'))),
         "expected":"Il <i>l'</i> a mangée. ",
         "message":"Pronominalisation combinée avec tag HTML"},
        // 26
        {"expression":
            root(N('pomme').tag("i"),
                 det(D('le')),
                 mod(V('manger').aux("êt").t("pc"),
                     subj(Pro('qui')))),
         "expected":"La <i>pomme</i> qui est mangée. ",
         "message":"Phrase avec attribut"},
        // 27
        {"expression":
            root(N('pomme').tag("i"),
                 det(D('le')),
                 mod(V('manger').t("pc"),
                     comp(Pro('que')).pos("pre"),
                     subj(Pro('je')))).cap(false),
         "expected":"la <i>pomme</i> qu'il a mangée",
         "message":"NP avec relative"},
        // 28
        {"expression":S(NP(D("le"),N("pomme").tag("i"),
                             SP(Pro("que"),
                                Pro("je"),
                                VP(V("manger").t("pc"))))),
         "expected":"La <i>pomme</i> qu'il a mangée. ",
         "message":"Pronominalisation qui couvre toute la phrase... (non implanté en dépendences)"},
        // 29
        {"expression":
            root(V('manger'),
                 comp(N('gâteau'),
                      det(D('le'))),
                 subj(N('enfant').n("p"),
                      det(D('le')))).typ({"pas":true}),
         "expected":"Le gâteau est mangé par les enfants. ",
         "message":"Passive"},
        // 30
        {"expression":
            root(V('agir').t("c"),
                 comp(Adv('conformément'),
                      mod(P('à'),
                          mod(N('loi'),
                              det(D('le'))))),
                 subj(Pro('je').pe(1).n("p"))).typ({"mod":"nece"}),
         "expected":"Nous devrions agir conformément à la loi. ",
         "message":"avec PP"},
        // 31
        {"expression":
            root(N('chat').n("p"),
                 det(D('le')),
                 coord(C('et'),
                       mod(V('courir')),
                       mod(V('sauter')),
                       mod(V('manger'))),
                 comp(N('souris'),
                      det(D('le')))),
         "expected":"Les chats courent, sautent et mangent la souris. ",
         "message":"Sujet d'une coordination de verbes"},
        // 32
        {"expression":root(V('être'),
             comp(P('de'),
                  mod(N('exercice'),
                      det(D('le')),
                      mod(A('aisé'),
                          mod(P('à'),
                              mod(V('réussir').t("b"),
                                  comp(P('de'),
                                       mod(N('coup'),
                                           det(D('le')),
                                           mod(A('premier'))))))))),
             subj(Pro('ce'))).typ({"neg":true}),
         "expected":"Ce n'est pas de l'exercice aisé à réussir du premier coup. ",
         "message":"Multiples élisions"},
        // 33
        {"expression":
        root(Q(""),
            coord(C('et'),
                  subj(N('ami').g("f"),
                       det(D('mon').pe(1))),
                  subj(N('étudiant').g("f"),
                       det(D('le')),
                       mod(A('vieux')))),
              mod(V('recevoir').t("pc"),
                  comp(Pro('que')).pos("pre"),
                  subj(N('homme'),
                       det(D('ce'))))),
         "expected":"Mon amie et la vieille étudiante que cet homme a reçues. ",
         "message":"Élisions, euphonies et cod coordonné placé avant le verbe"},
        // 34
        {"expression": 
            root(N('chat').tag("b"),
                 det(D('le').tag("i"))),
         "expected":"<i>Le</i> <b>chat</b>. ",
         "message":"Top level,capitalization with HTML tags. "},
        // 35
        {"expression":
            root(V('demander').t("pc"),
                 comp(N('adresse'),
                      det(D('mon'))).pro(),
                 comp(P('à'),
                      mod(N('parent').n("p"),
                          det(D('mon')))).pro(),
                 subj(Pro('je').pe(2))),
         "expected":"Tu la leur as demandée. ",
         "message":"Pronominalisation de l'objet direct et de l'objet indirect (datif)"},
        // 36
        {"expression":
            root(V('parler').t("pc"),
                 comp(P('à'),
                      mod(N('ami').g("f"),
                          det(D('mon')))).pro(),
                 comp(P('de'),
                      mod(N('problème'),
                          det(D('mon')))).pro(),
                 subj(Pro('je'))),
         "expected":"Il lui en a parlé. ",
         "message":"Pronominalisation de deux objets indirects"},
        // 37
        {"expression":
            root(V("manger").t("pc"),
                      subj(N("souris"),
                           det(D("le"))),
                      comp(N("fromage"),
                           det(D("le")))).typ({int:"wad",pas:true}),
         "expected":"Par quoi le fromage a-t-il été mangé? ",
         "message":"Question au passif avec verbe au passé composé"},
        // 38
        // {"expression":,
        //  "expected":"",
        //  "message":""},
        // 39
        // {"expression":,
        //  "expected":"",
        //  "message":""},

    ];
    
    for (var i = 0; i < phrases.length; i++) {
        var s=phrases[i];
        var exp=s.expression;
        assert.equal(exp.toString(),s.expected,s.message)
    }
});

