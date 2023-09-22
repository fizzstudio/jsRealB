// add person names to the vocabulary
Object.assign(globalThis,jsRealB);
loadEn();
addToLexicon({"John":{"N":{"g":"m","tab":"n4"}}})
addToLexicon({"Jim": {"N":{"g":"m","tab":"n4"}}})
addToLexicon({"Bill":{"N":{"g":"m","tab":"n4"}}})
addToLexicon({"Mary":{"N":{"g":"f","tab":"n4"}}})
addToLexicon({"cheat":{"N":{"tab":"n1"},"V":{"tab":"v1"}}})
/* 
These examples are not available on the web now. I have a copy obtained via Wayback Machine,
but the figures are lost...
{ref:"Huang",url:"http://www.people.fas.harvard.edu/~ctjhuang/lecture_notes/lecch6.html",no:"35a",
 expr:`
`},
*/

var examplesEn = [
{
 expr:`
S(NP(D('the'),
     N('cat')),
  VP(V('eat'),
     NP(D('the'),
        N('mouse'))))`},
{
 expr:`
root(V('eat'),
     subj(N('cat'),det(D('the'))),
     comp(N('mouse'),det(D('the'))).pro())`},
{ref:"C.-T. James Huang",no:"35a",
 expr:`
S(Pro("I").pe(2),
  VP(V("know"),
     SP(Pro("that"),
        S(N("Bill"),
          VP(V("marry").t("ps"),
             NP(D("my").g("m").ow("s"),
                Q("ex").lier("-"),N("wife")))))))
`},
{ref:"C.-T. James Huang",no:"35b",
 expr:`
S(Pro("I").g("f"),
  VP(V("love"),
     Pro("me"),Adv("still")))
`},
{ref:"C.-T. James Huang",no:"Homework 6 (1a)",
 expr:`
S(N("Mary"),
  VP(V("talk"),
     PP(P("to"),N("Bill"))))
`},
{ref:"C.-T. James Huang",no:"11",
 expr:`
S(NP(N("John")),
  VP(V("cheat").t("ps"),NP(N("Bill"))))
`},
{ref:"C.-T. James Huang",no:"12",
 expr:`
S(NP(D("the"),N("teacher")),
  VP(V("put").t("ps"),
     NP(D("the"),N("glass").n("p")),
     PP(P("in"),NP(D("the"),N("drawer")))))`
},
{ref:"C.-T. James Huang",no:"26b",
 expr:`
S(NP(N("Bill")),
  VP(V("explain"),
     NP(D("the"),N("problem")),
        PP(P("to"),Pro("me").g("f"))))
`},
{ref:"C.-T. James Huang",no:"26c",
 expr:`
S(NP(N("Jim")),
  VP(V("make"),
     NP(D("the"),N("claim"),
        SP(S(Pro("that"),
          NP(N("Bill")),
          VP(V("put").t("ps"),
             NP(D("the"),N("idea")),
             PP(P("behind"),
                Pro("me")))).typ({mod:"nece"})
           ))))
`},
];
var examplesFr = [
    {
     expr:`
S(NP(D('le'),
     N('chat')),
  VP(V('manger'),
     NP(D('le'),
        N('souris'))))`},
    {
     expr:`
root(V('manger'),
     subj(N('chat'),det(D('le'))),
     comp(N('souris'),det(D('le'))).pro())`},
{ref:"Lingolia",url:"https://francais.lingolia.com/fr/grammaire/les-verbes/passif",no:"2",
     expr:`
S(NP(D('le'),
     N('passant').n("p")),
  VP(V('appeler'),
     NP(D('le'),
        N('ambulance'))))`},
{ref:"Lingolia",url:"https://francais.lingolia.com/fr/grammaire/les-verbes/passif",no:"3",
     expr:`
S(NP(D('le'),
     N('police')),
  VP(V('recueillir'),
     NP(D('un'),
        N('témoignage').n("p"))))`},
{ref:"C.-T. James Huang",no:"35a",
 expr:`
S(Pro("je").pe(2),
  VP(V("savoir"),
     SP(Pro("que"),
        S(Q("Bill"),
          VP(V("épouser").t("ps"),
             D("mon").g("m"),
             Q("ex").lier("-"),N("femme"))))
             ))
`},
{ref:"Point du FLE",url:"https://www.lepointdufle.net/ressources_fle/cod_coi_3.htm",no:"3",
 expr:`
// Essayez en enlevant un ou les .pro()
S(Pro("lui").c("nom"),
  VP(V("montrer"),
     NP(D("le"),N("lettre").n("p"),
        SP(Pro("que"),
           Pro("lui").c("nom"),
           VP(V("recevoir").t("pc")))).pro(),
     PP(P("à"),
        NP(D("mon"),N("ami").g("f"))).pro()))
`},
{ref:"Point du FLE",url:"https://www.lepointdufle.net/ressources_fle/cod_coi_3.htm",no:"8",
 expr:`
// Essayez en enlevant un ou les .pro()
S(Pro("lui").c("nom"),
  VP(V("parler").t("pc"),
     PP(P("à"),NP(D("mon"),N("ami"))).pro(),
     PP(P("de"),NP(D("mon"),N("problème"))).pro()))
`}
];

var examples={"en":examplesEn,"fr":examplesFr};
