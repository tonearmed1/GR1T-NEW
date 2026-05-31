Consent Manager Installation Instructions

1. Extract the contents of this zip file
2. Place the files in your website directory
3. Add the following code to your HTML page, inside the <head> tag:

<link rel="stylesheet" id="silktide-consent-manager-css" href="path-to-css/silktide-consent-manager.css">
<script src="path-to-js/silktide-consent-manager.js"></script>
<script>
silktideCookieBannerManager.updateCookieBannerConfig({
  background: {
    showBackground: true
  },
  cookieIcon: {
    position: "bottomLeft"
  },
  cookieTypes: [
    {
      id: "cookie_strettamente_necessari",
      name: "Cookie strettamente necessari",
      description: "<p class=\"p1\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\">Questi cookie sono essenziali per il corretto funzionamento e la sicurezza del sito, inclusa la gestione della sessione, l’elaborazione dei pagamenti tramite Stripe e la memorizzazione delle preferenze sui cookie.</p><p class=\"p2\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\"><span style=\"font-size: 1rem;\">Non possono essere disattivati.</span><br></p>",
      required: true,
      onAccept: function() {
        console.log('Add logic for the required Cookie strettamente necessari here');
      }
    },
    {
      id: "cookie_analitici",
      name: "Cookie analitici",
      description: "<p class=\"p1\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\">Utilizziamo Google Analytics 4 (GA4) per raccogliere dati aggregati sull’utilizzo del sito, come pagine visitate, durata della sessione e tipo di dispositivo.</p><p class=\"p1\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\">Questi dati ci aiutano a migliorare le prestazioni e l’esperienza utente.</p>",
      required: false,
      onAccept: function() {
        gtag('consent', 'update', {
          analytics_storage: 'granted',
        });
        dataLayer.push({
          'event': 'consent_accepted_cookie_analitici',
        });
      },
      onReject: function() {
        gtag('consent', 'update', {
          analytics_storage: 'denied',
        });
      }
    },
    {
      id: "cookie_di_marketing",
      name: "Cookie di Marketing",
      description: "<p class=\"p1\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\">Utilizziamo strumenti come Meta Pixel per misurare l’efficacia delle campagne pubblicitarie e mostrare annunci pertinenti sulle piattaforme social.</p>",
      required: false,
      onAccept: function() {
        console.log('Add accept logic for Cookie di Marketing');
      },
      onReject: function() {
        console.log('Add reject logic for Cookie di Marketing');
      }
    },
    {
      id: "cookie_funzionali",
      name: "Cookie funzionali",
      description: "<p class=\"p1\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\">Consentono funzionalità avanzate come la visualizzazione di video YouTube incorporati nel sito.</p>",
      required: false,
      onAccept: function() {
        console.log('Add accept logic for Cookie funzionali');
      },
      onReject: function() {
        console.log('Add reject logic for Cookie funzionali');
      }
    }
  ],
  text: {
    banner: {
      description: "<p class=\"p1\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\">Utilizziamo i cookie sul nostro sito per migliorare la tua esperienza di navigazione, offrire contenuti personalizzati e analizzare il traffico. <a href=\"https://www.gritmotorcycles.com/it/cookie-policy\" target=\"_blank\">Cookie Policy.</a></p>",
      acceptAllButtonText: "Accetta tutti",
      acceptAllButtonAccessibleLabel: "Accetta tutti",
      rejectNonEssentialButtonText: "Rifiuta non-essenziali",
      rejectNonEssentialButtonAccessibleLabel: "Rifiuta non-essenziali",
      preferencesButtonText: "Gestisci preferenze",
      preferencesButtonAccessibleLabel: "Gestisci preferenze"
    },
    preferences: {
      title: "Personalizza le tue preferenze sui cookie",
      description: "<p class=\"p1\" style=\"color: rgb(0, 0, 0); letter-spacing: normal;\">Rispettiamo il tuo diritto alla privacy. Puoi scegliere di non consentire alcune categorie di cookie. Le tue preferenze sui cookie verranno applicate a tutto il nostro sito.</p>",
      creditLinkText: "Crea questo banner gratuitamente",

    }
  },
  position: {
    banner: "bottomLeft"
  }
});
</script>
