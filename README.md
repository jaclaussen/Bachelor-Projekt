Das der Ordner für die Entwicklung unserer Anzeigen.

Grundlagen:

Wenn ihr etwas pushen wollt, müsst ihr es zu erst hinzufügen:
git add Dateiname oder *(für alle Änderungen)
Dann folgt der Commit, hier eine kurze Nachricht was bearbeitet wurde:
git commit -m "Nachricht"
Dann folgt der Push auf das Repository:
git push origin master

Wenn ihr für euch Programmiert, ist es sinnvoll dies auf einen eigenen Branch zu tun.
Erstellt wird dieser über:
git branch Name
Über git checkout Branchname wechselt ihr in diesem Branch.
Indem Branch könnt ihr wie oben genau so pushen, nur das der Master nicht verändert wird.

In den Master nur fertige Elemente pushen, über einen Merge.
Dafür wechselt ihr wieder in den Masterbranch:
git checkout master
Dann der Merge mit eurem Branch:
git merge Branchname


Ein paar Links bei Problemen mit Git:
https://rogerdudler.github.io/git-guide/
https://mirrors.edge.kernel.org/pub/software/scm/git/docs/
https://stackoverflow.com/questions/tagged/git