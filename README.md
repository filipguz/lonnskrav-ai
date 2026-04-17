# Lønnskrav AI

En beslutningsstøtte-applikasjon for tillitsvalgte som gjør selskapsdata om til dokumenterte og begrunnede lønnskrav.

---

## 🚀 Hva er dette?

Lønnskrav AI er en norsk webapplikasjon som forenkler arbeidet med lokale lønnsforhandlinger.

Appen henter inn offentlige og kommersielle selskapsdata, analyserer dem opp mot tariffens fire kriterier, og genererer et forslag til lønnskrav med tydelig begrunnelse og sporbart datagrunnlag.

---

## 🎯 Problem

Lokale lønnsforhandlinger er ofte:

* Tidkrevende
* Manuelle
* Lite standardiserte
* Avhengige av enkeltpersoners erfaring

Tillitsvalgte må selv:

* finne relevante regnskapstall
* tolke økonomien
* koble dette til tariffkriterier
* formulere et godt begrunnet krav

---

## 💡 Løsning

Denne applikasjonen automatiserer og strukturerer prosessen:

1. Henter selskapsdata (f.eks. fra Proff / Brønnøysundregistrene)
2. Analyserer data mot de fire kriteriene:

   * Økonomi
   * Produktivitet
   * Fremtidsutsikter
   * Konkurranseevne
3. Gir en vurdering per kriterium
4. Genererer:

   * forslag til lønnskrav
   * begrunnelse og argumentasjon
   * datagrunnlag og referanser

---

## 🧠 Hvordan det fungerer

Applikasjonen kombinerer tre hoveddeler:

### 1. Datainnhenting

* Integrasjon mot eksterne API-er
* Henter regnskapstall og selskapsinformasjon
* Strukturering av nøkkeltall

### 2. Regelmotor (kjerne)

* Evaluerer data opp mot definerte regler
* Gir score/indikasjon per kriterium
* Fullt forklarbar logikk (ikke black box)

### 3. AI (LLM)

* Genererer tekst og dokumentutkast
* Lager argumentasjon basert på analysen
* Foreslår formuleringer og struktur

---

## ⚠️ Viktige prinsipper

* **Transparens:** Alle vurderinger skal kunne forklares
* **Sporbarhet:** Tall skal kunne spores til kilde
* **Mennesket i kontroll:** AI gir forslag – ikke beslutninger
* **Domene først:** Regelmotor før AI

---

## 🏗️ Teknologi (planlagt)

* **Backend:** Java + Spring Boot
* **Database:** PostgreSQL
* **Frontend:** (TBD – f.eks. React)
* **AI:** LLM via API
* **Integrasjoner:**

  * Brønnøysundregistrene
  * Proff (valgfritt / premium)

---

## 📦 MVP (første versjon)

Første versjon vil støtte:

* Søk på selskap (org.nr/navn)
* Henting av nøkkeltall
* Enkel vurdering av de 4 kriteriene
* Generering av:

  * lønnskrav
  * begrunnelse
* Nedlasting som tekst/PDF

---

## 🔮 Videre utvikling

* Sammenligning mot bransje
* Historiske analyser
* Tilpasning per tariffområde
* Samarbeidsfunksjoner for tillitsvalgte
* Dashboard og visualiseringer

---

## 🎯 Mål

Å gjøre lokale lønnsforhandlinger:

* mer datadrevne
* mer konsistente
* mindre tidkrevende
* bedre dokumentert

---

## 🤝 Status

Prosjektet er i tidlig fase (MVP/konsept).

---

## 📄 Lisens

(TBD)
