/*jslint devel: true, sloppy: true, eqeq: true, continue: true, stupid: true, sub: true, todo: true, vars: true, white: true, indent: 3, maxerr: 100, maxlen: 200, plusplus: true */

console.log("LIBERA.JS Richiamato");



var DOMContentLoadedFired = false;

document.addEventListener(
  'DOMContentLoaded', 
  function () {
    console.log(">>> DOM CARICATO ORA, setto DOMContentLoadedFired = true");
    DOMContentLoadedFired = true;
  }, 
  false
);



function hasClass(element, cls) {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}



function bloccaUtente(userToBlock) {
  
  /* NASCONDO IL PROFILO DELL'UTENTE */
  var xPathQueryProfileToBlock = "//h1[contains(text(),'"+userToBlock+"')]";
  var nodesetProfileToBlock = document.evaluate(xPathQueryProfileToBlock, 
  								document.documentElement, 
  								null, 
  								XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
  								null);
  var i;
  var divH1;
  console.log('nodesetProfileToBlock.snapshotLength = ',nodesetProfileToBlock.snapshotLength);
  for (i=0; i<nodesetProfileToBlock.snapshotLength; i++) {
  	divH1 = nodesetProfileToBlock.snapshotItem(i);
  	if(hasClass(divH1.parentNode, "User") && hasClass(divH1.parentNode.parentNode, "Profile")) {
  		divH1.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
  		console.log("Nascosto Profilo");
  	}
  }
  
  
  /* NASCONDO LE IMMAGINI DELL'UTENTE */
  var xPathQueryImgToBlock = "//img[@alt='"+userToBlock+"']";
  var nodesetImgToBlock = document.evaluate(xPathQueryImgToBlock, 
  								document.documentElement, 
  								null, 
  								XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
  								null);
  console.log('nodesetImgToBlock.snapshotLength = ',nodesetImgToBlock.snapshotLength);
  for (i=0; i<nodesetImgToBlock.snapshotLength; i++) {
  	nodesetImgToBlock.snapshotItem(i).style.display = 'none';
  	console.log("Nascosta Immagine");
  }
  
  
  /* NASCONDO LE DISCUSSIONI APERTE DA LUI NELLE LISTE DISCUSSIONI e i COMMENTI nei THREAD*/
  
  var xPathQueryUserToBlock = "//a[contains(text(),'"+userToBlock+"')]";
  var nodesetUserToBlock = document.evaluate(xPathQueryUserToBlock, 
  								document.documentElement, 
  								null, 
  								XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
  								null);
  // console.log("nodeset = ", nodesetUserToBlock);
  // console.log("typeof nodeset = ", typeof nodesetUserToBlock);
  console.log('nodesetUserToBlock.snapshotLength = ',nodesetUserToBlock.snapshotLength);
  var anchor;
  var newSpan;
  var newSpan_content;
  for (i=0; i<nodesetUserToBlock.snapshotLength; i++) {
  	
  	anchor = nodesetUserToBlock.snapshotItem(i);
  	
  	// console.log("anchor trovata = ", anchor);
  
    /* NASCONDO LE DISCUSSIONI APERTE DA LUI NELLE LISTE DISCUSSIONI */
  	if (hasClass(anchor.parentNode.parentNode, "starter") && hasClass(anchor.parentNode.parentNode.parentNode.parentNode, "Discussion")) {
  		anchor.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
  		console.log("Nascosta Discussione");
  		continue;
  	}
  
  	/* NASCONDO i COMMENTI all'interno dei THREAD di discussione */
  	if (hasClass(anchor.parentNode, "Author") && hasClass(anchor.parentNode.parentNode.parentNode, "Comment")) {
  		anchor.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
  		console.log("Nascosto Commento");
  		continue;
  	}
  	
  	/* NASCONDO i QUOTE all'interno delle discussioni */
  	if (hasClass(anchor.parentNode, "QuoteAuthor") && hasClass(anchor.parentNode.parentNode, "UserQuote")) {
  		newSpan = document.createElement("SPAN");
  		newSpan_content = document.createTextNode("[Citazione rimossa da parte dell'estensione ForumLibero]");
      newSpan.appendChild(newSpan_content);
      newSpan.style.color = 'gray';
      newSpan.style.fontStyle = 'italic';
  		anchor.parentNode.parentNode.parentNode.replaceChild(newSpan, anchor.parentNode.parentNode);
  		console.log("Nascosta Citazione");
  		continue;
  	}
  	
  	/* NASCONDO LE IMMAGINI NELLE NOTIFICHE ATTIVITA' DI CAMBIO IMMAGINE NEL BOX SULLA DESTRA */
  	if (hasClass(anchor.parentNode, "Activity") && hasClass(anchor.parentNode, "PictureChange")) {
  		anchor.parentNode.style.display = 'none';
  		console.log("Nascosta Attività di cambio foto");
  		continue;
  	}
  	
  	/* NASCONDO LE ATTIVITA' di post sulla bacheca personale che appaiono nel box di destra */
  	if (hasClass(anchor.parentNode, "Activity") && hasClass(anchor.parentNode, "AboutUpdate")) {
  		anchor.parentNode.style.display = 'none';
  		console.log("Nascosta Attività di post su bacheca personale");
  		continue;
  	}
  	
  	/* NASCONDO CONVERSAZIONI/messaggi */
  	if (hasClass(anchor.parentNode.parentNode, "Conversation") && hasClass(anchor.parentNode.parentNode, "ItemContent")) {
  		anchor.parentNode.parentNode.parentNode.style.display = 'none';
  		console.log("Nascosta Conversazione/Messaggio");
  		continue;
  	}
  	
  	/* NASCONDO varie ATTIVITA' e post dell'utente che compaiono sui profili e sul mio */
  	if (hasClass(anchor.parentNode.parentNode, "Activity") && hasClass(anchor.parentNode.parentNode, "ItemContent")) {
      //console.log("Trovata Attivita");
      if (hasClass(anchor.parentNode.parentNode.parentNode, "ConversationMessage")) {
          anchor.parentNode.parentNode.parentNode.style.display = 'none';
          console.log("Nascosta Attività Messaggio ricevuto, dal mio profilo");
          continue;
      } 
      if (hasClass(anchor.parentNode.parentNode.parentNode, "BookmarkComment")) {
      		anchor.parentNode.parentNode.parentNode.style.display = 'none';
      		console.log("Nascosta Attività Commento a Discussione Preferita, dal mio profilo");
      		continue;
      }  
      if (hasClass(anchor.parentNode.parentNode.parentNode, "WallPost")) {
          anchor.parentNode.parentNode.parentNode.style.display = 'none';
          console.log("Nascosto post su altro profilo");
          continue;
      } 
      if (hasClass(anchor.parentNode.parentNode.parentNode, "DiscussionComment")) {
          anchor.parentNode.parentNode.parentNode.style.display = 'none';
          console.log("Nascosta Notifica Commento a MIA Discussione, dal mio profilo");
          continue;
      }  
      if (hasClass(anchor.parentNode.parentNode.parentNode, "WallComment")) {
          anchor.parentNode.parentNode.parentNode.style.display = 'none';
          console.log("Nascosta Notifica Attività Commento a sul mio profilo");
          continue;
      }
      console.log("Trovato link dentro Activity ItemContent non identificato");
  	}
  	
  	/* NASCONDO Commento a post su bacheca/profilo*/
  	if (hasClass(anchor.parentNode, "ActivityComment") && hasClass(anchor.parentNode, "ItemContent")) {
      anchor.parentNode.parentNode.style.display = 'none';
  	  console.log("Nascosta Commento a post su bacheca/profilo");
  	  continue;
  	}
  	
  	/* nascondo voce nei top posters */
  	if (anchor.parentNode.parentNode.parentNode.parentNode.id=="TopPosters") {
  	  anchor.parentNode.parentNode.style.display = 'none';
  		console.log("Nascosta voce nei top posters");
  	  continue;
  	}
  	
  	/* nascondo testo di avviso di ultimo commento nella lista discussioni */
  	if (hasClass(anchor.parentNode.parentNode, "LastCommentBy")) {
  	  anchor.parentNode.parentNode.style.display = 'none';
  		console.log("Nascosto testo di avviso di ultimo commento");
  	  continue;
  	}
  	
  	/* nascondo voci "in this discussion" (nasconde anche quelle nel box whosOnline) */
  	if ((anchor.parentNode.tagName=="STRONG") && (anchor.parentNode.parentNode.tagName=="LI")) {
  	  anchor.parentNode.parentNode.style.display = 'none';
  		console.log('Nascosta voce in "In this discussion" oppure nel box WhosOnline');
  	  continue;
  	}
  	
  	/* nascondo voci di ultimo commento dalla scheda tutte le categorie */
  	if (hasClass(anchor.parentNode, "LastDiscussionTitle")) {
  	  anchor.parentNode.style.display = 'none';
  		console.log("Nascosto avviso ultimo commento dalla scheda tutte le categorie");
  	  continue;
  	}
  	
  	/* NASCONDO i LINK SINGOLI RIMANENTI */
  	//anchor.style.display = 'none';
  	console.log("Trovato link non identificato");
  	
  }
  
} 



function applicaBlocco(array_bloccati, nascondi_ultimo) {
  
  console.log("Scorro array_bloccati :");
  
  var i;
  for (i=0;i<array_bloccati.length;i++) {
    console.log(' ');
    console.log('---- Applico Blocco a "' + array_bloccati[i] + '" ----');
    bloccaUtente(array_bloccati[i]);
    console.log('---- Fine blocca utente ----');
  }
  
  var style;
  if(nascondi_ultimo){
    console.log('\n==== NASCONDO TUTTI AVVISI ULTIMO COMMENTO ====');
    style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = chrome.extension.getURL('hide-last.css');
    (document.head||document.documentElement).appendChild(style);
  }  
}



function readOptions(funzioneRitorno) {
  // Use default value bloccati = '' and nascondi_ultimo = false.
  chrome.storage.sync.get({
    bloccati: '',
    nascondi_ultimo: false
  }, function(items) {
    console.log("LETTURA OPZIONI AVVENUTA");
    console.log("bloccati: ", items.bloccati);
    console.log("nascondi_ultimo: ", items.nascondi_ultimo);
    
    if (DOMContentLoadedFired) {
      console.log(">>> DOM ERA GIA STATO CARICATO, INVOCO  SUBITO la funzioneRitorno");
      funzioneRitorno(items.bloccati.split(" ").filter(function(el) {return el.length > 0;}), items.nascondi_ultimo);  
    } else {
      console.log(">>> DOM NON ANCORA CARICATO, Mi metto in ascolto dell'Evento DOMContentLoaded ");
      document.addEventListener(
        'DOMContentLoaded', 
        function () {
          console.log(">>> DOM CARICATO ORA, INVOCO la READ OPTIONS");
          funzioneRitorno(items.bloccati.split(" ").filter(function(el) {return el.length > 0;}), items.nascondi_ultimo);  
        }, 
        false
      ); 
    }
  });
}


readOptions(applicaBlocco);



