/**
   jsRealB 5.0
   Guy Lapalme, lapalme@iro.umontreal.ca, December 2023
 */


import { V,Adv } from "./jsRealB.js"
import { getLexicon,getRules } from "./Lexicon.js";
import { English_constituent } from "./Constituent-en.js"
export { English_terminal }

/**
 * English specific class for Terminal
 */
const English_terminal = (superclass) =>
    class extends English_constituent(superclass){
 
        /**
         * Returns the English thousand separator
         *
         * @returns {RegExp}
         */
        thousand_seps(){return /,/g}

        /**
         * Return the grammtical number of this terminal
         *
         * @returns {"s"|"p"}
         */
        grammaticalNumber(){
            const res = super.grammaticalNumber()
            if (res != null) return res;
            // according to https://www.chicagomanualofstyle.org/book/ed17/part2/ch09/psec019.html
            //   any number other than 1 is plural... 
            // even 1.0 but this case is not handled here because nbDecimal(1.0)=>0
            return (Math.abs(this.value)==1 && this.nbDecimals==0)?"s":"p";
        }

        /**
         * Decline an adjective or an adverb by filling the realization field.
         * Caution: can return more than one terminal
         *
         * @param {any} rules
         * @param {any} declension
         * @param {string} stem
         * @returns {Terminal[]}
         */
        decline_adj_adv(rules,declension,stem){
            // English adjective/adverbs are invariable but they can have comparative, thus more than one token
            this.realization = this.lemma;
            const f = this.getProp("f");// usual comparative/superlative
            if (f !== undefined && f !== false){
                if (this.tab=="a1"){
                    const comp = Adv(f=="co"?"more":"most")
                    comp.realization = comp.lemma
                    return [comp,this]
                } else {
                    if (this.tab=="b1"){// this is an adverb with no comparative/superlative, try the adjective table
                        const adjAdv=getLexicon(this.lang)[this.lemma]["A"]
                        if (adjAdv !== undefined){
                            declension=rules.declension[adjAdv["tab"]].declension;
                            const ending=rules.declension[adjAdv["tab"]].ending;
                            stem=stem.slice(0,stem.length-ending.length);
                        } else // adverb without adjective
                            return [this]
                    } 
                    // look in the adjective declension table
                    const ending=this.bestMatch("adjective declension",declension,{f:f})
                    if (ending==null){
                        return [this.morphoError("decline [en]:A",{f:f})]
                    }
                    this.realization = stem + ending;
                    return [this]
                }
            }
            return [this]                      
        }

        /**
         * Check if "refl" is used in English
         *
         * @param {string} c
         * @returns {boolean}
         */
        check_bad_pronoun_case(c){
            if (c=="refl"){ // reflechi cannot be used in English
                this.warn("ignored value for option","c",c)
                return true
            }
            return false
        }

        /**
         * Check if the person of a pronoun should be changed (i.e. it not genitive )
         *
         * @param {string} c : case of the pronoun
         * @returns {boolean}
         */
        should_set_person_number(c){
            return c!="gen"
        }

        /**
         * Return a list of tonic forms for pronouns
         *
         * @returns {string[]}
         */
        tonic_forms(){
            return ["us","her","you","him","them","it"]
        }

        /**
         * Return the English word for "declension"
         *
         * @returns {"declension"}
         */
        declension_word(){return "declension"}

        /**
         * Check if the specified gender and number corresponds to what is 
         * acceptable in the lexicon. Empty because irrelevant for English
         *
         * @param {*} g
         * @param {*} n
         * @returns {null}
         */
        check_gender_lexicon(g,n){return null}


        /**
         * English conjugation of this Terminal
         * @returns list of Terminals with their realization field filled
         */
        conjugate(){
            let pe = +this.getProp("pe") || 3; // property can also be a string with a single number 
            const n = this.getProp("n");
            const g = this.getProp("g") || "m"; // migh be used for reflexive pronoun
            const t = this.getProp("t");
            if (this.tab==null)
                return [this.morphoError("conjugate_en:tab",{pe:pe,n:n,t:t})];
            // subjonctive present is like present except that it does not end in s at 3rd person
            // subjonctive past is like simple past
            const t1 = t=="s"?"p":(t=="si"?"ps":t);
            const conjugation=getRules(this.lang).conjugation[this.tab].t[t1];
            let res=[this];
            if (conjugation!==undefined){
                switch (t) {
                    case "p": case "ps": 
                    case "s": case "si": 
                        if (typeof conjugation == "string"){
                            this.realization=this.stem+conjugation;
                        } else {
                            let term=conjugation[pe-1+(n=="p"?3:0)];
                            if (term==null){
                                return [this.morphoError("conjugate_en:pe",{pe:pe,n:n,t:t})];
                            } else {
                                // remove final s at subjonctive present by taking the form at the first person
                                if (t=="s" && pe==3)term=conjugation[0];
                                this.realization=this.stem+term;
                            }
                        }
                        break;
                    case "b": case "pp": case "pr":
                        this.realization=this.stem+conjugation;
                }
            } else if (t=="f"){
                this.realization=this.lemma;
                this.insertReal(res,V("will"),0);
            } else if (t=="c"){
                this.realization=this.lemma;
                this.insertReal(res,V("will").t("ps"),0);
            } else if (t=="bp" || t=="bp-to"){
                const pp = getRules(this.lang).conjugation[this.tab].t["pp"];
                this.realization=pp!==undefined?(this.stem+pp):this.lemma;
                this.insertReal(res,V("have").t("b"),0);
                if (t=="bp-to") this.insertReal(res,P("to"),0);
            } else if (t=="b-to"){
                this.realization=this.lemma;
                this.insertReal(res,P("to"),0);
            } else if (t=="ip"){
                this.realization=this.lemma;
                if (pe==1 && n=="p")this.insertReal(res,Q("let's"),0);
            } else
                return [this.morphoError("conjugate_en: unrecognized tense",{pe:pe,n:n,t:t})];
            return res;
        }

        /**
         * Return an appropriate numeric "one" according to number and gender. Empty for English.
         *
         * @param {int} number: 1 or -1
         * @param {string} gender
         * @returns {null}
         */
        numberOne(number,gender){return null}

    };
